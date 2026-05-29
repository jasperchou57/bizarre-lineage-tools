import type { Metadata } from "next";
import { ChevronRight, ExternalLink, Keyboard } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OFFICIAL_KEYBINDS } from "@/data/official-game-data";
import { OFFICIAL_DATA_LAST_CHECKED, OFFICIAL_LINKS } from "@/data/official-sources";
import { localize } from "@/lib/locale-copy";
import { withCanonical, SITE_URL } from "@/lib/metadata";

const CONTROL_COPY = {
    en: {
        metaTitle: "Bizarre Lineage Controls & Keybinds | Official Roblox + Trello",
        metaDescription: "Official Bizarre Lineage controls and keybinds from the Roblox game description and public official Trello Keybinds card.",
        breadcrumb: "Controls",
        title: "Bizarre Lineage Controls",
        intro: "Official Roblox description controls plus the more complete public Trello Keybinds card. Keybinds may be changeable through the in-game cogwheel.",
        checked: "Official data checked:",
        input: "Input",
        action: "Official action",
        robloxTitle: "Roblox game page",
        robloxDesc: "Public description and base controls.",
        keybindsTitle: "Official Keybinds card",
        keybindsDesc: "Inventory, slide, mount, weapon, and Eagle Vision keybinds.",
        usageTitle: "Why this page matters",
        usageBody: "Controls are a gameplay utility page, but they also support the rest of the wiki. Build routes often depend on dash, block, summon, awakening, weapon, and inventory timing. Keeping Roblox description controls separate from the Trello Keybinds card makes it clear which inputs are listed where, and avoids turning community shortcuts into official claims.",
        tips: ["Use this page before following combo notes that mention dash, block, slide, or weapon inputs.", "If a keybind does not work, check the in-game cogwheel because controls may be changeable.", "For planner testing, write down the Stand move, fighting style move, and defensive input separately."],
    },
    ru: {
        metaTitle: "Управление и клавиши Bizarre Lineage | Roblox + официальный Trello",
        metaDescription: "Официальное управление Bizarre Lineage из описания Roblox и публичной карточки Keybinds в Trello.",
        breadcrumb: "Управление",
        title: "Управление Bizarre Lineage",
        intro: "Официальные controls из описания Roblox плюс более полная публичная карточка Trello Keybinds. Клавиши могут меняться через in-game cogwheel.",
        checked: "Официальные данные проверены:",
        input: "Клавиша",
        action: "Официальное действие",
        robloxTitle: "Страница игры Roblox",
        robloxDesc: "Публичное описание и базовое управление.",
        keybindsTitle: "Официальная карточка Keybinds",
        keybindsDesc: "Inventory, slide, mount, weapon и Eagle Vision keybinds.",
        usageTitle: "Почему эта страница важна",
        usageBody: "Controls - это утилитарная страница, но она поддерживает остальную wiki. Маршруты билдов часто зависят от dash, block, summon, awakening, weapon и inventory timing. Разделение controls из Roblox description и карточки Trello Keybinds показывает, где перечислен каждый input, и не превращает community shortcuts в официальные утверждения.",
        tips: ["Проверьте эту страницу перед combo notes, где есть dash, block, slide или weapon inputs.", "Если keybind не работает, проверьте in-game cogwheel: управление может настраиваться.", "Для тестов планировщика записывайте Stand move, fighting style move и defensive input отдельно."],
    },
    pt: {
        metaTitle: "Controles e Keybinds de Bizarre Lineage | Roblox + Trello Oficial",
        metaDescription: "Controles oficiais de Bizarre Lineage a partir da descrição do Roblox e do card público Keybinds do Trello.",
        breadcrumb: "Controles",
        title: "Controles de Bizarre Lineage",
        intro: "Controles oficiais da descrição do Roblox mais o card público Keybinds do Trello. As teclas podem ser alteráveis pelo cogwheel dentro do jogo.",
        checked: "Dados oficiais verificados em:",
        input: "Input",
        action: "Ação oficial",
        robloxTitle: "Página do jogo Roblox",
        robloxDesc: "Descrição pública e controles básicos.",
        keybindsTitle: "Card oficial Keybinds",
        keybindsDesc: "Keybinds de inventory, slide, mount, weapon e Eagle Vision.",
        usageTitle: "Por que esta página importa",
        usageBody: "Controles são uma página utilitária, mas dão suporte ao resto da wiki. Rotas de build muitas vezes dependem de dash, block, summon, awakening, weapon e inventory timing. Separar controles da descrição do Roblox do card Trello Keybinds deixa claro onde cada input aparece e evita transformar atalhos da comunidade em afirmações oficiais.",
        tips: ["Use esta página antes de seguir notas de combo que citam dash, block, slide ou weapon inputs.", "Se um keybind não funcionar, confira o cogwheel no jogo porque controles podem ser alteráveis.", "Para testar no planejador, anote separadamente o golpe do Stand, o golpe do estilo e o input defensivo."],
    },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const copy = localize(locale, CONTROL_COPY);
    return withCanonical({
        title: copy.metaTitle,
        description: copy.metaDescription,
    }, "/controls");
}

export default async function ControlsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const tCommon = await getTranslations({ locale, namespace: "Common" });
    const copy = localize(locale, CONTROL_COPY);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: tCommon("breadcrumbHome"), item: SITE_URL },
            { "@type": "ListItem", position: 2, name: copy.breadcrumb, item: `${SITE_URL}/controls` },
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
                <Keyboard className="h-12 w-12 text-accent-blue" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">{copy.title}</h1>
            </div>
            <p className="text-lg text-muted leading-relaxed max-w-3xl mb-3">
                {copy.intro}
            </p>
            <p className="text-sm text-muted mb-10">{copy.checked} {OFFICIAL_DATA_LAST_CHECKED}</p>

            <section className="bg-surface border border-border rounded-xl p-6 mb-10">
                <h2 className="text-2xl font-bold text-white mb-3">{copy.usageTitle}</h2>
                <p className="text-muted leading-relaxed mb-5">{copy.usageBody}</p>
                <ul className="space-y-2 text-sm text-muted leading-relaxed">
                    {copy.tips.map((tip) => (
                        <li key={tip} className="flex gap-2">
                            <span className="text-accent-blue">•</span>
                            <span>{tip}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="bg-surface border border-border rounded-xl overflow-hidden mb-10">
                <div className="grid grid-cols-[minmax(110px,180px)_1fr] border-b border-white/5 bg-white/[0.03] text-xs font-bold uppercase tracking-wide text-muted">
                    <div className="p-4">{copy.input}</div>
                    <div className="p-4">{copy.action}</div>
                </div>
                {OFFICIAL_KEYBINDS.map((keybind) => (
                    <div key={`${keybind.input}-${keybind.action}`} className="grid grid-cols-[minmax(110px,180px)_1fr] border-b border-white/5 last:border-b-0">
                        <div className="p-4">
                            <code className="rounded-md border border-accent-blue/20 bg-accent-blue/10 px-2 py-1 text-sm font-bold text-accent-blue">{keybind.input}</code>
                        </div>
                        <div className="p-4">
                            <div className="text-sm font-medium text-white">{keybind.action}</div>
                            <div className="text-xs text-muted mt-1">{keybind.source}</div>
                        </div>
                    </div>
                ))}
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href={OFFICIAL_LINKS.robloxGame} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-lg p-4 hover:border-green-500/50 transition-colors group">
                    <div className="font-bold text-white group-hover:text-green-400 transition-colors flex items-center gap-1">{copy.robloxTitle} <ExternalLink className="h-3 w-3" /></div>
                    <div className="text-xs text-muted mt-1">{copy.robloxDesc}</div>
                </a>
                <a href={OFFICIAL_LINKS.keybinds} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                    <div className="font-bold text-white group-hover:text-accent-blue transition-colors flex items-center gap-1">{copy.keybindsTitle} <ExternalLink className="h-3 w-3" /></div>
                    <div className="text-xs text-muted mt-1">{copy.keybindsDesc}</div>
                </a>
            </section>
        </div>
    );
}
