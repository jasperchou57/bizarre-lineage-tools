import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localize } from "@/lib/locale-copy";
import { withCanonical } from "@/lib/metadata";

const CONTACT_COPY = {
    en: {
        title: "Contact",
        intro: "Use this page for bug reports, typo reports, source corrections, and policy or privacy questions about Bizarre Lineage Wiki.",
        emailLabel: "Email",
        correctionTitle: "For data corrections",
        correctionBody: "Please include the page URL, the exact sentence or table row that looks wrong, and the official Roblox or Trello source that supports the correction. If the correction is based on in-game testing or community reporting, say that clearly so it can be labeled correctly.",
        policyTitle: "For site or privacy questions",
        policyBody: "You can also use the same email for questions about privacy, attribution, external links, or requests to remove inaccurate information. We do not accept paid link insertions or claims that would make the site look official when it is fan-maintained.",
    },
    ru: {
        title: "Контакты",
        intro: "Используйте эту страницу для bug reports, опечаток, исправлений источников и вопросов по политике или приватности Bizarre Lineage Wiki.",
        emailLabel: "Email",
        correctionTitle: "Для исправления данных",
        correctionBody: "Укажите URL страницы, точное предложение или строку таблицы, которая выглядит неверной, и официальный источник Roblox или Trello, подтверждающий исправление. Если исправление основано на in-game testing или community reporting, напишите это явно, чтобы мы правильно поставили label.",
        policyTitle: "Для вопросов по сайту или приватности",
        policyBody: "Этот же email можно использовать для вопросов о privacy, attribution, external links или просьб убрать неточную информацию. Мы не принимаем paid link insertions и утверждения, из-за которых фанатский сайт может выглядеть официальным.",
    },
    pt: {
        title: "Contato",
        intro: "Use esta página para relatos de bug, erros de digitação, correções de fonte e dúvidas de política ou privacidade sobre a Bizarre Lineage Wiki.",
        emailLabel: "Email",
        correctionTitle: "Para correções de dados",
        correctionBody: "Inclua a URL da página, a frase ou linha da tabela que parece errada e a fonte oficial Roblox ou Trello que sustenta a correção. Se a correção vier de teste no jogo ou relato da comunidade, diga isso claramente para que o rótulo seja correto.",
        policyTitle: "Para dúvidas sobre o site ou privacidade",
        policyBody: "Você também pode usar o mesmo email para perguntas sobre privacidade, atribuição, links externos ou pedidos de remoção de informação imprecisa. Não aceitamos paid link insertions nem afirmações que façam o site parecer oficial quando ele é mantido por fãs.",
    },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Contact" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
    }, "/contact");
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const copy = localize(locale, CONTACT_COPY);

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-heading font-extrabold text-white mb-6">{copy.title}</h1>
            <p className="text-lg text-muted leading-relaxed mb-8">{copy.intro}</p>

            <div className="bg-surface border border-white/10 rounded-xl p-8 mb-6">
                <div className="text-sm font-bold uppercase tracking-widest text-muted mb-2">{copy.emailLabel}</div>
                <a href="mailto:redmanhao@gmail.com" className="text-xl font-semibold text-accent-blue hover:text-white underline transition-colors">redmanhao@gmail.com</a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <section className="bg-surface border border-border rounded-xl p-6">
                    <h2 className="text-xl font-bold text-white mb-3">{copy.correctionTitle}</h2>
                    <p className="text-muted leading-relaxed">{copy.correctionBody}</p>
                </section>
                <section className="bg-surface border border-border rounded-xl p-6">
                    <h2 className="text-xl font-bold text-white mb-3">{copy.policyTitle}</h2>
                    <p className="text-muted leading-relaxed">{copy.policyBody}</p>
                </section>
            </div>
        </div>
    );
}
