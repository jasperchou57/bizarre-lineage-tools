import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bizarre Lineage Tier List: Best Stands for PvP & PvE (2026)",
    description: "The definitive Bizarre Lineage Stand tier list. Filter by PvP, PvE, or overall power. See which Stands dominate the current meta.",
};

export default function TierListLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
