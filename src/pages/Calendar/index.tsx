import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingActionButton } from "@/components/common";
import type { Task } from "@/core/types";
import { useTasks, useToggleTaskStatus, useCategories } from "@/hooks";
import { buildCategoryColorMap, getCategoryColor } from "@/lib/category";
import {
    getCalendarMonthDays,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    startOfDay,
    endOfDay,
    parseISO,
    toISODateString,
} from "@/lib/date";
import { useCalendarStore } from "@/stores";
import styles from "./Calendar.module.css";
import { DayTaskList } from "./DayTaskList";
import { DayTimeline } from "./DayTimeline";
import { MonthGrid } from "./MonthGrid";
import { ViewSwitcher } from "./ViewSwitcher";
import { WeekGrid } from "./WeekGrid";

export function CalendarPage(): React.JSX.Element {
    const navigate = useNavigate();
    const { selectedDate, setSelectedDate, viewMode, setViewMode } =
        useCalendarStore();

    const monthKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth()}`;
    const weekKey = `${monthKey}-${Math.floor(selectedDate.getDate() / 7)}`;

    // eslint-disable-next-line react-hooks/exhaustive-deps -- recalc only on month change
    const monthDays = useMemo(
        () => getCalendarMonthDays(selectedDate),
        [monthKey],
    );

    const { queryStart, queryEnd } = useMemo(() => {
        if (viewMode === "day") {
            return {
                queryStart: startOfDay(selectedDate).toISOString(),
                queryEnd: endOfDay(selectedDate).toISOString(),
            };
        }

        if (viewMode === "week") {
            return {
                queryStart: startOfWeek(selectedDate, {
                    weekStartsOn: 0,
                }).toISOString(),
                queryEnd: endOfWeek(selectedDate, {
                    weekStartsOn: 0,
                }).toISOString(),
            };
        }

        return {
            queryStart: startOfWeek(startOfMonth(selectedDate), {
                weekStartsOn: 0,
            }).toISOString(),
            queryEnd: endOfWeek(endOfMonth(selectedDate), {
                weekStartsOn: 0,
            }).toISOString(),
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps -- stable key
    }, [viewMode, monthKey, weekKey]);

    const { data: tasks = [] } = useTasks(queryStart, queryEnd);
    const { data: categories = [] } = useCategories();
    const toggleStatus = useToggleTaskStatus();

    const colorMap = useMemo(
        () => buildCategoryColorMap(categories),
        [categories],
    );
    const getColor = (id: string | null): string =>
        getCategoryColor(colorMap, id);

    const tasksByDay = useMemo(() => {
        const map = new Map<string, Task[]>();

        for (const task of tasks) {
            const dayKey = toISODateString(parseISO(task.startDate));
            const existing = map.get(dayKey) ?? [];
            existing.push(task);
            map.set(dayKey, existing);
        }

        return map;
    }, [tasks]);

    const selectedDayKey = toISODateString(selectedDate);
    const selectedDayTasks = useMemo(
        () => tasksByDay.get(selectedDayKey) ?? [],
        [selectedDayKey, tasksByDay],
    );

    const handleToggle = (id: string): void => {
        toggleStatus.mutate(id);
    };

    const handleNavigateTask = (id: string): void => {
        navigate(`/task/${id}`);
    };

    return (
        <div className={styles.page}>
            <ViewSwitcher
                viewMode={viewMode}
                onChangeView={setViewMode}
            />

            {viewMode === "month" && (
                <>
                    <MonthGrid
                        monthDays={monthDays}
                        selectedDate={selectedDate}
                        tasksByDay={tasksByDay}
                        getCategoryColor={getColor}
                        onSelectDate={setSelectedDate}
                    />
                    <DayTaskList
                        selectedDate={selectedDate}
                        tasks={selectedDayTasks}
                        getCategoryColor={getColor}
                        onToggleStatus={handleToggle}
                        onNavigateTask={handleNavigateTask}
                    />
                </>
            )}

            {viewMode === "week" && (
                <WeekGrid
                    selectedDate={selectedDate}
                    tasksByDay={tasksByDay}
                    getCategoryColor={getColor}
                    onSelectDate={setSelectedDate}
                />
            )}

            {viewMode === "day" && (
                <DayTimeline
                    selectedDate={selectedDate}
                    tasks={selectedDayTasks}
                    getCategoryColor={getColor}
                    onToggleStatus={handleToggle}
                    onNavigateTask={handleNavigateTask}
                />
            )}

            <FloatingActionButton onClick={() => navigate("/task/new")} />
        </div>
    );
}
