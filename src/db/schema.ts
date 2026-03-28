import Dexie, { type EntityTable } from "dexie";
import type {
    Task,
    Category,
    ScheduledNotification,
    InAppNotification,
} from "@/core/types";

/** Application database backed by IndexedDB via Dexie. */
const db = new Dexie("MyCalendarDB") as Dexie & {
    tasks: EntityTable<Task, "id">;
    categories: EntityTable<Category, "id">;
    scheduledNotifications: EntityTable<ScheduledNotification, "id">;
    inAppNotifications: EntityTable<InAppNotification, "id">;
};

db.version(1).stores({
    tasks: "id, startDate, endDate, categoryId, status, syncStatus, recurrenceParentId, [startDate+endDate]",
    categories: "id, name, order, syncStatus",
    scheduledNotifications: "id, taskId, scheduledAt, shown",
    inAppNotifications: "id, type, taskId, read, createdAt",
});

export { db };
