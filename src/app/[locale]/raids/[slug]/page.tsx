import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin, ShoppingBag, HelpCircle, Info, ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import raidsData from "@/data/raids.json";
import { withCanonical, SITE_URL } from "@/lib/metadata";

type RaidId = "avdol" | "kira" | "jotaro" | "dio";

export async function generateStaticParams() {
    return raidsData.map((raid) => ({ slug: raid.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
    const raid = raidsData.find((r) => r.id === slug);
    if (!raid) return {};
    const t = await getTranslations({ locale, namespace: "Raids" });
    return withCanonical({
        title: t("detailMetaTitle", { boss: raid.boss }),
        description: t("detailMetaDescription", { boss: raid.boss }),
    }, `/raids/${raid.id}`);
}

export default async function RaidPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const raid = raidsData.find((r) => r.id === slug);
    if (!raid) notFound();

    const t = await getTranslations({ locale, namespace: "Raids" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    const location = t(`locations.${raid.id as RaidId}`);
    const otherRaids = raidsData.filter((r) => r.id !== raid.id);
    const totalShop = raid.shopItems.length;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: t("breadcrumbCurrent"), item: `${SITE_URL}/raids` },
            { "@type": "ListItem", position: 3, name: raid.boss, item: `${SITE_URL}/raids/${raid.id}` },
        ],
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            { "@type": "Question", name: t("detailFaqQ1", { boss: raid.boss }), acceptedAnswer: { "@type": "Answer", text: t("detailFaqA1", { location, npc: raid.npc }) } },
            { "@type": "Question", name: t("detailFaqQ2"), acceptedAnswer: { "@type": "Answer", text: t("detailFaqA2") } },
        ],
    };

    const rich = { strong: (chunks: React.ReactNode) => <strong className="text-white">{chunks}</strong> };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <nav className="flex items-center text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <Link href="/raids" className="hover:text-white transition-colors">{t("breadcrumbCurrent")}</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-white" aria-current="page">{raid.boss}</span>
            </nav>

            <div className="mb-12 border-b border-white/5 pb-8">
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight mb-3">
                    {raid.boss} {t("detailRaidSuffix")}
                </h1>
                <p className="text-muted text-sm flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {location}
                </p>
            </div>

            <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-4 mb-10 flex gap-3 text-sm text-muted">
                <Info className="h-5 w-5 text-accent-blue shrink-0 mt-0.5" />
                <div>
                    <p className="text-white font-medium mb-1">{t("verifiedTitle")}</p>
                    <p>{t.rich("verifiedBody", rich)}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-10">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">{t("detailOverview")}</h2>
                        <div className="bg-surface border border-border rounded-xl p-6 text-sm text-muted leading-relaxed space-y-2">
                            <p>{t.rich("detailOverviewBody1", { ...rich, boss: raid.boss, npc: raid.npc, location })}</p>
                            <p>{t("detailOverviewBody2", { boss: raid.boss })}</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5 text-accent-blue" /> {t("detailShopTitle", { boss: raid.boss, count: totalShop })}
                        </h2>
                        <div className="bg-surface border border-border rounded-xl divide-y divide-white/5">
                            <div className="grid grid-cols-12 px-5 py-3 text-xs font-mono uppercase text-muted">
                                <div className="col-span-7">{t("detailShopColItem")}</div>
                                <div className="col-span-2 text-right">{t("detailShopColStock")}</div>
                                <div className="col-span-3 text-right">{t("detailShopColCost")}</div>
                            </div>
                            {raid.shopItems.map((item) => (
                                <div key={item.name} className="grid grid-cols-12 px-5 py-3 items-center text-sm">
                                    <div className="col-span-7 text-white">{item.name}</div>
                                    <div className="col-span-2 text-right text-muted font-mono">{item.stock}</div>
                                    <div className="col-span-3 text-right text-accent-blue font-mono font-bold">~{item.cost}</div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-muted mt-3">{t("detailShopFooter")}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <HelpCircle className="h-5 w-5 text-accent-blue" /> {t("detailFaqTitle")}
                        </h2>
                        <div className="space-y-3">
                            <details className="group bg-surface border border-border rounded-lg">
                                <summary className="cursor-pointer p-4 text-white font-medium flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg">
                                    {t("detailFaqQ1", { boss: raid.boss })}
                                    <ChevronRight className="h-4 w-4 text-muted group-open:rotate-90 transition-transform shrink-0 ml-2" />
                                </summary>
                                <div className="px-4 pb-4 text-muted text-sm leading-relaxed">
                                    {t("detailFaqA1", { location, npc: raid.npc })}
                                </div>
                            </details>
                            <details className="group bg-surface border border-border rounded-lg">
                                <summary className="cursor-pointer p-4 text-white font-medium flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg">
                                    {t("detailFaqQ2")}
                                    <ChevronRight className="h-4 w-4 text-muted group-open:rotate-90 transition-transform shrink-0 ml-2" />
                                </summary>
                                <div className="px-4 pb-4 text-muted text-sm leading-relaxed">
                                    {t("detailFaqA2")}
                                </div>
                            </details>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">{t("detailOtherRaidsTitle")}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {otherRaids.map((r) => (
                                <Link key={r.id} href={`/raids/${r.id}`} className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                                    <div className="font-bold text-white text-sm group-hover:text-accent-blue transition-colors">{r.boss}</div>
                                    <div className="text-xs text-muted mt-1">{t("detailShopItemsLabel", { count: r.shopItems.length })}</div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className="bg-gradient-to-r from-accent-blue/10 to-accent-indigo/10 border border-accent-blue/20 rounded-xl p-6 text-center">
                        <p className="text-white font-bold text-lg mb-2">{t("detailCtaTitle")}</p>
                        <p className="text-muted text-sm mb-4">{t("detailCtaBody")}</p>
                        <Link href="/build-planner" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-accent-blue to-accent-indigo rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all">
                            {t("detailCtaButton")} <ArrowRight className="h-4 w-4" />
                        </Link>
                    </section>
                </div>

                <div className="space-y-6">
                    <div className="bg-surface border border-border rounded-xl p-6 sticky top-24">
                        <h3 className="text-lg font-bold text-white mb-4">{t("detailInfoTitle")}</h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <div className="text-muted text-xs mb-1">{t("detailInfoBoss")}</div>
                                <div className="text-white font-medium">{raid.boss}</div>
                            </div>
                            <div>
                                <div className="text-muted text-xs mb-1">{t("detailInfoNpc")}</div>
                                <div className="text-white font-medium">{raid.npc}</div>
                            </div>
                            <div>
                                <div className="text-muted text-xs mb-1">{t("detailInfoLocation")}</div>
                                <div className="text-white text-sm flex items-start gap-1.5">
                                    <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                                    <span>{location}</span>
                                </div>
                            </div>
                            <div>
                                <div className="text-muted text-xs mb-1">{t("detailInfoShopItems")}</div>
                                <div className="text-white font-mono">{totalShop}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface border border-border rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">{t("detailQuickLinksTitle")}</h3>
                        <div className="space-y-2">
                            <Link href="/raids" className="flex items-center gap-2 text-sm text-muted hover:text-accent-blue transition-colors">
                                <ChevronRight className="h-3 w-3" /> {t("detailQuickAllRaids")}
                            </Link>
                            <Link href="/perks" className="flex items-center gap-2 text-sm text-muted hover:text-accent-blue transition-colors">
                                <ChevronRight className="h-3 w-3" /> {t("detailQuickAllPerks")}
                            </Link>
                            <Link href="/items" className="flex items-center gap-2 text-sm text-muted hover:text-accent-blue transition-colors">
                                <ChevronRight className="h-3 w-3" /> {t("detailQuickAllItems")}
                            </Link>
                            <Link href="/codes" className="flex items-center gap-2 text-sm text-muted hover:text-accent-blue transition-colors">
                                <ChevronRight className="h-3 w-3" /> {t("detailQuickActiveCodes")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
