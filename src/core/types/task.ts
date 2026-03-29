import type { RecurrenceRule } from "./recurrence";
import type { SyncStatus } from "./sync";

/** Priority levels for a task. */
export type TaskPriority = "low" | "medium" | "high" | "urgent";

/** Status of a task in its lifecycle. */
export type TaskStatus = "pending" | "in_progress" | "completed" | "cancelled";

/** Represents a task or event in the calendar. */
export interface Task {
    /** UUID v4 - primary key. */
    id: string;
    /** User-facing title. */
    title: string;
    /** Optional longer description. */
    description: string;
    /** ISO 8601 datetime string for when the task starts. */
    startDate: string;
    /**
     * ISO 8601 datetime string for when the task ends.
     * Null means a point-in-time task.
     */
    endDate: string | null;
    /** Whether this is an all-day event. */
    allDay: boolean;
    /** Category ID reference. */
    categoryId: string | null;
    /** Priority level. */
    priority: TaskPriority;
    /** Current status. */
    status: TaskStatus;
    /** Recurrence rule (null = one-time task). */
    recurrenceRule: RecurrenceRule | null;
    /** For recurring tasks: ID of the parent recurring task. */
    recurrenceParentId: string | null;
    /** Reminder offsets in minutes before startDate (e.g., [5, 30, 1440]). */
    reminders: number[];
    /** ISO 8601 datetime - when this record was created. */
    createdAt: string;
    /** ISO 8601 datetime - last modification. */
    updatedAt: string;
    /** Sync metadata for future API integration. */
    syncStatus: SyncStatus;
    /** Server-side ID when synced (null while local-only). */
    remoteId: string | null;
}

/** Input type for creating a task (omit auto-generated fields). */
export type TaskCreateInput = Omit<
    Task,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "syncStatus"
    | "remoteId"
    | "recurrenceParentId"
>;

/** Input type for updating a task. */
export type TaskUpdateInput = Partial<TaskCreateInput>;
