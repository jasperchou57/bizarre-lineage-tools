import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { localize } from "@/lib/locale-copy";
import { withCanonical } from "@/lib/metadata";

const ABOUT_COPY = {
    en: {
        title: "About This Site",
        intro: "Bizarre Lineage Wiki is a fan-maintained tools and reference site for the Roblox game Bizarre Lineage. We are not affiliated with Roblox, MIDAS, Bizarre Collective, or the game developers.",
        missionTitle: "What we are trying to do",
        missionBody: "The goal is simple: help players find current Bizarre Lineage answers without mixing official facts, community reports, and site-maintained planner judgment. A player should be able to check codes, read official source boundaries, compare build ideas, and understand what still needs in-game verification before spending time or resources.",
        sourceTitle: "How we handle sources",
        sourceItems: ["Official Roblox and official Trello data are treated as the strongest public sources.", "Community-reported codes, meta notes, and update rumors stay labeled until verified.", "Planner scores, tier notes, and build suggestions are site-maintained analysis, not developer balance values.", "If a page contradicts the public official Trello, the Trello source takes priority and the page should be corrected."],
        maintenanceTitle: "Maintenance and corrections",
        maintenanceBody: "We periodically recheck official Roblox and Trello signals, especially after major updates. When official data is incomplete, the page should say so instead of inventing drop rates, cooldowns, coordinates, or quest steps. If you find an error, send the page URL and the source link so the correction can be reviewed quickly.",
        contactCta: "Contact us",
        sourcesCta: "Read source standards",
    },
    ru: {
        title: "О сайте",
        intro: "Bizarre Lineage Wiki - фанатский сайт инструментов и справочников для Roblox-игры Bizarre Lineage. Мы не связаны с Roblox, MIDAS, Bizarre Collective или разработчиками игры.",
        missionTitle: "Что мы пытаемся сделать",
        missionBody: "Цель простая: помочь игрокам находить актуальные ответы по Bizarre Lineage, не смешивая официальные факты, community reports и site-maintained анализ планировщика. Игрок должен быстро проверить codes, увидеть границы источников, сравнить build ideas и понять, что еще требует in-game verification перед тратой времени или ресурсов.",
        sourceTitle: "Как мы работаем с источниками",
        sourceItems: ["Official Roblox и official Trello считаются самыми сильными публичными источниками.", "Community-reported codes, meta notes и update rumors остаются помеченными, пока не проверены.", "Planner scores, tier notes и build suggestions - анализ сайта, а не developer balance values.", "Если страница противоречит публичному official Trello, источник Trello имеет приоритет и страницу нужно исправить."],
        maintenanceTitle: "Поддержка и исправления",
        maintenanceBody: "Мы периодически перепроверяем official Roblox и Trello signals, особенно после крупных обновлений. Когда официальные данные неполные, страница должна прямо говорить об этом, а не выдумывать drop rates, cooldowns, coordinates или quest steps. Если вы нашли ошибку, отправьте URL страницы и ссылку на источник, чтобы исправление можно было быстро проверить.",
        contactCta: "Связаться",
        sourcesCta: "Стандарты источников",
    },
    pt: {
        title: "Sobre Este Site",
        intro: "Bizarre Lineage Wiki é um site de ferramentas e referência feito por fãs para o jogo Roblox Bizarre Lineage. Não somos afiliados à Roblox, MIDAS, Bizarre Collective ou aos desenvolvedores do jogo.",
        missionTitle: "O que queremos fazer",
        missionBody: "O objetivo é simples: ajudar jogadores a encontrar respostas atuais de Bizarre Lineage sem misturar fatos oficiais, relatos da comunidade e análise mantida pelo site. Um jogador deve conseguir checar codes, ler limites de fonte, comparar ideias de build e entender o que ainda precisa de verificação no jogo antes de gastar tempo ou recursos.",
        sourceTitle: "Como tratamos fontes",
        sourceItems: ["Roblox oficial e Trello oficial são tratados como as fontes públicas mais fortes.", "Codes reportados pela comunidade, notas de meta e rumores de update ficam rotulados até serem verificados.", "Planner scores, notas de tier e sugestões de build são análise mantida pelo site, não valores oficiais de balanceamento.", "Se uma página contradiz o Trello oficial público, a fonte do Trello tem prioridade e a página deve ser corrigida."],
        maintenanceTitle: "Manutenção e correções",
        maintenanceBody: "Rechecamos periodicamente sinais oficiais do Roblox e do Trello, especialmente após grandes updates. Quando os dados oficiais estão incompletos, a página deve dizer isso em vez de inventar drop rates, cooldowns, coordenadas ou passos de quest. Se encontrar um erro, envie a URL da página e o link da fonte para que a correção seja revisada rapidamente.",
        contactCta: "Contato",
        sourcesCta: "Ler padrões de fonte",
    },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "About" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
    }, "/about");
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const copy = localize(locale, ABOUT_COPY);

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-heading font-extrabold text-white mb-6">{copy.title}</h1>
            <p className="text-lg text-muted leading-relaxed mb-8">{copy.intro}</p>

            <div className="space-y-6">
                <section className="bg-surface border border-border rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-3">{copy.missionTitle}</h2>
                    <p className="text-muted leading-relaxed">{copy.missionBody}</p>
                </section>

                <section className="bg-surface border border-border rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">{copy.sourceTitle}</h2>
                    <ul className="space-y-3 text-muted leading-relaxed">
                        {copy.sourceItems.map((item) => (
                            <li key={item} className="flex gap-2">
                                <span className="text-accent-blue">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="bg-surface border border-border rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-3">{copy.maintenanceTitle}</h2>
                    <p className="text-muted leading-relaxed mb-5">{copy.maintenanceBody}</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/contact" className="px-5 py-3 rounded-lg bg-accent-blue text-white font-bold text-center hover:bg-accent-blue/90 transition-colors">
                            {copy.contactCta}
                        </Link>
                        <Link href="/sources" className="px-5 py-3 rounded-lg border border-white/10 text-white font-bold text-center hover:border-accent-blue/50 transition-colors">
                            {copy.sourcesCta}
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
