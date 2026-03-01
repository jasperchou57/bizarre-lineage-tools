import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Bizarre Lineage Wiki",
    description: "Privacy policy for Bizarre Lineage Wiki.",
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-invert">
            <h1 className="text-4xl font-heading font-extrabold text-white mb-8">Privacy Policy</h1>

            <p className="text-muted leading-relaxed mb-6">
                Last updated: {new Date().toISOString().split('T')[0]}
            </p>

            <p className="text-muted leading-relaxed mb-6">
                Your privacy is important to us. This Privacy Policy explains how Bizarre Lineage Wiki handles data when you use our website.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Local Storage (The Vault)</h2>
            <p className="text-muted leading-relaxed mb-6">
                When you use the Build Planner and click &quot;Save to Vault&quot;, all data regarding your specific Stand, Style, and Sub-Ability combination is saved entirely on your local device using standard browser <code>localStorage</code>.
                <strong>We do not transmit, collect, or store your builds on our servers.</strong> You retain complete control over this data, and clearing your browser cache will permanently delete your stored builds.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. Analytics and Tracking</h2>
            <p className="text-muted leading-relaxed mb-6">
                Currently, in our MVP phase, we do not use third-party tracking scripts (such as Google Analytics) that collect personally identifiable information.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. External Links</h2>
            <p className="text-muted leading-relaxed mb-6">
                Our website may contain links to external sites (such as public Trello boards or YouTube guides) that are not operated by us. Please be aware that we have no control over the content and practices of these sites.
            </p>
        </div>
    );
}
