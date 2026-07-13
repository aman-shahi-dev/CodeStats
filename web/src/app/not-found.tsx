import Link from "next/link";
import { IconChartLine, IconArrowLeft } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cf-blue/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center z-10">
        <IconChartLine size={48} className="text-brand mx-auto mb-6" />
        <h1 className="text-8xl font-bold text-gradient mb-4">404</h1>
        <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-text-secondary text-sm mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Maybe you mistyped the URL?
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand text-brand-dark font-bold px-6 py-3 rounded-md hover:bg-brand/90 active:scale-95 transition-all"
        >
          <IconArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
