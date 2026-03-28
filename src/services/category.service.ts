import type {
    Category,
    CategoryCreateInput,
    CategoryUpdateInput,
} from "@/core/types";
import { db } from "@/db";
import { generateId } from "@/lib/id";

/** Service for category CRUD operations against IndexedDB. */
export const categoryService = {
    /**
     * Get all categories sorted by order.
     *
     * @returns Array of all categories.
     */
    async getAll(): Promise<Category[]> {
        return db.categories.orderBy("order").toArray();
    },

    /**
     * Get a single category by ID.
     *
     * @param id - Category UUID.
     * @returns The category or undefined if not found.
     */
    async getById(id: string): Promise<Category | undefined> {
        return db.categories.get(id);
    },

    /**
     * Create a new category.
     *
     * @param input - Category creation data.
     * @returns The created category.
     */
    async create(input: CategoryCreateInput): Promise<Category> {
        const now = new Date().toISOString();
        const category: Category = {
            ...input,
            id: generateId(),
            createdAt: now,
            updatedAt: now,
            syncStatus: "local",
            remoteId: null,
        };
        await db.categories.add(category);

        return category;
    },

    /**
     * Update an existing category.
     *
     * @param id - Category UUID.
     * @param input - Partial category data to update.
     * @returns The updated category.
     */
    async update(id: string, input: CategoryUpdateInput): Promise<Category> {
        const updates = {
            ...input,
            updatedAt: new Date().toISOString(),
            syncStatus: "modified" as const,
        };
        await db.categories.update(id, updates);
        const category = await db.categories.get(id);

        if (!category) {
            throw new Error(`Category not found: ${id}`);
        }

        return category;
    },

    /**
     * Delete a category by ID.
     *
     * @param id - Category UUID.
     */
    async delete(id: string): Promise<void> {
        await db.categories.delete(id);
    },
};
