import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CategoryCreateInput, CategoryUpdateInput } from "@/core/types";
import { categoryService } from "@/services";

/**
 * Mutation hook for creating a category.
 *
 * @returns TanStack mutation for category creation.
 */
export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: CategoryCreateInput) =>
            categoryService.create(input),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
}

/**
 * Mutation hook for updating a category.
 *
 * @returns TanStack mutation for category update.
 */
export function useUpdateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            input,
        }: {
            id: string;
            input: CategoryUpdateInput;
        }) => categoryService.update(id, input),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
}

/**
 * Mutation hook for deleting a category.
 *
 * @returns TanStack mutation for category deletion.
 */
export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => categoryService.delete(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
}
