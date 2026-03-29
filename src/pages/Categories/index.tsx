import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/common";
import { CATEGORY_COLORS } from "@/core/constants";
import { useCategories, useCreateCategory, useDeleteCategory } from "@/hooks";
import { useTranslation } from "@/i18n";
import { useNotificationStore } from "@/stores";
import styles from "./Categories.module.css";

export function CategoriesPage(): React.JSX.Element {
    const { t } = useTranslation();
    const { data: categories = [] } = useCategories();
    const createCategory = useCreateCategory();
    const deleteCategory = useDeleteCategory();
    const { addToast } = useNotificationStore();

    const [name, setName] = useState("");
    const [color, setColor] = useState(CATEGORY_COLORS[0]);

    const handleAdd = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if (!name.trim()) {
            addToast("error", t("category.nameRequired"));

            return;
        }

        try {
            await createCategory.mutateAsync({
                name: name.trim(),
                color,
                icon: "tag",
                order: categories.length,
            });
            setName("");
            addToast("success", t("category.created"));
        } catch {
            addToast("error", t("category.createFailed"));
        }
    };

    const handleDelete = async (id: string): Promise<void> => {
        try {
            await deleteCategory.mutateAsync(id);
            addToast("success", t("category.deleted"));
        } catch {
            addToast("error", t("category.deleteFailed"));
        }
    };

    return (
        <div className={styles.page}>
            <h2 className={styles.pageTitle}>{t("category.title")}</h2>

            <div className={styles.list}>
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className={styles.categoryItem}
                    >
                        <span
                            className={styles.colorDot}
                            style={{ backgroundColor: cat.color }}
                        />
                        <span className={styles.categoryName}>{cat.name}</span>
                        <button
                            className={styles.deleteBtn}
                            onClick={() => handleDelete(cat.id)}
                            aria-label={`${t("category.deleteLabel")} ${cat.name}`}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <div className={styles.addSection}>
                <h3 className={styles.addTitle}>{t("category.add")}</h3>
                <form
                    className={styles.addForm}
                    onSubmit={handleAdd}
                >
                    <div className={styles.addRow}>
                        <input
                            className={styles.input}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t("category.namePlaceholder")}
                        />
                        <Button
                            type="submit"
                            disabled={createCategory.isPending}
                        >
                            {t("category.addButton")}
                        </Button>
                    </div>
                    <div className={styles.colorPicker}>
                        {CATEGORY_COLORS.map((c) => (
                            <button
                                key={c}
                                type="button"
                                className={`${styles.colorOption} ${color === c ? styles.colorOptionSelected : ""}`}
                                style={{ backgroundColor: c }}
                                onClick={() => setColor(c)}
                                aria-label={`${t("category.selectColor")} ${c}`}
                            />
                        ))}
                    </div>
                </form>
            </div>
        </div>
    );
}
