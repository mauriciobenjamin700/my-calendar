import type { TranslationKey } from "./en-US";

export const ptBR: Record<TranslationKey, string> = {
    // Navegação
    "nav.today": "Hoje",
    "nav.previous": "Anterior",
    "nav.next": "Próximo",
    "nav.notifications": "Notificações",
    "nav.calendar": "Calendário",
    "nav.newTask": "Nova Tarefa",
    "nav.categories": "Categorias",
    "nav.settings": "Ajustes",
    "nav.close": "Fechar",
    "nav.dismiss": "Dispensar",
    "nav.back": "Voltar ao Calendário",

    // Calendário
    "calendar.month": "Mês",
    "calendar.week": "Semana",
    "calendar.day": "Dia",
    "calendar.noTasks": "Sem tarefas",
    "calendar.noTasksHint": "Toque em + para adicionar uma tarefa",
    "calendar.allDay": "Dia todo",
    "calendar.toggleStatus": "Alternar status",
    "calendar.loading": "Carregando...",
    "calendar.markPending": "Marcar como pendente",
    "calendar.markCompleted": "Marcar como concluída",

    // Tarefa
    "task.newTask": "Nova Tarefa",
    "task.title": "Título",
    "task.titlePlaceholder": "Título da tarefa...",
    "task.description": "Descrição",
    "task.descriptionPlaceholder": "Descrição opcional...",
    "task.titleRequired": "Título é obrigatório",
    "task.createdSuccess": "Tarefa criada com sucesso",
    "task.createFailed": "Falha ao criar tarefa",
    "task.creating": "Criando...",
    "task.createTask": "Criar Tarefa",
    "task.cancel": "Cancelar",
    "task.date": "Data",
    "task.start": "Início",
    "task.end": "Fim",
    "task.time": "Horário",
    "task.allDay": "Dia todo",
    "task.category": "Categoria",
    "task.categoryNone": "Nenhuma",
    "task.priority": "Prioridade",
    "task.reminders": "Lembretes",
    "task.notFound": "Tarefa não encontrada",
    "task.notFoundHint": "Esta tarefa pode ter sido excluída",
    "task.deleted": "Tarefa excluída",
    "task.deleteFailed": "Falha ao excluir tarefa",
    "task.deleteTask": "Excluir tarefa",
    "task.markPending": "Marcar como Pendente",
    "task.markCompleted": "Marcar como Concluída",
    "task.addNewTask": "Adicionar tarefa",

    // Prioridade
    "priority.low": "Baixa",
    "priority.medium": "Média",
    "priority.high": "Alta",
    "priority.urgent": "Urgente",

    // Status
    "status.pending": "Pendente",
    "status.inProgress": "Em Andamento",
    "status.completed": "Concluída",
    "status.cancelled": "Cancelada",

    // Lembretes
    "reminder.5min": "5 min",
    "reminder.10min": "10 min",
    "reminder.15min": "15 min",
    "reminder.30min": "30 min",
    "reminder.1hour": "1 hora",
    "reminder.1day": "1 dia",

    // Categoria
    "category.title": "Categorias",
    "category.add": "Adicionar Categoria",
    "category.addButton": "Adicionar",
    "category.nameRequired": "Nome da categoria é obrigatório",
    "category.created": "Categoria criada",
    "category.createFailed": "Falha ao criar categoria",
    "category.deleted": "Categoria excluída",
    "category.deleteFailed": "Falha ao excluir categoria",
    "category.namePlaceholder": "Nome da categoria...",
    "category.deleteLabel": "Excluir",
    "category.selectColor": "Selecionar cor",

    // Configurações
    "settings.title": "Ajustes",
    "settings.appearance": "Aparência",
    "settings.theme": "Tema",
    "settings.themeDescription": "Escolha seu esquema de cores preferido",
    "settings.themeLight": "Claro",
    "settings.themeDark": "Escuro",
    "settings.themeSystem": "Sistema",
    "settings.language": "Idioma",
    "settings.languageDescription": "Escolha seu idioma preferido",
    "settings.notifications": "Notificações",
    "settings.pushNotifications": "Notificações Push",
    "settings.notifEnabled": "Ativadas - você receberá lembretes de tarefas",
    "settings.notifBlocked":
        "Bloqueadas - ative nas configurações do navegador",
    "settings.notifEnable": "Ative para receber lembretes de tarefas",
    "settings.notifEnableButton": "Ativar",
    "settings.notifNotSupported":
        "Notificações não suportadas neste navegador",
    "settings.notifEnabledToast": "Notificações ativadas",
    "settings.notifBlockedToast":
        "Notificações bloqueadas. Ative nas configurações do navegador.",
    "settings.installApp": "Instalar Aplicativo",
    "settings.installDescription":
        "Instale como aplicativo para acesso rápido",
    "settings.installManual":
        "Use o menu do navegador para adicionar à tela inicial",
    "settings.installButton": "Instalar",
    "settings.installed": "Aplicativo já instalado",
    "settings.installSuccess": "Aplicativo instalado com sucesso",
    "settings.installDismissed": "Instalação cancelada",
    "settings.appDescription": "Calendário e agendador de tarefas local",

    // Não encontrado
    "notFound.title": "Página não encontrada",
    "notFound.description": "A página que você procura não existe",

    // Notificações
    "notification.overdueTitle": "Tarefa Atrasada",
    "notification.upcomingTitle": "Tarefa Próxima",
    "notification.overdueMsg": '"{title}" passou do horário de início',
    "notification.upcomingMsg": '"{title}" começa em breve',
    "notification.reminderPrefix": "Lembrete:",
    "notification.startingIn": "Começa em {minutes} minuto(s)",

    // Dias da semana
    "weekday.sun": "Dom",
    "weekday.mon": "Seg",
    "weekday.tue": "Ter",
    "weekday.wed": "Qua",
    "weekday.thu": "Qui",
    "weekday.fri": "Sex",
    "weekday.sat": "Sáb",

    // Recorrência
    "recurrence.daily": "Diário",
    "recurrence.weekly": "Semanal",
    "recurrence.monthly": "Mensal",
    "recurrence.yearly": "Anual",

    // Unidades de tempo
    "time.min": "min",
    "time.hour": "h",
    "time.day": "dia",
    "time.days": "dias",
};
