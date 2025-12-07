import { motion } from "framer-motion";
import { Instagram, ExternalLink, Quote } from "lucide-react";
import { XIcon } from "@/components/icons/XIcon";
import type { Testimonial } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
    testimonial: Testimonial;
    index: number;
}

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
        >
            <Card className="h-full flex flex-col hover-elevate transition-all duration-300 border-card-border">
                <CardContent className="p-6 flex flex-col h-full">
                    {/* Quote Icon */}
                    <div className="mb-4">
                        <Quote className="w-8 h-8 text-primary/20 dark:text-primary/40" />
                    </div>

                    {/* Testimonial Content */}
                    <div className="flex-1 mb-6">
                        <p className="font-['Poppins'] text-base leading-relaxed text-foreground dark:text-gray-100 line-clamp-6">
                            "{testimonial.content}"
                        </p>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                        {testimonial.imageUrl ? (
                            <img
                                src={testimonial.imageUrl}
                                alt={testimonial.authorName}
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/40 dark:to-secondary/40 flex items-center justify-center ring-2 ring-border">
                                <span className="font-['Cinzel'] font-bold text-lg text-foreground dark:text-gray-100">
                                    {testimonial.authorName.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}

                        <div className="flex-1 min-w-0">
                            <h3 className="font-['Cinzel'] font-semibold text-foreground dark:text-gray-100 truncate">
                                {testimonial.authorName}
                            </h3>
                            {testimonial.authorHandle && (
                                <p className="font-['Poppins'] text-sm text-muted-foreground dark:text-gray-400 truncate">
                                    {testimonial.authorHandle}
                                </p>
                            )}
                        </div>

                        {/* Platform Badge & Link */}
                        <div className="flex items-center gap-2">
                            <a
                                href={testimonial.postUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-md hover:bg-muted transition-colors group"
                                aria-label="View original post"
                            >
                                {testimonial.platform === "instagram" ? (
                                    <Instagram className="w-5 h-5 text-pink-600 dark:text-pink-300 group-hover:scale-110 transition-transform" />
                                ) : (
                                    <XIcon className="w-4 h-4 text-foreground dark:text-gray-100 group-hover:scale-110 transition-transform" />
                                )}
                            </a>
                            <a
                                href={testimonial.postUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-md hover:bg-muted transition-colors"
                                aria-label="Open in new tab"
                            >
                                <ExternalLink className="w-4 h-4 text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200 transition-colors" />
                            </a>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
