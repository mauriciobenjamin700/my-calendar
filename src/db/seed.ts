import type { Category, SyncStatus } from "@/core/types";
import { db } from "./schema";

interface SeedCategory {
    id: string;
    name: string;
    color: string;
    icon: string;
    order: number;
}

const SEED_DATA: SeedCategory[] = [
    {
        id: "cat-work",
        name: "Work",
        color: "#3B82F6",
        icon: "briefcase",
        order: 0,
    },
    {
        id: "cat-personal",
        name: "Personal",
        color: "#8B5CF6",
        icon: "user",
        order: 1,
    },
    {
        id: "cat-health",
        name: "Health",
        color: "#10B981",
        icon: "heart-pulse",
        order: 2,
    },
    {
        id: "cat-finance",
        name: "Finance",
        color: "#F59E0B",
        icon: "wallet",
        order: 3,
    },
    {
        id: "cat-study",
        name: "Study",
        color: "#06B6D4",
        icon: "book-open",
        order: 4,
    },
];

/**
 * Seed default categories if the categories table is empty.
 *
 * Should be called once on app initialization.
 */
export async function seedDefaultCategories(): Promise<void> {
    const count = await db.categories.count();

    if (count === 0) {
        const now = new Date().toISOString();
        const syncStatus: SyncStatus = "local";
        const categories: Category[] = SEED_DATA.map((seed) => ({
            ...seed,
            createdAt: now,
            updatedAt: now,
            syncStatus,
            remoteId: null,
        }));
        await db.categories.bulkAdd(categories);
    }
}
