import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import {
  Upload as UploadIcon,
  ImagePlus,
  FileImage,
  X,
  ArrowRight,
  Info,
} from "lucide-react";

export const Route = createFileRoute("/app/upload")({
  head: () => ({ meta: [{ title: "New scan · KM-UNet" }] }),
  component: UploadPage,
});

type PatientMeta = {
  caseId: string;
  age: string;
  side: "left" | "right" | "";
  notes: string;
};

function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [meta, setMeta] = useState<PatientMeta>({
    caseId: "",
    age: "",
    side: "",
    notes: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File | null) {
    if (!f) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
  }

  function clearFile() {
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  }

  const ready = !!file && meta.caseId.trim().length > 0;

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-10 py-10">
      <StepHeader
        step="01"
        title="Acquire & upload the ultrasound"
        subtitle="Drop in the scan and add the minimum clinical context required for a useful first read."
      />

      <div className="mt-10 grid lg:grid-cols-[1.2fr_1fr] gap-8">
        {/* Drop zone */}
        <section>
          <label
            htmlFor="file"
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFile(e.dataTransfer.files?.[0] ?? null);
            }}
            className={
              "relative block rounded-3xl border-2 border-dashed transition cursor-pointer overflow-hidden " +
              (dragOver
                ? "border-[var(--cyan)] bg-[var(--cyan)]/5"
                : "border-border bg-card hover:border-primary/50")
            }
          >
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Selected ultrasound scan"
                  className="w-full max-h-[480px] object-contain bg-surface"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    clearFile();
                  }}
                  className="absolute top-4 right-4 size-9 rounded-full bg-background/90 border border-border grid place-items-center hover:bg-destructive hover:text-destructive-foreground transition"
                  aria-label="Remove file"
                >
                  <X className="size-4" />
                </button>
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-background/90 backdrop-blur border border-border px-4 py-3">
                  <FileImage className="size-5 text-primary" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{file?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file && `${(file.size / 1024).toFixed(1)} KB`}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-10 py-20 text-center">
                <div className="mx-auto size-16 rounded-2xl bg-secondary grid place-items-center">
                  <ImagePlus className="size-7 text-primary" />
                </div>
                <h3 className="mt-6 font-display text-2xl">
                  Drop ultrasound image here
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Or click to browse. Accepts JPG, PNG, or DICOM preview frames.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground bg-secondary rounded-full px-3 py-1.5">
                  <Info className="size-3.5" /> Max 20MB · Single frame
                </div>
              </div>
            )}
            <input
              ref={inputRef}
              id="file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
          </label>

          <p className="mt-4 text-xs text-muted-foreground">
            Images are processed locally. Nothing leaves this device unless you
            explicitly export a report.
          </p>
        </section>

        {/* Metadata form */}
        <section>
          <div className="rounded-3xl bg-card border border-border p-8">
            <h3 className="font-display text-2xl">Case details</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Only what's needed for the specialist handoff.
            </p>

            <div className="mt-6 space-y-5">
              <Field label="Case ID" required>
                <input
                  value={meta.caseId}
                  onChange={(e) =>
                    setMeta({ ...meta, caseId: e.target.value })
                  }
                  placeholder="KB-2026-0148"
                  className="w-full h-11 rounded-lg border border-input bg-background px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Patient age">
                  <input
                    value={meta.age}
                    onChange={(e) => setMeta({ ...meta, age: e.target.value })}
                    placeholder="42"
                    inputMode="numeric"
                    className="w-full h-11 rounded-lg border border-input bg-background px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </Field>
                <Field label="Breast side">
                  <div className="grid grid-cols-2 gap-2">
                    {(["left", "right"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setMeta({ ...meta, side: s })}
                        className={
                          "h-11 rounded-lg text-sm font-medium transition border " +
                          (meta.side === s
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-input hover:border-primary/40")
                        }
                      >
                        {s === "left" ? "Left" : "Right"}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
              <Field label="Clinical note (optional)">
                <textarea
                  value={meta.notes}
                  onChange={(e) =>
                    setMeta({ ...meta, notes: e.target.value })
                  }
                  rows={3}
                  placeholder="Palpable mass upper outer quadrant…"
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </Field>
            </div>

            <Link
              to="/app/analyze"
              disabled={!ready}
              aria-disabled={!ready}
              onClick={(e) => {
                if (!ready) e.preventDefault();
              }}
              className={
                "mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full font-medium px-6 py-3.5 transition " +
                (ready
                  ? "bg-[var(--cyan)] text-[oklch(0.15_0.05_220)] hover:shadow-glow"
                  : "bg-muted text-muted-foreground cursor-not-allowed")
              }
            >
              <UploadIcon className="size-4" />
              Run KM-UNet analysis
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function StepHeader({
  step,
  title,
  subtitle,
}: {
  step: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-muted-foreground">
        <span className="font-display text-[var(--cyan)] text-base not-italic">
          {step}
        </span>
        Step
      </div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl text-balance max-w-2xl">
        {title}
      </h1>
      <p className="mt-3 text-muted-foreground max-w-xl">{subtitle}</p>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground tracking-wide">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
