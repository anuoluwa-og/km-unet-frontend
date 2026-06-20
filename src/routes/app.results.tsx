import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  Download,
  Send,
  RotateCcw,
  Stethoscope,
  Activity,
  Ruler,
  Layers,
} from "lucide-react";
import scanDemo from "@/assets/scan-demo.jpg";

export const Route = createFileRoute("/app/results")({
  head: () => ({ meta: [{ title: "Result · KM-UNet" }] }),
  component: ResultsPage,
});

function ResultsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10">
      <div className="flex items-start justify-between flex-wrap gap-6">
        <div>
          <p className="text-xs tracking-widest uppercase text-muted-foreground">
            Step 03 · Result
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl text-balance max-w-2xl">
            Specialist-ready first read.
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Reviewed and forwarded to the on-call radiologist as a structured
            handoff — not a raw image.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/app/upload"
            className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-5 py-3 text-sm hover:bg-secondary transition"
          >
            <RotateCcw className="size-4" /> New scan
          </Link>
          <button className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-5 py-3 text-sm hover:bg-secondary transition">
            <Download className="size-4" /> Export PDF
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm hover:opacity-90 transition">
            <Send className="size-4" /> Send to specialist
          </button>
        </div>
      </div>

      <div className="mt-10 grid lg:grid-cols-[1.3fr_1fr] gap-8">
        {/* Image with overlay */}
        <section className="rounded-3xl bg-surface text-surface-foreground p-6 lg:p-8">
          <div className="flex items-center justify-between text-xs tracking-widest uppercase text-white/50">
            <span>Segmentation overlay</span>
            <span className="font-mono">KB-2026-0148 · R-UOQ</span>
          </div>

          <div className="mt-4 relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]">
            <img
              src={scanDemo}
              alt="Ultrasound with KM-UNet segmentation overlay"
              className="absolute inset-0 size-full object-cover"
            />
            {/* Mock segmentation mask */}
            <svg
              viewBox="0 0 400 300"
              className="absolute inset-0 size-full pointer-events-none"
            >
              <defs>
                <radialGradient id="mask" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="oklch(0.78 0.14 65)" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="oklch(0.78 0.14 65)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="200" cy="155" rx="58" ry="44" fill="url(#mask)" />
              <ellipse
                cx="200"
                cy="155"
                rx="58"
                ry="44"
                fill="none"
                stroke="oklch(0.82 0.15 70)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <g fontFamily="ui-monospace, monospace" fontSize="10" fill="oklch(0.95 0.05 70)">
                <line x1="258" y1="155" x2="285" y2="155" stroke="oklch(0.82 0.15 70)" strokeWidth="1" />
                <text x="288" y="158">Lesion</text>
              </g>
            </svg>

            <div className="absolute bottom-4 left-4 flex gap-2 text-[10px] tracking-widest uppercase">
              <Legend color="var(--amber)" label="Lesion mask" />
              <Legend color="var(--cyan)" label="Reference" />
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-3">
            <Metric icon={Ruler} label="Max diameter" value="18.4 mm" />
            <Metric icon={Layers} label="Area" value="2.42 cm²" />
            <Metric icon={Activity} label="Mask confidence" value="0.94" />
          </dl>
        </section>

        {/* Verdict */}
        <section className="space-y-5">
          <article className="rounded-3xl bg-card border border-border p-8 ring-1 ring-[var(--amber)]/30">
            <div className="flex items-center gap-3 text-[var(--amber)] text-xs tracking-widest uppercase">
              <AlertCircle className="size-4" /> Decision support
            </div>
            <h2 className="mt-4 font-display text-3xl leading-tight">
              Solid lesion detected
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Hypoechoic mass with irregular margins. Pattern consistent with a
              solid finding. Specialist review recommended before any clinical
              decision.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Stat label="Cystic" value="14%" />
              <Stat label="Solid" value="86%" highlight />
            </div>

            <div className="mt-6 rounded-xl bg-secondary p-4 text-sm text-muted-foreground">
              <strong className="text-foreground">Reminder.</strong> KM-UNet is
              not a diagnostic device. The clinician owns the final read.
            </div>
          </article>

          <article className="rounded-3xl bg-foreground text-background p-8">
            <div className="flex items-center gap-2 text-background/60 text-xs tracking-widest uppercase">
              <Stethoscope className="size-3.5" /> Suggested handoff
            </div>
            <h3 className="mt-3 font-display text-2xl">
              Refer to: Dr. K. Owusu
            </h3>
            <p className="mt-2 text-sm text-background/70">
              Breast imaging · Korle Bu Teaching Hospital · Avg response 38 min
            </p>
            <div className="mt-5 flex gap-3">
              <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--cyan)] text-[oklch(0.15_0.05_220)] font-medium px-4 py-3 text-sm">
                <Send className="size-4" /> Send handoff
              </button>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur px-2.5 py-1 text-white/80">
      <span
        className="size-2 rounded-full"
        style={{ backgroundColor: `var(--${color.includes("amber") ? "amber" : "cyan"})` }}
      />
      {label}
    </span>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
      <Icon className="size-4 text-[var(--cyan)]" />
      <p className="mt-3 text-[10px] tracking-widest uppercase text-white/50">
        {label}
      </p>
      <p className="font-display text-xl mt-1">{value}</p>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        "rounded-xl p-4 border " +
        (highlight
          ? "bg-[var(--amber)]/10 border-[var(--amber)]/30"
          : "bg-secondary border-border")
      }
    >
      <p className="text-xs text-muted-foreground tracking-wide">{label}</p>
      <p
        className={
          "font-display text-3xl mt-1 " +
          (highlight ? "text-[oklch(0.55_0.18_55)]" : "")
        }
      >
        {value}
      </p>
    </div>
  );
}
