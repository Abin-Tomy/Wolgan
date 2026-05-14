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

export class Gallery {
    private planes: THREE.Mesh[] = [];
    private bgPlanes: THREE.Mesh[] = [];
    private textureLoader = new THREE.TextureLoader();
    private trailCurve: THREE.CatmullRomCurve3 | null = null;
    private trailMesh: THREE.Mesh | null = null;
    private scene: THREE.Scene | null = null;

    // Layout
    readonly planeGap = 5;
    private readonly planeScale = 1.1;
    private readonly mobileScale = 0.75;
    private readonly mobileBreakpoint = 768;

    // Fade
    private readonly fadeSampleOffset = 1;
    private readonly fadeSmoothing = 0.14;

    // Mouse parallax (Disabled for "stiff" look)
    private parallaxAmountX = 0;
    private parallaxAmountY = 0;
    private parallaxSmoothing = 0.08;
    private pointerTarget = new THREE.Vector2(0, 0);
    private pointerCurrent = new THREE.Vector2(0, 0);

    // Breath (Disabled for "stiff" look)
    private breathTiltAmount = 0;
    private breathScaleAmount = 0;
    private breathSmoothing = 0.12;
    private breathGain = 1.0;
    private breathIntensity = 0;

    // Gesture drift (Disabled for "stiff" look)
    private gestureAmountY = 0;
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

                        // Diagonal Mask Logic
                        float skew = 0.12;
                        float feather = 0.005;
                        
                        float yFactor = (uFlipSlant > 0.5) ? (1.0 - vUv.y) : vUv.y;
                        float mask = 1.0;
                        if (uSide < 0.5) {
                            // Left-aligned: diagonal on the Right
                            mask = smoothstep(1.0 - yFactor * skew, 1.0 - yFactor * skew - feather, vUv.x);
                            mask *= smoothstep(0.0, feather, vUv.x);
                        } else {
                            // Right-aligned: diagonal on the Left
                            mask = smoothstep(yFactor * skew, yFactor * skew + feather, vUv.x);
                            mask *= smoothstep(1.0, 1.0 - feather, vUv.x);
                        }

                        // Rounded corners (very subtle)
                        vec2 corner = abs(vUv - 0.5) - (0.5 - uRadius);
                        float cornerDist = length(max(corner, 0.0));
                        mask *= (1.0 - smoothstep(uRadius - 0.005, uRadius, cornerDist));

                        vec4 color = texture2D(uTexture, uv);
                        gl_FragColor = vec4(color.rgb, color.a * uOpacity * mask);
                    }
                `
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.userData = { xOffset: service.xOffset, serviceIndex: index };
            scene.add(mesh);
            this.planes.push(mesh);

            // Background "Echo" shape material
            const bgMaterial = new THREE.ShaderMaterial({
                transparent: true,
                depthWrite: false,
                side: THREE.DoubleSide,
                uniforms: {
                    uOpacity: { value: 0 },
                    uColor: { value: new THREE.Color("#0A1F3C") }, // Navy Blue for clean shadow
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
                    uniform float uOpacity;
                    uniform vec3 uColor;
                    uniform float uSide;
                    uniform float uFlipSlant;
                    uniform float uRadius;
                    varying vec2 vUv;

                    void main() {
                        float skew = 0.12;
                        float feather = 0.005;
                        float yFactor = (uFlipSlant > 0.5) ? (1.0 - vUv.y) : vUv.y;
                        float mask = 1.0;
                        if (uSide < 0.5) {
                            mask = smoothstep(1.0 - yFactor * skew, 1.0 - yFactor * skew - feather, vUv.x);
                            mask *= smoothstep(0.0, feather, vUv.x);
                        } else {
                            mask = smoothstep(yFactor * skew, yFactor * skew + feather, vUv.x);
                            mask *= smoothstep(1.0, 1.0 - feather, vUv.x);
                        }
                        vec2 corner = abs(vUv - 0.5) - (0.5 - uRadius);
                        float cornerDist = length(max(corner, 0.0));
                        mask *= (1.0 - smoothstep(uRadius - 0.005, uRadius, cornerDist));

                        gl_FragColor = vec4(uColor, uOpacity * mask);
                    }
                `
            });

            const bgPlane = new THREE.Mesh(geometry, bgMaterial);
            this.bgPlanes.push(bgPlane);
            scene.add(bgPlane);
        });

        this.layoutPlanes();
        this.bindPointerEvents();
    }

    layoutPlanes(): void {
        const viewDist = 6.0; // Standard viewing distance for uniform scale
        const cameraY = 0.3; 
        const vFov = 45; 

        // Fixed bounds based on standard distance so all images are identical size
        const visibleHeight = 2 * Math.tan((vFov / 2) * (Math.PI / 180)) * viewDist;
        const visibleWidth = visibleHeight * (window.innerWidth / window.innerHeight);

        // Set size: Increased to fill more of the bottom space while keeping uniformity
        const pHeight = visibleHeight * 0.52; // Taller than original 0.48
        const pWidth = visibleWidth * 0.46; // Reduced back to 46% so the text section has plenty of readable room!

        this.planes.forEach((plane, index) => {
            const zPos = -index * this.planeGap;
            
            // Position flush to side margins + Centered vertically
            const isRightSide = index % 2 !== 0;
            const xDir = isRightSide ? 1 : -1;
            
            // X: margin to margin
            const xPos = xDir * (visibleWidth / 2 - pWidth / 2);
            // Y: Lifted slightly up from previous iteration for perfect balance
            const yPos = cameraY - (visibleHeight * 0.10);

            plane.position.set(xPos, yPos, zPos);
            plane.scale.set(pWidth, pHeight, 1);
            
            // Stiff & Steady: No rotation, perfectly flat
            plane.rotation.y = 0;

            plane.userData.baseScale = new THREE.Vector2(pWidth, pHeight);
            plane.userData.basePosition = new THREE.Vector3(xPos, yPos, zPos);
            
            // Update shader aspect ratio
            const mat = plane.material as THREE.ShaderMaterial;
            mat.uniforms.uPlaneAspect.value = pWidth / pHeight;

            // Setup Background Plane
            const bgPlane = this.bgPlanes[index];
            if (bgPlane) {
                // Initialize right behind the main image
                bgPlane.position.set(xPos, yPos, zPos - 0.1);
                bgPlane.scale.set(pWidth, pHeight, 1);
                bgPlane.rotation.y = 0;
                
                // Base pos (hidden) and Target pos (revealed offset)
                bgPlane.userData.basePosition = new THREE.Vector3(xPos, yPos, zPos - 0.1);
                // Clean, elegant offset for a subtle drop shadow effect
                bgPlane.userData.targetOffset = new THREE.Vector3(-xDir * (visibleWidth * 0.03), -visibleHeight * 0.03, 0);
            }
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
            
            // Slightly thinner tube for an elegant line
            const tubeGeo = new THREE.TubeGeometry(this.trailCurve, 250, 0.005, 8, false);
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

    update(camera: THREE.PerspectiveCamera, scroll: { velocity: number; velocityMax: number, progress?: number } | null): void {
        this.updateFade(camera.position.z);
        this.updateMotion(scroll);
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
            if (index === currentPlaneIndex) target = 1 - t;
            if (index === nextPlaneIndex) target = Math.max(target, t);

            const mat = plane.material as THREE.ShaderMaterial;
            mat.uniforms.uOpacity.value = THREE.MathUtils.lerp(mat.uniforms.uOpacity.value, target, this.fadeSmoothing);
        });
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
            plane.rotation.y = 0;

            const pulse = 1 + this.breathScaleAmount * breathInfluence;
            plane.scale.set(baseScale.x * pulse, baseScale.y * pulse, 1);
            
            // Apply echo reveal animation to BG Plane
            const bgPlane = this.bgPlanes[i];
            if (bgPlane) {
                const bgMat = bgPlane.material as THREE.ShaderMaterial;
                // Fade in slightly less than main image
                bgMat.uniforms.uOpacity.value = opacity * 0.8;
                
                // Smoothly slide out from behind as opacity increases
                const bgBase = bgPlane.userData.basePosition as THREE.Vector3;
                const bgOffset = bgPlane.userData.targetOffset as THREE.Vector3;
                
                // Clean slide out
                const slideProgress = Math.pow(opacity, 1.2); 
                
                bgPlane.position.x = bgBase.x + (bgOffset.x * slideProgress);
                bgPlane.position.y = bgBase.y + (bgOffset.y * slideProgress);
                bgPlane.rotation.z = 0; // Removed rotation for a stable look
            }
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