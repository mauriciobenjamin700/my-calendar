import type { Task, TaskCreateInput, TaskUpdateInput } from "@/core/types";
import { db } from "@/db";
import { generateId } from "@/lib/id";

/** Service for task CRUD operations against IndexedDB. */
export const taskService = {
    /**
     * Get all tasks within a date range.
     *
     * @param startDate - Range start (ISO 8601).
     * @param endDate - Range end (ISO 8601).
     * @returns Array of tasks that overlap with the range.
     */
    async getByDateRange(startDate: string, endDate: string): Promise<Task[]> {
        return db.tasks
            .where("startDate")
            .between(startDate, endDate, true, true)
            .toArray();
    },

    /**
     * Get a single task by ID.
     *
     * @param id - Task UUID.
     * @returns The task or undefined if not found.
     */
    async getById(id: string): Promise<Task | undefined> {
        return db.tasks.get(id);
    },

    /**
     * Get all tasks for a specific date.
     *
     * @param date - ISO date string (YYYY-MM-DD).
     * @returns Array of tasks starting on that date.
     */
    async getByDate(date: string): Promise<Task[]> {
        const dayStart = `${date}T00:00:00.000Z`;
        const dayEnd = `${date}T23:59:59.999Z`;

        return db.tasks
            .where("startDate")
            .between(dayStart, dayEnd, true, true)
            .toArray();
    },

    /**
     * Create a new task.
     *
     * @param input - Task creation data.
     * @returns The created task.
     */
    async create(input: TaskCreateInput): Promise<Task> {
        const now = new Date().toISOString();
        const task: Task = {
            ...input,
            id: generateId(),
            recurrenceParentId: null,
            createdAt: now,
            updatedAt: now,
            syncStatus: "local",
            remoteId: null,
        };
        await db.tasks.add(task);

        return task;
    },

    /**
     * Update an existing task.
     *
     * @param id - Task UUID.
     * @param input - Partial task data to update.
     * @returns The updated task.
     */
    async update(id: string, input: TaskUpdateInput): Promise<Task> {
        const updates = {
            ...input,
            updatedAt: new Date().toISOString(),
            syncStatus: "modified" as const,
        };
        await db.tasks.update(id, updates);
        const task = await db.tasks.get(id);

        if (!task) {
            throw new Error(`Task not found: ${id}`);
        }

        return task;
    },

    /**
     * Delete a task by ID.
     *
     * @param id - Task UUID.
     */
    async delete(id: string): Promise<void> {
        await db.tasks.delete(id);
    },

    /**
     * Toggle a task's completion status.
     *
     * @param id - Task UUID.
     * @returns The updated task.
     */
    async toggleStatus(id: string): Promise<Task> {
        const task = await db.tasks.get(id);

        if (!task) {
            throw new Error(`Task not found: ${id}`);
        }

        const newStatus =
            task.status === "completed" ? "pending" : "completed";

        return taskService.update(id, { status: newStatus });
    },

    /**
     * Get overdue tasks (pending tasks with startDate in the past).
     *
     * @returns Array of overdue tasks.
     */
    async getOverdue(): Promise<Task[]> {
        const now = new Date().toISOString();

        return db.tasks
            .where("startDate")
            .below(now)
            .and(
                (task) =>
                    task.status === "pending" || task.status === "in_progress",
            )
            .toArray();
    },

    /**
     * Get upcoming tasks within the next N minutes.
     *
     * @param minutes - Number of minutes to look ahead.
     * @returns Array of upcoming tasks.
     */
    async getUpcoming(minutes: number): Promise<Task[]> {
        const now = new Date();
        const future = new Date(now.getTime() + minutes * 60_000);

        return db.tasks
            .where("startDate")
            .between(now.toISOString(), future.toISOString(), true, true)
            .and(
                (task) =>
                    task.status === "pending" || task.status === "in_progress",
            )
            .toArray();
    },
};
