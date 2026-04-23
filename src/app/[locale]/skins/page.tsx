import Image from "next/image";
import { ChevronRight, ExternalLink } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import skinsData from "@/data/skins.json";
import standsData from "@/data/stands.json";
import { getStandImagePath } from "@/data/stand-media";
import { withCanonical } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Skins" });
    return withCanonical({
        title: t("metaTitle", { count: skinsData.length }),
        description: t("metaDescription", { count: skinsData.length }),
    }, "/skins");
}

const RARITY_COLORS: Record<string, string> = {
    Common: "text-gray-300 bg-gray-300/10 border-gray-300/20",
    Rare: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    Legendary: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    Mythical: "text-purple-400 bg-purple-400/10 border-purple-400/20",
};

type Skin = (typeof skinsData)[number];

export default async function SkinsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Skins" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    const standOrder = new Map(standsData.map((stand, index) => [stand.name, index]));
    const standIdByName = new Map(standsData.map((stand) => [stand.name, stand.id]));
    const groupedSkins = skinsData.reduce<Record<string, Skin[]>>((acc, skin) => {
        if (!acc[skin.stand]) {
            acc[skin.stand] = [];
        }
        acc[skin.stand].push(skin);
        return acc;
    }, {});

    const standGroups = Object.entries(groupedSkins)
        .map(([stand, skins]) => ({
            stand,
            standId: standsData.find((entry) => entry.name === stand)?.id,
            skins: skins.slice().sort((left, right) => left.skinName.localeCompare(right.skinName)),
        }))
        .sort((left, right) => {
            const leftOrder = standOrder.get(left.stand) ?? Number.MAX_SAFE_INTEGER;
            const rightOrder = standOrder.get(right.stand) ?? Number.MAX_SAFE_INTEGER;
            return leftOrder - rightOrder || left.stand.localeCompare(right.stand);
        });

    const commonTaggedCount = skinsData.filter((skin) => skin.rarity === "Common").length;

    const faqIds = [1, 2, 3] as const;

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <nav className="flex items-center text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-white" aria-current="page">{t("breadcrumbCurrent")}</span>
            </nav>

            <div className="mb-10 text-center md:text-left">
                <h1 className="text-4xl font-heading font-extrabold text-white mb-4">{t("heroTitle")}</h1>
                <p className="text-lg text-muted max-w-3xl">
                    {t("heroIntro", { skinCount: skinsData.length, standCount: standGroups.length })}
                </p>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6 mb-12">
                <h2 className="text-xl font-bold text-white mb-3">{t("howToGetTitle")}</h2>
                <p className="text-sm text-muted leading-relaxed">
                    {t.rich("howToGetBody", {
                        strong: (chunks) => <strong className="text-white">{chunks}</strong>,
                    })}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                <div className="bg-surface border border-border rounded-xl p-5">
                    <div className="text-xs uppercase tracking-wide text-muted mb-2">{t("statOfficialEntries")}</div>
                    <div className="text-2xl font-bold text-white">{skinsData.length}</div>
                </div>
                <div className="bg-surface border border-border rounded-xl p-5">
                    <div className="text-xs uppercase tracking-wide text-muted mb-2">{t("statStandFamilies")}</div>
                    <div className="text-2xl font-bold text-white">{standGroups.length}</div>
                </div>
                <div className="bg-surface border border-border rounded-xl p-5">
                    <div className="text-xs uppercase tracking-wide text-muted mb-2">{t("statCommon")}</div>
                    <div className="text-2xl font-bold text-white">{commonTaggedCount}</div>
                </div>
            </div>

            {standGroups.map(({ stand, standId, skins }) => (
                <section key={stand} className="mb-12">
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                {standId ? (
                                    <Link href={`/stands/${standId}`} className="hover:text-accent-blue transition-colors">
                                        {stand}
                                    </Link>
                                ) : (
                                    stand
                                )}
                            </h2>
                            <p className="text-sm text-muted mt-1">
                                {skins.length > 1
                                    ? t("officialListingPlural", { count: skins.length })
                                    : t("officialListingSingular", { count: skins.length })}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {skins.map((skin) => (
                            <article
                                key={skin.id}
                                className="bg-surface border border-border rounded-xl overflow-hidden hover:border-white/20 transition-all group"
                            >
                                <div className="relative aspect-[4/3] bg-background">
                                    {(() => {
                                        if (skin.imageUrl) {
                                            return (
                                                <Image
                                                    src={skin.imageUrl}
                                                    alt={skin.name}
                                                    width={320}
                                                    height={240}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                            );
                                        }
                                        const isGrayscaleSkin = /^grey?scale$/i.test(skin.skinName);
                                        const sid = standIdByName.get(skin.stand);
                                        if (isGrayscaleSkin && sid) {
                                            return (
                                                <Image
                                                    src={getStandImagePath(sid)}
                                                    alt={`${skin.name} — grayscale render of ${skin.stand}`}
                                                    width={320}
                                                    height={240}
                                                    className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                            );
                                        }
                                        return (
                                            <div className="flex h-full items-center justify-center px-4 text-center text-xs text-muted">
                                                {tCommon("previewUnavailable")}
                                            </div>
                                        );
                                    })()}
                                </div>
                                <div className="p-3">
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <h3 className="font-bold text-white text-sm">{skin.skinName}</h3>
                                        {skin.rarity && (
                                            <span className={`px-2 py-1 text-[10px] font-mono font-bold uppercase rounded-full border ${RARITY_COLORS[skin.rarity]}`}>
                                                {skin.rarity}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted mb-3">
                                        {skin.rarity ? tCommon("rarityCaption") : tCommon("noRarityCaption")}
                                    </p>
                                    <a
                                        href={skin.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs text-accent-blue hover:text-white transition-colors"
                                    >
                                        {tCommon("officialCard")} <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            ))}

            <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6">{t("faqTitle")}</h2>
                <div className="space-y-4">
                    {faqIds.map((id) => (
                        <details key={id} className="group bg-surface border border-border rounded-xl overflow-hidden">
                            <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                                <span className="font-medium text-white pr-4">{t(`faq.q${id}` as `faq.q${1 | 2 | 3}`)}</span>
                                <ChevronRight className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-90 transition-transform" />
                            </summary>
                            <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                                {t(`faq.a${id}` as `faq.a${1 | 2 | 3}`)}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
}
