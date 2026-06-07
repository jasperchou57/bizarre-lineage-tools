import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { VV_ULTIMATUM_LAST_CHECKED, vvRelatedPages } from "@/data/vv-ultimatum";

export function VvBreadcrumb({ current }: { current: string }) {
    return (
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/vv-ultimatum" className="hover:text-white transition-colors">VV Ultimatum</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white" aria-current="page">{current}</span>
        </nav>
    );
}

export function VvPageHeader({
    eyebrow,
    title,
    intro,
}: {
    eyebrow: string;
    title: string;
    intro: string;
}) {
    return (
        <header className="mb-10 rounded-2xl border border-white/10 bg-surface p-6 md:p-8">
            <div className="mb-4 inline-flex rounded-full border border-accent-blue/25 bg-accent-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-blue">
                {eyebrow}
            </div>
            <h1 className="text-4xl font-heading font-extrabold tracking-tight text-white text-balance md:text-5xl">
                {title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{intro}</p>
            <p className="mt-4 text-sm text-muted">Last checked: {VV_ULTIMATUM_LAST_CHECKED}</p>
        </header>
    );
}

export function VvInfoCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="rounded-xl border border-border bg-surface p-5">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <div className="mt-3 text-sm leading-6 text-muted">{children}</div>
        </section>
    );
}

export function VvRelatedLinks({ currentHref }: { currentHref: string }) {
    return (
        <section className="mt-10 rounded-xl border border-border bg-surface p-5">
            <h2 className="text-xl font-bold text-white">Explore more VV Ultimatum pages</h2>
            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {vvRelatedPages.filter((page) => page.href !== currentHref).map((page) => (
                    <Link
                        key={page.href}
                        href={page.href}
                        className="group rounded-lg border border-white/10 bg-background/50 p-4 transition-colors hover:border-accent-blue/50 hover:bg-white/[0.04]"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="font-bold text-white group-hover:text-accent-blue transition-colors">{page.title}</h3>
                            <ArrowRight className="h-4 w-4 shrink-0 text-muted group-hover:text-accent-blue group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="mt-2 text-sm leading-6 text-muted">{page.body}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
