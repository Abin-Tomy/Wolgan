import * as THREE from "three";
import type { Gallery } from "./Gallery";

/**
 * SCROLL
 *
 * Drives the 3D camera purely from a 0→1 scroll progress value
 * supplied each frame by ThreeServices (derived from window.scrollY /
 * the outer 500 vh wrapper height).
 *
 * There is NO Lenis stop/start here. Lenis keeps scrolling the page
 * freely at all times. This eliminates the stop/start deadlock that
 * caused the animation to freeze mid-scroll.
 *
 * updateFromProgress(p)  — called every RAF with current progress 0→1
 * update()               — called every RAF to lerp camera and compute velocity
 * jumpToIndex(i)         — called by dot-nav buttons
 */

export class Scroll {
    private camera: THREE.PerspectiveCamera;
    private gallery: Gallery;

    // Smoothed camera Z target
    private cameraZTarget = 0;
    private readonly cameraSmoothing = 0.08;
    private previousCameraZ = 0;

    // Velocity — exposed for Gallery breath / drift effects
    velocity = 0;
    velocityMax = 1.5;
    private readonly velocityDamping = 0.12;
    private readonly velocityStopThreshold = 0.0001;

    // Camera bounds (computed in init from Gallery layout)
    private minCameraZ = 0;
    private maxCameraZ = 6;
    private readonly firstPlaneViewOffset = 5;
    private readonly lastPlaneViewOffset = 5;

    constructor(camera: THREE.PerspectiveCamera, gallery: Gallery) {
        this.camera = camera;
        this.gallery = gallery;
    }

    init(): void {
        const { nearestZ, deepestZ } = this.gallery.getDepthRange();

        this.maxCameraZ = nearestZ + this.firstPlaneViewOffset;
        this.minCameraZ = deepestZ + this.lastPlaneViewOffset;

        if (this.minCameraZ > this.maxCameraZ) {
            this.minCameraZ = this.maxCameraZ;
        }

        this.camera.position.z = this.maxCameraZ;
        this.cameraZTarget     = this.maxCameraZ;
        this.previousCameraZ   = this.maxCameraZ;
        this.velocity          = 0;
    }

    /**
     * Called every frame by ThreeServices with the current scroll progress.
     *   progress 0 → camera at first image
     *   progress 1 → camera at last image
     */
    updateFromProgress(progress: number): void {
        const p = THREE.MathUtils.clamp(progress, 0, 1);
        this.cameraZTarget = THREE.MathUtils.lerp(
            this.maxCameraZ,
            this.minCameraZ,
            p
        );
    }

    /**
     * Called every frame after updateFromProgress().
     * Lerps camera toward target and recomputes velocity.
     */
    update(): void {
        const prevZ = this.camera.position.z;

        this.camera.position.z = THREE.MathUtils.lerp(
            this.camera.position.z,
            this.cameraZTarget,
            this.cameraSmoothing
        );

        // Velocity: positive when scrolling forward (camera Z decreasing)
        // Scaled so typical movement lands near velocityMax for strong breath effect
        const rawVelocity = (prevZ - this.camera.position.z) * 150;

        this.velocity = THREE.MathUtils.lerp(
            this.velocity,
            rawVelocity,
            this.velocityDamping
        );
        this.velocity = THREE.MathUtils.clamp(
            this.velocity,
            -this.velocityMax,
            this.velocityMax
        );
        if (Math.abs(this.velocity) < this.velocityStopThreshold) {
            this.velocity = 0;
        }

        this.previousCameraZ = prevZ;
    }

    /**
     * Instantly teleports the camera to a specific gallery plane.
     * Used by the dot-navigation buttons.
     */
    jumpToIndex(index: number): void {
        const targetZ = -(index * this.gallery.planeGap) + this.firstPlaneViewOffset;
        const clamped = THREE.MathUtils.clamp(targetZ, this.minCameraZ, this.maxCameraZ);
        this.cameraZTarget   = clamped;
        this.camera.position.z = clamped;
        this.previousCameraZ = clamped;
    }

    dispose(): void {
        // No event listeners to remove — none were added.
    }
}