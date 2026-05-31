import React from "react";

interface ResponsiveWrapperProps {
  desktop: React.ReactNode;
  tablet?: React.ReactNode;
  mobile: React.ReactNode;
}

export function ResponsiveWrapper({ desktop, tablet, mobile }: ResponsiveWrapperProps) {
  return (
    <>
      {/* Desktop view: shown on desktop (>= 1024px) */}
      <div className="hidden lg:block w-full h-full">
        {desktop}
      </div>
      
      {/* Tablet view: shown on tablet (>= 768px and < 1024px) */}
      {tablet ? (
        <div className="hidden md:block lg:hidden w-full h-full">
          {tablet}
        </div>
      ) : null}
      
      {/* Mobile view: shown on mobile (< 768px, or < 1024px if no tablet view) */}
      <div className={`block ${tablet ? 'md:hidden' : 'lg:hidden'} w-full h-full`}>
        {mobile}
      </div>
    </>
  );
}
