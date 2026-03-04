import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Bizarre Lineage Wiki",
    description: "Get in touch with the Bizarre Lineage Wiki team for questions, suggestions, or feedback.",
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-invert">
            <h1 className="text-4xl font-heading font-extrabold text-white mb-8">Contact Us</h1>

            <p className="text-muted leading-relaxed mb-6">
                We&apos;d love to hear from you! Whether you have a question, found a bug, want to suggest a feature, or need to report inaccurate game data, feel free to reach out.
            </p>

            <div className="bg-surface border border-white/10 rounded-xl p-8 my-8">
                <h2 className="text-2xl font-bold text-white mb-4">Email</h2>
                <p className="text-muted leading-relaxed mb-2">
                    The best way to reach us is by email:
                </p>
                <a
                    href="mailto:help@bizarrelineage.com"
                    className="text-xl font-semibold text-purple-400 hover:text-purple-300 underline transition-colors"
                >
                    help@bizarrelineage.com
                </a>
            </div>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">What You Can Contact Us About</h2>
            <ul className="text-muted leading-relaxed mb-6 list-disc pl-6 space-y-2">
                <li><strong>Data Corrections:</strong> If you notice any incorrect Stand stats, Fighting Style data, or Sub-Ability information, let us know and we&apos;ll update it.</li>
                <li><strong>Feature Requests:</strong> Have an idea for a new tool or calculator? We&apos;re always looking to improve.</li>
                <li><strong>Bug Reports:</strong> If something isn&apos;t working properly, please describe the issue and we&apos;ll investigate.</li>
                <li><strong>Privacy Inquiries:</strong> For any questions about your data or to exercise your rights under GDPR/CCPA, please email us directly.</li>
                <li><strong>General Feedback:</strong> We appreciate any thoughts on how to make Bizarre Lineage Wiki better for the community.</li>
            </ul>

            <p className="text-muted leading-relaxed mb-6">
                We aim to respond to all inquiries within <strong>48 hours</strong>. Thank you for using Bizarre Lineage Wiki!
            </p>
        </div>
    );
}
