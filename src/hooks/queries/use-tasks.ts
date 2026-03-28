import { useQuery } from "@tanstack/react-query";
import type { Task } from "@/core/types";
import { taskService } from "@/services";

/**
 * Query tasks by date range.
 *
 * @param startDate - Range start (ISO 8601).
 * @param endDate - Range end (ISO 8601).
 * @returns TanStack Query result with tasks array.
 */
export function useTasks(startDate: string, endDate: string) {
    return useQuery<Task[]>({
        queryKey: ["tasks", { startDate, endDate }],
        queryFn: () => taskService.getByDateRange(startDate, endDate),
    });
}

/**
 * Query tasks for a specific date.
 *
 * @param date - ISO date string (YYYY-MM-DD).
 * @returns TanStack Query result with tasks array.
 */
export function useTasksByDate(date: string) {
    return useQuery<Task[]>({
        queryKey: ["tasks", "date", date],
        queryFn: () => taskService.getByDate(date),
        enabled: !!date,
    });
}
