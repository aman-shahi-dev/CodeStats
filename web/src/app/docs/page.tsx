import { Navbar, Footer } from "@/components/layout";
import { IconBook, IconApi, IconTerminal, IconPlugConnected, IconWebhook, IconBrandGithub } from "@tabler/icons-react";

const sections = [
  { icon: IconBook, title: "Getting Started", description: "Create an account, connect your platforms, and start tracking your stats in under 60 seconds.", href: "#" },
  { icon: IconApi, title: "REST API", description: "Access your stats programmatically. Build custom widgets, bots, or integrations.", href: "#" },
  { icon: IconTerminal, title: "CLI Tool", description: "Fetch your stats from the terminal. Perfect for developers who love the command line.", href: "#" },
  { icon: IconPlugConnected, title: "Integrations", description: "Connect CodeStats with Discord, Slack, and Notion for automatic updates.", href: "#" },
  { icon: IconWebhook, title: "Webhooks", description: "Get notified when your rating changes, you solve a problem, or a contest starts.", href: "#" },
  { icon: IconBrandGithub, title: "Open Source", description: "Contribute to CodeStats on GitHub. Check our contributing guide to get started.", href: "#" },
];

export const metadata = { title: "Documentation" };

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-6 md:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Documentation</h1>
          <p className="text-text-secondary max-w-xl mx-auto">Everything you need to get the most out of CodeStats.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((s) => (
            <a key={s.title} href={s.href} className="glass p-6 rounded-xl group hover:border-brand/50 transition-colors flex flex-col">
              <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center text-brand mb-4">
                <s.icon size={22} />
              </div>
              <h3 className="text-base font-semibold mb-2 group-hover:text-brand transition-colors">{s.title}</h3>
              <p className="text-text-secondary text-sm flex-1">{s.description}</p>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
