import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

type AnimatedHeroProps = PropsWithChildren<{
  heightClass?: string; // e.g., "min-h-[90vh]" or "h-72"
  overlayOpacity?: number; // 0..1
  center?: boolean;
}>;

export default function AnimatedHero({
  heightClass = "min-h-[90vh]",
  overlayOpacity = 0.9,
  center = true,
  children,
}: AnimatedHeroProps) {
  return (
    <section className={`relative ${heightClass} flex ${center ? "items-center justify-center" : "items-end"} overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary`}>
      <div className="absolute inset-0 bg-black/30" />

      {/* Primary animated color flow */}
      <motion.div
        className="absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]"
        style={{
          opacity: overlayOpacity,
          backgroundImage: [
            "radial-gradient(900px_400px_at_30%_10%,rgba(58,130,255,0.28),transparent)",
            "radial-gradient(1200px_900px_at_80%_100%,rgba(0,255,255,0.18),transparent)",
            "radial-gradient(1200px_600px_at_10%_80%,rgba(0,128,128,0.16),transparent)",
            "radial-gradient(1000px_500px_at_120%_120%,rgba(255,255,255,0.06),transparent)",
          ].join(", "),
          backgroundSize: "220% 220%",
          backgroundPosition: "0% 50%",
          mixBlendMode: "screen",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
      />

      {/* Diagonal shimmer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(60deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0) 60%)",
          backgroundSize: "200% 200%",
          mixBlendMode: "overlay",
        }}
        animate={{ backgroundPosition: ["-50% -50%", "150% 150%", "-50% -50%"] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Floating glows */}
      <motion.div
        className="absolute -top-40 -left-40 w-[60rem] h-[60rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.16), transparent)" }}
        animate={{ y: [0, 60, -20, 0], x: [0, 40, -30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-48 -right-48 w-[50rem] h-[50rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.12), transparent)" }}
        animate={{ y: [0, -40, 10, 0], x: [0, -30, 20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content - force white text so hero copy isn't affected by theme */}
      <div className="relative z-10 w-full text-white !text-white animated-hero-content" style={{ color: '#fff' }}>
        {children}
      </div>
    </section>
  );
}


