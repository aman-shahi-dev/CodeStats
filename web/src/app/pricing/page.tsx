import { Navbar, Footer } from "@/components/layout";
import { IconCheck, IconX } from "@tabler/icons-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For getting started",
    features: [
      { text: "1 platform connection", included: true },
      { text: "Basic rating tracking", included: true },
      { text: "Public profile", included: true },
      { text: "Cross-platform analytics", included: false },
      { text: "AI weakness detection", included: false },
      { text: "Priority data sync", included: false },
    ],
    cta: "Get Started",
    style: "glass",
  },
  {
    name: "Pro",
    price: "$0",
    period: "while in beta",
    description: "Everything, free during beta",
    popular: true,
    features: [
      { text: "Unlimited platforms", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Public profile + badges", included: true },
      { text: "Cross-platform analytics", included: true },
      { text: "AI weakness detection", included: true },
      { text: "Priority data sync", included: true },
    ],
    cta: "Join Beta Free",
    style: "brand",
  },
  {
    name: "Team",
    price: "Soon",
    period: "",
    description: "For coaching & clubs",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Team leaderboards", included: true },
      { text: "Coach dashboard", included: true },
      { text: "Bulk import", included: true },
      { text: "Custom branding", included: true },
      { text: "API access", included: true },
    ],
    cta: "Join Waitlist",
    style: "glass",
  },
];

export const metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-6 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Simple, <span className="text-gradient">transparent</span> pricing
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Everything is free during beta. Lock in early access before paid plans launch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-8 flex flex-col relative ${
                plan.popular
                  ? "glass border-2 border-brand/50 shadow-lg shadow-brand/10"
                  : "glass"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-brand-dark text-[10px] font-bold uppercase px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
              <p className="text-text-muted text-xs mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-text-muted text-sm ml-2">/{plan.period}</span>}
              </div>
              <div className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <div key={f.text} className="flex items-center gap-3 text-sm">
                    {f.included ? (
                      <IconCheck size={16} className="text-green-400 flex-shrink-0" />
                    ) : (
                      <IconX size={16} className="text-text-muted/40 flex-shrink-0" />
                    )}
                    <span className={f.included ? "" : "text-text-muted/40"}>{f.text}</span>
                  </div>
                ))}
              </div>
              <a
                href="/register"
                className={`text-center py-3 rounded-md font-bold text-sm transition-all active:scale-95 ${
                  plan.popular
                    ? "bg-brand text-brand-dark shadow-lg shadow-brand/20"
                    : "border border-border hover:bg-surface-5/30"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
