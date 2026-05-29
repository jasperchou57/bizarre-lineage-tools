import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle, CheckCircle2, ChevronRight, Target, Shield, Zap, Navigation, Activity, ExternalLink, ShieldCheck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import subsDataEn from "@/data/sub-abilities.json";
import { getSubsData } from "@/data/locale-data";
import { SUB_ABILITY_SOURCE_LINKS } from "@/data/official-sources";
import { localize } from "@/lib/locale-copy";
import { withCanonical } from "@/lib/metadata";

const SUB_GUIDE_COPY = {
    en: {
        title: "How to evaluate this Sub-Ability",
        bestForTitle: "Good fit",
        limitsTitle: "Known limits",
        sourceTitle: "Source boundary",
        sourceBody: "The public Trello is used for the Sub-Ability name, visible passive wording, trainer or obtainment note, and move list when available. Planner scores and best-with pairings are site-maintained comparisons that should be tested after major patches.",
        nextTitle: "Recommended follow-up pages",
        subs: {
            hamon: {
                body: "Hamon is the cleanest damage-support option for players who want direct pressure without a complicated resource loop. Its anti-Vampire angle is useful when you expect sustain-heavy opponents, and its low mobility score means it should usually be paired with a Stand that can start fights or keep targets close.",
                bestFor: ["Beginner and mid-game builds that need simple extra damage.", "Matchups where Vampire sustain is common.", "Stands that already have mobility or reliable engage tools."],
                limits: ["Hamon does not solve chasing or escape by itself.", "The official source does not publish full cooldown tables, so damage routes need live testing.", "If your Stand already has enough burst, Vampire sustain or Cyborg defense may be more useful."],
                nextChecks: ["Read the Stats guide before spending points around Power.", "Compare Hamon with Vampire if you are choosing between damage and sustain.", "Check Controls if your route depends on precise block, dash, or M1 timing."],
            },
            cyborg: {
                body: "Cyborg is the defensive and PvE-leaning Sub-Ability in the current planner. The official passive text gives it a clear durability identity, while its ranged tools make it easier to contribute without always standing inside melee range. It is most valuable when your build needs survival and area coverage more than duel tempo.",
                bestFor: ["PvE farming and longer fights where taking fewer hits matters.", "Builds with Stands that already have damage but need defensive padding.", "Players who prefer ranged backup tools and safer positioning."],
                limits: ["Low mobility means Cyborg can feel slow if your Stand lacks movement.", "Its value drops if a fight is decided by one short burst window.", "Exact damage and cooldown efficiency should be tested in-game before calling it optimal."],
                nextChecks: ["Compare Cyborg with Hamon for PvE damage versus durability.", "Open Magician's Red or Purple Haze if you want area-focused Stand pairings.", "Review raid pages when judging whether the defensive profile helps your farming route."],
            },
            vampire: {
                body: "Vampire is the sustain pick. It is strongest when fights last long enough for regeneration, blood meter value, and grab pressure to matter. The tradeoff is that it has a documented weakness into Hamon, so Vampire should be evaluated against the opponents and content you actually expect to face.",
                bestFor: ["Long PvP trades where sustain can change the second exchange.", "Players who want recovery tools instead of only front-loaded burst.", "Stands that can protect the Vampire user while the sustain loop develops."],
                limits: ["Hamon pressure is a real matchup risk.", "Sustain does not replace good positioning; ranged control can still force bad trades.", "The public source does not prove every Night Vampire claim, so keep upgrade assumptions separate."],
                nextChecks: ["Read the Night Vampire source-check page before trusting upgrade routes.", "Compare Vampire builds with King Crimson, The World, and Whitesnake.", "Use the planner to see whether sustain is worth the lower mobility score."],
            },
        },
    },
    ru: {
        title: "Как оценивать эту Sub-Ability",
        bestForTitle: "Хорошо подходит",
        limitsTitle: "Известные ограничения",
        sourceTitle: "Граница источников",
        sourceBody: "Публичный Trello используется для названия Sub-Ability, видимого текста passive, trainer/obtainment заметки и списка мувов, когда они доступны. Оценки планировщика и best-with связки - сравнения сайта, которые нужно проверять после крупных патчей.",
        nextTitle: "Рекомендуемые следующие страницы",
        subs: {
            hamon: {
                body: "Hamon - самый простой damage-support вариант для игроков, которым нужно прямое давление без сложного resource loop. Его anti-Vampire роль полезна против sustain-heavy соперников, а низкая мобильность означает, что его лучше сочетать со Стендом, который умеет начинать бой или удерживать цель рядом.",
                bestFor: ["Beginner и mid-game билдам, которым нужен простой дополнительный урон.", "Матчапам, где часто встречается Vampire sustain.", "Стендам, у которых уже есть mobility или надежный engage."],
                limits: ["Hamon сам по себе не решает chase или escape.", "Официальный источник не публикует полные cooldown tables, поэтому damage routes нужно тестировать в live.", "Если у Стенда уже достаточно burst, Vampire sustain или Cyborg defense могут быть полезнее."],
                nextChecks: ["Прочитайте Stats guide перед вложением очков вокруг Power.", "Сравните Hamon с Vampire, если выбираете между damage и sustain.", "Проверьте Controls, если маршрут зависит от точного block, dash или M1 timing."],
            },
            cyborg: {
                body: "Cyborg - защитная и PvE-ориентированная Sub-Ability в текущем планировщике. Официальный passive текст дает ей понятную роль durability, а ranged tools помогают участвовать в бою без постоянного нахождения в melee range. Она особенно полезна, когда билду нужны survival и area coverage больше, чем duel tempo.",
                bestFor: ["PvE farming и долгим боям, где важно получать меньше урона.", "Билдам со Стендами, у которых уже есть урон, но не хватает защиты.", "Игрокам, предпочитающим ranged backup tools и более безопасную позицию."],
                limits: ["Низкая mobility делает Cyborg медленным, если у Стенда нет движения.", "Ценность падает, если бой решается одним коротким burst window.", "Точный damage и cooldown efficiency нужно проверять в игре перед выводом, что это optimal."],
                nextChecks: ["Сравните Cyborg с Hamon для выбора между PvE damage и durability.", "Откройте Magician's Red или Purple Haze для area-focused связок.", "Посмотрите raid pages, если оцениваете пользу защиты для farming route."],
            },
            vampire: {
                body: "Vampire - выбор для sustain. Он сильнее всего, когда бой длится достаточно долго, чтобы regeneration, blood meter и grab pressure успели повлиять. Компромисс в том, что у него есть слабость к Hamon, поэтому Vampire нужно оценивать против тех соперников и контента, которые вы реально ожидаете.",
                bestFor: ["Долгим PvP-трейдам, где sustain меняет второй обмен.", "Игрокам, которым нужны recovery tools, а не только front-loaded burst.", "Стендам, которые могут защитить Vampire-пользователя, пока sustain loop развивается."],
                limits: ["Hamon pressure - реальный риск матчапа.", "Sustain не заменяет хорошую позицию; ranged control все еще может навязать плохой trade.", "Публичный источник не подтверждает каждое Night Vampire утверждение, поэтому upgrade assumptions нужно отделять."],
                nextChecks: ["Прочитайте Night Vampire source-check перед доверием upgrade routes.", "Сравните Vampire билды с King Crimson, The World и Whitesnake.", "Используйте планировщик, чтобы понять, стоит ли sustain более низкой mobility."],
            },
        },
    },
    pt: {
        title: "Como avaliar esta Sub-Ability",
        bestForTitle: "Boa escolha para",
        limitsTitle: "Limites conhecidos",
        sourceTitle: "Limite das fontes",
        sourceBody: "O Trello público é usado para o nome da Sub-Ability, texto visível da passiva, nota de treinador/obtenção e lista de golpes quando disponível. Pontuações do planejador e pareamentos são comparações mantidas pelo site e devem ser testadas após grandes patches.",
        nextTitle: "Páginas recomendadas depois",
        subs: {
            hamon: {
                body: "Hamon é a opção de suporte de dano mais limpa para quem quer pressão direta sem um resource loop complicado. O ângulo anti-Vampire ajuda contra oponentes com muito sustain, e a baixa mobilidade significa que ele normalmente deve ser pareado com um Stand capaz de iniciar lutas ou manter o alvo perto.",
                bestFor: ["Builds de começo e meio de jogo que precisam de dano extra simples.", "Matchups em que Vampire sustain aparece com frequência.", "Stands que já têm mobilidade ou ferramentas confiáveis de engage."],
                limits: ["Hamon não resolve perseguição ou fuga sozinho.", "A fonte oficial não publica tabelas completas de cooldown, então rotas de dano precisam de teste no jogo.", "Se o Stand já tem burst suficiente, Vampire sustain ou Cyborg defense podem ser mais úteis."],
                nextChecks: ["Leia o guia de Stats antes de gastar pontos em Power.", "Compare Hamon com Vampire se estiver escolhendo entre dano e sustain.", "Confira Controls se sua rota depende de block, dash ou timing de M1."],
            },
            cyborg: {
                body: "Cyborg é a Sub-Ability defensiva e mais voltada a PvE no planejador atual. O texto oficial da passiva dá uma identidade clara de durabilidade, enquanto as ferramentas ranged ajudam a contribuir sem ficar sempre em melee range. Ela vale mais quando a build precisa de sobrevivência e cobertura de área acima de ritmo de duelo.",
                bestFor: ["Farming PvE e lutas longas em que tomar menos dano importa.", "Builds com Stands que já têm dano, mas precisam de defesa extra.", "Jogadores que preferem backup ranged e posicionamento mais seguro."],
                limits: ["A baixa mobilidade pode deixar Cyborg lento se o Stand não tiver movimento.", "O valor cai se a luta é decidida em uma janela curta de burst.", "Dano exato e eficiência de cooldown devem ser testados no jogo antes de chamar de ideal."],
                nextChecks: ["Compare Cyborg com Hamon para dano PvE versus durabilidade.", "Abra Magician's Red ou Purple Haze se quiser pareamentos de área.", "Revise páginas de raid ao julgar se o perfil defensivo ajuda sua rota de farm."],
            },
            vampire: {
                body: "Vampire é a escolha de sustain. Ele fica mais forte quando as lutas duram o bastante para regeneration, blood meter e grab pressure importarem. A troca é que há fraqueza documentada contra Hamon, então Vampire deve ser avaliado contra os oponentes e conteúdos que você realmente espera enfrentar.",
                bestFor: ["Trocas longas de PvP em que sustain muda o segundo engage.", "Jogadores que querem ferramentas de recuperação além de burst inicial.", "Stands que protegem o usuário de Vampire enquanto o sustain loop se desenvolve."],
                limits: ["Hamon pressure é um risco real de matchup.", "Sustain não substitui bom posicionamento; controle ranged ainda pode forçar trades ruins.", "A fonte pública não confirma toda alegação sobre Night Vampire, então separe suposições de upgrade."],
                nextChecks: ["Leia a página Night Vampire source-check antes de confiar em rotas de upgrade.", "Compare builds de Vampire com King Crimson, The World e Whitesnake.", "Use o planejador para ver se sustain compensa a nota menor de mobilidade."],
            },
        },
    },
} as const;

export function generateStaticParams() {
    return subsDataEn.map((sub) => ({ slug: sub.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
    const subsData = getSubsData(locale);
    const sub = subsData.find((s) => s.id === slug);
    const t = await getTranslations({ locale, namespace: "SubAbilities" });
    if (!sub) return { title: t("detailNotFound") };
    return withCanonical({
        title: t("detailMetaTitle", { name: sub.name }),
        description: t("detailMetaDescription", { name: sub.name }),
    }, `/sub-abilities/${sub.id}`);
}

export default async function SubAbilityDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "SubAbilities" });
    const tCommon = await getTranslations({ locale, namespace: "Common" });

    const subsData = getSubsData(locale);
    const sub = subsData.find((s) => s.id === slug);
    if (!sub) notFound();
    const officialSource = SUB_ABILITY_SOURCE_LINKS[sub.id as keyof typeof SUB_ABILITY_SOURCE_LINKS];
    const copy = localize(locale, SUB_GUIDE_COPY);
    const guide = copy.subs[sub.id as keyof typeof copy.subs];

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex items-center gap-2 text-sm text-muted mb-8 overflow-x-auto pb-2">
                <Link href="/" className="hover:text-white transition-colors">{tCommon("breadcrumbHome")}</Link>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <Link href="/sub-abilities" className="hover:text-white transition-colors">{t("breadcrumbCurrent")}</Link>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span className="text-white capitalize">{sub.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <span className="inline-block px-3 py-1 bg-accent-indigo/10 border border-accent-indigo/20 text-accent-indigo text-xs font-bold rounded-full mb-4">
                            {sub.origin}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-4">{sub.name}</h1>
                        <p className="text-xl text-muted leading-relaxed">{sub.summary}</p>
                        <div className="bg-accent-indigo/5 border border-accent-indigo/20 rounded-xl p-4 mt-4 flex gap-3 text-sm text-muted">
                            <ShieldCheck className="h-5 w-5 text-accent-indigo shrink-0 mt-0.5" />
                            <div>
                                <p className="mb-2">{t("detailDisclaimer")}</p>
                                {officialSource && (
                                    <a href={officialSource} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:text-white transition-colors">
                                        {tCommon("officialCard")} <ExternalLink className="h-3 w-3" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface border border-accent-blue/30 rounded-xl overflow-hidden relative shadow-[0_0_30px_rgba(59,130,246,0.05)]">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Zap className="h-32 w-32" />
                        </div>
                        <div className="p-8 relative z-10">
                            <h2 className="text-sm font-bold text-accent-blue uppercase tracking-widest mb-2">{t("passiveTitle")}</h2>
                            <p className="text-2xl font-bold text-white">{sub.passive}</p>
                        </div>
                    </div>

                    <div className="bg-surface border border-border rounded-xl stretch overflow-hidden">
                        <div className="bg-white/5 border-b border-white/5 px-6 py-4">
                            <h2 className="text-xl font-bold text-white">{t("activeSkillsTitle")}</h2>
                        </div>
                        <div className="divide-y divide-white/5">
                            {sub.moves.map((move, i) => (
                                <div key={i} className="p-6 flex flex-col sm:flex-row gap-4 justify-between sm:items-center hover:bg-white/5 transition-colors">
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{move.name}</h3>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="px-3 py-1 bg-background border border-border rounded-lg text-xs font-mono font-bold text-muted flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-accent-indigo" />
                                            {move.type.toUpperCase()}
                                        </span>
                                        <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-sm font-bold text-white min-w-[3rem] text-center shadow-[inset_0_-2px_4px_rgba(0,0,0,0.4)]">
                                            {move.key}
                                        </span>
                                    </div>
                                </div>
                            ))}
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
                                            <span className="text-accent-indigo">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    )}

                    <div className="mt-8 flex gap-4">
                        <Link
                            href={`/build-planner?sub=${sub.id}`}
                            className="px-8 py-4 bg-gradient-to-r from-accent-indigo to-purple-600 rounded-xl text-white font-bold text-center hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all flex-1"
                        >
                            {t("createBuildCta", { name: sub.name })}
                        </Link>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-surface border border-border rounded-xl p-6">
                        <h3 className="text-sm font-bold text-muted uppercase tracking-widest mb-6 border-b border-white/5 pb-2">{t("radarTitle")}</h3>
                        <div className="space-y-5">
                            <StatRow label={t("statPvp")} value={sub.scores.pvp} icon={<Target className="w-3 h-3" />} color="text-red-400" />
                            <StatRow label={t("statPve")} value={sub.scores.pve} icon={<Activity className="w-3 h-3" />} color="text-accent-indigo" />
                            <StatRow label={t("cardSurvival")} value={sub.scores.survival} icon={<Shield className="w-3 h-3" />} color="text-green-400" />
                            <StatRow label={t("statMobility")} value={sub.scores.mobility} icon={<Navigation className="w-3 h-3" />} color="text-blue-400" />
                        </div>
                    </div>

                    <div className="bg-surface border border-border rounded-xl p-6">
                        <h3 className="text-sm font-bold text-muted uppercase tracking-widest mb-4 border-b border-white/5 pb-2">{t("synergiesTitle")}</h3>
                        <div className="flex flex-col gap-2">
                            {sub.bestWith.map((standId) => (
                                <Link
                                    key={standId}
                                    href={`/stands/${standId}`}
                                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white capitalize hover:bg-white/10 hover:border-accent-indigo transition-colors flex justify-between items-center group"
                                >
                                    {standId.replace(/-/g, " ")}
                                    <ChevronRight className="h-4 w-4 text-muted group-hover:text-accent-indigo group-hover:translate-x-1 transition-all" />
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

function StatRow({ label, value, color, icon }: { label: string; value: number; color: string; icon?: React.ReactNode }) {
    return (
        <div>
            <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted flex items-center gap-1.5">{icon} {label}</span>
                <span className={`font-mono font-bold ${color}`}>{value}/10</span>
            </div>
            <div className="w-full bg-background rounded-full h-1.5 relative overflow-hidden">
                <div className={`bg-current h-full opacity-80 ${color}`} style={{ width: `${value * 10}%` }}></div>
            </div>
        </div>
    );
}
