/**
 * Shared Lenis singleton.
 *
 * Any component can call getLenis() to access the instance
 * and pause / resume smooth scrolling — e.g. during modal opens
 * or heavy animation sequences.
 *
 * Usage:
 *   import { getLenis } from "@/lib/lenis";
 *   getLenis()?.stop();   // pause page scroll
 *   getLenis()?.start();  // resume page scroll
 */

import Lenis from "lenis";

let instance: Lenis | null = null;

export function createLenis(): Lenis {
    if (instance) return instance;

    instance = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    });

    return instance;
}

export function getLenis(): Lenis | null {
    return instance;
}

export function destroyLenis(): void {
    instance?.destroy();
    instance = null;
}