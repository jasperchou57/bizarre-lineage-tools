import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { withCanonical } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Compare" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
        robots: { index: false, follow: true },
    }, "/compare");
}

export default function CompareLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
