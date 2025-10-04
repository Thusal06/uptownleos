import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
};

export function GlassCard({ children, className, as: Component = "div" }: GlassCardProps) {
  return (
    <Component
      className={cn(
        "glass-panel glass-hover relative overflow-hidden rounded-3xl border border-white/10",
        "bg-white/5 backdrop-blur-xl shadow-[0_30px_120px_rgba(37,99,235,0.25)]",
        "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25),transparent_55%)] before:opacity-50",
        "after:absolute after:inset-0 after:bg-[linear-gradient(135deg,rgba(148,163,184,0.03),rgba(148,163,184,0))]",
        "after:pointer-events-none before:pointer-events-none",
        "p-6 md:p-10", 
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
