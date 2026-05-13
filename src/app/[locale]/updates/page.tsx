import type { Metadata } from "next";
import { ChevronRight, Newspaper } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { GameUpdatesList } from "@/components/GameUpdatesList";
import { GAME_UPDATES, UPDATES_LAST_CHECKED } from "@/data/updates";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Updates" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
    }, "/updates");
}

export default async function UpdatesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Updates" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: t("breadcrumbCurrent"), item: `${SITE_URL}/updates` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">{t("breadcrumbCurrent")}</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <Newspaper className="h-12 w-12 text-accent-blue" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">{t("heroTitle")}</h1>
            </div>
            <p className="text-lg text-muted mb-3 max-w-3xl leading-relaxed">{t("heroIntro")}</p>
            <p className="text-sm text-muted mb-10">{t("lastChecked", { date: UPDATES_LAST_CHECKED })}</p>

            <GameUpdatesList
                updates={GAME_UPDATES}
                labels={{
                    officialBadge: t("officialBadge"),
                    communityBadge: t("communityBadge"),
                    latestBadge: t("latestBadge"),
                    moreLabel: (count) => t("updatesMore", { count }),
                    sourcePrefix: t("sourcePrefix"),
                }}
            />
        </div>
    );
}
