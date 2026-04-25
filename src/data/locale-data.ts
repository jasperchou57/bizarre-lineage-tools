import subsEn from "./sub-abilities.json";
import subsRu from "./sub-abilities.ru.json";
import subsPt from "./sub-abilities.pt.json";
import stylesEn from "./fighting-styles.json";
import stylesRu from "./fighting-styles.ru.json";
import stylesPt from "./fighting-styles.pt.json";
import standsTransRu from "./stands.translations.ru.json";
import standsTransPt from "./stands.translations.pt.json";

const SUBS_BY_LOCALE = {
    en: subsEn,
    ru: subsRu,
    pt: subsPt,
} as const;

const STYLES_BY_LOCALE = {
    en: stylesEn,
    ru: stylesRu,
    pt: stylesPt,
} as const;

const STAND_TRANSLATIONS_BY_LOCALE: Record<string, typeof standsTransRu | undefined> = {
    en: undefined,
    ru: standsTransRu,
    pt: standsTransPt,
};

export type StandTranslation = {
    obtainMethod: string;
    meta: string;
    strengths: string[];
    weaknesses: string[];
    passive?: string;
    moveEffects: Record<string, string>;
};

export function getSubsData(locale: string) {
    return SUBS_BY_LOCALE[locale as keyof typeof SUBS_BY_LOCALE] ?? subsEn;
}

export function getStylesData(locale: string) {
    return STYLES_BY_LOCALE[locale as keyof typeof STYLES_BY_LOCALE] ?? stylesEn;
}

export function getStandTranslation(locale: string, standId: string): StandTranslation | undefined {
    const translations = STAND_TRANSLATIONS_BY_LOCALE[locale];
    if (!translations) return undefined;
    return (translations as Record<string, StandTranslation>)[standId];
}
