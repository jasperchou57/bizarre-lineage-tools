import Link from 'next/link';

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-heading font-bold text-white tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-indigo">Bizarre Lineage</span> Wiki
                    </span>
                </Link>
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/build-planner" className="text-sm font-medium text-muted hover:text-white transition-colors">Build Planner</Link>
                    <Link href="/tier-list" className="text-sm font-medium text-muted hover:text-white transition-colors">Tier List</Link>
                    <Link href="/stands" className="text-sm font-medium text-muted hover:text-white transition-colors">Stands</Link>
                    <Link href="/fighting-styles" className="text-sm font-medium text-muted hover:text-white transition-colors">Styles</Link>
                    <Link href="/sub-abilities" className="text-sm font-medium text-muted hover:text-white transition-colors">Subs</Link>
                    <Link href="/codes" className="text-sm font-medium text-muted hover:text-white transition-colors">Codes</Link>
                    <Link href="/vault" className="text-sm font-medium text-muted hover:text-white transition-colors">Vault</Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/build-planner" className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-accent-blue to-accent-indigo rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all">
                        Open Planner
                    </Link>
                </div>
            </div>
        </nav>
    );
}
