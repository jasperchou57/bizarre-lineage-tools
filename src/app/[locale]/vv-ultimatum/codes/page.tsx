import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { CircleAlert, Gift, ShieldCheck, XCircle } from "lucide-react";
import { SITE_URL, withCanonical } from "@/lib/metadata";
import {
    VV_ULTIMATUM_LAST_CHECKED,
    VV_ULTIMATUM_PLACE_IMAGES,
} from "@/data/vv-ultimatum";
import {
    VvBreadcrumb,
    VvInfoCard,
    VvPageHeader,
    VvRelatedLinks,
} from "../shared";

const metaTitle = "VV Ultimatum Codes - Active Codes and Redeem Status";
const metaDescription =
    "Track VV Ultimatum codes with active, expired, rewards, redeem notes, and official source labels kept separate from unverified community reports.";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    await params;

    return withCanonical({
        title: metaTitle,
        description: metaDescription,
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            url: `${SITE_URL}/vv-ultimatum/codes`,
            type: "article",
            images: [
                {
                    url: VV_ULTIMATUM_PLACE_IMAGES.wandenreich,
                    width: 768,
                    height: 432,
                    alt: "VV Ultimatum Wandenreich Roblox place icon",
                },
            ],
        },
    }, "/vv-ultimatum/codes");
}

const faq = [
    {
        question: "Are there active VV Ultimatum codes?",
        answer: "No active VV Ultimatum codes are marked officially confirmed on this page yet. That can change once a code is verified from an official source or checked in game.",
    },
    {
        question: "Why not list every community-reported code?",
        answer: "Unverified code reports can waste player time. This page keeps official, in-game tested, community-reported, and expired codes separated.",
    },
    {
        question: "How do I redeem VV Ultimatum codes?",
        answer: "A redeem flow has not been published here yet because this page is waiting for official or in-game confirmation before giving steps.",
    },
] as const;

export default async function VvUltimatumCodesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "VV Ultimatum Wiki", item: `${SITE_URL}/vv-ultimatum` },
            { "@type": "ListItem", position: 3, name: "Codes", item: `${SITE_URL}/vv-ultimatum/codes` },
        ],
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
    };

    return (
        <div className="container mx-auto max-w-5xl px-4 py-10">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <VvBreadcrumb current="Codes" />
            <VvPageHeader
                eyebrow="Codes tracker"
                title="VV Ultimatum Codes"
                intro="A code page built for accuracy first: active codes, expired codes, rewards, redeem steps, and source confidence stay separated instead of being mixed into one rumor list."
            />

            <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
                <article className="rounded-xl border border-border bg-surface p-5">
                    <div className="relative mb-5 aspect-video overflow-hidden rounded-lg border border-white/10 bg-background">
                        <Image
                            src={VV_ULTIMATUM_PLACE_IMAGES.wandenreich}
                            alt="VV Ultimatum Wandenreich Roblox place icon"
                            fill
                            priority
                            sizes="(min-width: 1024px) 620px, 100vw"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/35 to-transparent" />
                        <div className="absolute bottom-4 left-4 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-3 py-1 text-xs font-bold text-yellow-200">
                            No official active codes confirmed
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <CodeStatus title="Active codes" value="0" body="Officially confirmed active codes on this page." />
                        <CodeStatus title="Expired codes" value="0" body="Officially confirmed expired codes on this page." />
                        <CodeStatus title="Community reports" value="Watchlist" body="Not mixed into active codes without verification." />
                    </div>
                </article>

                <aside className="space-y-4">
                    <VvInfoCard title="Last checked">
                        {VV_ULTIMATUM_LAST_CHECKED}. This page is ready for codes, but no active VV Ultimatum code is marked official here yet.
                    </VvInfoCard>

                    <VvInfoCard title="Source labels">
                        <ul className="space-y-2">
                            <li>Official source</li>
                            <li>In-game tested</li>
                            <li>Community-reported</li>
                            <li>Expired</li>
                            <li>Unverified watchlist</li>
                        </ul>
                    </VvInfoCard>
                </aside>
            </section>

            <section className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <VvInfoCard title="Active codes">
                    <div className="rounded-lg border border-yellow-400/20 bg-yellow-400/5 p-4">
                        <div className="flex gap-3">
                            <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-yellow-300" />
                            <p>
                                No active VV Ultimatum codes are marked officially confirmed yet. Add codes here only after a verified source or in-game test confirms the reward.
                            </p>
                        </div>
                    </div>
                </VvInfoCard>

                <VvInfoCard title="Expired codes">
                    <div className="rounded-lg border border-white/10 bg-background/45 p-4">
                        <div className="flex gap-3">
                            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted" />
                            <p>No expired VV Ultimatum codes are tracked here yet.</p>
                        </div>
                    </div>
                </VvInfoCard>
            </section>

            <section className="mt-6 rounded-xl border border-border bg-surface p-5">
                <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                    <Gift className="h-5 w-5 text-accent-blue" />
                    Redeem notes
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                    This page does not publish a redeem flow yet. Once the menu path is verified from the game or an official source, the section should include exact steps, reward names, and why a code may fail.
                </p>
                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                    {["Check spelling exactly", "Confirm the code is still active", "Check level, faction, or server requirements"].map((item) => (
                        <div key={item} className="rounded-lg border border-white/10 bg-background/45 p-4 text-sm text-muted">
                            <ShieldCheck className="mb-3 h-5 w-5 text-accent-blue" />
                            {item}
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-10">
                <h2 className="text-2xl font-bold text-white">Codes FAQ</h2>
                <div className="mt-4 space-y-3">
                    {faq.map((item) => (
                        <div key={item.question} className="rounded-xl border border-border bg-surface p-5">
                            <h3 className="font-bold text-white">{item.question}</h3>
                            <p className="mt-2 text-sm leading-6 text-muted">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            <VvRelatedLinks currentHref="/vv-ultimatum/codes" />
        </div>
    );
}

function CodeStatus({ title, value, body }: { title: string; value: string; body: string }) {
    return (
        <div className="rounded-lg border border-white/10 bg-background/45 p-4">
            <div className="text-2xl font-bold text-white">{value}</div>
            <h2 className="mt-2 font-bold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
        </div>
    );
}
