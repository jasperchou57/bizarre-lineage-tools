import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Shield, Zap, HelpCircle } from "lucide-react";
import { withCanonical, SITE_URL } from "@/lib/metadata";
import raidsData from "@/data/raids.json";
import standsData from "@/data/stands.json";

export const metadata: Metadata = withCanonical({
    title: "Bizarre Lineage Raids Guide — All Bosses, Strategies & Rewards (2026)",
    description: "Complete raid guide for all 4 Bizarre Lineage bosses: Avdol, Kira, Jotaro, DIO. Best stands, strategies, SSS grade tips, and token shop rewards.",
}, "/raids");

export default function RaidsPage() {
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Raids', item: `${SITE_URL}/raids` },
        ],
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: 'How many raids are in Bizarre Lineage?', acceptedAnswer: { '@type': 'Answer', text: 'There are 4 raid bosses: Muhammad Avdol (Easy), Yoshikage Kira (Hard), Jotaro Kujo (Hard), and DIO (Hard). Each drops unique tokens for their raid shop.' } },
            { '@type': 'Question', name: 'What is the best Stand for raids?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on the boss. Made in Heaven and King Crimson work well across most raids due to speed and burst. For the Jotaro raid specifically, the Anubis cheese method is the fastest clear.' } },
            { '@type': 'Question', name: 'How do I get SSS rank in raids?', acceptedAnswer: { '@type': 'Answer', text: 'SSS rank requires 0 deaths during the entire raid. Your grade is based on death count: SSS (0), SS (1), S (2), A (3-4), B (5-6), C (7-8), D (9+).' } },
        ],
    };

    const difficultyColor = (d: string) => d === 'Easy' ? 'text-green-400 border-green-400/20 bg-green-400/10' : 'text-red-400 border-red-400/20 bg-red-400/10';

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <nav className="flex items-center text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-white" aria-current="page">Raids</span>
            </nav>

            <div className="mb-12">
                <div className="relative w-full rounded-xl overflow-hidden mb-6">
                    <Image src="/images/pages/raids.png" alt="Bizarre Lineage Raids" width={800} height={450} className="w-full h-48 object-cover opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                        <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white">Bizarre Lineage Raids Guide</h1>
                    </div>
                </div>
                <p className="text-lg text-muted max-w-3xl">
                    Complete guide to all 4 raid bosses in Bizarre Lineage. Each raid drops unique tokens for exclusive accessories and materials needed for Stand evolution. Raids gate Stand Awakening — every player needs to clear them.
                </p>
            </div>

            {/* Raid Overview */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">All Raids at a Glance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {raidsData.map(raid => (
                        <Link key={raid.id} href={`/raids/${raid.id}`} className="bg-surface border border-border rounded-xl p-6 hover:border-accent-blue/50 transition-colors group">
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors">{raid.boss}</h3>
                                <span className={`px-2 py-1 text-xs font-mono font-bold rounded-full border ${difficultyColor(raid.difficulty)}`}>
                                    {raid.difficulty}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm text-muted mb-3">
                                <div className="flex items-center gap-1.5">
                                    <Shield className="h-3.5 w-3.5" /> HP: <span className="text-white font-mono">{raid.bossHp.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Zap className="h-3.5 w-3.5" /> Level: <span className="text-white font-mono">{raid.bossLevel}</span>
                                </div>
                            </div>
                            <div className="text-sm text-muted mb-3">
                                Best Stands: {raid.recommendedStands.slice(0, 3).map(id => standsData.find(s => s.id === id)?.name).join(', ')}
                            </div>
                            <div className="flex items-center text-sm text-accent-blue group-hover:translate-x-1 transition-transform">
                                Full Strategy Guide <ChevronRight className="h-4 w-4 ml-1" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Grading System */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Raid Grading System</h2>
                <div className="bg-surface border border-border rounded-xl p-6">
                    <p className="text-muted text-sm mb-4">Your grade is determined by how many times you die during the raid. Better grades unlock better shop rewards.</p>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 text-center">
                        {[
                            { grade: 'SSS', deaths: '0', color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
                            { grade: 'SS', deaths: '1', color: 'text-accent-blue bg-accent-blue/10 border-accent-blue/20' },
                            { grade: 'S', deaths: '2', color: 'text-accent-blue bg-accent-blue/10 border-accent-blue/20' },
                            { grade: 'A', deaths: '3-4', color: 'text-green-400 bg-green-400/10 border-green-400/20' },
                            { grade: 'B', deaths: '5-6', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
                            { grade: 'C', deaths: '7-8', color: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
                            { grade: 'D', deaths: '9+', color: 'text-red-400 bg-red-400/10 border-red-400/20' },
                        ].map(g => (
                            <div key={g.grade} className={`p-3 rounded-lg border ${g.color}`}>
                                <div className="text-lg font-heading font-black">{g.grade}</div>
                                <div className="text-xs mt-1 opacity-70">{g.deaths} deaths</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* General Tips */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">General Raid Tips</h2>
                <div className="bg-surface border border-border rounded-xl p-6 text-sm text-muted leading-relaxed space-y-3">
                    <p><strong className="text-white">Bring the right sub-ability.</strong> Hamon provides bonus damage against DIO (vampire weakness). Vampire gives lifesteal for sustained fights but is weak against DIO. Cyborg&apos;s 15% defense bonus helps survive burst damage.</p>
                    <p><strong className="text-white">Learn the boss patterns first.</strong> Do a practice run where you focus on dodging, not attacking. Memorize the telegraph animations for each major attack. Deaths cost your grade — surviving is more important than dealing damage.</p>
                    <p><strong className="text-white">Token farming efficiency.</strong> Each raid gives up to {raidsData[0].maxTokens} tokens per run. Avdol is the fastest to clear, making it the best tokens-per-minute farm. Jotaro and DIO drop evolution materials needed for Stand progression.</p>
                    <p><strong className="text-white">Use the Build Planner.</strong> Check your PvE score before attempting raids. Builds scoring 7+ in PvE are recommended for Hard raids. <Link href="/build-planner" className="text-accent-blue hover:text-white transition-colors underline underline-offset-2">Open Build Planner</Link></p>
                </div>
            </section>

            {/* FAQ */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-accent-blue" /> Raids FAQ
                </h2>
                <div className="space-y-3">
                    {[
                        { q: "How many raids are in Bizarre Lineage?", a: "There are 4 raid bosses: Muhammad Avdol (Easy), Yoshikage Kira (Hard), Jotaro Kujo (Hard), and DIO (Hard). Each has a unique token shop with exclusive accessories." },
                        { q: "What is the best Stand for raids?", a: "It depends on the boss. Made in Heaven and King Crimson work well across most raids. For Jotaro specifically, the Anubis cheese method is the fastest clear due to high sustained melee DPS." },
                        { q: "How do I get SSS rank?", a: "SSS requires 0 deaths. Focus on learning boss patterns and dodging before trying to DPS. High-mobility Stands like Made in Heaven make SSS much easier." },
                        { q: "Do I need to do raids for Stand evolution?", a: "Yes. Certain raid drops (like Dio's Bone and Cosmic Radiation) are required for Stand evolution quests. The DIO raid is particularly important for the Made in Heaven evolution chain." },
                    ].map(faq => (
                        <details key={faq.q} className="group bg-surface border border-border rounded-lg">
                            <summary className="cursor-pointer p-4 text-white font-medium flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg">
                                {faq.q}
                                <ChevronRight className="h-4 w-4 text-muted group-open:rotate-90 transition-transform shrink-0 ml-2" />
                            </summary>
                            <div className="px-4 pb-4 text-muted text-sm leading-relaxed">{faq.a}</div>
                        </details>
                    ))}
                </div>
            </section>

            {/* Internal Links */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Related</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Link href="/tier-list" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">Tier List</Link>
                    <Link href="/build-planner" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">Build Planner</Link>
                    <Link href="/guides/leveling" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">Leveling Guide</Link>
                    <Link href="/codes" className="bg-surface border border-border rounded-lg p-3 text-sm text-white hover:border-accent-blue/50 transition-colors">Active Codes</Link>
                </div>
            </section>
        </div>
    );
}
