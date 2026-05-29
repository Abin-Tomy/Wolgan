"use client";

import {
  createContext,
  useCallback,
  useContext,
} from "react";
import type { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { useCurtain } from "@/components/curtain/CurtainContext";

/* ─────────────────────────────────────────────────────────────
   CONTEXT
───────────────────────────────────────────────────────────── */
interface TransitionContextValue {
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
});

/* ─────────────────────────────────────────────────────────────
   PROVIDER
───────────────────────────────────────────────────────────── */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { close, open } = useCurtain();

  const navigate = useCallback(
    async (href: string) => {
      if (href === pathname) return;

      // 1. Slide curtain in (close — covers the screen)
      await close();

      // 2. Navigate — new page renders behind the curtain
      router.push(href);

      // 3. Brief pause so Next.js can swap the page content
      await new Promise<void>((res) => setTimeout(res, 80));

      // 4. Slide curtain away (open — reveals the new page)
      await open();
    },
    [close, open, router, pathname]
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
    </TransitionContext.Provider>
  );
}

/* ─────────────────────────────────────────────────────────────
   HOOK
───────────────────────────────────────────────────────────── */
export function usePageTransition(): TransitionContextValue {
  return useContext(TransitionContext);
}

/* ─────────────────────────────────────────────────────────────
   TRANSITION LINK
   Drop-in replacement for next/link <Link>
───────────────────────────────────────────────────────────── */
type TransitionLinkProps = ComponentPropsWithoutRef<typeof Link>;

export function TransitionLink({ href, onClick, children, ...rest }: TransitionLinkProps) {
  const { navigate } = usePageTransition();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Allow modifier keys to open in new tab / default behaviour
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      if (onClick) onClick(e);
      navigate(href.toString());
    },
    [navigate, href, onClick]
  );

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
