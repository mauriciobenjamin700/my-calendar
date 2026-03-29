import type { Category, TaskPriority } from "@/core/types";
import { useTranslation } from "@/i18n";
import { PRIORITIES } from "./data";
import styles from "./TaskCreate.module.css";

interface MetadataFieldsProps {
    categoryId: string;
    priority: TaskPriority;
    categories: Category[];
    onCategoryChange: (value: string) => void;
    onPriorityChange: (value: TaskPriority) => void;
}

export function MetadataFields({
    categoryId,
    priority,
    categories,
    onCategoryChange,
    onPriorityChange,
}: MetadataFieldsProps): React.JSX.Element {
    const { t } = useTranslation();

    return (
        <div className={styles.row}>
            <div className={styles.field}>
                <label className={styles.label}>{t("task.category")}</label>
                <select
                    className={styles.select}
                    value={categoryId}
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    <option value="">{t("task.categoryNone")}</option>
                    {categories.map((cat) => (
                        <option
                            key={cat.id}
                            value={cat.id}
                        >
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.field}>
                <label className={styles.label}>{t("task.priority")}</label>
                <select
                    className={styles.select}
                    value={priority}
                    onChange={(e) =>
                        onPriorityChange(e.target.value as TaskPriority)
                    }
                >
                    {PRIORITIES.map((p) => (
                        <option
                            key={p.value}
                            value={p.value}
                        >
                            {t(p.labelKey)}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
