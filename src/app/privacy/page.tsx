import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Bizarre Lineage Wiki",
    description: "Privacy policy for Bizarre Lineage Wiki. Learn how we use cookies, handle data, and work with third-party advertisers.",
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-invert">
            <h1 className="text-4xl font-heading font-extrabold text-white mb-8">Privacy Policy</h1>

            <p className="text-muted leading-relaxed mb-6">
                Last updated: 2026-03-04
            </p>

            <p className="text-muted leading-relaxed mb-6">
                Your privacy is important to us. This Privacy Policy explains how Bizarre Lineage Wiki (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects your information when you visit our website at <strong>bizarrelineage.com</strong>.
            </p>

            {/* Section 1 – Cookies */}
            <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Cookies</h2>
            <p className="text-muted leading-relaxed mb-6">
                Our website uses <strong>cookies</strong> — small text files stored on your device — to enhance your browsing experience. We use the following types of cookies:
            </p>
            <ul className="text-muted leading-relaxed mb-6 list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for basic site functionality, such as remembering your preferences.</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site (e.g., Google Analytics). These cookies may collect anonymized data such as page views, session duration, and referring URLs.</li>
                <li><strong>Advertising Cookies:</strong> Used by third-party advertising partners (see Section 3 below) to serve personalized ads and measure ad performance.</li>
            </ul>
            <p className="text-muted leading-relaxed mb-6">
                You can manage or disable cookies through your browser settings at any time. Please note that disabling certain cookies may affect website functionality.
            </p>

            {/* Section 2 – Local Storage */}
            <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. Local Storage (The Vault)</h2>
            <p className="text-muted leading-relaxed mb-6">
                When you use the Build Planner and click &quot;Save to Vault&quot;, all data regarding your specific Stand, Style, and Sub-Ability combination is saved entirely on your local device using standard browser <code>localStorage</code>.
                <strong> We do not transmit, collect, or store your builds on our servers.</strong> You retain complete control over this data, and clearing your browser cache will permanently delete your stored builds.
            </p>

            {/* Section 3 – Third-Party Advertising */}
            <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Third-Party Advertising</h2>
            <p className="text-muted leading-relaxed mb-6">
                We use <strong>Google AdSense</strong> and potentially other third-party advertising networks to display ads on our website. These advertising partners may use cookies and similar tracking technologies to collect information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
            </p>
            <p className="text-muted leading-relaxed mb-6">
                Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet. You may opt out of personalized advertising by visiting{" "}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">
                    Google Ads Settings
                </a>.
            </p>

            {/* Section 4 – Data Collection */}
            <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Information We Collect</h2>
            <p className="text-muted leading-relaxed mb-6">
                We do not require you to create an account or provide personal information to use our site. However, through cookies and analytics tools, we may automatically collect:
            </p>
            <ul className="text-muted leading-relaxed mb-6 list-disc pl-6 space-y-2">
                <li>IP address (anonymized where possible)</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on each page</li>
                <li>Referring website or search terms</li>
            </ul>
            <p className="text-muted leading-relaxed mb-6">
                This data is used solely to improve our website and understand our audience. We do not sell your personal data to any third party.
            </p>

            {/* Section 5 – Your Rights */}
            <h2 className="text-2xl font-bold text-white mt-10 mb-4">5. Your Rights (GDPR / CCPA)</h2>
            <p className="text-muted leading-relaxed mb-6">
                Depending on your location, you may have certain rights regarding your data, including:
            </p>
            <ul className="text-muted leading-relaxed mb-6 list-disc pl-6 space-y-2">
                <li>The right to know what data is collected about you</li>
                <li>The right to request deletion of your data</li>
                <li>The right to opt out of the sale or sharing of your personal information</li>
                <li>The right to opt out of personalized advertising</li>
            </ul>
            <p className="text-muted leading-relaxed mb-6">
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:help@bizarrelineage.com" className="text-purple-400 hover:text-purple-300 underline">
                    help@bizarrelineage.com
                </a>.
            </p>

            {/* Section 6 – Children's Privacy */}
            <h2 className="text-2xl font-bold text-white mt-10 mb-4">6. Children&apos;s Privacy</h2>
            <p className="text-muted leading-relaxed mb-6">
                Our website is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe that a child has provided us with personal data, please contact us and we will take steps to delete such information.
            </p>

            {/* Section 7 – External Links */}
            <h2 className="text-2xl font-bold text-white mt-10 mb-4">7. External Links</h2>
            <p className="text-muted leading-relaxed mb-6">
                Our website may contain links to external sites (such as public Trello boards or YouTube guides) that are not operated by us. Please be aware that we have no control over the content and privacy practices of these sites, and this Privacy Policy does not apply to them.
            </p>

            {/* Section 8 – Changes */}
            <h2 className="text-2xl font-bold text-white mt-10 mb-4">8. Changes to This Policy</h2>
            <p className="text-muted leading-relaxed mb-6">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised &quot;Last updated&quot; date. We encourage you to review this page periodically for the latest information.
            </p>

            {/* Section 9 – Contact */}
            <h2 className="text-2xl font-bold text-white mt-10 mb-4">9. Contact Us</h2>
            <p className="text-muted leading-relaxed mb-6">
                If you have any questions or concerns about this Privacy Policy, please contact us at:{" "}
                <a href="mailto:help@bizarrelineage.com" className="text-purple-400 hover:text-purple-300 underline">
                    help@bizarrelineage.com
                </a>
            </p>
        </div>
    );
}
