"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";

type MobileNavItem = {
    href: string;
    label: string;
};

export function MobileNav({ items, menuLabel }: { items: readonly MobileNavItem[]; menuLabel: string }) {
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
                <div className="absolute right-0 top-12 w-64 rounded-xl border border-border bg-surface p-2 shadow-2xl">
                    <div className="grid grid-cols-1">
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
