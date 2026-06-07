"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";

type MobileNavItem = {
    href: string;
    label: string;
};

type MobileGameItem = MobileNavItem & {
    links: readonly MobileNavItem[];
};

export function MobileNav({
    items,
    gameItems,
    gamesLabel,
    menuLabel,
}: {
    items: readonly MobileNavItem[];
    gameItems?: readonly MobileGameItem[];
    gamesLabel?: string;
    menuLabel: string;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative lg:hidden">
            <button
                type="button"
                aria-label={menuLabel}
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white hover:border-accent-blue/50 transition-colors"
            >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {open && (
                <div className="absolute right-0 top-12 w-72 rounded-xl border border-border bg-surface p-2 shadow-2xl">
                    <div className="grid grid-cols-1">
                        {gameItems && (
                            <div className="mb-2 rounded-lg border border-white/10 bg-white/[0.03] p-2">
                                <div className="px-2 pb-2 text-xs font-bold uppercase tracking-wide text-accent-blue">
                                    {gamesLabel}
                                </div>
                                <div className="space-y-2">
                                    {gameItems.map((game) => (
                                        <div key={game.href} className="rounded-lg bg-background/45 p-2">
                                            <Link
                                                href={game.href}
                                                onClick={() => setOpen(false)}
                                                className="block px-1 py-1 text-sm font-bold text-white hover:text-accent-blue transition-colors"
                                            >
                                                {game.label}
                                            </Link>
                                            <div className="mt-1 flex flex-wrap gap-1.5">
                                                {game.links.map((link) => (
                                                    <Link
                                                        key={`${game.href}-${link.href}-${link.label}`}
                                                        href={link.href}
                                                        onClick={() => setOpen(false)}
                                                        className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium text-muted hover:text-white transition-colors"
                                                    >
                                                        {link.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-white/5 hover:text-white transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
