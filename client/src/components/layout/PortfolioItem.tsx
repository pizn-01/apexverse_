import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SplitRevealImage } from "@/components/ui/SplitRevealImage";

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

  return (
    <Card
      className="group overflow-hidden cursor-pointer hover-elevate transition-all relative border-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onImageClick(fullArt)}
      data-testid={`portfolio-item-${title}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <SplitRevealImage
          imageSrc={fullArt}
          lineArtSrc={lineArt}
          alt={title}
          className="w-full h-full"
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${isHovered ? "opacity-100" : "opacity-0"
            }`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white font-semibold text-lg mb-1">{title}</p>
            <p className="text-white/80 text-sm">{category}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}