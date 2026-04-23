import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { withCanonical } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Vault" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
        robots: { index: false, follow: true },
    }, "/vault");
}

export default function VaultLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
