import { Metadata } from "next";
import Image from "next/image";
import { ChevronRight, MapPin, ShoppingBag, HelpCircle, Info } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { withCanonical, SITE_URL } from "@/lib/metadata";
import raidsData from "@/data/raids.json";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Raids" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
    }, "/raids");
}

export default async function RaidsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Raids" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: t("breadcrumbCurrent"), item: `${SITE_URL}/raids` },
        ],
    };

    const faqIds = [1, 2, 3, 4] as const;
    const faqData = faqIds.map((id) => ({
        q: t(`faq.q${id}` as `faq.q${1 | 2 | 3 | 4}`),
        a: t(`faq.a${id}` as `faq.a${1 | 2 | 3 | 4}`),
    }));

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqData.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <nav className="flex items-center text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-white" aria-current="page">{t("breadcrumbCurrent")}</span>
            </nav>

            <div className="mb-12">
                <div className="relative w-full rounded-xl overflow-hidden mb-6">
                    <Image src="/images/pages/raids.png" alt={t("heroTitle")} width={800} height={450} className="w-full h-48 object-cover opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                        <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white">{t("heroTitle")}</h1>
                    </div>
                </div>
                <p className="text-lg text-muted max-w-3xl">{t("heroIntro")}</p>
            </div>

            <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-4 mb-10 flex gap-3 text-sm text-muted">
                <Info className="h-5 w-5 text-accent-blue shrink-0 mt-0.5" />
                <div>
                    <p className="text-white font-medium mb-1">{t("verifiedTitle")}</p>
                    <p>
                        {t.rich("verifiedBody", {
                            strong: (chunks) => <strong>{chunks}</strong>,
                        })}
                    </p>
                </div>
            </div>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("allRaidsTitle")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {raidsData.map((raid) => (
                        <Link key={raid.id} href={`/raids/${raid.id}`} className="bg-surface border border-border rounded-xl overflow-hidden hover:border-accent-blue/50 transition-colors group flex flex-col sm:flex-row">
                            {raid.imageUrl && (
                                <div className="relative w-full sm:w-40 shrink-0 aspect-[4/3] sm:aspect-auto sm:h-auto bg-background">
                                    <Image src={raid.imageUrl} alt={raid.boss} fill sizes="(max-width: 640px) 100vw, 160px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                </div>
                            )}
                            <div className="p-5 flex-1">
                                <h3 className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors mb-2">{raid.boss}</h3>
                                <div className="text-sm text-muted mb-2 flex items-start gap-1.5">
                                    <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                                    <span>{t(`locations.${raid.id}` as `locations.${"avdol" | "kira" | "jotaro" | "dio"}`)}</span>
                                </div>
                                <div className="text-sm text-muted mb-3 flex items-center gap-1.5">
                                    <ShoppingBag className="h-3.5 w-3.5" />
                                    <span>{t("shopItems", { count: raid.shopItems.length })}</span>
                                </div>
                                <div className="flex items-center text-sm text-accent-blue group-hover:translate-x-1 transition-transform">
                                    {t("viewShopCta")} <ChevronRight className="h-4 w-4 ml-1" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-accent-blue" /> {t("faqTitle")}
                </h2>
                <div className="space-y-3">
                    {faqData.map((faq) => (
                        <details key={faq.q} className="group bg-surface border border-border rounded-lg">
                            <summary className="cursor-pointer p-4 text-white font-medium flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg">
                                {faq.q}
                                <ChevronRight className="h-4 w-4 text-muted group-open:rotate-90 transition-transform shrink-0 ml-2" />
                            </summary>
                            <div className="px-4 pb-4 text-muted text-sm leading-relaxed">{faq.a}</div>
                        </details>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">{t("relatedTitle")}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Link href="/perks" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">{t("relatedPerks")}</Link>
                    <Link href="/items" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">{t("relatedItems")}</Link>
                    <Link href="/build-planner" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">{t("relatedBuildPlanner")}</Link>
                    <Link href="/codes" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">{t("relatedCodes")}</Link>
                </div>
            </section>
        </div>
    );
}
