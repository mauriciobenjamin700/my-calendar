import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { EmptyState, Button } from "@/components/common";
import { useTranslation } from "@/i18n";

export function NotFoundPage(): React.JSX.Element {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <EmptyState
            icon={<MapPin size={48} />}
            title={t("notFound.title")}
            description={t("notFound.description")}
            action={
                <Button
                    variant="primary"
                    onClick={() => navigate("/")}
                >
                    {t("nav.back")}
                </Button>
            }
        />
    );
}
