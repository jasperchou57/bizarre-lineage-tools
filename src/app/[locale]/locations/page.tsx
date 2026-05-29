import type { Metadata } from "next";
import { ChevronRight, ExternalLink, MapPin } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OFFICIAL_REGIONS } from "@/data/official-directory";
import { OFFICIAL_DATA_LAST_CHECKED } from "@/data/official-sources";
import { localize } from "@/lib/locale-copy";
import { withCanonical, SITE_URL } from "@/lib/metadata";

const LOCATION_COPY = {
    en: {
        metaTitle: "Bizarre Lineage Map & Locations | Official Trello Regions",
        metaDescription: "Official Bizarre Lineage regions and map-related Trello cards, with source notes and practical route-planning guidance.",
        breadcrumb: "Locations",
        title: "Bizarre Lineage Locations",
        intro: "Region and map entries currently listed on the official Trello. This page is a source-linked directory plus a practical reading guide, not a fan-made coordinate map.",
        checked: "Official data checked:",
        cardLabel: "Official Trello region card",
        howTitle: "How to use this location list",
        howBody: "Use these entries as stable anchor names when reading guides, NPC pages, raid pages, and item notes. The public Trello confirms that these locations exist as region or map cards, but it does not publish a complete coordinate grid, step-by-step route map, spawn timer table, or every NPC path. For that reason, this page keeps official location names separate from site-maintained routing advice.",
        confirmedTitle: "Confirmed by the public Trello",
        confirmedItems: ["The region names listed below are public official Trello cards.", "Location cards are useful for matching NPC, raid, and quest references across the wiki.", "When a guide names a bus stop, chapel, gym, station, docks, or hospital, this directory helps keep the wording consistent."],
        notConfirmedTitle: "Not claimed on this page",
        notConfirmedItems: ["Exact coordinates, fastest routes, and spawn timers are not treated as official unless a public source states them.", "Community map callouts should be tested in-game before being written as route instructions.", "If a future update changes the map, region cards should be rechecked before older pathing advice is reused."],
    },
    ru: {
        metaTitle: "Карта и локации Bizarre Lineage | Официальные регионы Trello",
        metaDescription: "Официальные регионы Bizarre Lineage и карточки карты Trello с заметками по источникам и практическим использованием.",
        breadcrumb: "Локации",
        title: "Локации Bizarre Lineage",
        intro: "Регионы и записи карты, которые сейчас есть в официальном Trello. Это директория с источниками и пояснениями, а не фанатская карта с координатами.",
        checked: "Официальные данные проверены:",
        cardLabel: "Официальная карточка региона Trello",
        howTitle: "Как пользоваться списком локаций",
        howBody: "Используйте эти записи как стабильные названия мест при чтении гайдов, страниц NPC, raid-страниц и заметок по предметам. Публичный Trello подтверждает существование этих локаций как карточек region/map, но не публикует полную сетку координат, пошаговую карту маршрутов, таблицу spawn timer или каждый путь к NPC. Поэтому здесь официальные названия отделены от site-maintained советов по маршрутам.",
        confirmedTitle: "Что подтверждает публичный Trello",
        confirmedItems: ["Названия регионов ниже являются публичными официальными карточками Trello.", "Карточки локаций помогают сопоставлять NPC, raid и quest-упоминания на сайте.", "Когда гайд говорит о bus stop, chapel, gym, station, docks или hospital, эта директория сохраняет единые формулировки."],
        notConfirmedTitle: "Что эта страница не утверждает",
        notConfirmedItems: ["Точные координаты, fastest routes и spawn timers не считаются официальными без публичного источника.", "Community map callouts нужно проверять в игре перед записью как route instructions.", "Если будущее обновление меняет карту, карточки регионов нужно перепроверить до повторного использования старых маршрутов."],
    },
    pt: {
        metaTitle: "Mapa e Localizações de Bizarre Lineage | Regiões Oficiais do Trello",
        metaDescription: "Regiões oficiais de Bizarre Lineage e cards de mapa do Trello com notas de fonte e orientação prática de rota.",
        breadcrumb: "Localizações",
        title: "Localizações de Bizarre Lineage",
        intro: "Regiões e entradas de mapa atualmente listadas no Trello oficial. Esta página é um diretório com fontes e guia de leitura, não um mapa de coordenadas feito por fãs.",
        checked: "Dados oficiais verificados em:",
        cardLabel: "Card oficial de região no Trello",
        howTitle: "Como usar esta lista de locais",
        howBody: "Use estas entradas como nomes estáveis ao ler guias, páginas de NPCs, raids e notas de itens. O Trello público confirma que esses locais existem como cards de região ou mapa, mas não publica uma grade completa de coordenadas, mapa passo a passo, tabela de spawn timer ou todos os caminhos de NPC. Por isso, esta página separa nomes oficiais de conselhos de rota mantidos pelo site.",
        confirmedTitle: "Confirmado pelo Trello público",
        confirmedItems: ["Os nomes de região abaixo são cards públicos oficiais do Trello.", "Cards de localização ajudam a cruzar referências de NPC, raid e quest dentro da wiki.", "Quando um guia cita bus stop, chapel, gym, station, docks ou hospital, este diretório mantém a nomenclatura consistente."],
        notConfirmedTitle: "O que esta página não afirma",
        notConfirmedItems: ["Coordenadas exatas, rotas mais rápidas e spawn timers não são tratados como oficiais sem fonte pública.", "Callouts de mapas da comunidade devem ser testados no jogo antes de virarem instruções de rota.", "Se um update futuro mudar o mapa, os cards de região devem ser rechecados antes de reutilizar rotas antigas."],
    },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const copy = localize(locale, LOCATION_COPY);
    return withCanonical({
        title: copy.metaTitle,
        description: copy.metaDescription,
    }, "/locations");
}

export default async function LocationsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const tCommon = await getTranslations({ locale, namespace: "Common" });
    const copy = localize(locale, LOCATION_COPY);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: copy.breadcrumb, item: `${SITE_URL}/locations` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">{copy.breadcrumb}</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <MapPin className="h-12 w-12 text-green-400" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">{copy.title}</h1>
            </div>
            <p className="text-lg text-muted leading-relaxed max-w-3xl mb-3">
                {copy.intro}
            </p>
            <p className="text-sm text-muted mb-10">{copy.checked} {OFFICIAL_DATA_LAST_CHECKED}</p>

            <section className="bg-surface border border-border rounded-xl p-6 mb-10">
                <h2 className="text-2xl font-bold text-white mb-3">{copy.howTitle}</h2>
                <p className="text-muted leading-relaxed">{copy.howBody}</p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <InfoBox title={copy.confirmedTitle} items={copy.confirmedItems} />
                <InfoBox title={copy.notConfirmedTitle} items={copy.notConfirmedItems} />
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {OFFICIAL_REGIONS.map((region) => (
                    <a key={region.name} href={region.sourceUrl} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-xl p-5 hover:border-green-500/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-green-400 transition-colors flex items-center justify-between gap-3">
                            <span>{region.name}</span>
                            <ExternalLink className="h-4 w-4 shrink-0" />
                        </div>
                        <div className="text-xs text-muted mt-2">{copy.cardLabel}</div>
                    </a>
                ))}
            </section>
        </div>
    );
}

function InfoBox({ title, items }: { title: string; items: readonly string[] }) {
    return (
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h2 className="text-lg font-bold text-white mb-3">{title}</h2>
            <ul className="space-y-2 text-sm text-muted leading-relaxed">
                {items.map((item) => (
                    <li key={item} className="flex gap-2">
                        <span className="text-green-400">•</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
