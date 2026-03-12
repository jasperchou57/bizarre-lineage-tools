import { Metadata } from "next";
import { withCanonical } from "@/lib/metadata";

export const metadata: Metadata = withCanonical({
    title: "Your Build Vault — Saved Bizarre Lineage Builds",
    description: "View, export, and compare your saved Bizarre Lineage builds. All data is stored locally in your browser for privacy.",
    robots: {
        index: false,
        follow: true,
    },
}, "/vault");

export default function VaultLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
