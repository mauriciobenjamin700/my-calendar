import type { SyncStatus } from "./sync";

/** Represents a task category/label with color and icon. */
export interface Category {
    /** UUID v4 - primary key. */
    id: string;
    /** Category display name. */
    name: string;
    /** Hex color code (e.g., "#3B82F6"). */
    color: string;
    /** Lucide icon name. */
    icon: string;
    /** Sort order. */
    order: number;
    /** ISO 8601 datetime - when created. */
    createdAt: string;
    /** ISO 8601 datetime - last modification. */
    updatedAt: string;
    /** Sync metadata for future API integration. */
    syncStatus: SyncStatus;
    /** Server-side ID when synced (null while local-only). */
    remoteId: string | null;
}

/** Input type for creating a category. */
export type CategoryCreateInput = Omit<
    Category,
    "id" | "createdAt" | "updatedAt" | "syncStatus" | "remoteId"
>;

/** Input type for updating a category. */
export type CategoryUpdateInput = Partial<CategoryCreateInput>;
