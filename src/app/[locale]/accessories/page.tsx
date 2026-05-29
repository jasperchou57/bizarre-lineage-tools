import type { Metadata } from "next";
import { ChevronRight, ExternalLink, Gem } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ACCESSORY_RARITIES, ACCESSORIES_SOURCE_URL, OFFICIAL_ACCESSORIES } from "@/data/accessories";
import { OFFICIAL_DATA_LAST_CHECKED } from "@/data/official-sources";
import { localize } from "@/lib/locale-copy";
import { withCanonical, SITE_URL } from "@/lib/metadata";

const ACCESSORIES_COPY = {
    en: {
        metaTitle: "Bizarre Lineage Accessories | Official Trello List",
        metaDescription: "Official Bizarre Lineage accessories listed on the public Trello, grouped by rarity with source links and verification guidance.",
        breadcrumb: "Accessories",
        title: "Bizarre Lineage Accessories",
        intro: "The official Trello currently lists {count} accessory cards. This page mirrors names and rarity labels only; stat rolls are not inferred here.",
        checked: "Official data checked:",
        warning: "Accessory effects and stat rolls should be verified in-game unless the public Trello card explicitly publishes them.",
        officialTrello: "Official Trello",
        cardLabel: "Official Trello card",
        countLabel: "accessories",
        howTitle: "How this list adds value",
        howBody: "The raw Trello board is useful, but it is not sorted for quick comparison. This page groups every visible accessory card by rarity so a player can scan which names belong to Common, Uncommon, Rare, Legendary, or Mythical before checking the card itself. It deliberately avoids inventing hidden stat rolls, drop rates, trading prices, or best-in-slot rankings.",
        checklistTitle: "Before farming or trading",
        checklist: ["Open the linked official card for the accessory name you care about.", "Confirm in-game whether the current server shows the same rarity or effect behavior.", "Treat any value, drop-rate, or stat-roll claim as community data unless it has a public official source."],
    },
    ru: {
        metaTitle: "Аксессуары Bizarre Lineage | Официальный список Trello",
        metaDescription: "Официальные аксессуары Bizarre Lineage из публичного Trello, сгруппированные по редкости со ссылками и правилами проверки.",
        breadcrumb: "Аксессуары",
        title: "Аксессуары Bizarre Lineage",
        intro: "Официальный Trello сейчас содержит {count} карточки аксессуаров. Эта страница отражает только названия и rarity labels; stat rolls здесь не выдумываются.",
        checked: "Официальные данные проверены:",
        warning: "Эффекты аксессуаров и stat rolls нужно проверять в игре, если публичная карточка Trello не публикует их явно.",
        officialTrello: "Официальный Trello",
        cardLabel: "Официальная карточка Trello",
        countLabel: "аксессуаров",
        howTitle: "Как этот список добавляет ценность",
        howBody: "Сырая доска Trello полезна, но она не отсортирована для быстрого сравнения. Эта страница группирует все видимые карточки аксессуаров по редкости, чтобы игрок быстро видел, какие названия относятся к Common, Uncommon, Rare, Legendary или Mythical, а затем открывал саму карточку. Мы специально не выдумываем hidden stat rolls, drop rates, trading prices или best-in-slot рейтинги.",
        checklistTitle: "Перед фармом или трейдом",
        checklist: ["Откройте связанную официальную карточку нужного аксессуара.", "Проверьте в игре, показывает ли текущий сервер ту же rarity или effect behavior.", "Считайте любые value, drop-rate или stat-roll утверждения community data, если нет публичного официального источника."],
    },
    pt: {
        metaTitle: "Acessórios de Bizarre Lineage | Lista Oficial do Trello",
        metaDescription: "Acessórios oficiais de Bizarre Lineage no Trello público, agrupados por raridade com links de fonte e orientação de verificação.",
        breadcrumb: "Acessórios",
        title: "Acessórios de Bizarre Lineage",
        intro: "O Trello oficial atualmente lista {count} cards de acessórios. Esta página espelha apenas nomes e raridades; stat rolls não são inferidos aqui.",
        checked: "Dados oficiais verificados em:",
        warning: "Efeitos e stat rolls de acessórios devem ser verificados no jogo, a menos que o card público do Trello publique isso explicitamente.",
        officialTrello: "Trello oficial",
        cardLabel: "Card oficial do Trello",
        countLabel: "acessórios",
        howTitle: "Como esta lista agrega valor",
        howBody: "O board bruto do Trello é útil, mas não é organizado para comparação rápida. Esta página agrupa cada card visível de acessório por raridade para que o jogador veja rapidamente quais nomes pertencem a Common, Uncommon, Rare, Legendary ou Mythical antes de abrir o card. Ela evita inventar hidden stat rolls, drop rates, preços de trade ou rankings best-in-slot.",
        checklistTitle: "Antes de farmar ou trocar",
        checklist: ["Abra o card oficial vinculado ao acessório que você quer.", "Confirme no jogo se o servidor atual mostra a mesma raridade ou comportamento de efeito.", "Trate qualquer valor, drop-rate ou stat-roll como dado da comunidade se não houver fonte pública oficial."],
    },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const copy = localize(locale, ACCESSORIES_COPY);
    return withCanonical({
        title: copy.metaTitle,
        description: copy.metaDescription,
    }, "/accessories");
}

const RARITY_COLORS: Record<string, string> = {
    Common: "text-gray-300 bg-gray-400/10 border-gray-400/20",
    Uncommon: "text-green-300 bg-green-400/10 border-green-400/20",
    Rare: "text-blue-300 bg-blue-400/10 border-blue-400/20",
    Legendary: "text-yellow-300 bg-yellow-400/10 border-yellow-400/20",
    Mythical: "text-purple-300 bg-purple-400/10 border-purple-400/20",
};

export default async function AccessoriesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const tCommon = await getTranslations({ locale, namespace: "Common" });
    const copy = localize(locale, ACCESSORIES_COPY);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: copy.breadcrumb, item: `${SITE_URL}/accessories` },
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
                <Gem className="h-12 w-12 text-yellow-300" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">{copy.title}</h1>
            </div>
            <p className="text-lg text-muted leading-relaxed max-w-3xl mb-3">
                {copy.intro.replace("{count}", String(OFFICIAL_ACCESSORIES.length))}
            </p>
            <p className="text-sm text-muted mb-10">{copy.checked} {OFFICIAL_DATA_LAST_CHECKED}</p>

            <section className="bg-surface border border-border rounded-xl p-6 mb-10">
                <h2 className="text-2xl font-bold text-white mb-3">{copy.howTitle}</h2>
                <p className="text-muted leading-relaxed mb-5">{copy.howBody}</p>
                <h3 className="font-bold text-white mb-3">{copy.checklistTitle}</h3>
                <ul className="space-y-2 text-sm text-muted leading-relaxed">
                    {copy.checklist.map((item) => (
                        <li key={item} className="flex gap-2">
                            <span className="text-yellow-300">•</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mb-10 bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-sm text-muted">{copy.warning}</p>
                <a href={ACCESSORIES_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-accent-blue hover:text-white transition-colors">
                    {copy.officialTrello} <ExternalLink className="h-4 w-4" />
                </a>
            </section>

            {ACCESSORY_RARITIES.map((rarity) => {
                const accessories = OFFICIAL_ACCESSORIES.filter((item) => item.rarity === rarity);
                return (
                    <section key={rarity} className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full border ${RARITY_COLORS[rarity]}`}>{rarity}</span>
                            <span>{accessories.length} {copy.countLabel}</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {accessories.map((item) => (
                                <a key={item.name} href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                                    <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center justify-between gap-3">
                                        <span>{item.name}</span>
                                        <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                                    </div>
                                    <div className="text-xs text-muted mt-1">{copy.cardLabel}</div>
                                </a>
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
