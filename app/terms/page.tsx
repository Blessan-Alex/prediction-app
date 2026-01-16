import { Container } from "@/components/layout/Container";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#080a11] text-white py-20 px-4">
            <Container className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold">Terms of Service</h1>
                <div className="space-y-4 text-white/70 text-sm leading-relaxed">
                    <p>Last updated: January 2026</p>
                    <p>
                        Welcome to SettleUp. By using our service, you agree to these terms. SettleUp is a platform for friendly challenges using virtual &quot;Play Coins&quot;.
                    </p>

                    <h2 className="text-white text-lg font-semibold pt-4">1. Virtual Currency</h2>
                    <p>
                        &quot;Play Coins&quot; are virtual items with no real-world monetary value. They cannot be redeemed for cash, transferred for value, or used outside of the SettleUp platform.
                    </p>

                    <h2 className="text-white text-lg font-semibold pt-4">2. Usage</h2>
                    <p>
                        SettleUp is for entertainment purposes only. You agree not to use the platform for gambling or any illegal activities.
                    </p>

                    <h2 className="text-white text-lg font-semibold pt-4">3. Disclaimers</h2>
                    <p>
                        The service is provided &quot;as is&quot;. We are not responsible for any disputes arising from challenges between users.
                    </p>
                </div>
            </Container>
        </div>
    );
}
