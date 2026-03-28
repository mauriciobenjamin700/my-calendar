import { useQuery } from "@tanstack/react-query";
import type { Task } from "@/core/types";
import { taskService } from "@/services";

/**
 * Query a single task by its ID.
 *
 * @param taskId - The task UUID.
 * @returns TanStack Query result with the task.
 */
export function useTaskById(taskId: string | undefined) {
    return useQuery<Task | undefined>({
        queryKey: ["task", taskId],
        queryFn: () => taskService.getById(taskId!),
        enabled: !!taskId,
    });
}
