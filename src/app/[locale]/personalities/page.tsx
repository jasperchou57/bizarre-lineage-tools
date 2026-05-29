import type { Metadata } from "next";
import { ChevronRight, ExternalLink, Sparkles } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OFFICIAL_PERSONALITIES, PERSONALITY_SOURCE_URL, PERSONALITY_TIERS } from "@/data/personalities";
import { OFFICIAL_DATA_LAST_CHECKED } from "@/data/official-sources";
import { localize } from "@/lib/locale-copy";
import { withCanonical, SITE_URL } from "@/lib/metadata";

const PERSONALITY_COPY = {
    en: {
        metaTitle: "Bizarre Lineage Personalities | Official Trello Effects",
        metaDescription: "All Bizarre Lineage Stand Personalities documented on the official Trello, grouped by rarity tier with effect text and source boundaries.",
        breadcrumb: "Personalities",
        title: "Bizarre Lineage Personalities",
        intro: "Official Trello personality effects, grouped by rarity. This page does not add planner rankings or hidden roll odds.",
        checked: "Official data checked:",
        sourceTitle: "Official source boundary",
        sourceBody: "Effects come from the public official Trello Personalities card. Roll rates and best-in-slot rankings are not published there.",
        officialCard: "Official card",
        countLabel: "personalities",
        howTitle: "How to read personality effects",
        howBody: "Personalities change how a Stand feels, but the public source does not publish exact roll odds or a universal tier list. This page keeps the official effect text visible first, then lets players compare the tradeoffs with their own build goals. Use it to understand what a personality does before deciding whether a reroll or farm route is worth your time.",
        tips: ["Match the effect to your Stand's role instead of chasing rarity alone.", "If a personality changes damage, defense, cooldowns, or meter behavior, test it with the same stats before and after.", "Treat any personality ranking as community or planner judgment unless it links to a public official source."],
    },
    ru: {
        metaTitle: "Personalities Bizarre Lineage | Официальные эффекты Trello",
        metaDescription: "Все Stand Personalities Bizarre Lineage из официального Trello, сгруппированные по редкости с эффектами и границами источников.",
        breadcrumb: "Personalities",
        title: "Personalities Bizarre Lineage",
        intro: "Официальные эффекты personality из Trello, сгруппированные по редкости. Эта страница не добавляет planner rankings или скрытые roll odds.",
        checked: "Официальные данные проверены:",
        sourceTitle: "Граница официального источника",
        sourceBody: "Эффекты взяты из публичной официальной карточки Trello Personalities. Roll rates и best-in-slot rankings там не опубликованы.",
        officialCard: "Официальная карточка",
        countLabel: "personalities",
        howTitle: "Как читать эффекты personality",
        howBody: "Personalities меняют ощущение Стенда, но публичный источник не публикует точные roll odds или универсальный tier list. Эта страница сначала показывает официальный текст эффекта, а затем помогает игроку сравнить tradeoffs со своими целями билда. Используйте ее, чтобы понять, что делает personality, прежде чем решать, стоит ли reroll или farm route вашего времени.",
        tips: ["Соотносите эффект с ролью Стенда, а не гонитесь только за rarity.", "Если personality меняет damage, defense, cooldowns или meter behavior, тестируйте с одинаковыми stats до и после.", "Любой personality ranking считайте community или planner judgment, если он не ссылается на публичный официальный источник."],
    },
    pt: {
        metaTitle: "Personalities de Bizarre Lineage | Efeitos Oficiais do Trello",
        metaDescription: "Todas as Stand Personalities de Bizarre Lineage documentadas no Trello oficial, agrupadas por raridade com texto de efeito e limites de fonte.",
        breadcrumb: "Personalities",
        title: "Personalities de Bizarre Lineage",
        intro: "Efeitos oficiais de personality no Trello, agrupados por raridade. Esta página não adiciona rankings do planejador nem roll odds ocultos.",
        checked: "Dados oficiais verificados em:",
        sourceTitle: "Limite da fonte oficial",
        sourceBody: "Os efeitos vêm do card público oficial Personalities no Trello. Roll rates e rankings best-in-slot não são publicados lá.",
        officialCard: "Card oficial",
        countLabel: "personalities",
        howTitle: "Como ler efeitos de personality",
        howBody: "Personalities mudam a sensação de um Stand, mas a fonte pública não publica roll odds exatos nem uma tier list universal. Esta página mantém o texto oficial do efeito em primeiro lugar e deixa o jogador comparar tradeoffs com seus objetivos de build. Use para entender o que uma personality faz antes de decidir se reroll ou farm vale seu tempo.",
        tips: ["Combine o efeito com o papel do seu Stand em vez de perseguir apenas raridade.", "Se uma personality altera dano, defesa, cooldowns ou comportamento de meter, teste com os mesmos stats antes e depois.", "Trate qualquer ranking de personality como julgamento da comunidade ou do planejador se não houver fonte pública oficial."],
    },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const copy = localize(locale, PERSONALITY_COPY);
    return withCanonical({
        title: copy.metaTitle,
        description: copy.metaDescription,
    }, "/personalities");
}

const TIER_COLORS: Record<string, string> = {
    Mythical: "text-purple-300 bg-purple-400/10 border-purple-400/20",
    Legendary: "text-yellow-300 bg-yellow-400/10 border-yellow-400/20",
    Rare: "text-blue-300 bg-blue-400/10 border-blue-400/20",
    Uncommon: "text-green-300 bg-green-400/10 border-green-400/20",
    Common: "text-gray-300 bg-gray-400/10 border-gray-400/20",
};

export default async function PersonalitiesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const tCommon = await getTranslations({ locale, namespace: "Common" });
    const copy = localize(locale, PERSONALITY_COPY);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: copy.breadcrumb, item: `${SITE_URL}/personalities` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">{copy.breadcrumb}</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <Sparkles className="h-12 w-12 text-purple-300" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">{copy.title}</h1>
            </div>
            <p className="text-lg text-muted leading-relaxed max-w-3xl mb-3">
                {copy.intro}
            </p>
            <p className="text-sm text-muted mb-10">{copy.checked} {OFFICIAL_DATA_LAST_CHECKED}</p>

            <section className="bg-surface border border-border rounded-xl p-6 mb-10">
                <h2 className="text-2xl font-bold text-white mb-3">{copy.howTitle}</h2>
                <p className="text-muted leading-relaxed mb-5">{copy.howBody}</p>
                <ul className="space-y-2 text-sm text-muted leading-relaxed">
                    {copy.tips.map((tip) => (
                        <li key={tip} className="flex gap-2">
                            <span className="text-purple-300">•</span>
                            <span>{tip}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mb-10 bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-white mb-1">{copy.sourceTitle}</h2>
                        <p className="text-sm text-muted">{copy.sourceBody}</p>
                    </div>
                    <a href={PERSONALITY_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-accent-blue hover:text-white transition-colors">
                        {copy.officialCard} <ExternalLink className="h-4 w-4" />
                    </a>
                </div>
            </section>

            {PERSONALITY_TIERS.map((tier) => {
                const personalities = OFFICIAL_PERSONALITIES.filter((item) => item.tier === tier);
                return (
                    <section key={tier} className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full border ${TIER_COLORS[tier]}`}>{tier}</span>
                            <span>{personalities.length} {copy.countLabel}</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {personalities.map((personality) => (
                                <article key={personality.name} className="bg-surface border border-border rounded-xl p-5">
                                    <h3 className="text-lg font-bold text-white mb-2">{personality.name}</h3>
                                    <p className="text-sm text-muted leading-relaxed">{personality.effect}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
