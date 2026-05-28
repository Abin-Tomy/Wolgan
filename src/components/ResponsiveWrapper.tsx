import React from "react";

interface ResponsiveWrapperProps {
  desktop: React.ReactNode;
  mobile: React.ReactNode;
}

export function ResponsiveWrapper({ desktop, mobile }: ResponsiveWrapperProps) {
  return (
    <>
      {/* Desktop view: hidden on mobile (< 1024px), shown on desktop (>= 1024px) */}
      <div className="hidden lg:block w-full h-full">
        {desktop}
      </div>
      
      {/* Mobile view: shown on mobile (< 1024px), hidden on desktop (>= 1024px) */}
      <div className="block lg:hidden w-full h-full">
        {mobile}
      </div>
    </>
  );
}
