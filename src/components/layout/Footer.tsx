import Link from 'next/link';

export function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-surface mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col gap-1 text-center md:text-left">
                        <span className="text-lg font-heading font-bold text-white tracking-tight">
                            Bizarre Lineage Tools
                        </span>
                        <p className="text-xs text-muted">
                            Fan-made tools site. Not affiliated with Roblox Corporation or Bizarre Productions.
                        </p>
                        <p className="text-xs text-muted mt-1">
                            Data compiled from public Trello board and community resources.
                        </p>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted">
                        <Link href="/guides/leveling" className="hover:text-white transition-colors">Leveling Guide</Link>
                        <Link href="/guides/prestige" className="hover:text-white transition-colors">Prestige Guide</Link>
                        <Link href="/about" className="hover:text-white transition-colors">About</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
