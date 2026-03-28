import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task, TaskCreateInput, TaskUpdateInput } from "@/core/types";
import { taskService, notificationService } from "@/services";

async function scheduleTaskReminders(task: Task): Promise<void> {
    if (task.reminders.length > 0) {
        await notificationService.scheduleReminders(
            task.id,
            task.title,
            task.startDate,
            task.reminders,
        );
    }
}

/**
 * Mutation hook for creating a task.
 *
 * @returns TanStack mutation for task creation.
 */
export function useCreateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: TaskCreateInput) => taskService.create(input),
        onSuccess: async (task) => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["tasks"] }),
                scheduleTaskReminders(task),
            ]);
        },
    });
}

/**
 * Mutation hook for updating a task.
 *
 * @returns TanStack mutation for task update.
 */
export function useUpdateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, input }: { id: string; input: TaskUpdateInput }) =>
            taskService.update(id, input),
        onSuccess: async (task) => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["tasks"] }),
                queryClient.invalidateQueries({ queryKey: ["task", task.id] }),
                scheduleTaskReminders(task),
            ]);
        },
    });
}

/**
 * Mutation hook for deleting a task.
 *
 * @returns TanStack mutation for task deletion.
 */
export function useDeleteTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => taskService.delete(id),
        onSuccess: async (_result, id) => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["tasks"] }),
                queryClient.invalidateQueries({ queryKey: ["task", id] }),
                notificationService.deleteByTaskId(id),
            ]);
        },
    });
}

/**
 * Mutation hook for toggling a task's completion status.
 *
 * @returns TanStack mutation for task status toggle.
 */
export function useToggleTaskStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => taskService.toggleStatus(id),
        onSuccess: async (task) => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["tasks"] }),
                queryClient.invalidateQueries({ queryKey: ["task", task.id] }),
            ]);
        },
    });
}
