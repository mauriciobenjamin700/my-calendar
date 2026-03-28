import { NavLink } from "react-router-dom";
import { useTranslation } from "@/i18n";
import styles from "./BottomNav.module.css";
import { NAV_ITEMS } from "./data";

export function BottomNav(): React.JSX.Element {
    const { t } = useTranslation();

    return (
        <nav className={styles.bottomNav}>
            {NAV_ITEMS.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                        `${styles.navItem} ${isActive ? styles.navItemActive : ""}`
                    }
                >
                    <item.icon size={22} />
                    <span className={styles.navLabel}>{t(item.labelKey)}</span>
                </NavLink>
            ))}
        </nav>
    );
}
