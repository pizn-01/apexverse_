import { useState } from "react";
import { Card } from "@/components/ui/card";
import AnimatedHero from "@/components/layout/AnimatedHero";
import { Badge } from "@/components/ui/badge";
import { RevealGroup, RevealItem } from "@/components/layout/Reveal";
import { X } from "lucide-react";
import PortfolioItem from "@/components/layout/PortfolioItem";

// Pair line art with corresponding full art
const portfolioItems = [
  {
    id: 1,
    lineArt: "/assets/portfolio/IMG_1Line_art.jpg",
    fullArt: "/assets/portfolio/IMG_1.jpg",
    category: "Character Art",
    title: "Character Scene 1"
  },
  {
    id: 2,
    lineArt: "/assets/portfolio/IMG_2Line_art.jpg",
    fullArt: "/assets/portfolio/IMG_2.jpg",
    category: "Character Art",
    title: "Character Scene 2"
  },
  {
    id: 3,
    lineArt: "/assets/portfolio/IMG_3Line_art.jpg",
    fullArt: "/assets/portfolio/IMG_3.jpg",
    category: "Character Art",
    title: "Character Scene 3"
  },
  {
    id: 4,
    lineArt: "/assets/portfolio/IMG_4Line_art.jpg",
    fullArt: "/assets/portfolio/IMG_4.jpg",
    category: "Character Art",
    title: "Character Scene 4"
  },
  {
    id: 5,
    lineArt: "/assets/portfolio/IMG_5Line_art.jpg",
    fullArt: "/assets/portfolio/IMG_5.jpg",
    category: "Character Art",
    title: "Character Scene 5"
  },
  {
    id: 6,
    lineArt: "/assets/portfolio/IMG_6Line_art.jpg",
    fullArt: "/assets/portfolio/IMG_6.jpg",
    category: "Character Art",
    title: "Character Scene 6"
  },
  {
    id: 7,
    lineArt: "/assets/portfolio/IMG_7Line_art.jpg",
    fullArt: "/assets/portfolio/IMG_7.jpg",
    category: "Character Art",
    title: "Character Scene 7"
  }
];

const categories = ["All", "Character Art"];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredItems = selectedCategory === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <AnimatedHero heightClass="h-80">
        <div className="max-w-4xl mx-auto px-6 text-center py-16">
          <h1 className="font-serif font-bold text-5xl md:text-6xl mb-4 text-white" data-testid="text-portfolio-title">
            Portfolio
          </h1>
          <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
            Take a peek at what we've worked on so far! Browse our collection of character art, book illustrations, and more.
          </p>
        </div>
      </AnimatedHero>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer px-6 py-2 text-sm hover-elevate active-elevate-2"
                onClick={() => setSelectedCategory(category)}
                data-testid={`filter-${category.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {category}
              </Badge>
            ))}
          </div>

          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <RevealItem key={item.id}>
                <PortfolioItem
                  lineArt={item.lineArt}
                  fullArt={item.fullArt}
                  title={item.title}
                  category={item.category}
                  onImageClick={(src) => setLightboxImage(src)}
                />
              </RevealItem>
            ))}
          </RevealGroup>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No items found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
          data-testid="lightbox"
        >
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
            data-testid="button-close-lightbox"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <img
            src={lightboxImage}
            alt="Portfolio item"
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
