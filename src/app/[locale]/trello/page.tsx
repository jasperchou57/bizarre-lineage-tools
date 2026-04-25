import type { Metadata } from "next";
import { ChevronRight, ExternalLink, ClipboardList } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Trello" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
    }, "/trello");
}

const SECTION_IDS = [1, 2, 3, 4] as const;

export default async function TrelloPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Trello" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    const sections = SECTION_IDS.map((n) => ({
        title: t(`section${n}Title` as `section${1 | 2 | 3 | 4}Title`),
        description: t(`section${n}Desc` as `section${1 | 2 | 3 | 4}Desc`),
        confirmed: t(`section${n}ConfirmedItems` as `section${1 | 2 | 3 | 4}ConfirmedItems`).split("|"),
        notConfirmed: t(`section${n}NotItems` as `section${1 | 2 | 3 | 4}NotItems`).split("|"),
    }));

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: t("breadcrumbCurrent"), item: `${SITE_URL}/trello` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
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
            <p className="text-lg text-muted mb-8 leading-relaxed">{t("heroIntro")}</p>

            <div className="bg-gradient-to-r from-accent-blue/10 to-accent-indigo/10 border border-accent-blue/20 rounded-xl p-8 text-center mb-12">
                <h2 className="text-2xl font-bold text-white mb-3">{t("ctaTitle")}</h2>
                <p className="text-sm text-muted mb-6">{t("ctaSub")}</p>
                <a
                    href="https://trello.com/b/wtzgwqIf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-accent-blue to-accent-indigo rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all"
                >
                    {t("ctaButton")} <ExternalLink className="h-4 w-4" />
                </a>
            </div>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("otherLinksTitle")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="https://discord.gg/bizarrelineage" target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-xl p-5 hover:border-accent-indigo/50 transition-colors group flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent-indigo/10 flex items-center justify-center shrink-0">
                            <span className="text-accent-indigo font-bold text-lg">D</span>
                        </div>
                        <div>
                            <div className="font-bold text-white group-hover:text-accent-indigo transition-colors flex items-center gap-1">{t("discordLabel")} <ExternalLink className="h-3 w-3" /></div>
                            <div className="text-xs text-muted">{t("discordSub")}</div>
                        </div>
                    </a>
                    <a href="https://www.roblox.com/games/14890802310/Bizarre-Lineage" target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-xl p-5 hover:border-green-500/50 transition-colors group flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                            <span className="text-green-400 font-bold text-lg">R</span>
                        </div>
                        <div>
                            <div className="font-bold text-white group-hover:text-green-400 transition-colors flex items-center gap-1">{t("robloxLabel")} <ExternalLink className="h-3 w-3" /></div>
                            <div className="text-xs text-muted">{t("robloxSub")}</div>
                        </div>
                    </a>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">{t("whatCoversTitle")}</h2>
                <div className="space-y-6">
                    {sections.map((section) => (
                        <div key={section.title} className="bg-surface border border-border rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-2">{section.title}</h3>
                            <p className="text-sm text-muted mb-4">{section.description}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-xs font-bold text-green-400 uppercase tracking-wide mb-2">{t("confirmedLabel")}</h4>
                                    <ul className="text-sm text-muted space-y-1">
                                        {section.confirmed.map((item) => (
                                            <li key={item} className="flex items-start gap-2">
                                                <span className="text-green-400 mt-0.5">✓</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-red-400 uppercase tracking-wide mb-2">{t("notConfirmedLabel")}</h4>
                                    <ul className="text-sm text-muted space-y-1">
                                        {section.notConfirmed.map((item) => (
                                            <li key={item} className="flex items-start gap-2">
                                                <span className="text-red-400 mt-0.5">✗</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("faqTitle")}</h2>
                <div className="space-y-4">
                    {([1, 2] as const).map((n) => (
                        <details key={n} className="group bg-surface border border-border rounded-xl overflow-hidden">
                            <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                                <span className="font-medium text-white pr-4">{t(`faqQ${n}` as `faqQ${1 | 2}`)}</span>
                                <ChevronRight className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-90 transition-transform" />
                            </summary>
                            <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                                {t(`faqA${n}` as `faqA${1 | 2}`)}
                            </div>
                        </details>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">{t("exploreTitle")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/tier-list" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">{t("exploreTierList")}</div>
                        <div className="text-xs text-muted mt-1">{t("exploreTierListSub")}</div>
                    </Link>
                    <Link href="/codes" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">{t("exploreCodes")}</div>
                        <div className="text-xs text-muted mt-1">{t("exploreCodesSub")}</div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
