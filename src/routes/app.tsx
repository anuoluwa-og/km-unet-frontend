import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  ScanLine,
  Upload,
  Activity,
  FileText,
  History,
  HelpCircle,
  ArrowLeft,
} from "lucide-react";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [{ title: "KM-UNet Workspace" }],
  }),
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="min-h-screen bg-secondary/40 text-foreground flex">
      <Sidebar />
      <main className="flex-1 min-w-0 flex flex-col">
        <Topbar />
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function Sidebar() {
  const links = [
    { to: "/app/upload", label: "New scan", icon: Upload },
    { to: "/app/analyze", label: "Analysis", icon: Activity },
    { to: "/app/results", label: "Results", icon: FileText },
    { to: "/app/history", label: "Case history", icon: History },
  ];
  return (
    <aside className="hidden lg:flex w-72 shrink-0 flex-col bg-surface text-surface-foreground border-r border-white/5">
      <div className="px-6 h-16 flex items-center gap-2.5 border-b border-white/5">
        <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center">
          <ScanLine className="size-4 text-[var(--cyan)]" />
        </div>
        <span className="font-display text-xl tracking-tight">KM-UNet</span>
        <span className="ml-auto text-[10px] tracking-widest text-white/40 uppercase">
          v0.9
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <p className="px-3 pt-3 pb-2 text-[10px] tracking-widest uppercase text-white/40">
          Workflow
        </p>
        {links.map(({ to, label, icon: Icon }) => (
          <NavItem key={to} to={to} label={label} icon={Icon} />
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-1">
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white transition"
        >
          <ArrowLeft className="size-4" />
          Back to site
        </a>
      </div>

      <div className="m-4 rounded-xl bg-white/5 border border-white/10 p-4">
        <div className="flex items-center gap-2 text-[var(--cyan)] text-xs tracking-widest uppercase">
          <HelpCircle className="size-3.5" /> Reminder
        </div>
        <p className="mt-2 text-sm text-white/70 leading-relaxed">
          KM-UNet provides decision support — clinical judgment stays with you.
        </p>
      </div>
    </aside>
  );
}

function NavItem({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition " +
        (active
          ? "bg-[var(--cyan)]/10 text-[var(--cyan)] ring-1 ring-[var(--cyan)]/30"
          : "text-white/65 hover:bg-white/5 hover:text-white")
      }
    >
      <Icon className="size-4" />
      {label}
    </Link>
  );
}

function Topbar() {
  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-xl flex items-center px-6 lg:px-10 justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span className="size-2 rounded-full bg-emerald-500" />
        Offline mode · Patient data stays on this device
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-mono">DR. A. MENSAH</span>
          <span>·</span>
          <span>Korle Bu Teaching Hospital</span>
        </div>
        <div className="size-9 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-medium">
          AM
        </div>
      </div>
    </header>
  );
}
