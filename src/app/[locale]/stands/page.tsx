import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { StandCard } from "@/components/StandCard";
import standsData from "@/data/stands.json";
import { withCanonical } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Stands" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
    }, "/stands");
}

export default async function StandsDirectoryPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Stands" });

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="mb-10 text-center md:text-left">
                <h1 className="text-4xl font-heading font-extrabold text-white mb-4">{t("heroTitle")}</h1>
                <p className="text-lg text-muted max-w-2xl">{t("heroIntro")}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {standsData.map((stand) => (
                    <StandCard key={stand.id} stand={stand} />
                ))}
            </div>
        </div>
    );
}
