import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { withCanonical } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "TierList" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
    }, "/tier-list");
}

export default function TierListLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
