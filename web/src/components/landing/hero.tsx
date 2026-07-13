import Link from "next/link";
import { IconBolt } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative px-6 md:px-8 flex flex-col items-center text-center pt-32 pb-20">
      <div className="glow-spot top-25 left-25" />
      <div className="glow-spot bottom-25 right-25" />

      <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-brand-light animate-pulse">
        <IconBolt size={14} />
        v2.0 Analytics Engine is Live
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 max-w-4xl">
        Track your <span className="text-gradient">competitive programming</span> journey
      </h1>

      <p className="text-base md:text-lg text-text-secondary max-w-2xl mb-10">
        Unify your Codeforces, LeetCode, and AtCoder stats in one beautiful dashboard. Professional-grade analytics for the next generation of software engineers.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/register">
          <Button size="lg" className="bg-brand text-brand-dark font-bold text-base px-8 py-6 shadow-lg shadow-brand/20 hover:bg-brand/90 active:scale-95 transition-all">
            Get started free
          </Button>
        </Link>
        <Link href="#demo">
          <Button size="lg" variant="outline" className="glass border-border text-text-primary font-bold text-base px-8 py-6 hover:bg-surface-5/30 active:scale-95 transition-all">
            View demo
          </Button>
        </Link>
      </div>

      <div className="mt-20 relative w-full max-w-5xl group">
        <div className="absolute -inset-1 bg-linear-to-r from-brand/30 to-cf-blue/30 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
        <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl">
          <Image
            src="/dashboard-preview.jpeg"
            alt="CodeStats Dashboard showing rating history, difficulty split, activity heatmap and topic proficiency"
            width={1920}
            height={1080}
            className="w-full"
            draggable={false}
            priority
          />
        </div>
      </div>
    </section>
  );
}
