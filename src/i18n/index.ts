import { enUS } from "./locales/en-US";
import type { TranslationKey } from "./locales/en-US";
import { ptBR } from "./locales/pt-BR";
import { useLocaleStore } from "./store";
import type { Locale } from "./store";

export type { TranslationKey, Locale };
export { useLocaleStore };

const TRANSLATIONS: Record<Locale, Record<TranslationKey, string>> = {
    "en-US": enUS,
    "pt-BR": ptBR,
};

/**
 * Get a translation function for the given locale.
 *
 * @param locale - The active locale.
 * @returns A function that resolves translation keys.
 */
export function getT(locale: Locale): (key: TranslationKey) => string {
    const messages = TRANSLATIONS[locale];

    return (key: TranslationKey) => messages[key] ?? key;
}

/**
 * Hook that returns the translation function for
 * the current locale.
 *
 * @returns Object with `t` function and current `locale`.
 */
export function useTranslation() {
    const locale = useLocaleStore((s) => s.locale);
    const t = getT(locale);

    return { t, locale };
}
