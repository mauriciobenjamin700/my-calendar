import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual variant of the button. */
    variant?: ButtonVariant;
    /** Whether the button should take full width. */
    fullWidth?: boolean;
    /** Content to render inside the button. */
    children: React.ReactNode;
}

export function Button({
    variant = "primary",
    fullWidth = false,
    children,
    className,
    ...props
}: ButtonProps): React.JSX.Element {
    const classes = [
        styles.button,
        styles[variant],
        fullWidth ? styles.fullWidth : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            className={classes}
            {...props}
        >
            {children}
        </button>
    );
}
