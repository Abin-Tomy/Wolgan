import * as THREE from "three";
import { servicesData, type ServiceItem } from "../data/servicesData";

/**
 * GALLERY
 *
 * Implements a "Sharp Asymmetric Diagonal" design.
 * Each image has one straight edge and one diagonal cut edge.
 * Themes are clean, white, and high-contrast.
 */

export interface PlaneBlendData {
    currentPlaneIndex: number;
    nextPlaneIndex: number;
    blend: number;
}

export interface MoodBlendData {
    currentIndex: number;
    nextIndex: number;
    currentColor: string;
    nextColor: string;
    currentBlob1Color: string;
    nextBlob1Color: string;
    currentBlob2Color: string;
    nextBlob2Color: string;
    blend: number;
}

export class Gallery {
    private planes: THREE.Mesh[] = [];
    private bgPlanes: THREE.Mesh[] = [];
    private textureLoader = new THREE.TextureLoader();
    private trailCurve: THREE.CatmullRomCurve3 | null = null;
    private trailMesh: THREE.Mesh | null = null;
    private backgroundMesh: THREE.Mesh | null = null;
    private scene: THREE.Scene | null = null;

    // Layout
    readonly planeGap = 5;
    private readonly planeScale = 1.1;
    private readonly mobileScale = 0.75;
    private readonly mobileBreakpoint = 768;

    // Fade
    private readonly fadeSampleOffset = 1;
    private readonly fadeSmoothing = 0.14;

    // Mouse parallax
    private parallaxAmountX = 0.16;
    private parallaxAmountY = 0.08;
    private parallaxSmoothing = 0.08;
    private pointerTarget = new THREE.Vector2(0, 0);
    private pointerCurrent = new THREE.Vector2(0, 0);

    // Breath
    private breathTiltAmount = 0.045;
    private breathScaleAmount = 0.03;
    private breathSmoothing = 0.14;
    private breathGain = 1.1;
    private breathIntensity = 0;

    // Gesture drift
    private gestureAmountY = 0.05;
    private gestureSmoothing = 0.05;
    private driftCurrent = 0;
    private driftTarget = 0;

    private onPointerMove = (e: PointerEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        this.pointerTarget.set(x, -y);
    };
    private onPointerLeave = () => {
        this.pointerTarget.set(0, 0);
    };

    onActiveIndexChange?: (index: number) => void;
    private lastActiveIndex = -1;

    async init(scene: THREE.Scene): Promise<void> {
        this.scene = scene;
        
        const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

        const textures = await Promise.all(
            servicesData.map((s) =>
                this.textureLoader.loadAsync(s.imageSrc).then((t) => {
                    t.colorSpace = THREE.SRGBColorSpace;
                    return t;
                }).catch(() => null)
            )
        );

        servicesData.forEach((service: ServiceItem, index: number) => {
            const texture = textures[index];
            const isRightSide = index % 2 !== 0;

            const material = new THREE.ShaderMaterial({
                transparent: true,
                depthWrite: false,
                side: THREE.DoubleSide,
                uniforms: {
                    uTexture: { value: texture },
                    uOpacity: { value: index === 0 ? 1 : 0 },
                    uImageAspect: { value: texture?.image ? texture.image.width / texture.image.height : 1 },
                    uPlaneAspect: { value: 1.5 },
                    uSide: { value: isRightSide ? 1.0 : 0.0 }, 
                    uFlipSlant: { value: (index === 1 || index === 3) ? 1.0 : 0.0 },
                    uRadius: { value: 0.015 },
                },
                vertexShader: `
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform sampler2D uTexture;
                    uniform float uOpacity;
                    uniform float uImageAspect;
                    uniform float uPlaneAspect;
                    uniform float uSide;
                    uniform float uFlipSlant;
                    uniform float uRadius;
                    varying vec2 vUv;

                    void main() {
                        vec2 uv = vUv;
                        
                        // Object-fit: cover logic
                        float ratio = uPlaneAspect / uImageAspect;
                        if (uImageAspect > uPlaneAspect) {
                            uv.x = uv.x * ratio + (1.0 - ratio) * 0.5;
                        } else {
                            uv.y = uv.y / ratio + (1.0 - 1.0/ratio) * 0.5;
                        }

                        vec4 color = texture2D(uTexture, uv);
                        gl_FragColor = vec4(color.rgb, color.a * uOpacity);
                    }
                `
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.userData = { xOffset: service.xOffset, serviceIndex: index };
            scene.add(mesh);
            this.planes.push(mesh);
        });

        this.layoutPlanes();
        this.initBackground(scene);
        this.bindPointerEvents();
    }

    private initBackground(scene: THREE.Scene): void {
        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            depthWrite: false,
            depthTest: false,
            uniforms: {
                uBackgroundColor: { value: new THREE.Color("#F4F9FB") },
                uBlob1Color: { value: new THREE.Color("#D1E8F2") },
                uBlob2Color: { value: new THREE.Color("#E0F2F1") },
                uTime: { value: 0 },
                uVelocityIntensity: { value: 0 },
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                uNoiseStrength: { value: 0.02 },
                uBlobRadius: { value: 0.75 },
                uBlobRadiusSecondary: { value: 0.8 },
                uBlobStrength: { value: 0.5 },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4(position, 1.0); // Full screen quad
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                uniform vec3 uBackgroundColor;
                uniform vec3 uBlob1Color;
                uniform vec3 uBlob2Color;
                uniform float uTime;
                uniform float uVelocityIntensity;
                uniform float uNoiseStrength;
                uniform float uBlobRadius;
                uniform float uBlobRadiusSecondary;
                uniform float uBlobStrength;
                
                float random(vec2 coord) {
                    return fract(sin(dot(coord, vec2(12.9898, 78.233))) * 43758.5453123);
                }
                
                void main() {
                    vec3 color = uBackgroundColor;
                    float animTime = uTime * 0.00028;
                    
                    vec2 blob1Center = vec2(
                        0.50 + sin(animTime * 1.000) * 0.13 + sin(animTime * 1.618) * 0.05,
                        0.48 + cos(animTime * 0.794) * 0.09 + cos(animTime * 1.272) * 0.03
                    );
                    vec2 blob2Center = vec2(
                        0.35 + cos(animTime * 0.927) * 0.11 + cos(animTime * 1.414) * 0.04,
                        0.55 + sin(animTime * 1.175) * 0.07 + sin(animTime * 0.618) * 0.03
                    );
                    
                    float blob1 = smoothstep(uBlobRadius, 0.0, distance(vUv, blob1Center));
                    float blob2 = smoothstep(uBlobRadiusSecondary, 0.0, distance(vUv, blob2Center));
                    
                    // Soften blob colors toward background before applying
                    vec3 blob1SoftColor = mix(uBlob1Color, uBackgroundColor, 0.35);
                    vec3 blob2SoftColor = mix(uBlob2Color, uBackgroundColor, 0.35);
                    
                    color = mix(color, blob1SoftColor, blob1 * uBlobStrength);
                    color = mix(color, blob2SoftColor, blob2 * uBlobStrength);
                    
                    // Velocity luminance lift
                    color += uVelocityIntensity * 0.10;
                    
                    // Film grain
                    float grain = random(vUv * vec2(1387.13, 947.91)) - 0.5;
                    color += grain * uNoiseStrength;
                    color = clamp(color, 0.0, 1.0);

                    // Edge Blending (Top & Bottom white fade) - Behind the images
                    float topFade = smoothstep(1.0, 0.70, vUv.y);
                    float bottomFade = smoothstep(0.0, 0.25, vUv.y);
                    color = mix(vec3(1.0), color, topFade * bottomFade);
                    
                    gl_FragColor = vec4(color, 1.0);
                }
            `
        });

        this.backgroundMesh = new THREE.Mesh(geometry, material);
        this.backgroundMesh.renderOrder = -100; // Keep it deep in the background
        scene.add(this.backgroundMesh);
    }

    layoutPlanes(): void {
        const viewDist = 6.0; // Standard viewing distance for uniform scale
        const cameraY = 0.3; 
        const vFov = 45; 

        // Fixed bounds based on standard distance so all images are identical size
        const visibleHeight = 2 * Math.tan((vFov / 2) * (Math.PI / 180)) * viewDist;
        const visibleWidth = visibleHeight * (window.innerWidth / window.innerHeight);

        // Set size to massive squares (slightly reduced for better fit)
        const pHeight = visibleHeight * 0.55; 
        const pWidth = pHeight * 1.15; // Increased width for cinematic feel

        this.planes.forEach((plane, index) => {
            const zPos = -index * this.planeGap;
            
            // Re-introduce the alternating offset, but keep it tight to the center
            // so the camera still passes *through* it, filling the screen
            const isRightSide = index % 2 !== 0;
            const xDir = isRightSide ? 1 : -1;
            
            // X: Slight absolute offset (like Codrops' x: 0.8 / -0.9)
            const xPos = xDir * 0.9;
            // Y: Shifted down slightly to avoid the "Quality Servicing Opportunity" heading
            const yPos = cameraY - 0.4;

            plane.position.set(xPos, yPos, zPos);
            plane.scale.set(pWidth, pHeight, 1);
            
            plane.rotation.y = 0;

            plane.userData.baseScale = new THREE.Vector2(pWidth, pHeight);
            plane.userData.basePosition = new THREE.Vector3(xPos, yPos, zPos);
            
            // Update shader aspect ratio
            const mat = plane.material as THREE.ShaderMaterial;
            mat.uniforms.uPlaneAspect.value = pWidth / pHeight;
        });

        // ─── Setup Curve for Continuous Drawing Trail ───
        const points: THREE.Vector3[] = [];

        this.planes.forEach((plane, index) => {
            const isRightSide = index % 2 !== 0;
            const xDir = isRightSide ? 1 : -1;
            
            // Connect to the inner edge of each image, but pushed physically BEHIND the image
            const innerEdgeX = plane.userData.basePosition.x - (xDir * pWidth * 0.35);
            const yOffset = -pHeight * 0.15; 
            const behindZ = plane.userData.basePosition.z - 0.5; // -0.5 pushes it safely behind the image plane
            
            points.push(new THREE.Vector3(innerEdgeX, plane.userData.basePosition.y + yOffset, behindZ));
            
            // Mid-point swoop: wider 'S' curve between images
            if (index < this.planes.length - 1) {
                const midZ = plane.userData.basePosition.z - this.planeGap / 2;
                // Reduced from 2.8 to 1.8 so it bends beautifully but stays visible on the screen
                points.push(new THREE.Vector3(xDir * 1.8, cameraY - visibleHeight * 0.25, midZ)); 
            }
        });

        if (points.length > 2 && this.scene) {
            // Remove old trail if resizing
            if (this.trailMesh) {
                this.trailMesh.geometry.dispose();
                (this.trailMesh.material as THREE.Material).dispose();
                this.scene.remove(this.trailMesh);
            }

            this.trailCurve = new THREE.CatmullRomCurve3(points);
            this.trailCurve.tension = 0.4; // Lower tension creates much looser, natural bends
            
            // Slightly thicker tube for better visibility as requested
            const tubeGeo = new THREE.TubeGeometry(this.trailCurve, 250, 0.007, 8, false);
            const tubeMat = new THREE.ShaderMaterial({
                transparent: true,
                depthWrite: false,
                side: THREE.DoubleSide,
                uniforms: {
                    uProgress: { value: 0.0 },
                    uColor: { value: new THREE.Color("#1E3A8A") } // Rich Navy Blue (more saturated so it reads as blue when transparent)
                },
                vertexShader: `
                    varying vec2 vUv;
                    void main() {
                        vUv = uv; // uv.x goes from 0 to 1 along the tube length
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform float uProgress;
                    uniform vec3 uColor;
                    varying vec2 vUv;
                    
                    void main() {
                        // "Undraw" the line beyond the current scroll progress
                        if (vUv.x > uProgress) {
                            discard;
                        }
                        
                        // Soft edge at the tip
                        float alpha = smoothstep(uProgress + 0.005, uProgress - 0.02, vUv.x);
                        // Fade at the very start so it blends naturally with the first image
                        alpha *= smoothstep(0.0, 0.02, vUv.x);
                        
                        // Increased opacity to 45% so it's clearly visible while remaining elegant
                        gl_FragColor = vec4(uColor, alpha * 0.45); 
                    }
                `
            });

            this.trailMesh = new THREE.Mesh(tubeGeo, tubeMat);
            this.scene.add(this.trailMesh);
        }
    }

    private applyScale(plane: THREE.Mesh): void {
        // Handled directly in layoutPlanes now
    }

    private isMobile(): boolean {
        return window.innerWidth <= this.mobileBreakpoint;
    }

    onResize(): void {
        this.layoutPlanes();
        if (this.backgroundMesh) {
            (this.backgroundMesh.material as THREE.ShaderMaterial).uniforms.uResolution.value.set(
                window.innerWidth,
                window.innerHeight
            );
        }
    }

    getDepthRange(): { nearestZ: number; deepestZ: number } {
        if (!this.planes.length) return { nearestZ: 0, deepestZ: 0 };
        const zs = this.planes.map((p) => p.position.z);
        return { nearestZ: Math.max(...zs), deepestZ: Math.min(...zs) };
    }

    getPlaneBlendData(cameraZ: number): PlaneBlendData | null {
        if (!this.planes.length) return null;
        const gap = Math.max(this.planeGap, 0.0001);
        const firstZ = this.planes[0].position.z;
        const normalised = THREE.MathUtils.clamp((firstZ - (cameraZ - gap * this.fadeSampleOffset)) / gap, 0, this.planes.length - 1);
        const currentPlaneIndex = Math.floor(normalised);
        const nextPlaneIndex = Math.min(currentPlaneIndex + 1, this.planes.length - 1);
        return { currentPlaneIndex, nextPlaneIndex, blend: normalised - currentPlaneIndex };
    }

    getMoodBlendData(cameraZ: number): MoodBlendData | null {
        if (!this.planes.length) return null;
        const gap = Math.max(this.planeGap, 0.0001);
        const firstZ = this.planes[0].position.z;
        
        // Sample mood significantly ahead of camera so color is ready before text reveals
        const moodSampleZ = cameraZ - gap * 0.7; 
        const normalised = THREE.MathUtils.clamp((firstZ - moodSampleZ) / gap, 0, this.planes.length - 1);
        const currentIdx = Math.floor(normalised);
        const nextIdx = Math.min(currentIdx + 1, this.planes.length - 1);
        const blend = normalised - currentIdx;

        return {
            currentIndex: currentIdx,
            nextIndex:    nextIdx,
            currentColor: servicesData[currentIdx].moodColor,
            nextColor:    servicesData[nextIdx].moodColor,
            currentBlob1Color: servicesData[currentIdx].blob1Color,
            nextBlob1Color:    servicesData[nextIdx].blob1Color,
            currentBlob2Color: servicesData[currentIdx].blob2Color,
            nextBlob2Color:    servicesData[nextIdx].blob2Color,
            blend,
        };
    }

    update(camera: THREE.PerspectiveCamera, scroll: { velocity: number; velocityMax: number, progress?: number } | null): void {
        this.updateFade(camera.position.z);
        this.updateMotion(scroll);
        this.updateBackground(camera, scroll);
        this.fireActiveIndexCallback();

        // ─── Update Continuous Drawing Trail ───
        if (this.trailMesh && scroll?.progress !== undefined) {
            // Add a slight lead to the progress so the line stays ahead of the images fading in
            const smoothProgress = THREE.MathUtils.lerp(
                (this.trailMesh.material as THREE.ShaderMaterial).uniforms.uProgress.value,
                Math.min(1.0, scroll.progress + 0.05),
                0.1
            );
            (this.trailMesh.material as THREE.ShaderMaterial).uniforms.uProgress.value = smoothProgress;
        }
    }

    private updateFade(cameraZ: number): void {
        const blend = this.getPlaneBlendData(cameraZ);
        if (!blend) return;
        const { currentPlaneIndex, nextPlaneIndex, blend: t } = blend;

        this.planes.forEach((plane, index) => {
            let target = 0;
            if (index === currentPlaneIndex) {
                // Gracefully reduce opacity as it exits full screen!
                target = 1 - t; 
            }
            if (index === nextPlaneIndex) target = Math.max(target, t);

            const mat = plane.material as THREE.ShaderMaterial;
            mat.uniforms.uOpacity.value = THREE.MathUtils.lerp(mat.uniforms.uOpacity.value, target, this.fadeSmoothing);
        });
    }

    private updateBackground(camera: THREE.PerspectiveCamera, scroll: { velocity: number; velocityMax: number } | null): void {
        if (!this.backgroundMesh) return;
        const mood = this.getMoodBlendData(camera.position.z);
        const mat = this.backgroundMesh.material as THREE.ShaderMaterial;

        if (mood) {
            const colorA = new THREE.Color(mood.currentColor);
            const colorB = new THREE.Color(mood.nextColor);
            mat.uniforms.uBackgroundColor.value.copy(colorA).lerp(colorB, mood.blend);

            const b1A = new THREE.Color(mood.currentBlob1Color);
            const b1B = new THREE.Color(mood.nextBlob1Color);
            mat.uniforms.uBlob1Color.value.copy(b1A).lerp(b1B, mood.blend);

            const b2A = new THREE.Color(mood.currentBlob2Color);
            const b2B = new THREE.Color(mood.nextBlob2Color);
            mat.uniforms.uBlob2Color.value.copy(b2A).lerp(b2B, mood.blend);
        }

        mat.uniforms.uTime.value = performance.now();
        const vMax = Math.max(scroll?.velocityMax ?? 1, 0.0001);
        const vNorm = THREE.MathUtils.clamp(Math.abs(scroll?.velocity ?? 0) / vMax, 0, 1);
        mat.uniforms.uVelocityIntensity.value = THREE.MathUtils.lerp(mat.uniforms.uVelocityIntensity.value || 0, vNorm, 0.1);
    }

    private updateMotion(scroll: { velocity: number; velocityMax: number } | null): void {
        this.pointerCurrent.lerp(this.pointerTarget, this.parallaxSmoothing);
        const vMax = Math.max(scroll?.velocityMax ?? 1, 0.0001);
        const vNorm = THREE.MathUtils.clamp(Math.abs(scroll?.velocity ?? 0) / vMax, 0, 1);
        const vSign = THREE.MathUtils.clamp((scroll?.velocity ?? 0) / vMax, -1, 1);

        this.breathIntensity = THREE.MathUtils.lerp(this.breathIntensity, THREE.MathUtils.clamp(vNorm * this.breathGain, 0, 1), this.breathSmoothing);
        this.driftCurrent = THREE.MathUtils.lerp(this.driftCurrent, vSign, this.gestureSmoothing);

        this.planes.forEach((plane, i) => {
            const mat = plane.material as THREE.ShaderMaterial;
            const opacity = mat.uniforms.uOpacity.value;
            const parallaxInfluence = opacity * (1 + plane.userData.serviceIndex * 0.05);

            const basePos = plane.userData.basePosition;
            const baseScale = plane.userData.baseScale;

            // X and Y drift while maintaining corner feeling
            plane.position.x = basePos.x + this.pointerCurrent.x * this.parallaxAmountX * parallaxInfluence;
            plane.position.y = basePos.y + this.pointerCurrent.y * this.parallaxAmountY * parallaxInfluence + this.driftCurrent * this.gestureAmountY;

            const breathInfluence = this.breathIntensity * opacity;
            plane.rotation.x = -this.pointerCurrent.y * this.breathTiltAmount * breathInfluence;
            plane.rotation.y = this.pointerCurrent.x * this.breathTiltAmount * breathInfluence;

            const pulse = 1 + this.breathScaleAmount * breathInfluence;
            plane.scale.set(baseScale.x * pulse, baseScale.y * pulse, 1);
        });
    }

    private fireActiveIndexCallback(): void {
        if (!this.onActiveIndexChange) return;
        let mostVisible = 0;
        let maxOpacity = -1;
        this.planes.forEach((plane, i) => {
            const op = (plane.material as THREE.ShaderMaterial).uniforms.uOpacity.value;
            if (op > maxOpacity) { maxOpacity = op; mostVisible = i; }
        });
        if (mostVisible !== this.lastActiveIndex) {
            this.lastActiveIndex = mostVisible;
            this.onActiveIndexChange(mostVisible);
        }
    }

    private bindPointerEvents(): void {
        window.addEventListener("pointermove", this.onPointerMove, { passive: true });
        window.addEventListener("pointerleave", this.onPointerLeave, { passive: true });
    }

    dispose(): void {
        window.removeEventListener("pointermove", this.onPointerMove);
        window.removeEventListener("pointerleave", this.onPointerLeave);
        this.planes.forEach(p => {
            if (p.material) (p.material as THREE.Material).dispose();
            if (p.geometry) p.geometry.dispose();
        });
        this.bgPlanes.forEach(p => {
            if (p.material) (p.material as THREE.Material).dispose();
            if (p.geometry) p.geometry.dispose();
        });
        if (this.trailMesh) {
            this.trailMesh.geometry.dispose();
            (this.trailMesh.material as THREE.Material).dispose();
            if (this.scene) this.scene.remove(this.trailMesh);
            this.trailMesh = null;
        }
        
        this.planes = [];
        this.bgPlanes = [];
    }
}