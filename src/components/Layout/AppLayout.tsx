import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";

export function AppLayout(): React.JSX.Element {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.content}>
                <Outlet />
            </main>
            <BottomNav />
        </div>
    );
}
