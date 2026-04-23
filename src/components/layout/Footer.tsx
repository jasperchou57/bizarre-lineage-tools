import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
    const t = useTranslations("Footer");

    const links = [
        { href: "/skins", label: t("skins") },
        { href: "/items", label: t("items") },
        { href: "/world-events", label: t("worldEvents") },
        { href: "/perks", label: t("perks") },
        { href: "/trello", label: t("trello") },
        { href: "/guides/awakening", label: t("awakening") },
        { href: "/guides/night-vampire", label: t("nightVampire") },
        { href: "/guides/leveling", label: t("leveling") },
        { href: "/about", label: t("about") },
        { href: "/privacy", label: t("privacy") },
        { href: "/terms", label: t("terms") },
    ] as const;

    return (
        <footer className="w-full border-t border-white/5 bg-surface mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col gap-1 text-center md:text-left">
                        <span className="text-lg font-heading font-bold text-white tracking-tight">
                            Bizarre Lineage Wiki
                        </span>
                        <p className="text-xs text-muted">{t("tagline")}</p>
                        <p className="text-xs text-muted mt-1">{t("disclaimer")}</p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm text-muted">
                        {links.map((link) => (
                            <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
