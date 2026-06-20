import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ScanLine, Cpu, Stethoscope, CheckCircle2 } from "lucide-react";
import scanDemo from "@/assets/scan-demo.jpg";

export const Route = createFileRoute("/app/analyze")({
  head: () => ({ meta: [{ title: "Analyzing · KM-UNet" }] }),
  component: AnalyzePage,
});

const STAGES = [
  {
    icon: Cpu,
    label: "Preprocessing image",
    detail: "Normalising intensity & resampling to model resolution.",
  },
  {
    icon: ScanLine,
    label: "KM-UNet segmentation",
    detail: "Delineating lesion boundary at pixel level.",
  },
  {
    icon: Stethoscope,
    label: "MobileNetV3 classification",
    detail: "Distinguishing cystic vs solid signal.",
  },
  {
    icon: CheckCircle2,
    label: "Composing report",
    detail: "Generating overlay and specialist-ready summary.",
  },
];

function AnalyzePage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + 1.4;
        if (next >= 100) {
          clearInterval(id);
          setTimeout(() => navigate({ to: "/app/results" }), 600);
          return 100;
        }
        setStage(Math.min(STAGES.length - 1, Math.floor(next / 25)));
        return next;
      });
    }, 80);
    return () => clearInterval(id);
  }, [navigate]);

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-10 py-10">
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
        <section className="relative rounded-3xl overflow-hidden bg-surface text-surface-foreground aspect-[4/3]">
          <img
            src={scanDemo}
            alt="Ultrasound being analyzed"
            className="absolute inset-0 size-full object-cover opacity-90"
          />
          {/* Scanning line */}
          <div className="absolute inset-x-0 top-0 h-px bg-[var(--cyan)] shadow-[0_0_24px_4px_var(--cyan)] animate-[scan_2.4s_ease-in-out_infinite]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-white/60">
                Case KB-2026-0148
              </p>
              <p className="font-display text-xl mt-1">Right breast · UOQ</p>
            </div>
            <div className="font-mono text-sm text-[var(--cyan)]">
              {progress.toFixed(0)}%
            </div>
          </div>
          <style>{`
            @keyframes scan {
              0% { transform: translateY(0%); opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { transform: translateY(480px); opacity: 0; }
            }
          `}</style>
        </section>

        <section>
          <p className="text-xs tracking-widest uppercase text-muted-foreground">
            Step 02 · Running pipeline
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl text-balance">
            Two models, working in sequence.
          </h1>
          <p className="mt-3 text-muted-foreground">
            Inference runs entirely on this device's CPU. No image is transmitted.
          </p>

          <div className="mt-8 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-accent-gradient transition-[width] duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          <ol className="mt-8 space-y-3">
            {STAGES.map(({ icon: Icon, label, detail }, i) => {
              const done = i < stage || progress === 100;
              const active = i === stage && progress < 100;
              return (
                <li
                  key={label}
                  className={
                    "flex gap-4 rounded-2xl border p-4 transition " +
                    (active
                      ? "border-[var(--cyan)]/40 bg-[var(--cyan)]/5"
                      : done
                        ? "border-border bg-card"
                        : "border-border bg-card opacity-50")
                  }
                >
                  <div
                    className={
                      "size-10 rounded-xl grid place-items-center shrink-0 " +
                      (done
                        ? "bg-primary text-primary-foreground"
                        : active
                          ? "bg-[var(--cyan)]/15 text-[var(--cyan)]"
                          : "bg-secondary text-muted-foreground")
                    }
                  >
                    {done ? (
                      <CheckCircle2 className="size-5" />
                    ) : (
                      <Icon
                        className={"size-5 " + (active ? "animate-pulse" : "")}
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium">{label}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </div>
    </div>
  );
}
