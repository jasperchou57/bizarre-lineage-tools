import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bizarre Lineage Build Planner & Optimizer | Best Builds",
    description: "Create and score your Bizarre Lineage build. Select a Stand, Fighting Style, and Sub-Ability to calculate 5-dimension performance scores in real-time.",
};

export default function BuildPlannerLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
