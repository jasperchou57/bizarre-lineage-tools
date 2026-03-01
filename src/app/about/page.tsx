import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Bizarre Lineage Tools",
    description: "Learn more about Bizarre Lineage Tools, a fan-made optimizer for adjusting and testing your Roblox setups.",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-invert">
            <h1 className="text-4xl font-heading font-extrabold text-white mb-8">About Bizarre Lineage Tools</h1>

            <p className="text-muted leading-relaxed mb-6">
                Bizarre Lineage Tools is an independent, fan-made utility website designed to help players of the Roblox game <strong>Bizarre Lineage</strong> optimize their in-game builds. Our goal is to provide a unified dataset format, allowing players to experiment with different Stands, Fighting Styles, and Sub-Abilities without wasting their difficult-to-obtain Stand Arrows.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Features & Data Sourcing</h2>
            <p className="text-muted leading-relaxed mb-6">
                Our scoring matrix is derived from public community knowledge, tier lists, and the unofficial Bizarre Lineage public Trello board used by the community. We strive to provide the most accurate numbers possible for PVP, PVE, mobility, and cost. However, patches and silent buffs/nerfs occur frequently.
            </p>

            <div className="bg-surface border border-white/10 rounded-xl p-6 my-8">
                <h3 className="text-xl font-bold text-white mb-2">Non-Affiliation Disclaimer</h3>
                <p className="text-sm text-muted">
                    Bizarre Lineage Tools is a community resource and is strictly <strong>not affiliated with, endorsed by, or connected to Roblox Corporation or the developers of Bizarre Lineage</strong>. All game assets, names, and concepts are the property of their respective owners. We do not use any proprietary code from the game itself.
                </p>
            </div>
        </div>
    );
}
