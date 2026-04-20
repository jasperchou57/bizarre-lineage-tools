import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Search, Target, ArrowRight, Zap, Gift, ChevronDown } from "lucide-react";
import standsData from "@/data/stands.json";
import { withCanonical } from "@/lib/metadata";

export const metadata: Metadata = withCanonical({}, "/");

const faqData = [
  {
    question: "What is the best Stand in Bizarre Lineage for PvP?",
    answer: "On this site's community ranking, Made in Heaven, Whitesnake, and C-Moon currently sit near the top for PvP. Those placements are local planner notes, not official balance data.",
  },
  {
    question: "Are there any active Bizarre Lineage codes right now?",
    answer: "Yes — there are currently 4 active codes verified from the official Trello: 30kLikes, 100kLikes, shutdownwoops, and 1week. Type !code followed by the code in the in-game chat to redeem. Visit our Codes page for full details and rewards.",
  },
  {
    question: "How do I get a specific Stand like Whitesnake or Made in Heaven?",
    answer: "The public Trello confirms that you unlock your first Stand with a Stand Arrow. Lucky Arrow does not raise Stand rarity; it guarantees a random skin on your current Stand. Evolution stands such as Made in Heaven follow their own quest or evolution paths on the official Trello.",
  },
  {
    question: "What is the best fighting style and sub-ability combo?",
    answer: "The best combo depends on your Stand and playstyle. In this site's planner data, Boxing is the safest all-round fighting style, while Hamon and Vampire are frequent community recommendations. Use the planner to compare local estimates side by side.",
  },
  {
    question: "How does the Build Planner scoring system work?",
    answer: "Our build planner estimates a Stand + Fighting Style + Sub-Ability combo across 5 dimensions: PvP, PvE, Survival, Mobility, and Cost Efficiency. The numbers come from the site's local dataset and weighting rules, not from official game balance values.",
  },
];

const popularLinks = [
  { label: "Whitesnake Build Guide", href: "/stands/whitesnake" },
  { label: "Made in Heaven Guide", href: "/stands/made-in-heaven" },
  { label: "Best PvP Stands", href: "/tier-list" },
  { label: "The World High Voltage", href: "/stands/the-world-high-voltage" },
  { label: "Star Platinum vs The World", href: "/stands/star-platinum" },
  { label: "King Crimson Build", href: "/stands/king-crimson" },
  { label: "C-Moon Awakening", href: "/stands/c-moon" },
  { label: "Boxing Style Guide", href: "/fighting-styles/boxing" },
  { label: "Hamon Sub-Ability", href: "/sub-abilities/hamon" },
  { label: "Leveling Guide (1-50)", href: "/guides/leveling" },
  { label: "Prestige Requirements", href: "/guides/prestige" },
  { label: "Stats Guide", href: "/guides/stats" },
  { label: "Stand Chances & Rarity", href: "/guides/stand-chances" },
  { label: "Best Builds", href: "/guides/best-builds" },
  { label: "All Stand Tier Rankings", href: "/tier-list" },
];

export default function Home() {
  const trendingStands = standsData.slice(0, 3);

  const homeFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }} />
      <div className="flex flex-col items-center max-w-5xl mx-auto">
        {/* Hero Section with Background Image */}
        <div className="relative w-full rounded-2xl overflow-hidden mb-12">
          <Image
            src="/images/hero-bg.jpg"
            alt="Bizarre Lineage Background"
            width={1280}
            height={720}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          <div className="relative text-center space-y-6 px-4 py-20 md:py-28 w-full max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white text-balance">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-indigo">Bizarre Lineage</span> Tier List &amp; Codes
            </h1>
            <p className="text-lg md:text-xl text-muted text-balance mx-auto">
              Cross-check official Trello move data, compare site-maintained planner rankings, and verify official links before you spend your resources.
            </p>
          </div>
        </div>

        <div className="px-4 w-full flex flex-col items-center">

        {/* Primary Actions */}
        <div className="w-full max-w-2xl space-y-6 mb-16">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted group-focus-within:text-accent-blue transition-colors" />
            </div>
            <Link href="/stands" className="block">
              <input
                type="text"
                readOnly
                className="block w-full pl-12 pr-4 py-4 bg-surface border border-border rounded-xl text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all shadow-lg cursor-pointer"
                placeholder="Search for a Stand (e.g. Whitesnake, Made in Heaven)..."
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/build-planner" className="flex items-center justify-between p-6 bg-gradient-to-br from-surface to-[#1a1a1a] border border-border rounded-xl hover:border-accent-blue/50 group transition-all">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">Build Planner</span>
                <span className="text-sm text-muted">Don&apos;t waste your Stand Arrow</span>
              </div>
              <ArrowRight className="h-5 w-5 text-muted group-hover:text-accent-blue transition-transform group-hover:translate-x-1" />
            </Link>

            <Link href="/tier-list" className="flex items-center justify-between p-6 bg-gradient-to-br from-surface to-[#1a1a1a] border border-border rounded-xl hover:border-accent-indigo/50 group transition-all">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white group-hover:text-accent-indigo transition-colors">Tier List</span>
                <span className="text-sm text-muted">Stop guessing which Stand is best</span>
              </div>
              <ArrowRight className="h-5 w-5 text-muted group-hover:text-accent-indigo transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Codes Banner */}
        <div className="w-full max-w-2xl mb-16">
          <Link href="/codes" className="flex items-center justify-between p-5 bg-gradient-to-br from-surface to-[#1a1a1a] border border-border rounded-xl hover:border-yellow-500/40 group transition-all">
            <div className="flex items-center gap-3">
              <Gift className="h-5 w-5 text-yellow-400/70" />
              <div className="flex flex-col">
                <span className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors">4 Active Codes — Official Trello Sync</span>
                <span className="text-sm text-muted">Verified from official Trello &middot; Redeem before they expire</span>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* How It Works */}
        <div className="w-full max-w-3xl mb-16">
          <h2 className="text-2xl font-heading font-bold text-white text-center mb-8">How the Build Planner Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue font-bold text-lg">1</div>
              <h3 className="font-bold text-white">Pick a Stand</h3>
              <p className="text-sm text-muted">Choose from 17 Stands in this site&apos;s local dataset. Each entry keeps official move names but uses site-maintained planner scores.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-accent-indigo/10 border border-accent-indigo/20 flex items-center justify-center text-accent-indigo font-bold text-lg">2</div>
              <h3 className="font-bold text-white">Select Style &amp; Sub</h3>
              <p className="text-sm text-muted">Pair your Stand with a fighting style (Boxing, Kendo, Karate) and a sub-ability (Hamon, Vampire, Cyborg) to test planner combinations.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 font-bold text-lg">3</div>
              <h3 className="font-bold text-white">Get Your Score</h3>
              <p className="text-sm text-muted">See planner estimates across 5 dimensions, save them to your Vault, and compare local build profiles side by side.</p>
            </div>
          </div>
        </div>

        {/* Trending Stands */}
        <div className="w-full space-y-8 mb-16">
          <h2 className="text-2xl font-heading font-bold text-white text-center">Best Bizarre Lineage Stands (Trending)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingStands.map((stand) => (
              <Link key={stand.id} href={`/stands/${stand.id}`} className="block group">
                <div className="bg-surface border border-border rounded-xl p-6 h-full hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors">{stand.name}</h3>
                    <span className="px-2 py-1 text-xs font-mono font-bold uppercase rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                      Planner {stand.tier.overall}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Target className="h-4 w-4" /> Damage Score: <span className="text-white font-medium">{stand.scores.damage}/10</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Zap className="h-4 w-4" /> Suggested Style: <span className="text-white font-medium capitalize">{stand.recommendedStyles[0]}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Searches — internal link block for crawl paths */}
        <div className="w-full max-w-3xl mb-16">
          <h2 className="text-2xl font-heading font-bold text-white text-center mb-6">Popular Bizarre Lineage Guides</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {popularLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted bg-surface border border-border rounded-full hover:border-accent-blue/50 hover:text-white transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* YouTube Video Section */}
        <div className="w-full max-w-3xl mb-16">
          <h2 className="text-2xl font-heading font-bold text-white text-center mb-3">Watch Bizarre Lineage in Action</h2>
          <p className="text-sm text-muted text-center mb-6">Complete beginner&apos;s walkthrough covering Stands, leveling, progression, and Awakening.</p>
          <div className="bg-surface border border-border rounded-xl overflow-hidden aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/LnyDuoPfC18"
              title="The Ultimate Beginner's Guide to Bizarre Lineage — Stands, Leveling, Progression & Awakening"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="w-full max-w-3xl mb-16">
          <h2 className="text-2xl font-heading font-bold text-white text-center mb-8">Bizarre Lineage FAQ</h2>
          <div className="space-y-4">
            {faqData.map((item, i) => (
              <details key={i} className="group bg-surface border border-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="font-medium text-white pr-4">{item.question}</span>
                  <ChevronDown className="h-5 w-5 text-muted flex-shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Patch freshness note */}
        <div className="w-full max-w-2xl text-center">
          <p className="text-xs text-muted/60">
            Move names, obtain methods, and progression notes are cross-checked against the public official Trello board. Rankings and planner scores on this site are community-maintained notes.
          </p>
        </div>
        </div>
      </div>
    </>
  );
}
