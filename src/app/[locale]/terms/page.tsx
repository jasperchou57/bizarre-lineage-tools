import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { withCanonical } from "@/lib/metadata";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Terms" });
    return withCanonical({
        title: t("metaTitle"),
        description: t("metaDescription"),
    }, "/terms");
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Terms" });

    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-invert">
            <h1 className="text-4xl font-heading font-extrabold text-white mb-8">{t("heroTitle")}</h1>
            {locale !== routing.defaultLocale && (
                <div className="not-prose bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm rounded-lg p-4 mb-8">
                    {t("noteTranslated")}
                </div>
            )}

            <p className="text-muted leading-relaxed mb-6">
                Last updated: {new Date().toISOString().split('T')[0]}
            </p>

            <p className="text-muted leading-relaxed mb-6">
                By accessing Bizarre Lineage Wiki, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Use of the Site</h2>
            <p className="text-muted leading-relaxed mb-6">
                Bizarre Lineage Wiki provides informational content and calculators for the Roblox game &quot;Bizarre Lineage&quot;. The service is provided &quot;as is&quot; and intended solely for personal, non-commercial use by players mapping out video game strategies.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. Accuracy of Materials</h2>
            <p className="text-muted leading-relaxed mb-6">
                The materials appearing on Bizarre Lineage Wiki could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice, particularly as the base game receives balance patches.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Liability</h2>
            <p className="text-muted leading-relaxed mb-6">
                In no event shall Bizarre Lineage Wiki be liable for any damages (including, without limitation, &quot;lost&quot; in-game items, currency, or time) arising out of the use or inability to use the materials on our website.
            </p>
        </div>
    );
}
