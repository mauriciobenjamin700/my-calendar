import type { TranslationKey } from "@/i18n";
import type { Locale } from "@/i18n";
import type { ThemeMode } from "@/stores";

export interface ThemeOption {
    value: ThemeMode;
    labelKey: TranslationKey;
}

export const THEME_OPTIONS: ThemeOption[] = [
    { value: "light", labelKey: "settings.themeLight" },
    { value: "dark", labelKey: "settings.themeDark" },
    { value: "system", labelKey: "settings.themeSystem" },
];

export interface LanguageOption {
    value: Locale;
    label: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
    { value: "en-US", label: "EN-US" },
    { value: "pt-BR", label: "PT-BR" },
];
