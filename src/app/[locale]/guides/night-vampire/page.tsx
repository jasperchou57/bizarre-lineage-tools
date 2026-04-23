import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Moon, Skull, Heart, Shield } from "lucide-react";
import { withCanonical, SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = withCanonical({
    title: "Bizarre Lineage Night Vampire Guide — How to Become & Best Builds",
    description: "Complete Night Vampire guide for Bizarre Lineage. Learn how to become a Night Vampire, all abilities, best Stand pairings, and PvP strategies.",
}, "/guides/night-vampire");

const VAMPIRE_ABILITIES = [
    { name: "Blood Drain", key: "G", type: "Melee", description: "Grab an enemy and drain their HP. Heals you for the damage dealt. Core sustain ability.", cooldown: "8s" },
    { name: "Vaporization Freeze", key: "H", type: "Ranged", description: "Freeze an opponent at range, stunning them for 2 seconds. Great combo starter.", cooldown: "12s" },
    { name: "Space Ripper Stingy Eyes", key: "J", type: "Ranged", description: "Fire high-pressure fluid from your eyes in a beam. Long range, high damage.", cooldown: "15s" },
    { name: "Blood Rage", key: "V", type: "Buff", description: "Enter a frenzied state that increases damage and attack speed. Drains HP over time.", cooldown: "30s" },
];

const BEST_PAIRINGS = [
    { stand: "The World", reason: "Time Stop + Blood Drain is a guaranteed full heal. Vampire compensates for The World's low sustain perfectly.", tier: "S+" },
    { stand: "King Crimson", reason: "Time Erase into Blood Drain is nearly unavoidable. The combo potential with Vampire abilities makes KC a top-tier threat.", tier: "S" },
    { stand: "Star Platinum", reason: "Fast M1s build blood gauge quickly. Vaporization Freeze into Star Platinum's full combo is devastating.", tier: "S" },
    { stand: "Whitesnake", reason: "Already has high CC. Adding Vampire gives Whitesnake the sustain it needs for extended fights and raid grinding.", tier: "A" },
];

export default function NightVampireGuidePage() {
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
            { '@type': 'ListItem', position: 3, name: 'Night Vampire', item: `${SITE_URL}/guides/night-vampire` },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white" aria-current="page">Night Vampire</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
                <Moon className="h-12 w-12 text-purple-400" />
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white m-0">
                    Bizarre Lineage Night Vampire Guide
                </h1>
            </div>
            <p className="text-lg text-muted mb-10 leading-relaxed">
                Night Vampire is one of the most powerful sub-abilities in Bizarre Lineage. It gives you lifesteal, ranged attacks, and a devastating freeze ability. This guide covers how to obtain it and the best builds.
            </p>

            {/* How to Become */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">How to Become a Night Vampire</h2>
                <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="bg-purple-500/10 text-purple-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">1</div>
                        <div>
                            <h3 className="font-bold text-white">Obtain a Stone Mask</h3>
                            <p className="text-sm text-muted">Stone Masks drop from Legendary Chests, raid shops, and occasionally from Meteor Shower events. They are a rare drop, so be patient or use codes to get chests.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-purple-500/10 text-purple-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">2</div>
                        <div>
                            <h3 className="font-bold text-white">Use the Stone Mask</h3>
                            <p className="text-sm text-muted">Equip the Stone Mask from your inventory. Using it transforms you into a Vampire permanently (until you choose to remove it).</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-purple-500/10 text-purple-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">3</div>
                        <div>
                            <h3 className="font-bold text-white">Night Vampire Upgrade</h3>
                            <p className="text-sm text-muted">After becoming a regular Vampire, you can upgrade to Night Vampire by reaching Level 50 and completing a special quest. Night Vampires gain enhanced abilities and reduced sun damage.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pros and Cons */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Vampire Pros & Cons</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-surface border border-border rounded-xl p-5">
                        <h3 className="text-sm font-bold text-green-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                            <Heart className="h-4 w-4" /> Strengths
                        </h3>
                        <ul className="text-sm text-muted space-y-2">
                            <li>+ Lifesteal on every hit keeps you alive</li>
                            <li>+ Vaporization Freeze is one of the best stuns in the game</li>
                            <li>+ Space Ripper has massive range for poke damage</li>
                            <li>+ Blood Rage gives a huge damage boost in clutch moments</li>
                            <li>+ Enhanced combat stats at night time</li>
                        </ul>
                    </div>
                    <div className="bg-surface border border-border rounded-xl p-5">
                        <h3 className="text-sm font-bold text-red-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                            <Skull className="h-4 w-4" /> Weaknesses
                        </h3>
                        <ul className="text-sm text-muted space-y-2">
                            <li>- Takes damage from sunlight (reduced as Night Vampire)</li>
                            <li>- Weak against Hamon users (bonus damage vs Vampires)</li>
                            <li>- Blood Rage drains your own HP</li>
                            <li>- Stone Mask is rare and hard to obtain early game</li>
                            <li>- Some areas have permanent daylight</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Abilities */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Night Vampire Abilities</h2>
                <div className="space-y-3">
                    {VAMPIRE_ABILITIES.map((ability) => (
                        <div key={ability.name} className="bg-surface border border-border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-white">{ability.name}</span>
                                    <span className="bg-white/5 border border-white/10 rounded px-2 text-xs font-mono text-muted">Key: {ability.key}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted capitalize">{ability.type}</span>
                                    <span className="text-xs text-accent-blue">{ability.cooldown}</span>
                                </div>
                            </div>
                            <p className="text-sm text-muted">{ability.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Night Vampire Video Guide */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Night Vampire Video Guide</h2>
                <div className="bg-surface border border-border rounded-xl overflow-hidden aspect-video">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/EJu0Ltw3WGU"
                        title="How to Farm Night Vampire - Bizarre Lineage"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full"
                    />
                </div>
            </section>

            {/* Best Stand Pairings */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent-blue" /> Best Stand Pairings
                </h2>
                <div className="space-y-3">
                    {BEST_PAIRINGS.map((pairing) => (
                        <Link key={pairing.stand} href={`/stands/${pairing.stand.toLowerCase().replace(/ /g, '-')}`} className="block bg-surface border border-border rounded-xl p-5 hover:border-accent-blue/50 transition-colors group">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-white group-hover:text-accent-blue transition-colors">{pairing.stand}</h3>
                                <span className="px-2 py-1 text-xs font-mono font-bold rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20">{pairing.tier}</span>
                            </div>
                            <p className="text-sm text-muted">{pairing.reason}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Night Vampire FAQ</h2>
                <div className="space-y-4">
                    <details className="group bg-surface border border-border rounded-xl overflow-hidden">
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                            <span className="font-medium text-white pr-4">Can I remove Vampire and go back to normal?</span>
                            <ChevronRight className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                            Yes, you can remove the Vampire sub-ability by using a Rokakaka Fruit on it. This will reset your sub-ability slot, allowing you to pick a different one like Hamon or Cyborg.
                        </div>
                    </details>
                    <details className="group bg-surface border border-border rounded-xl overflow-hidden">
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                            <span className="font-medium text-white pr-4">Does Night Vampire still take sun damage?</span>
                            <ChevronRight className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                            Night Vampires take significantly reduced sun damage compared to regular Vampires. It&apos;s still present but manageable, especially with lifesteal healing offsetting the damage.
                        </div>
                    </details>
                    <details className="group bg-surface border border-border rounded-xl overflow-hidden">
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                            <span className="font-medium text-white pr-4">Is Vampire better than Hamon?</span>
                            <ChevronRight className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                            It depends on your playstyle. Vampire excels at sustain and has better ranged options. Hamon provides bonus damage against Vampires and better burst potential. For PvP, Vampire is generally considered stronger in the current meta due to lifesteal.
                        </div>
                    </details>
                </div>
            </section>

            {/* Related */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-4">Related Guides</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/sub-abilities/vampire" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Vampire Sub-Ability</div>
                        <div className="text-xs text-muted mt-1">Base Vampire stats and move data</div>
                    </Link>
                    <Link href="/sub-abilities/hamon" className="bg-surface border border-border rounded-lg p-4 hover:border-accent-blue/50 transition-colors group">
                        <div className="font-bold text-white group-hover:text-accent-blue transition-colors">Hamon Sub-Ability</div>
                        <div className="text-xs text-muted mt-1">The anti-Vampire alternative</div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
