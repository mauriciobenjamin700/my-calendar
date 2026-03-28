import { CalendarDays, ListTodo, Tag, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { TranslationKey } from "@/i18n";

export interface NavItem {
    to: string;
    icon: LucideIcon;
    labelKey: TranslationKey;
}

export const NAV_ITEMS: NavItem[] = [
    { to: "/", icon: CalendarDays, labelKey: "nav.calendar" },
    { to: "/task/new", icon: ListTodo, labelKey: "nav.newTask" },
    { to: "/categories", icon: Tag, labelKey: "nav.categories" },
    { to: "/settings", icon: Settings, labelKey: "nav.settings" },
];
