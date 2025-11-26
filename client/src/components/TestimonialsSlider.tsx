import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useTestimonials } from "@/hooks/useTestimonials";
import TestimonialCard from "./TestimonialCard";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

export default function TestimonialsSlider() {
    const { data: testimonials, isLoading } = useTestimonials();
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 1,
    });

    // Auto-play functionality
    useEffect(() => {
        if (!emblaApi) return;

        const autoplay = setInterval(() => {
            emblaApi.scrollNext();
        }, 5000); // Auto-scroll every 5 seconds

        return () => clearInterval(autoplay);
    }, [emblaApi]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    // Don't render if no testimonials
    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    if (isLoading) {
        return (
            <section className="w-full py-16 md:py-24 bg-background">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-center items-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full py-16 md:py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="font-serif font-bold text-4xl md:text-5xl mb-4 text-foreground dark:text-gray-100">
                        What Our Clients Say
                    </h2>
                    <p className="font-['Poppins'] text-lg text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
                        Real testimonials from our satisfied clients on social media
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-6">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={testimonial.id}
                                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                                >
                                    <TestimonialCard testimonial={testimonial} index={index} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    {testimonials.length > 3 && (
                        <>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={scrollPrev}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 hidden md:flex bg-card border-card-border shadow-lg hover:bg-muted dark:bg-card dark:border-card-border dark:hover:bg-muted"
                                aria-label="Previous testimonials"
                            >
                                <ChevronLeft className="w-5 h-5 text-foreground dark:text-gray-200" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={scrollNext}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 hidden md:flex bg-card border-card-border shadow-lg hover:bg-muted dark:bg-card dark:border-card-border dark:hover:bg-muted"
                                aria-label="Next testimonials"
                            >
                                <ChevronRight className="w-5 h-5 text-foreground dark:text-gray-200" />
                            </Button>
                        </>
                    )}
                </div>

                {/* Dots Indicator */}
                {testimonials.length > 3 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => emblaApi?.scrollTo(index * 3)}
                                className="w-2 h-2 rounded-full bg-muted hover:bg-muted-foreground/50 dark:bg-muted dark:hover:bg-muted-foreground/50 transition-colors"
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
