import { useTranslations } from "next-intl";
import { ChevronDown, Gamepad2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";

export function Navbar() {
    const t = useTranslations("Navbar");

    const items = [
        { href: "/build-planner", label: t("buildPlanner") },
        { href: "/tier-list", label: t("tierList") },
        { href: "/stands", label: t("stands") },
        { href: "/fighting-styles", label: t("styles") },
        { href: "/sub-abilities", label: t("subs") },
        { href: "/skins", label: t("skins") },
        { href: "/raids", label: t("raids") },
        { href: "/guides", label: t("guides") },
        { href: "/codes", label: t("codes") },
        { href: "/updates", label: t("updates") },
        { href: "/tools", label: t("tools") },
        { href: "/vault", label: t("vault") },
    ] as const;

    const gameItems = [
        {
            href: "/",
            label: "Bizarre Lineage",
            description: "Source-labeled wiki, planner, codes, and stand data.",
            links: [
                { href: "/", label: t("wiki") },
                { href: "/codes", label: t("codes") },
                { href: "/tier-list", label: t("tierList") },
                { href: "/stands", label: t("stands") },
            ],
        },
        {
            href: "/vv-ultimatum",
            label: "VV Ultimatum",
            description: "Release status, Roblox link, codes watch, and source checks.",
            links: [
                { href: "/vv-ultimatum", label: t("wiki") },
                { href: "/vv-ultimatum/release-date", label: t("releaseDate") },
                { href: "/vv-ultimatum/codes", label: t("codes") },
                { href: "/vv-ultimatum/trello-discord", label: t("officialLinks") },
            ],
        },
    ] as const;

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-heading font-bold text-white tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-indigo">Bizarre Lineage</span> Wiki
                    </span>
                </Link>
                <div className="hidden lg:flex items-center gap-4">
                    <div className="relative group">
                        <button
                            type="button"
                            className="inline-flex h-10 items-center gap-1 rounded-lg px-3 text-sm font-semibold text-muted transition-colors hover:bg-white/5 hover:text-white"
                            aria-haspopup="true"
                        >
                            {t("games")}
                            <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                        </button>
                        <div className="invisible absolute left-0 top-11 z-50 w-[680px] opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                            <div className="rounded-2xl border border-accent-indigo/25 bg-[#0d0814]/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
                                <div className="grid grid-cols-[230px_1fr] gap-4">
                                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                                        <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent-blue">
                                            <Gamepad2 className="h-4 w-4" />
                                            {t("quickMenu")}
                                        </div>
                                        <div className="text-base font-bold text-white">{t("openAnyGameHub")}</div>
                                        <p className="mt-3 text-sm leading-6 text-muted">{t("openAnyGameHubBody")}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {gameItems.map((game) => (
                                            <div key={game.href} className="rounded-xl border border-white/10 bg-white/[0.035] p-4 transition-colors hover:border-accent-blue/40 hover:bg-white/[0.055]">
                                                <Link href={game.href} className="group/link inline-flex items-center gap-2 text-base font-bold text-white hover:text-accent-blue transition-colors">
                                                    {game.label}
                                                    <span className="transition-transform group-hover/link:translate-x-1">→</span>
                                                </Link>
                                                <p className="mt-2 min-h-10 text-xs leading-5 text-muted">{game.description}</p>
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {game.links.map((link) => (
                                                        <Link
                                                            key={`${game.href}-${link.href}-${link.label}`}
                                                            href={link.href}
                                                            className="rounded-lg border border-white/10 bg-background/70 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:border-accent-blue/50 hover:text-accent-blue"
                                                        >
                                                            {link.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {items.map((item) => (
                        <Link key={item.href} href={item.href} className="text-sm font-medium text-muted hover:text-white transition-colors">
                            {item.label}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <LanguageSwitcher />
                    <Link href="/build-planner" className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-accent-blue to-accent-indigo rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all">
                        {t("openPlanner")}
                    </Link>
                    <MobileNav items={items} gameItems={gameItems} gamesLabel={t("games")} menuLabel={t("menuLabel")} />
                </div>
            </div>
        </nav>
    );
}
