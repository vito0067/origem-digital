import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
};

export default function NeonButton({
  href,
  children,
  variant = "primary",
  external = false,
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm font-semibold tracking-wide transition-transform duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-neon";

  const styles =
    variant === "primary"
      ? "bg-cyan-neon text-abyss animate-pulse-glow"
      : "border border-white/15 bg-white/[0.05] text-white backdrop-blur-xl shadow-glass hover:border-violet-neon/60 hover:shadow-neon-violet";

  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link href={href} className={`${base} ${styles}`} {...externalProps}>
      {children}
    </Link>
  );
}
