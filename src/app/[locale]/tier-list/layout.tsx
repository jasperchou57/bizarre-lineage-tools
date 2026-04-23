import { Metadata } from "next";
import { withCanonical } from "@/lib/metadata";

export const metadata: Metadata = withCanonical({
    title: "Bizarre Lineage Tier List: Best Stands for PvP & PvE (2026)",
    description: "The definitive Bizarre Lineage Stand tier list. Filter by PvP, PvE, or overall power. See which Stands dominate the current meta.",
}, "/tier-list");

export default function TierListLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
