export type SupportedCopyLocale = "en" | "ru" | "pt";

export function localize<const T extends Record<SupportedCopyLocale, unknown>>(locale: string, copy: T): T[SupportedCopyLocale] {
    return (copy[locale as SupportedCopyLocale] ?? copy.en) as T[SupportedCopyLocale];
}
