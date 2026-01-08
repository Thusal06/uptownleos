"use client";

import { ReactLenis as Lenis } from "@studio-freight/react-lenis";
import { ComponentProps } from "react";

export function ReactLenis({ children, ...props }: ComponentProps<typeof Lenis>) {
  return (
    <Lenis {...props}>
      {children}
    </Lenis>
  );
}
