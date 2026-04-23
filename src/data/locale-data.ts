import subsEn from "./sub-abilities.json";
import subsRu from "./sub-abilities.ru.json";
import subsPt from "./sub-abilities.pt.json";
import stylesEn from "./fighting-styles.json";
import stylesRu from "./fighting-styles.ru.json";
import stylesPt from "./fighting-styles.pt.json";

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

export function getSubsData(locale: string) {
    return SUBS_BY_LOCALE[locale as keyof typeof SUBS_BY_LOCALE] ?? subsEn;
}

export function getStylesData(locale: string) {
    return STYLES_BY_LOCALE[locale as keyof typeof STYLES_BY_LOCALE] ?? stylesEn;
}
