import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { PortfolioItem, InsertPortfolioItem } from "@shared/schema";

const API_URL = "/api/portfolio";

// Fetch all portfolio items
export function usePortfolioItems() {
    return useQuery<PortfolioItem[]>({
        queryKey: ["portfolio"],
        queryFn: async () => {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error("Failed to fetch portfolio items");
            }
            return response.json();
        },
    });
}

// Create a new portfolio item
export function useCreatePortfolioItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (item: InsertPortfolioItem) => {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to create portfolio item");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["portfolio"] });
        },
    });
}

// Delete a portfolio item
export function useDeletePortfolioItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete portfolio item");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["portfolio"] });
        },
    });
}
