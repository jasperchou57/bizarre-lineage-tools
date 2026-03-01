import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Your Build Vault — Saved Bizarre Lineage Builds",
    description: "View, export, and compare your saved Bizarre Lineage builds. All data is stored locally in your browser for privacy.",
};

export default function VaultLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
