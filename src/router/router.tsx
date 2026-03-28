import { createHashRouter } from "react-router-dom";
import { AppLayout } from "@/components/Layout";
import { CalendarPage } from "@/pages/Calendar";
import { CategoriesPage } from "@/pages/Categories";
import { NotFoundPage } from "@/pages/NotFound";
import { SettingsPage } from "@/pages/Settings";
import { TaskCreatePage } from "@/pages/TaskCreate";
import { TaskDetailPage } from "@/pages/TaskDetail";

export const router = createHashRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <CalendarPage />,
            },
            {
                path: "task/new",
                element: <TaskCreatePage />,
            },
            {
                path: "task/:taskId",
                element: <TaskDetailPage />,
            },
            {
                path: "categories",
                element: <CategoriesPage />,
            },
            {
                path: "settings",
                element: <SettingsPage />,
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
]);
