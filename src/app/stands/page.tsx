import { StandCard } from "@/components/StandCard";
import standsData from "@/data/stands.json";

export const metadata = {
    title: "All Stands in Bizarre Lineage | Database & Stats",
    description: "Browse all Stands in Bizarre Lineage. See tier rankings, stats, moves, and find the the best builds for your playstyle.",
};

export default function StandsDirectoryPage() {
    // In a real iteration, we would add client-side filtering here
    // For MVP P0, a static grid is sufficient given only 17 stands

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="mb-10 text-center md:text-left">
                <h1 className="text-4xl font-heading font-extrabold text-white mb-4">
                    Stands Directory
                </h1>
                <p className="text-lg text-muted max-w-2xl">
                    Browse all available Stands in Bizarre Lineage. Click on any Stand to view its complete stat breakdown, rarity, moveset, and recommended builds.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {standsData.map((stand) => (
                    <StandCard key={stand.id} stand={stand} />
                ))}
            </div>
        </div>
    );
}
