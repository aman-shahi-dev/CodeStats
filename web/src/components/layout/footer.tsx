import Link from "next/link";
import { IconChartLine, IconBrandGithub, IconBrandX, IconBrandDiscord } from "@tabler/icons-react";

const sections = [
  {
    title: "Product",
    links: [
      {
        label: "Features",
        href: "#features"
      },
      {
        label: "API",
        href: "/api-docs"
      },
      {
        label: "Pricing",
        href: "#pricing"
      },
    ]
  },
  {
    title: "Company",
    links: [
      {
        label: "About",
        href: "/about"
      },
      {
        label: "Privacy Policy",
        href: "/privacy"
      },
      {
        label: "Terms of Service",
        href: "/terms"
      },
    ]
  },
  {
    title: "Support",
    links: [
      {
        label: "Documentation",
        href: "/docs"
      },
      {
        label: "Changelog",
        href: "/changelog"
      },
      {
        label: "Discord",
        href: "#"
      },
    ]
  },
]

const socials = [
  {
    icon: IconBrandGithub, href: "#", label: "GitHub"
  },
  {
    icon: IconBrandX, href: "#", label: "X"
  },
  {
    icon: IconBrandDiscord, href: "#", label: "Discord"
  },
]


export function Footer() {
  return (
    <footer className="w-full py-12 border-t border-border bg-surface-1 mt-24">
          <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex flex-col gap-2">
              <Link href="/" className="flex items-center gap-2">
                <IconChartLine size={24} className="text-brand" />
                <span className="text-lg font-bold text-brand-light">CodeStats</span>
              </Link>
              <p className="text-xs text-text-muted max-w-xs">
                © {new Date().getFullYear()} CodeStats. Precision Analytics for Competitive Programmers.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {sections.map((s) => (
                <div key={s.title} className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-brand uppercase tracking-wider mb-2">{s.title}</span>
                  {s.links.map((l) => (
                    <Link key={l.label} href={l.href} className="text-xs text-text-muted hover:text-brand transition-colors">{l.label}</Link>
                  ))}
                </div>
              ))}
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold text-brand uppercase tracking-wider mb-2">Social</span>
                <div className="flex gap-4">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} className="text-text-muted hover:text-brand transition-colors" aria-label={s.label}>
                      <s.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>
  )
}
