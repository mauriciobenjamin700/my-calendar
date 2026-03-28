export const enUS = {
    // Navigation
    "nav.today": "Today",
    "nav.previous": "Previous",
    "nav.next": "Next",
    "nav.notifications": "Notifications",
    "nav.calendar": "Calendar",
    "nav.newTask": "New Task",
    "nav.categories": "Categories",
    "nav.settings": "Settings",
    "nav.close": "Close",
    "nav.dismiss": "Dismiss",
    "nav.back": "Back to Calendar",

    // Calendar
    "calendar.month": "Month",
    "calendar.week": "Week",
    "calendar.day": "Day",
    "calendar.noTasks": "No tasks",
    "calendar.noTasksHint": "Tap + to add a task for this day",
    "calendar.allDay": "All day",
    "calendar.toggleStatus": "Toggle status",
    "calendar.loading": "Loading...",
    "calendar.markPending": "Mark as pending",
    "calendar.markCompleted": "Mark as completed",

    // Task
    "task.newTask": "New Task",
    "task.title": "Title",
    "task.titlePlaceholder": "Task title...",
    "task.description": "Description",
    "task.descriptionPlaceholder": "Optional description...",
    "task.titleRequired": "Title is required",
    "task.createdSuccess": "Task created successfully",
    "task.createFailed": "Failed to create task",
    "task.creating": "Creating...",
    "task.createTask": "Create Task",
    "task.cancel": "Cancel",
    "task.date": "Date",
    "task.start": "Start",
    "task.end": "End",
    "task.time": "Time",
    "task.allDay": "All day",
    "task.category": "Category",
    "task.categoryNone": "None",
    "task.priority": "Priority",
    "task.reminders": "Reminders",
    "task.notFound": "Task not found",
    "task.notFoundHint": "This task may have been deleted",
    "task.deleted": "Task deleted",
    "task.deleteFailed": "Failed to delete task",
    "task.deleteTask": "Delete task",
    "task.markPending": "Mark as Pending",
    "task.markCompleted": "Mark as Completed",
    "task.addNewTask": "Add new task",

    // Priority
    "priority.low": "Low",
    "priority.medium": "Medium",
    "priority.high": "High",
    "priority.urgent": "Urgent",

    // Status
    "status.pending": "Pending",
    "status.inProgress": "In Progress",
    "status.completed": "Completed",
    "status.cancelled": "Cancelled",

    // Reminders
    "reminder.5min": "5 min",
    "reminder.10min": "10 min",
    "reminder.15min": "15 min",
    "reminder.30min": "30 min",
    "reminder.1hour": "1 hour",
    "reminder.1day": "1 day",

    // Category
    "category.title": "Categories",
    "category.add": "Add Category",
    "category.addButton": "Add",
    "category.nameRequired": "Category name is required",
    "category.created": "Category created",
    "category.createFailed": "Failed to create category",
    "category.deleted": "Category deleted",
    "category.deleteFailed": "Failed to delete category",
    "category.namePlaceholder": "Category name...",
    "category.deleteLabel": "Delete",
    "category.selectColor": "Select color",

    // Settings
    "settings.title": "Settings",
    "settings.appearance": "Appearance",
    "settings.theme": "Theme",
    "settings.themeDescription": "Choose your preferred color scheme",
    "settings.themeLight": "Light",
    "settings.themeDark": "Dark",
    "settings.themeSystem": "System",
    "settings.language": "Language",
    "settings.languageDescription": "Choose your preferred language",
    "settings.notifications": "Notifications",
    "settings.pushNotifications": "Push Notifications",
    "settings.notifEnabled": "Enabled - you will receive task reminders",
    "settings.notifBlocked": "Blocked - enable in browser settings",
    "settings.notifEnable": "Enable to receive task reminders",
    "settings.notifEnableButton": "Enable",
    "settings.notifNotSupported":
        "Notifications not supported in this browser",
    "settings.notifEnabledToast": "Notifications enabled",
    "settings.notifBlockedToast":
        "Notifications blocked. Enable in browser settings.",
    "settings.appDescription": "Local-first calendar and task scheduler",

    // Not found
    "notFound.title": "Page not found",
    "notFound.description": "The page you are looking for does not exist",

    // Notifications
    "notification.overdueTitle": "Overdue Task",
    "notification.upcomingTitle": "Upcoming Task",
    "notification.overdueMsg": '"{title}" is past its start time',
    "notification.upcomingMsg": '"{title}" starts soon',
    "notification.reminderPrefix": "Reminder:",
    "notification.startingIn": "Starting in {minutes} minute(s)",

    // Weekdays
    "weekday.sun": "Sun",
    "weekday.mon": "Mon",
    "weekday.tue": "Tue",
    "weekday.wed": "Wed",
    "weekday.thu": "Thu",
    "weekday.fri": "Fri",
    "weekday.sat": "Sat",

    // Recurrence
    "recurrence.daily": "Daily",
    "recurrence.weekly": "Weekly",
    "recurrence.monthly": "Monthly",
    "recurrence.yearly": "Yearly",

    // Time units
    "time.min": "min",
    "time.hour": "h",
    "time.day": "day",
    "time.days": "days",
} as const;

export type TranslationKey = keyof typeof enUS;
