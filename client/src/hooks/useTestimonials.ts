import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Testimonial, InsertTestimonial } from "@shared/schema";
import { getApiUrl } from "@/lib/api-config";

// Fetch all testimonials
export function useTestimonials() {
    return useQuery<Testimonial[]>({
        queryKey: ["testimonials"],
        queryFn: async () => {
            const response = await fetch(getApiUrl("/api/testimonials"));
            if (!response.ok) {
                throw new Error("Failed to fetch testimonials");
            }
            return response.json();
        },
    });
}

// Create a new testimonial
export function useCreateTestimonial() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (testimonial: InsertTestimonial) => {
            const response = await fetch(getApiUrl("/api/testimonials"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(testimonial),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to create testimonial");
            }

            return response.json();
        },
        onSuccess: () => {
            // Invalidate and refetch testimonials after creating
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
        },
    });
}

// Delete a testimonial
export function useDeleteTestimonial() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(getApiUrl(`/api/testimonials/${id}`), {
                method: "DELETE",
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to delete testimonial");
            }

            return response.json();
        },
        onSuccess: () => {
            // Invalidate and refetch testimonials after deleting
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
        },
    });
}

// Extract content from X (Twitter) post
export async function extractXContent(url: string) {
    const response = await fetch(getApiUrl("/api/testimonials/extract-x"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to extract content");
    }

    return response.json();
}

// Extract content from Instagram post
export async function extractInstagramContent(url: string) {
    const response = await fetch(getApiUrl("/api/testimonials/extract-instagram"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to extract content");
    }

    return response.json();
}
