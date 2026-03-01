import Link from "next/link";
import { Search, Target, ArrowRight, Zap, Gift } from "lucide-react";
import standsData from "@/data/stands.json";

export default function Home() {
  // Get top 3 stands for trending
  const trendingStands = standsData.slice(0, 3);

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-130px)] px-4 py-16 md:py-24 max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-6 mb-12 w-full max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white text-balance">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-indigo">Bizarre Lineage</span> Tier List & Codes
        </h1>
        <p className="text-lg md:text-xl text-muted text-balance mx-auto">
          Find the best Stands, optimal build combos, and active codes for PvP and PvE. Don&apos;t waste your Stand Arrow.
        </p>
      </div>

      {/* Primary Actions (Search & Planner) */}
      <div className="w-full max-w-2xl space-y-6 mb-16">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted group-focus-within:text-accent-blue transition-colors" />
          </div>
          {/* We'll make this an actual interactive combobox in the next iteration, for now it's a visual link/input */}
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
              <span className="text-sm text-muted">Create and score your setup</span>
            </div>
            <ArrowRight className="h-5 w-5 text-muted group-hover:text-accent-blue transition-transform group-hover:translate-x-1" />
          </Link>

          <Link href="/tier-list" className="flex items-center justify-between p-6 bg-gradient-to-br from-surface to-[#1a1a1a] border border-border rounded-xl hover:border-accent-indigo/50 group transition-all">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white group-hover:text-accent-indigo transition-colors">Tier List</span>
              <span className="text-sm text-muted">Current meta rankings</span>
            </div>
            <ArrowRight className="h-5 w-5 text-muted group-hover:text-accent-indigo transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Codes Banner — toned down until active codes are available */}
      <div className="w-full max-w-2xl mb-16">
        <Link href="/codes" className="flex items-center justify-between p-5 bg-gradient-to-br from-surface to-[#1a1a1a] border border-border rounded-xl hover:border-yellow-500/40 group transition-all">
          <div className="flex items-center gap-3">
            <Gift className="h-5 w-5 text-yellow-400/70" />
            <div className="flex flex-col">
              <span className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors">Bizarre Lineage Codes</span>
              <span className="text-sm text-muted">Check for free Arrows, Rokakakas &amp; Cash</span>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      {/* Trending / Features Section */}
      <div className="w-full space-y-8">
        <h2 className="text-2xl font-heading font-bold text-white text-center">Best Bizarre Lineage Stands (Trending)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingStands.map((stand) => (
            <Link key={stand.id} href={`/stands/${stand.id}`} className="block group">
              <div className="bg-surface border border-border rounded-xl p-6 h-full hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors">{stand.name}</h3>
                  <span className="px-2 py-1 text-xs font-mono font-bold uppercase rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                    Tier {stand.tier.overall}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Target className="h-4 w-4" /> PvP Score: <span className="text-white font-medium">{stand.scores.damage}/10</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Zap className="h-4 w-4" /> Best Style: <span className="text-white font-medium capitalize">{stand.recommendedStyles[0]}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
