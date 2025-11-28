import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SplitRevealImageProps {
    imageSrc: string;
    lineArtSrc: string;
    alt: string;
    className?: string;
}

export function SplitRevealImage({
    imageSrc,
    lineArtSrc,
    alt,
    className,
}: SplitRevealImageProps) {
    const [isRevealed, setIsRevealed] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mobile intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Brief delay before revealing on mobile
                        setTimeout(() => {
                            setIsRevealed(true);
                        }, 500);
                    } else {
                        setIsRevealed(false);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative w-full h-full overflow-hidden cursor-pointer group",
                className
            )}
            onMouseEnter={() => setIsRevealed(true)}
            onMouseLeave={() => setIsRevealed(false)}
        >
            {/* Base Layer - Line Art */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={lineArtSrc}
                    alt={`${alt} Line Art`}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Reveal Layer - Full Image */}
            <div
                className={cn(
                    "absolute inset-0 w-full h-full transition-all duration-700 ease-in-out",
                    isRevealed ? "clip-path-full" : "clip-path-half"
                )}
                style={{
                    clipPath: isRevealed
                        ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                        : "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
                }}
            >
                <img
                    src={imageSrc}
                    alt={alt}
                    className="w-full h-full object-cover"
                />

                {/* Vertical Divider Line */}
                {!isRevealed && (
                    <div className="absolute top-0 bottom-0 right-0 w-1 bg-primary shadow-lg z-10" />
                )}
            </div>
        </div>
    );
}
