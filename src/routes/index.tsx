import { createFileRoute } from "@tanstack/react-router";
import {
  Upload,
  ScanLine,
  Stethoscope,
  ShieldCheck,
  Cpu,
  WifiOff,
  CircleDollarSign,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import scanDemo from "@/assets/scan-demo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KM-UNet — AI-Assisted Breast Ultrasound Triage" },
      {
        name: "description",
        content:
          "An offline decision-support tool that segments breast ultrasound lesions and flags cystic vs solid findings for frontline clinicians.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Pipeline />
      <Showcase />
      <Advantages />
      <Audience />
      <Impact />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-surface flex items-center justify-center">
            <ScanLine className="size-4 text-[var(--cyan)]" />
          </div>
          <span className="font-display text-xl tracking-tight">KM-UNet</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#pipeline" className="hover:text-foreground transition">How it works</a>
          <a href="#advantages" className="hover:text-foreground transition">Advantages</a>
          <a href="#audience" className="hover:text-foreground transition">For clinicians</a>
          <a href="#impact" className="hover:text-foreground transition">Impact</a>
        </nav>
        <a
          href="#cta"
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background text-sm font-medium px-4 py-2 hover:opacity-90 transition"
        >
          Request demo <ArrowRight className="size-3.5" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient text-surface-foreground">
      <img
        src={heroBg}
        alt=""
        aria-hidden
        width={1600}
        height={1100}
        className="absolute inset-0 size-full object-cover opacity-30 mix-blend-screen"
      />
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs tracking-wide text-white/80">
          <span className="size-1.5 rounded-full bg-[var(--cyan)] animate-pulse" />
          Decision support · Not a diagnostic device
        </div>

        <h1 className="mt-8 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-balance max-w-5xl">
          From <em className="italic text-[var(--cyan)]">scan taken</em> to
          specialist-confirmed result — in minutes, not weeks.
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-white/70 leading-relaxed">
          KM-UNet is an offline desktop application that segments breast
          ultrasound lesions and flags cystic versus solid findings — giving
          frontline nurses and general clinicians a standardized first read
          that travels cleanly to a remote specialist.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--cyan)] text-[oklch(0.15_0.05_220)] font-medium px-6 py-3.5 hover:shadow-glow transition"
          >
            <Upload className="size-4" /> Upload a scan
          </a>
          <a
            href="#pipeline"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-white/90 hover:bg-white/5 transition"
          >
            See how it works
          </a>
        </div>

        <dl className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10">
          {[
            ["75%", "of cases diagnosed late-stage in sub-Saharan Africa"],
            ["CPU-only", "runs on hospital hardware, no GPU required"],
            ["100% offline", "no internet dependency, no patient data leaves the device"],
            ["$0", "zero licensing cost for district hospitals"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="font-display text-3xl text-[var(--cyan)]">{k}</dt>
              <dd className="mt-2 text-sm text-white/60">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Pipeline() {
  const steps = [
    {
      icon: Upload,
      tag: "01 · Input",
      title: "Upload the ultrasound image",
      body: "Works with any scanner brand — including the generic devices common in Ghanaian district hospitals.",
    },
    {
      icon: ScanLine,
      tag: "02 · Segmentation",
      title: "KM-UNet delineates the lesion",
      body: "A pixel-level boundary is drawn around the suspicious mass — consistent regardless of who held the probe.",
    },
    {
      icon: Stethoscope,
      tag: "03 · Classification",
      title: "MobileNetV3 flags cystic vs solid",
      body: "A binary classifier returns a clear, plain-language recommendation alongside the segmentation overlay.",
    },
  ];
  return (
    <section id="pipeline" className="mx-auto max-w-7xl px-6 py-28">
      <div className="max-w-3xl">
        <p className="text-sm tracking-widest uppercase text-muted-foreground">The pipeline</p>
        <h2 className="mt-3 font-display text-4xl md:text-6xl text-balance">
          Two models. One trustworthy first-pass read.
        </h2>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {steps.map(({ icon: Icon, tag, title, body }) => (
          <article
            key={tag}
            className="group relative rounded-2xl border border-border bg-card p-8 hover:shadow-elegant transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-widest text-muted-foreground">{tag}</span>
              <Icon className="size-5 text-primary" />
            </div>
            <h3 className="mt-8 font-display text-2xl leading-tight">{title}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section className="bg-surface text-surface-foreground">
      <div className="mx-auto max-w-7xl px-6 py-28 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -inset-6 bg-accent-gradient opacity-20 blur-3xl rounded-full" />
          <img
            src={scanDemo}
            alt="Breast ultrasound with AI-generated lesion segmentation overlay"
            loading="lazy"
            width={1200}
            height={1200}
            className="relative rounded-2xl border border-white/10 w-full"
          />
        </div>
        <div>
          <p className="text-sm tracking-widest uppercase text-[var(--cyan)]">Sample output</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-balance">
            Standardized output that travels well to a remote specialist.
          </h2>

          <div className="mt-10 space-y-4">
            <ResultCard
              variant="ok"
              title="Fluid-filled lesion detected"
              body="Consistent with cystic appearance. Routine follow-up advised."
            />
            <ResultCard
              variant="warn"
              title="Solid lesion detected"
              body="Further evaluation recommended. Please refer for specialist review."
            />
          </div>

          <p className="mt-8 text-sm text-white/60 max-w-md">
            Outputs are worded deliberately as decision support — never as a diagnosis.
          </p>
        </div>
      </div>
    </section>
  );
}

function ResultCard({
  variant,
  title,
  body,
}: {
  variant: "ok" | "warn";
  title: string;
  body: string;
}) {
  const Icon = variant === "ok" ? CheckCircle2 : AlertCircle;
  const ring = variant === "ok" ? "ring-[var(--cyan)]/40" : "ring-[var(--amber)]/50";
  const iconColor = variant === "ok" ? "text-[var(--cyan)]" : "text-[var(--amber)]";
  return (
    <div className={`rounded-xl bg-white/5 border border-white/10 ring-1 ${ring} p-5 flex gap-4`}>
      <Icon className={`size-6 shrink-0 ${iconColor}`} />
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-white/65 mt-1">{body}</p>
      </div>
    </div>
  );
}

function Advantages() {
  const items = [
    { icon: CircleDollarSign, title: "Zero licensing cost", body: "Viable for hospitals with no IT budget for commercial AI tooling." },
    { icon: ScanLine, title: "Any ultrasound device", body: "Accepts images from any scanner brand, including generic models." },
    { icon: WifiOff, title: "Fully offline", body: "No internet required. Patient images never leave the device." },
    { icon: Cpu, title: "Runs on CPU", body: "KM-UNet is compact enough to run without GPU infrastructure." },
    { icon: Stethoscope, title: "Contextual design", body: "UI shaped around Ghanaian radiographer practice, not Western norms." },
    { icon: ShieldCheck, title: "Positioned as support", body: "Explicitly framed as decision support — the clinician stays in charge." },
  ];
  return (
    <section id="advantages" className="mx-auto max-w-7xl px-6 py-28">
      <div className="flex items-end justify-between flex-wrap gap-6">
        <div className="max-w-2xl">
          <p className="text-sm tracking-widest uppercase text-muted-foreground">Why KM-UNet</p>
          <h2 className="mt-3 font-display text-4xl md:text-6xl text-balance">
            Built for the realities of district hospitals.
          </h2>
        </div>
        <p className="text-muted-foreground max-w-sm">
          Competing tools assume Western infrastructure, premium scanners, and unlimited bandwidth. We don't.
        </p>
      </div>

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className="bg-background p-8 hover:bg-secondary/50 transition">
            <Icon className="size-5 text-primary" />
            <h3 className="mt-6 font-display text-xl">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Audience() {
  return (
    <section id="audience" className="mx-auto max-w-7xl px-6 py-28 grid md:grid-cols-2 gap-10">
      <article className="rounded-3xl bg-foreground text-background p-10 md:p-14">
        <span className="text-xs tracking-widest uppercase text-background/60">Primary user</span>
        <h3 className="mt-4 font-display text-4xl">The frontline operator</h3>
        <p className="mt-5 text-background/75 leading-relaxed">
          A nurse, general practitioner, midwife, or community health worker
          with access to an ultrasound machine but no specialist training in
          breast imaging. They acquire the scan and rely on KM-UNet for a
          consistent first read.
        </p>
      </article>
      <article className="rounded-3xl bg-secondary p-10 md:p-14 border border-border">
        <span className="text-xs tracking-widest uppercase text-muted-foreground">Secondary user</span>
        <h3 className="mt-4 font-display text-4xl">The remote specialist</h3>
        <p className="mt-5 text-muted-foreground leading-relaxed">
          A radiologist or breast imaging expert who confirms findings
          remotely. They receive a structured, annotated handoff — not a raw
          image or a vague referral note — and respond faster as a result.
        </p>
      </article>
    </section>
  );
}

function Impact() {
  return (
    <section id="impact" className="relative overflow-hidden bg-surface text-surface-foreground">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="max-w-3xl">
          <p className="text-sm tracking-widest uppercase text-[var(--cyan)]">Impact on rural healthcare</p>
          <h2 className="mt-3 font-display text-4xl md:text-6xl text-balance">
            Designed for regional hospitals. Felt by rural patients.
          </h2>
        </div>

        <ol className="mt-16 space-y-px">
          {[
            "Rural patients referred to regional hospitals get faster, AI-assisted reads — less time spent away from home waiting for results.",
            "AI assistance frees radiographer time, letting regional hospitals process higher volumes of referred cases.",
            "Improved confidence at the regional level reduces unnecessary onward referrals to Accra or Kumasi — cities many rural patients can't reach.",
          ].map((line, i) => (
            <li
              key={i}
              className="grid grid-cols-[auto_1fr] gap-8 items-baseline border-t border-white/10 py-8"
            >
              <span className="font-display text-3xl text-[var(--cyan)] w-12">0{i + 1}</span>
              <p className="text-lg text-white/80 leading-relaxed max-w-3xl">{line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="mx-auto max-w-7xl px-6 py-28">
      <div className="rounded-3xl bg-hero-gradient text-surface-foreground p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(0.82_0.14_195/0.3),transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl text-balance">
            Bring KM-UNet to your hospital.
          </h2>
          <p className="mt-6 text-white/70 text-lg">
            We're piloting with regional and district hospitals across Ghana.
            Get in touch to schedule a demo or join the validation cohort.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:hello@km-unet.app"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--cyan)] text-[oklch(0.15_0.05_220)] font-medium px-6 py-3.5 hover:shadow-glow transition"
            >
              Request a pilot <ArrowRight className="size-4" />
            </a>
            <a
              href="#pipeline"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 hover:bg-white/5 transition"
            >
              Read the technical brief
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2.5">
          <ScanLine className="size-4 text-primary" />
          <span className="font-display text-base text-foreground">KM-UNet</span>
          <span>· Final year project, 2026</span>
        </div>
        <p>Decision support tool. Not a substitute for specialist diagnosis.</p>
      </div>
    </footer>
  );
}
