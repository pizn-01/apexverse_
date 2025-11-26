import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useInView } from "framer-motion";

interface PortfolioItemProps {
  lineArt: string;
  fullArt: string;
  title: string;
  category: string;
  onImageClick: (src: string) => void;
}

export default function PortfolioItem({
  lineArt,
  fullArt,
  title,
  category,
  onImageClick,
}: PortfolioItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.6 });
  const [shouldShowFull, setShouldShowFull] = useState(false);

  // Combine hover and inView states to determine which image to show
  useEffect(() => {
    if (isHovered || isInView) {
      const timer = setTimeout(() => {
        setShouldShowFull(true);
      }, 100); // Small delay for smoother transition
      return () => clearTimeout(timer);
    } else {
      setShouldShowFull(false);
    }
  }, [isHovered, isInView]);

  return (
    <Card
      ref={ref}
      className="group overflow-hidden cursor-pointer hover-elevate transition-all relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onImageClick(shouldShowFull ? fullArt : lineArt)}
      data-testid={`portfolio-item-${title}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <AnimatePresence initial={false}>
          <motion.img
            key={shouldShowFull ? "full" : "line"}
            src={shouldShowFull ? fullArt : lineArt}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              scale: isHovered ? 1.05 : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 0.5 },
              scale: { duration: 0.3 }
            }}
          />
        </AnimatePresence>

        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-white font-semibold text-lg mb-1">{title}</p>
            <p className="text-white/80 text-sm">{category}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}