import type { Metadata } from "next";
import { ChevronRight, ExternalLink, UsersRound } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OFFICIAL_NPC_GROUPS } from "@/data/official-directory";
import { OFFICIAL_DATA_LAST_CHECKED } from "@/data/official-sources";
import { localize } from "@/lib/locale-copy";
import { withCanonical, SITE_URL } from "@/lib/metadata";

const NPC_COPY = {
    en: {
        metaTitle: "Bizarre Lineage NPC Directory | Official Trello NPCs",
        metaDescription: "Official Bizarre Lineage NPC directory from the public Trello, grouped into Main NPCs, Important NPCs, and Side Quest Givers with source notes.",
        breadcrumb: "NPCs",
        title: "Bizarre Lineage NPC Directory",
        intro: "{count} public official Trello NPC entries grouped by Main NPCs, Important NPCs, and Side Quest Givers.",
        checked: "Official data checked:",
        cardLabel: "Official Trello NPC card",
        howTitle: "How to use the NPC groups",
        howBody: "This directory is meant to reduce confusion when guides mention a quest giver, trainer, raid-related character, or progression NPC. The official Trello confirms the NPC names and grouping, while this site uses the groups to connect beginner guides, leveling notes, raid pages, and source checks. It does not claim exact spawn timers or complete route maps unless those details are visible in a public source.",
        groupNoteTitle: "Reading the groups",
        groupNotes: ["Main NPCs usually point to core progression or common interaction points.", "Important NPCs are useful when a guide needs a named character but the path is not a full quest chain.", "Side Quest Givers help separate optional task content from core progression so the wiki does not mix route advice with source facts."],
    },
    ru: {
        metaTitle: "NPC-директория Bizarre Lineage | Официальные NPC Trello",
        metaDescription: "Официальная NPC-директория Bizarre Lineage из публичного Trello, сгруппированная по Main NPCs, Important NPCs и Side Quest Givers.",
        breadcrumb: "NPC",
        title: "NPC-директория Bizarre Lineage",
        intro: "{count} публичные официальные записи NPC из Trello, сгруппированные по Main NPCs, Important NPCs и Side Quest Givers.",
        checked: "Официальные данные проверены:",
        cardLabel: "Официальная карточка NPC Trello",
        howTitle: "Как пользоваться группами NPC",
        howBody: "Эта директория нужна, чтобы уменьшить путаницу, когда гайды упоминают quest giver, trainer, raid-related character или progression NPC. Официальный Trello подтверждает имена NPC и группы, а сайт использует эти группы для связи beginner guides, leveling notes, raid pages и source checks. Здесь не утверждаются точные spawn timers или полные route maps, если они не видны в публичном источнике.",
        groupNoteTitle: "Как читать группы",
        groupNotes: ["Main NPCs обычно относятся к core progression или частым interaction points.", "Important NPCs полезны, когда гайду нужен named character, но это не полная quest chain.", "Side Quest Givers отделяют optional task content от core progression, чтобы wiki не смешивала route advice и source facts."],
    },
    pt: {
        metaTitle: "Diretório de NPCs de Bizarre Lineage | NPCs Oficiais do Trello",
        metaDescription: "Diretório oficial de NPCs de Bizarre Lineage a partir do Trello público, agrupado em Main NPCs, Important NPCs e Side Quest Givers.",
        breadcrumb: "NPCs",
        title: "Diretório de NPCs de Bizarre Lineage",
        intro: "{count} entradas públicas oficiais de NPC no Trello, agrupadas por Main NPCs, Important NPCs e Side Quest Givers.",
        checked: "Dados oficiais verificados em:",
        cardLabel: "Card oficial de NPC no Trello",
        howTitle: "Como usar os grupos de NPC",
        howBody: "Este diretório serve para reduzir confusão quando guias mencionam quest giver, trainer, personagem relacionado a raid ou NPC de progressão. O Trello oficial confirma nomes e grupos de NPCs, enquanto este site usa esses grupos para conectar guias de iniciante, notas de leveling, páginas de raid e checagens de fonte. Ele não afirma spawn timers exatos nem mapas completos de rota sem fonte pública visível.",
        groupNoteTitle: "Lendo os grupos",
        groupNotes: ["Main NPCs geralmente apontam para progressão central ou pontos comuns de interação.", "Important NPCs ajudam quando um guia precisa de um personagem nomeado, mas não de uma quest chain completa.", "Side Quest Givers separam conteúdo opcional da progressão principal para a wiki não misturar route advice com source facts."],
    },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const copy = localize(locale, NPC_COPY);
    return withCanonical({
        title: copy.metaTitle,
        description: copy.metaDescription,
    }, "/npcs");
}

export default async function NpcsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const tCommon = await getTranslations({ locale, namespace: "Common" });
    const totalNpcs = OFFICIAL_NPC_GROUPS.reduce((sum, group) => sum + group.entries.length, 0);
    const copy = localize(locale, NPC_COPY);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: copy.breadcrumb, item: `${SITE_URL}/npcs` },
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
                <UsersRound className="h-12 w-12 text-accent-blue" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">{copy.title}</h1>
            </div>
            <p className="text-lg text-muted leading-relaxed max-w-3xl mb-3">
                {copy.intro.replace("{count}", String(totalNpcs))}
            </p>
            <p className="text-sm text-muted mb-10">{copy.checked} {OFFICIAL_DATA_LAST_CHECKED}</p>

            <section className="bg-surface border border-border rounded-xl p-6 mb-10">
                <h2 className="text-2xl font-bold text-white mb-3">{copy.howTitle}</h2>
                <p className="text-muted leading-relaxed mb-5">{copy.howBody}</p>
                <h3 className="font-bold text-white mb-3">{copy.groupNoteTitle}</h3>
                <ul className="space-y-2 text-sm text-muted leading-relaxed">
                    {copy.groupNotes.map((note) => (
                        <li key={note} className="flex gap-2">
                            <span className="text-accent-blue">•</span>
                            <span>{note}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {OFFICIAL_NPC_GROUPS.map((group) => (
                <section key={group.group} className="mb-10">
                    <h2 className="text-2xl font-bold text-white mb-4">{group.group} <span className="text-sm text-muted font-normal">({group.entries.length})</span></h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {group.entries.map((npc) => (
                            <a key={`${group.group}-${npc.name}`} href={npc.sourceUrl} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                                <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center justify-between gap-3">
                                    <span>{npc.name}</span>
                                    <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                                </div>
                                <div className="text-xs text-muted mt-1">{copy.cardLabel}</div>
                            </a>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
