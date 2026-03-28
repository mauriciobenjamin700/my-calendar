import styles from "./EmptyState.module.css";

interface EmptyStateProps {
    /** Icon to display. */
    icon: React.ReactNode;
    /** Title text. */
    title: string;
    /** Description text. */
    description: string;
    /** Optional action element (e.g., a button). */
    action?: React.ReactNode;
}

export function EmptyState({
    icon,
    title,
    description,
    action,
}: EmptyStateProps): React.JSX.Element {
    return (
        <div className={styles.emptyState}>
            <div className={styles.icon}>{icon}</div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            {action}
        </div>
    );
}
