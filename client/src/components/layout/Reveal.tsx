import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

type RevealProps = PropsWithChildren<{
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  stagger?: number;
  y?: number;
  once?: boolean;
  className?: string;
}>;

export function RevealGroup({ children, delay = 0, stagger = 0.08, once = true, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={{
        hidden: { opacity: 1 },
        show: { opacity: 1, transition: { delayChildren: delay, staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, y = 24, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
    >
      {children}
    </motion.div>
  );
}


