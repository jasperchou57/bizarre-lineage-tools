import type { Metadata } from "next";
import { BarChart3, ChevronRight, ClipboardList, Gift, GitCompare, LayoutGrid, ShieldCheck, Vault, Wrench } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Tools" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
    }, "/tools");
}

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Tools" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    const cards = [
        { title: t("plannerTitle"), desc: t("plannerDesc"), href: "/build-planner", icon: <Wrench className="h-7 w-7 text-accent-blue" />, tag: t("primaryTag") },
        { title: t("codesTitle"), desc: t("codesDesc"), href: "/codes", icon: <Gift className="h-7 w-7 text-yellow-400" />, tag: t("updatedTag") },
        { title: t("tierTitle"), desc: t("tierDesc"), href: "/tier-list", icon: <BarChart3 className="h-7 w-7 text-accent-indigo" />, tag: t("watchTag") },
        { title: t("compareTitle"), desc: t("compareDesc"), href: "/compare", icon: <GitCompare className="h-7 w-7 text-green-400" />, tag: t("plannerTag") },
        { title: t("vaultTitle"), desc: t("vaultDesc"), href: "/vault", icon: <Vault className="h-7 w-7 text-purple-400" />, tag: t("localTag") },
        { title: t("databaseTitle"), desc: t("databaseDesc"), href: "/stands", icon: <LayoutGrid className="h-7 w-7 text-white" />, tag: t("referenceTag") },
    ] as const;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: t("breadcrumbCurrent"), item: `${SITE_URL}/tools` },
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
                <ClipboardList className="h-12 w-12 text-accent-blue" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">{t("heroTitle")}</h1>
            </div>
            <p className="text-lg text-muted mb-10 max-w-3xl leading-relaxed">{t("heroIntro")}</p>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                {cards.map((card) => (
                    <Link
                        key={card.href}
                        href={card.href}
                        className="bg-surface border border-border rounded-xl p-5 hover:border-accent-blue/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.08)] transition-all group"
                    >
                        <div className="flex items-start justify-between gap-4 mb-5">
                            <div className="h-12 w-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                {card.icon}
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-white/5 border border-white/10 text-muted">
                                {card.tag}
                            </span>
                        </div>
                        <h2 className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">{card.title}</h2>
                        <p className="text-sm text-muted mt-2 leading-relaxed">{card.desc}</p>
                    </Link>
                ))}
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-5 md:col-span-2">
                    <div className="flex items-start gap-3">
                        <ShieldCheck className="h-5 w-5 text-accent-blue mt-0.5 shrink-0" />
                        <div>
                            <h2 className="text-lg font-bold text-white mb-2">{t("dataRulesTitle")}</h2>
                            <p className="text-sm text-muted leading-relaxed">{t("dataRulesBody")}</p>
                        </div>
                    </div>
                </div>
                <Link href="/trello" className="bg-surface border border-border rounded-xl p-5 hover:border-accent-indigo/50 transition-colors group">
                    <h2 className="text-lg font-bold text-white group-hover:text-accent-indigo transition-colors">{t("trelloTitle")}</h2>
                    <p className="text-sm text-muted mt-2">{t("trelloDesc")}</p>
                </Link>
            </section>
        </div>
    );
}
