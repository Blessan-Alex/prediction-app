import { Container } from "@/components/layout/Container";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#080a11] text-white py-20 px-4">
            <Container className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold">Privacy Policy</h1>
                <div className="space-y-4 text-white/70 text-sm leading-relaxed">
                    <p>Last updated: January 2026</p>

                    <h2 className="text-white text-lg font-semibold pt-4">1. Information We Collect</h2>
                    <p>
                        We collect the email address you provide during registration to send you invite codes and vital service updates. We do not sell your data.
                    </p>

                    <h2 className="text-white text-lg font-semibold pt-4">2. Cookies</h2>
                    <p>
                        We use minimal cookies necessary for the site to function and for basic analytics to improve our service.
                    </p>

                    <h2 className="text-white text-lg font-semibold pt-4">3. Contact</h2>
                    <p>
                        If you have questions about your data, please contact us at support@settleup.app.
                    </p>
                </div>
            </Container>
        </div>
    );
}
