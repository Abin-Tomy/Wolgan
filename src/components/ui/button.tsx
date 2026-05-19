import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "serviceDropdown"
  | "headerCta"
  | "heroServicesCta"
  | "heroContactCta"
  | "primaryBrand"
  | "mobileMenu"
  | "navLink"
  | "outline";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant?: ButtonVariant;
  href?: string;
  download?: string;
  target?: string;
  rel?: string;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  serviceDropdown:
    "flex items-center gap-1 text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-200",
  headerCta:
    "btn-fill-effect btn-fill-white hidden md:inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium tracking-wide border border-white/30 text-white transition-all duration-300 hover:text-[#0a1f3c] hover:scale-[1.02] active:scale-[0.98] shrink-0 group",
  heroServicesCta:
    "btn-fill-effect btn-fill-dark inline-flex h-14 items-center justify-center rounded-full border border-white/70 bg-white px-10 text-base font-medium text-[#0A1F3C] transition-all hover:text-white hover:scale-[1.02] active:scale-[0.98]",
  heroContactCta:
    "btn-fill-effect btn-fill-white inline-flex h-14 items-center justify-center rounded-full border border-white/70 px-10 text-base font-medium text-white transition-all hover:text-[#0A1F3C] hover:scale-[1.02] active:scale-[0.98]",
  primaryBrand:
    "btn-fill-effect btn-fill-dark px-8 py-3 rounded-full border border-[var(--brand-deep)] text-[var(--brand-deep)] text-sm font-semibold tracking-wide overflow-hidden group relative flex items-center gap-3",
  mobileMenu: "md:hidden text-white p-2",
  navLink:
    "flex items-center gap-3 px-5 py-3 text-sm text-white/75 hover:text-white hover:bg-white/5 transition-colors duration-150 group",
  outline:
    "inline-flex items-center justify-center border border-current transition-all duration-300",
};

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = "serviceDropdown",
      href,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseClassName = cn(variantStyles[variant], className);

    // If href is provided, render as an <a> tag
    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseClassName}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    // Otherwise render as a <button>
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={baseClassName}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonVariant, type ButtonProps };
