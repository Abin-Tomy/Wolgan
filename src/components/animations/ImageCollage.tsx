import type { RefObject } from "react";
import Image from "next/image";

interface PortalMediaProps {
  imgWrapRef: RefObject<HTMLDivElement | null>;
  img2Ref: RefObject<HTMLDivElement | null>;
  img3Ref: RefObject<HTMLDivElement | null>;
  path1Ref: RefObject<SVGPathElement | null>;
  path2Ref: RefObject<SVGPathElement | null>;
  path3Ref: RefObject<SVGPathElement | null>;
  images: string[];
  serviceImages: string[];
}

export function ImageCollage({
  imgWrapRef,
  img2Ref,
  img3Ref,
  path1Ref,
  path2Ref,
  path3Ref,
  images,
  serviceImages
}: PortalMediaProps) {
  return (
    <>
      {/* ── Collage SVG Definitions ── */}
      <svg className="absolute w-0 h-0 overflow-hidden">
        <defs>
          <clipPath id="clipShard1" clipPathUnits="objectBoundingBox">
            <path ref={path1Ref} d="M 0 0 L 1 0 L 1 1 L 0 1 Z" />
          </clipPath>
          <clipPath id="clipShard2" clipPathUnits="objectBoundingBox">
            <path ref={path2Ref} d="M 0 0 L 1 0 L 1 1 L 0 1 Z" />
          </clipPath>
          <clipPath id="clipShard3" clipPathUnits="objectBoundingBox">
            <path ref={path3Ref} d="M 0 0 L 1 0 L 1 1 L 0 1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        ref={imgWrapRef}
        className="absolute overflow-hidden border-white/5"
        style={{
          inset: 0,
          width: "100%",
          height: "100%",
          clipPath: "url(#clipShard1)",
          zIndex: 10,
          outline: "1px solid rgba(10, 31, 60, 0.08)",
        }}
      >
        <Image src={images[0]} alt="About Image 1" className="about-img-0 h-full w-full object-cover" fill sizes="100vw" priority />
        <div className="absolute inset-0 bg-black/35 z-[1]" />
        <Image src={serviceImages[0]} alt="Service Image 1" className="service-img-0 h-full w-full object-cover opacity-0 z-[2]" fill sizes="100vw" />
      </div>

      <div
        ref={img2Ref}
        className="absolute overflow-hidden opacity-0 bg-white"
        style={{ clipPath: "url(#clipShard2)", zIndex: 9, outline: "1px solid rgba(10, 31, 60, 0.08)" }}
      >
        <Image src={images[1]} alt="About Image 2" className="about-img-1 h-full w-full object-cover" fill sizes="30vw" />
        <div className="absolute inset-0 bg-black/35 z-[1]" />
        <Image src={serviceImages[1]} alt="Service Image 2" className="service-img-1 h-full w-full object-cover opacity-0 z-[2]" fill sizes="30vw" />
      </div>

      <div
        ref={img3Ref}
        className="absolute overflow-hidden opacity-0 bg-white"
        style={{ clipPath: "url(#clipShard3)", zIndex: 8, outline: "1px solid rgba(10, 31, 60, 0.08)" }}
      >
        <Image src={images[2]} alt="About Image 3" className="about-img-2 h-full w-full object-cover" fill sizes="20vw" />
        <div className="absolute inset-0 bg-black/20 z-[1]" />
        <Image src={serviceImages[2]} alt="Service Image 3" className="service-img-2 h-full w-full object-cover opacity-0 z-[2]" fill sizes="20vw" />
      </div>
    </>
  );
}
