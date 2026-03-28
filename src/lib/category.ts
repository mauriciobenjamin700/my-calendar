import type { Category } from "@/core/types";

const FALLBACK_COLOR = "var(--color-primary)";

/**
 * Build a Map of category ID to color for O(1) lookups.
 *
 * @param categories - Array of categories.
 * @returns Map from category ID to hex color string.
 */
export function buildCategoryColorMap(
    categories: Category[],
): Map<string, string> {
    const map = new Map<string, string>();

    for (const cat of categories) {
        map.set(cat.id, cat.color);
    }

    return map;
}

/**
 * Get the color for a category ID from a pre-built map.
 *
 * @param map - Category color map.
 * @param categoryId - The category ID (null returns fallback).
 * @returns Hex color string or CSS variable fallback.
 */
export function getCategoryColor(
    map: Map<string, string>,
    categoryId: string | null,
): string {
    if (!categoryId) {
        return FALLBACK_COLOR;
    }

    return map.get(categoryId) ?? FALLBACK_COLOR;
}
