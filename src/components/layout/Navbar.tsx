import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

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
        { href: "/vault", label: t("vault") },
    ] as const;

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-heading font-bold text-white tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-indigo">Bizarre Lineage</span> Wiki
                    </span>
                </Link>
                <div className="hidden md:flex items-center gap-6">
                    {items.map((item) => (
                        <Link key={item.href} href={item.href} className="text-sm font-medium text-muted hover:text-white transition-colors">
                            {item.label}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    <LanguageSwitcher />
                    <Link href="/build-planner" className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-accent-blue to-accent-indigo rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all">
                        {t("openPlanner")}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
