import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle, CheckCircle2, ChevronRight, ExternalLink, ShieldCheck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import stylesDataEn from "@/data/fighting-styles.json";
import { getStylesData } from "@/data/locale-data";
import { FIGHTING_STYLE_SOURCE_LINKS } from "@/data/official-sources";
import { localize } from "@/lib/locale-copy";
import { withCanonical } from "@/lib/metadata";

const STYLE_GUIDE_COPY = {
    en: {
        title: "Planner interpretation",
        bestForTitle: "Best use cases",
        limitsTitle: "What to verify before committing",
        sourceTitle: "What is official here",
        sourceBody: "The official card is used for the style name and visible move list. Score numbers, Stand pairings, and build recommendations are site-maintained planning notes, so treat them as decision support rather than developer balance values.",
        nextTitle: "Useful next checks",
        styles: {
            boxing: {
                body: "Boxing is the most straightforward close-range style on this site. Its planner value comes from extending punish windows after a block break, whiff punish, or Stand setup. Because its range score is low, Boxing works best when your Stand already has a way to force contact, stun the target, or safely start an M1 chain.",
                bestFor: ["Players who want simple combo extension instead of long setup routes.", "Stands with reliable stuns, time-stop windows, or short-range pressure.", "PvP practice where readable timing matters more than map control."],
                limits: ["Short reach means ranged Stands can reset neutral if you miss the first engage.", "Official data does not publish cooldowns or frame values, so test each combo in-game before treating it as guaranteed.", "If your build already has enough melee pressure, Kendo or a Sub-Ability may add more coverage."],
                nextChecks: ["Compare Boxing builds in the planner.", "Open Whitesnake, The World, Star Platinum, and Crazy Diamond pages for common pairings.", "Check Controls if your combo route depends on dash, block, or weapon inputs."],
            },
            kendo: {
                body: "Kendo is the style to inspect when you need reach, sword pressure, and more utility than a pure fist route. Its official card includes clearer move descriptions than the other styles, which makes it easier to understand why the site rates its range and utility higher. Kendo is not only a damage pick; it is a spacing tool for builds that want to punish movement or keep a target inside a follow-up line.",
                bestFor: ["Sword-focused or movement-heavy builds that need a cleaner approach option.", "Players who want guardbreak or displacement tools rather than only raw burst.", "Stands such as Anubis, Made in Heaven, or C-Moon that can benefit from reach and repositioning."],
                limits: ["The planner still does not know every cooldown, hitbox, or patch-level interaction.", "Kendo can feel less direct than Boxing if your Stand already supplies all the mobility you need.", "Air and knockback behavior should be checked in live servers because small timing changes can alter follow-ups."],
                nextChecks: ["Compare Kendo against Boxing if you are choosing between reach and close pressure.", "Review Anubis and Made in Heaven pages before building around sword pressure.", "Check the official card when move wording changes after updates."],
            },
            karate: {
                body: "Karate is currently treated as an area-control and combo-extension option. The site rates it as more rounded than Boxing because it can support group fights and PvE routes, but the official public card does not explain every hitbox detail. That means Karate is useful as a practical starting point, not as a solved best-in-slot answer.",
                bestFor: ["Players who want a style that can help in PvE and group pressure.", "Stands with explosive or area damage that need another close-range layer.", "Builds where simple AoE follow-up matters more than maximum reach."],
                limits: ["The public source lists move names but does not fully document all damage, cooldown, or hitbox behavior.", "Karate can overlap with Stands that already provide strong AoE, so compare before locking it in.", "PvP value depends heavily on whether you can start the exchange safely."],
                nextChecks: ["Compare Karate with Weather Report or Killer Queen planner setups.", "Use the raids page if you are evaluating PvE usefulness.", "Check official Trello again after major updates because style cards can change quietly."],
            },
        },
    },
    ru: {
        title: "Интерпретация планировщика",
        bestForTitle: "Когда стиль особенно полезен",
        limitsTitle: "Что проверить перед выбором",
        sourceTitle: "Что здесь официально",
        sourceBody: "Официальная карточка используется для названия стиля и видимого списка мувов. Числовые оценки, связки со Стендами и советы по билдам ведутся сайтом, поэтому это подсказки для выбора, а не официальные значения баланса.",
        nextTitle: "Что проверить дальше",
        styles: {
            boxing: {
                body: "Boxing - самый прямолинейный ближний стиль на этом сайте. Его ценность в планировщике в том, что он продлевает окно наказания после block break, ошибки противника или setup от Стенда. Из-за низкой дальности Boxing лучше работает, когда ваш Стенд уже умеет безопасно начать контакт, дать stun или открыть M1-цепочку.",
                bestFor: ["Игрокам, которым нужен простой combo extender без длинных setup-маршрутов.", "Стендам с надежным stun, time-stop окном или ближним давлением.", "PvP-тренировке, где тайминг важнее контроля карты."],
                limits: ["Короткая дальность позволяет дальним Стендам сбросить neutral, если первый вход не попал.", "Официальные данные не публикуют cooldown и frame values, поэтому проверяйте комбо в игре.", "Если билд уже дает много melee pressure, Kendo или Sub-Ability могут дать больше покрытия."],
                nextChecks: ["Сравните Boxing-билды в планировщике.", "Откройте страницы Whitesnake, The World, Star Platinum и Crazy Diamond для частых связок.", "Проверьте Controls, если маршрут комбо зависит от dash, block или weapon input."],
            },
            kendo: {
                body: "Kendo стоит смотреть, когда нужны дальность, давление мечом и больше utility, чем у чистого fist-стиля. Официальная карточка описывает мувы подробнее, чем у других стилей, поэтому понятнее, почему сайт ставит ему более высокие оценки range и utility. Kendo - не только урон; это инструмент spacing для билдов, которые хотят наказывать движение и удерживать цель в линии follow-up.",
                bestFor: ["Sword-focused или мобильным билдам, которым нужен более чистый вход.", "Игрокам, которым нужны guardbreak или displacement, а не только burst.", "Стендам вроде Anubis, Made in Heaven или C-Moon, которым полезны reach и repositioning."],
                limits: ["Планировщик все еще не знает каждый cooldown, hitbox или patch-level interaction.", "Kendo может быть менее прямым, чем Boxing, если ваш Стенд уже дает всю нужную mobility.", "Air и knockback-поведение нужно проверять на live-серверах, потому что мелкие тайминги меняют follow-up."],
                nextChecks: ["Сравните Kendo с Boxing, если выбираете между reach и close pressure.", "Посмотрите Anubis и Made in Heaven перед билдом вокруг sword pressure.", "Проверяйте официальную карточку после обновлений, потому что формулировки стилей могут меняться тихо."],
            },
            karate: {
                body: "Karate сейчас рассматривается как вариант для area control и combo extension. Сайт оценивает его более универсально, чем Boxing, потому что он может помогать в group fights и PvE, но публичная официальная карточка не раскрывает все детали hitbox. Поэтому Karate полезен как практичная отправная точка, а не как окончательный best-in-slot ответ.",
                bestFor: ["Игрокам, которым нужен стиль для PvE и группового давления.", "Стендам с explosive или area damage, которым нужен дополнительный ближний слой.", "Билдам, где простой AoE follow-up важнее максимальной дальности."],
                limits: ["Публичный источник дает названия мувов, но не полностью документирует damage, cooldown или hitbox.", "Karate может пересекаться со Стендами, у которых уже сильный AoE, поэтому сравните перед выбором.", "PvP-ценность сильно зависит от того, можете ли вы безопасно начать обмен."],
                nextChecks: ["Сравните Karate с Weather Report или Killer Queen в планировщике.", "Используйте страницу raids, если оцениваете PvE-пользу.", "Проверяйте официальный Trello после крупных обновлений, потому что карточки стилей могут меняться."],
            },
        },
    },
    pt: {
        title: "Interpretação do planejador",
        bestForTitle: "Melhores usos",
        limitsTitle: "O que verificar antes de investir",
        sourceTitle: "O que é oficial aqui",
        sourceBody: "O card oficial é usado para o nome do estilo e a lista visível de golpes. Pontuações, combinações com Stands e recomendações de build são notas mantidas pelo site, então use como apoio de decisão, não como valores oficiais de balanceamento.",
        nextTitle: "Próximas verificações úteis",
        styles: {
            boxing: {
                body: "Boxing é o estilo de curta distância mais direto deste site. Seu valor no planejador vem de estender janelas de punição depois de block break, erro do inimigo ou setup do Stand. Como a nota de alcance é baixa, Boxing funciona melhor quando seu Stand já consegue forçar contato, aplicar stun ou iniciar uma cadeia de M1 com segurança.",
                bestFor: ["Jogadores que querem extensão simples de combo em vez de rotas longas de setup.", "Stands com stuns confiáveis, janelas de time stop ou pressão curta.", "Treino de PvP em que timing legível importa mais que controle de mapa."],
                limits: ["O alcance curto deixa Stands de longa distância resetarem o neutral se o primeiro engage falhar.", "Os dados oficiais não publicam cooldowns nem frame values, então teste cada combo no jogo.", "Se a build já tem pressão melee suficiente, Kendo ou uma Sub-Ability pode dar mais cobertura."],
                nextChecks: ["Compare builds com Boxing no planejador.", "Abra Whitesnake, The World, Star Platinum e Crazy Diamond para ver pareamentos comuns.", "Confira Controls se sua rota depende de dash, block ou inputs de arma."],
            },
            kendo: {
                body: "Kendo é o estilo para analisar quando você precisa de alcance, pressão de espada e mais utilidade do que uma rota só de punhos. O card oficial traz descrições de golpes mais claras, por isso fica mais fácil entender por que o site avalia melhor seu range e utility. Kendo não é apenas dano; é uma ferramenta de spacing para builds que querem punir movimento ou manter o alvo em uma linha de follow-up.",
                bestFor: ["Builds focadas em espada ou mobilidade que precisam de entrada mais limpa.", "Jogadores que querem guardbreak ou deslocamento, não só burst bruto.", "Stands como Anubis, Made in Heaven ou C-Moon que aproveitam alcance e reposicionamento."],
                limits: ["O planejador ainda não conhece todos os cooldowns, hitboxes ou interações de patch.", "Kendo pode parecer menos direto que Boxing se o Stand já oferece toda a mobilidade necessária.", "Comportamento aéreo e knockback devem ser testados em servidores ativos, porque pequenos timings mudam follow-ups."],
                nextChecks: ["Compare Kendo com Boxing se estiver escolhendo entre alcance e pressão curta.", "Revise Anubis e Made in Heaven antes de montar algo em torno de sword pressure.", "Confira o card oficial quando a descrição dos golpes mudar após updates."],
            },
            karate: {
                body: "Karate é tratado aqui como opção de controle de área e extensão de combo. O site o avalia como mais equilibrado que Boxing porque pode ajudar em lutas em grupo e PvE, mas o card público oficial não explica todos os detalhes de hitbox. Isso torna Karate um bom ponto de partida prático, não uma resposta best-in-slot definitiva.",
                bestFor: ["Jogadores que querem um estilo útil em PvE e pressão de grupo.", "Stands com dano explosivo ou em área que precisam de outra camada de curta distância.", "Builds em que follow-up AoE simples importa mais que alcance máximo."],
                limits: ["A fonte pública lista nomes de golpes, mas não documenta todo dano, cooldown ou hitbox.", "Karate pode sobrepor Stands que já têm AoE forte, então compare antes de fixar a escolha.", "O valor em PvP depende muito de conseguir iniciar a troca com segurança."],
                nextChecks: ["Compare Karate com setups de Weather Report ou Killer Queen.", "Use a página de raids se estiver avaliando utilidade em PvE.", "Confira o Trello oficial após grandes updates porque cards de estilo podem mudar discretamente."],
            },
        },
    },
} as const;

export function generateStaticParams() {
    return stylesDataEn.map((style) => ({ slug: style.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
    const stylesData = getStylesData(locale);
    const style = stylesData.find((s) => s.id === slug);
    const t = await getTranslations({ locale, namespace: "FightingStyles" });
    if (!style) return { title: t("detailNotFound") };
    return withCanonical({
        title: t("detailMetaTitle", { name: style.name }),
        description: t("detailMetaDescription", { name: style.name }),
    }, `/fighting-styles/${style.id}`);
}

export default async function StyleDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "FightingStyles" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    const stylesData = getStylesData(locale);
    const style = stylesData.find((s) => s.id === slug);
    if (!style) notFound();
    const officialSource = FIGHTING_STYLE_SOURCE_LINKS[style.id as keyof typeof FIGHTING_STYLE_SOURCE_LINKS];
    const copy = localize(locale, STYLE_GUIDE_COPY);
    const guide = copy.styles[style.id as keyof typeof copy.styles];

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex items-center gap-2 text-sm text-muted mb-8 overflow-x-auto pb-2">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <Link href="/fighting-styles" className="hover:text-white transition-colors">{t("breadcrumbCurrent")}</Link>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span className="text-white capitalize">{style.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white">{style.name}</h1>
                    <p className="text-xl text-muted leading-relaxed">{style.summary}</p>
                    <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-4 flex gap-3 text-sm text-muted">
                        <ShieldCheck className="h-5 w-5 text-accent-blue shrink-0 mt-0.5" />
                        <div>
                            <p className="mb-2">{t("detailDisclaimer")}</p>
                            {officialSource && (
                                <a href={officialSource} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-white transition-colors">
                                    {tCommon("officialCard")} <ExternalLink className="h-3 w-3" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="bg-surface border border-border rounded-xl overflow-hidden">
                        <div className="bg-white/5 border-b border-white/5 px-6 py-4">
                            <h2 className="text-xl font-bold text-white">{t("movesTitle")}</h2>
                        </div>
                        <div className="divide-y divide-white/5">
                            {style.moves.map((move, i) => {
                                const effect = (move as { effect?: string }).effect;
                                return (
                                    <div key={i} className="p-6 flex flex-col sm:flex-row gap-4 justify-between sm:items-center hover:bg-white/5 transition-colors">
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-1">{move.name}</h3>
                                            {effect && <p className="text-sm text-green-400">{effect}</p>}
                                        </div>
                                        <div className="flex gap-3">
                                            <span className="px-3 py-1 bg-background border border-border rounded-lg text-xs font-mono font-bold text-muted flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-accent-blue" />
                                                {move.type.toUpperCase()}
                                            </span>
                                            <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-sm font-bold text-white min-w-[3rem] text-center shadow-[inset_0_-2px_4px_rgba(0,0,0,0.4)]">
                                                {move.key}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {guide && (
                        <section className="bg-surface border border-border rounded-xl p-6 space-y-5">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-3">{copy.title}</h2>
                                <p className="text-muted leading-relaxed">{guide.body}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoPanel
                                    title={copy.bestForTitle}
                                    icon={<CheckCircle2 className="h-5 w-5 text-green-400" />}
                                    items={guide.bestFor}
                                />
                                <InfoPanel
                                    title={copy.limitsTitle}
                                    icon={<AlertTriangle className="h-5 w-5 text-yellow-300" />}
                                    items={guide.limits}
                                />
                            </div>

                            <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                                <h3 className="font-bold text-white mb-2">{copy.sourceTitle}</h3>
                                <p className="text-sm text-muted leading-relaxed">{copy.sourceBody}</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white mb-3">{copy.nextTitle}</h3>
                                <ul className="grid gap-2 text-sm text-muted">
                                    {guide.nextChecks.map((item) => (
                                        <li key={item} className="flex gap-2">
                                            <span className="text-accent-blue">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    )}

                    <div className="mt-8 flex gap-4">
                        <Link
                            href={`/build-planner?style=${style.id}`}
                            className="px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-indigo rounded-xl text-white font-bold text-center hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex-1"
                        >
                            {t("createBuildCta", { name: style.name })}
                        </Link>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-surface border border-border rounded-xl p-6">
                        <h3 className="text-sm font-bold text-muted uppercase tracking-widest mb-6 border-b border-white/5 pb-2">{t("radarTitle")}</h3>
                        <div className="space-y-5">
                            <StatRow label={t("statDamage")} value={style.scores.damage} color="text-red-400" />
                            <StatRow label={t("statCombo")} value={style.scores.combo} color="text-accent-blue" />
                            <StatRow label={t("statRange")} value={style.scores.range} color="text-green-400" />
                            <StatRow label={t("statUtility")} value={style.scores.utility} color="text-purple-400" />
                        </div>
                    </div>

                    <div className="bg-surface border border-border rounded-xl p-6">
                        <h3 className="text-sm font-bold text-muted uppercase tracking-widest mb-4 border-b border-white/5 pb-2">{t("synergiesTitle")}</h3>
                        <div className="flex flex-col gap-2">
                            {style.bestWith.map((standId) => (
                                <Link
                                    key={standId}
                                    href={`/stands/${standId}`}
                                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white capitalize hover:bg-white/10 hover:border-accent-blue transition-colors flex justify-between items-center group"
                                >
                                    {standId.replace(/-/g, " ")}
                                    <ChevronRight className="h-4 w-4 text-muted group-hover:text-accent-blue group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoPanel({ title, icon, items }: { title: string; icon: React.ReactNode; items: readonly string[] }) {
    return (
        <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 font-bold text-white mb-3">
                {icon}
                <h3>{title}</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted leading-relaxed">
                {items.map((item) => (
                    <li key={item} className="flex gap-2">
                        <span className="text-white/60">-</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function StatRow({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div>
            <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted">{label}</span>
                <span className={`font-mono font-bold ${color}`}>{value}/10</span>
            </div>
            <div className="w-full bg-background rounded-full h-1.5 relative overflow-hidden">
                <div className={`bg-current h-full opacity-80 ${color}`} style={{ width: `${value * 10}%` }}></div>
            </div>
        </div>
    );
}
