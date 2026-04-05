import Link from 'next/link';

export function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-surface mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col gap-1 text-center md:text-left">
                        <span className="text-lg font-heading font-bold text-white tracking-tight">
                            Bizarre Lineage Wiki
                        </span>
                        <p className="text-xs text-muted">
                            Fan-made tools site. Not affiliated with Roblox or the game developers.
                        </p>
                        <p className="text-xs text-muted mt-1">
                            Official move and progression notes are cross-checked against the public Trello board. Planner rankings and build notes are site-maintained.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm text-muted">
                        <Link href="/skins" className="hover:text-white transition-colors">Skins</Link>
                        <Link href="/items" className="hover:text-white transition-colors">Items</Link>
                        <Link href="/world-events" className="hover:text-white transition-colors">World Events</Link>
                        <Link href="/perks" className="hover:text-white transition-colors">Perks</Link>
                        <Link href="/trello" className="hover:text-white transition-colors">Trello</Link>
                        <Link href="/guides/awakening" className="hover:text-white transition-colors">Awakening</Link>
                        <Link href="/guides/night-vampire" className="hover:text-white transition-colors">Night Vampire</Link>
                        <Link href="/guides/leveling" className="hover:text-white transition-colors">Leveling</Link>
                        <Link href="/about" className="hover:text-white transition-colors">About</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
