import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="px-6 md:px-8 py-12">
      <div className="max-w-4xl mx-auto glass p-12 rounded-2xl text-center border-2 border-brand/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent" />
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Ready to level up your rank?</h2>
          <p className="text-text-secondary mb-10 max-w-xl mx-auto">
            Join thousands of developers tracking their growth. Start your journey for free today.
          </p>
          <Button
            size="lg"
            className="bg-brand text-brand-dark font-bold text-lg px-10 py-6 shadow-xl shadow-brand/30 hover:bg-brand/90 active:scale-95 transition-all"

          >
            <Link href="/register">Create Free Account</Link>
          </Button>
          <p className="mt-6 text-xs text-text-muted/60">
            No credit card required. Syncs in under 30 seconds.
          </p>
        </div>
      </div>
    </section>
  );
}
