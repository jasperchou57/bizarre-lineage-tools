"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useTransition } from "react";
import { Globe } from "lucide-react";

const LOCALE_META: Record<string, { flag: string; label: string }> = {
    en: { flag: "🇬🇧", label: "English" },
    ru: { flag: "🇷🇺", label: "Русский" },
    pt: { flag: "🇧🇷", label: "Português" },
};

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const t = useTranslations("Navbar");

    return (
        <label className="relative inline-flex items-center gap-1.5 text-sm text-muted hover:text-white transition-colors cursor-pointer">
            <Globe className="h-4 w-4" />
            <span className="sr-only">{t("languageLabel")}</span>
            <select
                aria-label={t("languageLabel")}
                value={locale}
                disabled={isPending}
                onChange={(event) => {
                    const nextLocale = event.target.value as (typeof routing.locales)[number];
                    startTransition(() => {
                        router.replace(pathname, { locale: nextLocale });
                    });
                }}
                className="appearance-none bg-transparent text-sm font-medium pr-5 cursor-pointer focus:outline-none"
                style={{ backgroundImage: "none" }}
            >
                {routing.locales.map((code) => (
                    <option key={code} value={code} className="bg-background text-white">
                        {LOCALE_META[code]?.flag} {LOCALE_META[code]?.label}
                    </option>
                ))}
            </select>
        </label>
    );
}
