import { useQuery } from "@tanstack/react-query";
import type { Category } from "@/core/types";
import { categoryService } from "@/services";

/**
 * Query all categories.
 *
 * @returns TanStack Query result with categories array.
 */
export function useCategories() {
    return useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: () => categoryService.getAll(),
    });
}
