"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Languages } from "lucide-react";

export function MachineTranslatedBanner() {
    const t = useTranslations("MachineTranslated");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    if (locale === "en") return null;

    return (
        <div className="w-full bg-amber-500/10 border-b border-amber-500/20 text-amber-200 text-xs">
            <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Languages className="h-4 w-4 shrink-0" />
                    <span>{t("text")}</span>
                </div>
                <button
                    type="button"
                    onClick={() => router.replace(pathname, { locale: "en" })}
                    className="shrink-0 underline underline-offset-2 hover:text-white transition-colors"
                >
                    {t("switchToEnglish")}
                </button>
            </div>
        </div>
    );
}
