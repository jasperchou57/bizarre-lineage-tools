import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, BookOpen, BarChart3, Dice6, Wrench, TrendingUp, ArrowUpCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "All Guides | Bizarre Lineage",
    description: "Browse all Bizarre Lineage guides: stats explained, stand rarity & drop rates, best builds, leveling routes, and prestige requirements.",
};

const guides = [
    {
        title: "Stats Guide",
        description: "What each stat does, best presets for PvP/PvE/beginners, and common mistakes to avoid.",
        href: "/guides/stats",
        icon: <BarChart3 className="h-8 w-8 text-accent-blue" />,
        tag: "New",
        tagColor: "bg-green-500/20 text-green-400",
    },
    {
        title: "Stand Chances & Rarity",
        description: "Every rarity tier, exact drop rates, all Stands grouped by rarity, and tips to improve your odds.",
        href: "/guides/stand-chances",
        icon: <Dice6 className="h-8 w-8 text-accent-indigo" />,
        tag: "New",
        tagColor: "bg-green-500/20 text-green-400",
    },
    {
        title: "Best Builds",
        description: "Complete Stand + Style + Sub setups for PvP, PvE, beginners, glass cannon, and tank playstyles.",
        href: "/guides/best-builds",
        icon: <Wrench className="h-8 w-8 text-purple-400" />,
        tag: "New",
        tagColor: "bg-green-500/20 text-green-400",
    },
    {
        title: "Fastest Leveling Route",
        description: "The optimal quest loop from Level 1 to 50. Best enemies, quests, and EXP strategies.",
        href: "/guides/leveling",
        icon: <TrendingUp className="h-8 w-8 text-green-400" />,
    },
    {
        title: "Prestige Guide",
        description: "Requirements, benefits, what you keep and lose, and the fastest prestige route.",
        href: "/guides/prestige",
        icon: <ArrowUpCircle className="h-8 w-8 text-yellow-400" />,
    },
];

export default function GuidesIndexPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-muted mb-8">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">Guides</span>
            </div>

            {/* Hero */}
            <div className="flex items-center gap-4 mb-8">
                <BookOpen className="h-12 w-12 text-accent-blue" />
                <h1 className="text-4xl font-heading font-extrabold text-white m-0">Bizarre Lineage Guides</h1>
            </div>

            <p className="text-xl text-muted leading-relaxed mb-10">
                Everything you need to progress faster, build smarter, and understand the game mechanics. Pick a guide below.
            </p>

            {/* Guide Cards */}
            <div className="space-y-4">
                {guides.map((guide) => (
                    <Link
                        key={guide.href}
                        href={guide.href}
                        className="flex items-center gap-6 bg-surface border border-border rounded-xl p-6 hover:border-accent-blue/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all group"
                    >
                        <div className="shrink-0">{guide.icon}</div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">{guide.title}</h2>
                                {guide.tag && (
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${guide.tagColor}`}>{guide.tag}</span>
                                )}
                            </div>
                            <p className="text-sm text-muted">{guide.description}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted group-hover:text-accent-blue shrink-0 transition-colors" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
