import { Suspense } from "react";
import { Navbar, Footer } from "@/components/layout";
import { Hero, SocialProof, Features, CTASection } from "@/components/landing";
import { LogoutToast } from "@/components/auth/logout-toast";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SocialProof />
        <Features />
        <CTASection />
      </main>
      <Footer />
      
      <Suspense fallback={null}>
        <LogoutToast />
      </Suspense>
    </>
  );
}
