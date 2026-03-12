import { Metadata } from "next";
import { withCanonical } from "@/lib/metadata";

export const metadata: Metadata = withCanonical({
    title: "Compare Bizarre Lineage Builds — Side-by-Side Analysis",
    description: "Compare two Bizarre Lineage builds side-by-side. See PvP, PvE, Survival, Mobility, and Cost score differences at a glance.",
    robots: {
        index: false,
        follow: true,
    },
}, "/compare");

export default function CompareLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
