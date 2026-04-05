import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Gift, Check, Clock, HelpCircle } from "lucide-react";
import { withCanonical, SITE_URL } from "@/lib/metadata";

const ACTIVE_CODES = [
    { code: "30kLikes", reward: "1 Stat Point Essence", source: "Official Trello" },
    { code: "100kLikes", reward: "1 Stat Point Essence + Rare Chest", source: "Official Trello" },
    { code: "shutdownwoops", reward: "Stand Stat Essence", source: "Official Trello" },
    { code: "1week", reward: "Stand Personality Essence", source: "Official Trello" },
    { code: "Update1", reward: "3 Stand Arrows + 5,000 Cash", source: "Update 1 Release" },
    { code: "DIOOverHeaven", reward: "1 Legendary Chest", source: "Update 1 Release" },
    { code: "NewStands", reward: "2 Stand Arrows + Stat Reset", source: "Update 1 Release" },
];

const EXPIRED_CODES: { code: string; reward: string }[] = [];

export const metadata: Metadata = withCanonical({
    title: "Bizarre Lineage Codes (April 2026) | 7 Active Codes",
    description: "All 7 working Bizarre Lineage codes for April 2026 including Update 1 codes. Redeem for Stand Arrows, Cash, Legendary Chests, and more.",
}, "/codes");

export default function CodesPage() {
    const lastVerified = "April 4, 2026";

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Codes', item: `${SITE_URL}/codes` },
        ],
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'What are the active Bizarre Lineage codes?',
                acceptedAnswer: { '@type': 'Answer', text: `The current active codes are: ${ACTIVE_CODES.map(c => c.code).join(', ')}. Redeem them in-game by typing !code followed by the code in the chat.` },
            },
            {
                '@type': 'Question',
                name: 'How do I redeem codes in Bizarre Lineage?',
                acceptedAnswer: { '@type': 'Answer', text: 'Open the in-game chat and type !code followed by the code. For example: !code 30kLikes. Codes are case-sensitive.' },
            },
            {
                '@type': 'Question',
                name: 'Why is my Bizarre Lineage code not working?',
                acceptedAnswer: { '@type': 'Answer', text: 'Codes are case-sensitive — make sure capitalization matches exactly. The code may also have expired. Check back here for the latest verified codes.' },
            },
        ],
    };

    const howToSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Redeem Codes in Bizarre Lineage',
        description: 'Step-by-step guide to redeem codes in Bizarre Lineage on Roblox.',
        step: [
            { '@type': 'HowToStep', position: 1, name: 'Open the game', text: 'Open Bizarre Lineage on Roblox.' },
            { '@type': 'HowToStep', position: 2, name: 'Open chat', text: 'Open the in-game chat by pressing / or clicking the chat icon.' },
            { '@type': 'HowToStep', position: 3, name: 'Type the code', text: 'Type !code followed by the code. For example: !code 30kLikes' },
            { '@type': 'HowToStep', position: 4, name: 'Claim rewards', text: 'Press Enter. Rewards are added to your inventory instantly.' },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">Codes</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <Gift className="h-12 w-12 text-accent-blue" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">
                    Bizarre Lineage Codes
                </h1>
            </div>

            <p className="text-sm text-muted mb-8 flex items-center gap-2">
                <Clock className="h-4 w-4" /> Last verified: <strong className="text-white">{lastVerified}</strong> via official Trello
            </p>

            {/* Active Codes */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" /> Active Codes ({ACTIVE_CODES.length})
                </h2>
                <div className="space-y-3">
                    {ACTIVE_CODES.map((item) => (
                        <div key={item.code} className="bg-surface border border-border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <code className="bg-accent-blue/10 text-accent-blue border border-accent-blue/20 px-3 py-1.5 rounded font-mono font-bold text-sm">
                                    !code {item.code}
                                </code>
                                <span className="text-xs text-green-400 font-bold uppercase">Active</span>
                            </div>
                            <div className="text-sm text-muted">{item.reward}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* How to Redeem */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">How to Redeem Codes</h2>
                <div className="bg-surface border border-border rounded-xl p-6">
                    <ol className="space-y-3 text-muted">
                        <li className="flex items-start gap-3">
                            <span className="bg-accent-blue/10 text-accent-blue rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">1</span>
                            <span>Open <strong className="text-white">Bizarre Lineage</strong> on Roblox</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-accent-blue/10 text-accent-blue rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">2</span>
                            <span>Open the <strong className="text-white">in-game chat</strong> (press / or click the chat icon)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-accent-blue/10 text-accent-blue rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">3</span>
                            <span>Type <code className="bg-white/5 px-2 py-0.5 rounded text-white font-mono text-sm">!code 30kLikes</code> (replace with any code above)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-accent-blue/10 text-accent-blue rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0">4</span>
                            <span>Press <strong className="text-white">Enter</strong> — rewards are added to your inventory instantly</span>
                        </li>
                    </ol>
                </div>
            </section>

            {/* Why Codes Fail */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Why Codes Might Not Work</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-surface border border-border rounded-lg p-4">
                        <h3 className="text-sm font-bold text-red-400 uppercase mb-2">Case Sensitivity</h3>
                        <p className="text-sm text-muted">Codes are case-sensitive. <code className="text-white">30kLikes</code> works, <code className="text-muted">30klikes</code> does not.</p>
                    </div>
                    <div className="bg-surface border border-border rounded-lg p-4">
                        <h3 className="text-sm font-bold text-red-400 uppercase mb-2">Already Redeemed</h3>
                        <p className="text-sm text-muted">Each code can only be used once per account.</p>
                    </div>
                    <div className="bg-surface border border-border rounded-lg p-4">
                        <h3 className="text-sm font-bold text-red-400 uppercase mb-2">Expired</h3>
                        <p className="text-sm text-muted">Codes expire without warning. Check this page for the latest status.</p>
                    </div>
                    <div className="bg-surface border border-border rounded-lg p-4">
                        <h3 className="text-sm font-bold text-red-400 uppercase mb-2">Fake Codes</h3>
                        <p className="text-sm text-muted">Only trust codes from the official Trello, Discord, or this page. Many third-party sites list unverified codes.</p>
                    </div>
                </div>
            </section>

            {/* Expired Codes */}
            {EXPIRED_CODES.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4">Expired Codes</h2>
                    <div className="space-y-2">
                        {EXPIRED_CODES.map((item) => (
                            <div key={item.code} className="bg-surface/50 border border-white/5 rounded-lg p-3 flex items-center justify-between opacity-60">
                                <code className="font-mono text-sm text-muted line-through">{item.code}</code>
                                <span className="text-xs text-red-400">Expired</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Official Sources */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Official Sources</h2>
                <div className="bg-surface border border-border rounded-xl p-6">
                    <p className="text-muted text-sm mb-4">We verify codes from these official channels only:</p>
                    <div className="flex flex-wrap gap-3">
                        <a href="https://trello.com/b/wtzgwqIf" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:border-accent-blue/50 transition-colors">
                            Official Trello
                        </a>
                        <a href="https://discord.gg/bizarrelineage" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:border-accent-blue/50 transition-colors">
                            Official Discord
                        </a>
                        <a href="https://www.roblox.com/games/14890802310/Bizarre-Lineage" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:border-accent-blue/50 transition-colors">
                            Roblox Game Page
                        </a>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-accent-blue" /> Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    <details className="group bg-surface border border-border rounded-lg">
                        <summary className="cursor-pointer p-4 text-white font-medium flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg">
                            How do I redeem codes in Bizarre Lineage?
                            <ChevronRight className="h-4 w-4 text-muted group-open:rotate-90 transition-transform shrink-0 ml-2" />
                        </summary>
                        <div className="px-4 pb-4 text-muted text-sm leading-relaxed">
                            Open the in-game chat and type <code className="text-white">!code</code> followed by the code. For example: <code className="text-white">!code 30kLikes</code>. Codes are case-sensitive.
                        </div>
                    </details>
                    <details className="group bg-surface border border-border rounded-lg">
                        <summary className="cursor-pointer p-4 text-white font-medium flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg">
                            Why is my code not working?
                            <ChevronRight className="h-4 w-4 text-muted group-open:rotate-90 transition-transform shrink-0 ml-2" />
                        </summary>
                        <div className="px-4 pb-4 text-muted text-sm leading-relaxed">
                            Codes are case-sensitive — make sure the capitalization matches exactly. The code may have expired or already been redeemed on your account.
                        </div>
                    </details>
                    <details className="group bg-surface border border-border rounded-lg">
                        <summary className="cursor-pointer p-4 text-white font-medium flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg">
                            Where do new codes come from?
                            <ChevronRight className="h-4 w-4 text-muted group-open:rotate-90 transition-transform shrink-0 ml-2" />
                        </summary>
                        <div className="px-4 pb-4 text-muted text-sm leading-relaxed">
                            New codes are released by the developer MIDAS on the official Trello board and Discord server, usually tied to like milestones or special events.
                        </div>
                    </details>
                </div>
            </section>

            {/* Internal Links */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Explore More</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/tier-list" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Stand Tier List</div>
                        <div className="text-xs text-muted mt-1">See which Stands are best in the current meta</div>
                    </Link>
                    <Link href="/build-planner" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Build Planner</div>
                        <div className="text-xs text-muted mt-1">Plan your Stand + Style + Sub combo</div>
                    </Link>
                    <Link href="/stands" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">All Stands</div>
                        <div className="text-xs text-muted mt-1">Browse all 17 Stands with moves and stats</div>
                    </Link>
                    <Link href="/guides/stand-chances" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Stand Chances</div>
                        <div className="text-xs text-muted mt-1">Drop rates and rarity breakdown</div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
