import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEY_LOCALE } from "@/core/settings";

export type Locale = "en-US" | "pt-BR";

interface LocaleState {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleState>()(
    persist(
        (set) => ({
            locale: "en-US",
            setLocale: (locale: Locale) => set({ locale }),
        }),
        { name: STORAGE_KEY_LOCALE },
    ),
);
