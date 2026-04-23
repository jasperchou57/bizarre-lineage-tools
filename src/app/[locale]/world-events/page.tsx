import { Metadata } from "next";
import Image from "next/image";
import { ChevronRight, CheckCircle2, CircleHelp, Clock3, ExternalLink, ShieldAlert, Swords } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "WorldEvents" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
    }, "/world-events");
}

const OFFICIAL_WORLD_EVENT_CARD = "https://trello.com/c/YwXD6ymL";

const WORLD_EVENT_IMAGES = {
    graveyard: "https://trello.com/1/cards/69a48a326523bfba0a21ed90/attachments/69b6bb2e0232a2fb049dad90/previews/69b6bb2e0232a2fb049db020/download/image.webp",
    deathmatch: "https://trello.com/1/cards/69a48a326523bfba0a21ed90/attachments/69b6bb54b9721be5b3edd4f2/previews/69b6bb55b9721be5b3edd53d/download/image.webp",
};

export default async function WorldEventsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "WorldEvents" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    const events = [
        { id: "graveyard" as const, nameKey: "graveyardName", modeKey: "graveyardMode", descKey: "graveyardDesc", icon: <ShieldAlert className="h-6 w-6 text-green-400" />, imageUrl: WORLD_EVENT_IMAGES.graveyard },
        { id: "deathmatch" as const, nameKey: "deathmatchName", modeKey: "deathmatchMode", descKey: "deathmatchDesc", icon: <Swords className="h-6 w-6 text-accent-blue" />, imageUrl: WORLD_EVENT_IMAGES.deathmatch },
    ] as const;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: t("breadcrumbCurrent"), item: `${SITE_URL}/world-events` },
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

            <div className="relative w-full rounded-xl overflow-hidden mb-8">
                <Image src="/images/pages/world-events.png" alt={t("heroTitle")} width={800} height={450} className="w-full h-48 object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                <div className="absolute bottom-4 left-6">
                    <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white">{t("heroTitle")}</h1>
                </div>
            </div>
            <p className="text-lg text-muted mb-10 leading-relaxed">{t("heroIntro")}</p>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("snapshotTitle")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-surface border border-border rounded-xl p-5">
                        <div className="text-xs uppercase tracking-wide text-muted mb-2">{t("statCadence")}</div>
                        <div className="text-2xl font-bold text-white flex items-center gap-2">
                            <Clock3 className="h-5 w-5 text-accent-blue" /> {t("statCadenceValue")}
                        </div>
                    </div>
                    <div className="bg-surface border border-border rounded-xl p-5">
                        <div className="text-xs uppercase tracking-wide text-muted mb-2">{t("statModes")}</div>
                        <div className="text-2xl font-bold text-white">{events.length}</div>
                    </div>
                    <div className="bg-surface border border-border rounded-xl p-5">
                        <div className="text-xs uppercase tracking-wide text-muted mb-2">{t("statVerified")}</div>
                        <div className="text-2xl font-bold text-white">{t("statVerifiedValue")}</div>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">{t("eventsTitle")}</h2>
                <div className="space-y-6">
                    {events.map((event) => {
                        const name = t(event.nameKey as "graveyardName" | "deathmatchName");
                        const mode = t(event.modeKey as "graveyardMode" | "deathmatchMode");
                        const desc = t(event.descKey as "graveyardDesc" | "deathmatchDesc");
                        return (
                            <article key={event.id} className="bg-surface border border-border rounded-xl overflow-hidden">
                                <div className="relative aspect-[16/7] bg-background">
                                    <Image src={event.imageUrl} alt={name} width={1280} height={560} className="w-full h-full object-cover opacity-80" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 text-white mb-2">
                                                {event.icon}
                                                <h3 className="text-2xl font-bold">{name}</h3>
                                            </div>
                                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-white/80">{mode}</div>
                                        </div>
                                        <a href={OFFICIAL_WORLD_EVENT_CARD} target="_blank" rel="noopener noreferrer" className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-sm font-medium text-white hover:border-accent-blue/50 hover:text-accent-blue transition-colors">
                                            {t("officialCard")} <ExternalLink className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-sm text-muted leading-relaxed">{desc}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("confirmsTitle")}</h2>
                <div className="bg-surface border border-border rounded-xl p-6">
                    <ul className="space-y-3 text-sm text-muted">
                        {([1, 2, 3, 4] as const).map((n) => (
                            <li key={n} className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                                <span>{t(`confirm${n}` as `confirm${1 | 2 | 3 | 4}`)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("notSpecifiedTitle")}</h2>
                <div className="bg-surface border border-border rounded-xl p-6">
                    <ul className="space-y-3 text-sm text-muted">
                        {([1, 2, 3] as const).map((n) => (
                            <li key={n} className="flex items-start gap-3">
                                <CircleHelp className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                                <span>{t(`notSpec${n}` as `notSpec${1 | 2 | 3}`)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">{t("sourcesTitle")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="https://trello.com/b/wtzgwqIf" target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-xl p-5 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center gap-2">{t("sourceTrelloTitle")} <ExternalLink className="h-4 w-4" /></div>
                        <div className="text-xs text-muted mt-2">{t("sourceTrelloSub")}</div>
                    </a>
                    <a href="https://www.roblox.com/games/14890802310/Bizarre-Lineage" target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-xl p-5 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center gap-2">{t("sourceRobloxTitle")} <ExternalLink className="h-4 w-4" /></div>
                        <div className="text-xs text-muted mt-2">{t("sourceRobloxSub")}</div>
                    </a>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">{t("relatedTitle")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/items" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">{t("relatedItemsTitle")}</div>
                        <div className="text-xs text-muted mt-1">{t("relatedItemsSub")}</div>
                    </Link>
                    <Link href="/trello" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">{t("relatedTrelloTitle")}</div>
                        <div className="text-xs text-muted mt-1">{t("relatedTrelloSub")}</div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
