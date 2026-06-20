import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Filter, ChevronRight, CheckCircle2, AlertCircle, Clock } from "lucide-react";

export const Route = createFileRoute("/app/history")({
  head: () => ({ meta: [{ title: "Case history · KM-UNet" }] }),
  component: HistoryPage,
});

type Case = {
  id: string;
  age: number;
  side: "L" | "R";
  date: string;
  finding: "cystic" | "solid" | "pending";
  status: "Specialist confirmed" | "Awaiting review" | "Draft";
  operator: string;
};

const CASES: Case[] = [
  { id: "KB-2026-0148", age: 42, side: "R", date: "2026-06-20 09:14", finding: "solid", status: "Awaiting review", operator: "A. Mensah" },
  { id: "KB-2026-0147", age: 36, side: "L", date: "2026-06-19 16:02", finding: "cystic", status: "Specialist confirmed", operator: "A. Mensah" },
  { id: "KB-2026-0146", age: 51, side: "R", date: "2026-06-19 11:48", finding: "solid", status: "Specialist confirmed", operator: "E. Boateng" },
  { id: "KB-2026-0145", age: 29, side: "L", date: "2026-06-18 14:25", finding: "cystic", status: "Specialist confirmed", operator: "A. Mensah" },
  { id: "KB-2026-0144", age: 47, side: "R", date: "2026-06-18 10:11", finding: "pending", status: "Draft", operator: "A. Mensah" },
  { id: "KB-2026-0143", age: 58, side: "L", date: "2026-06-17 15:39", finding: "solid", status: "Specialist confirmed", operator: "E. Boateng" },
];

function HistoryPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10">
      <div className="flex items-end justify-between flex-wrap gap-6">
        <div>
          <p className="text-xs tracking-widest uppercase text-muted-foreground">
            Workspace
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Case history</h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Every scan analyzed on this device. Stored locally; nothing
            synchronised externally.
          </p>
        </div>
        <Link
          to="/app/upload"
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm hover:opacity-90"
        >
          + New scan
        </Link>
      </div>

      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        <Kpi label="Total cases" value="148" />
        <Kpi label="Awaiting specialist" value="6" accent />
        <Kpi label="Avg. turnaround" value="42 min" />
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-card overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-border">
          <div className="flex-1 min-w-[220px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              placeholder="Search by case ID, operator…"
              className="w-full h-10 pl-9 pr-3 rounded-lg bg-secondary border border-transparent focus:bg-background focus:border-input text-sm focus:outline-none"
            />
          </div>
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-input text-sm hover:bg-secondary">
            <Filter className="size-4" /> All findings
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <Th>Case</Th>
              <Th>Patient</Th>
              <Th>Date</Th>
              <Th>Finding</Th>
              <Th>Status</Th>
              <Th>Operator</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {CASES.map((c) => (
              <tr
                key={c.id}
                className="border-t border-border hover:bg-secondary/40 transition cursor-pointer"
              >
                <Td>
                  <span className="font-mono">{c.id}</span>
                </Td>
                <Td>
                  <span className="text-muted-foreground">
                    {c.age}y · {c.side === "L" ? "Left" : "Right"}
                  </span>
                </Td>
                <Td>
                  <span className="text-muted-foreground">{c.date}</span>
                </Td>
                <Td>
                  <FindingBadge finding={c.finding} />
                </Td>
                <Td>
                  <StatusBadge status={c.status} />
                </Td>
                <Td>{c.operator}</Td>
                <Td>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Kpi({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={
        "rounded-2xl border p-6 " +
        (accent
          ? "bg-surface text-surface-foreground border-transparent"
          : "bg-card border-border")
      }
    >
      <p
        className={
          "text-xs tracking-widest uppercase " +
          (accent ? "text-[var(--cyan)]" : "text-muted-foreground")
        }
      >
        {label}
      </p>
      <p className="font-display text-4xl mt-2">{value}</p>
    </div>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return <th className="text-left px-5 py-3 font-medium">{children}</th>;
}
function Td({ children }: { children?: React.ReactNode }) {
  return <td className="px-5 py-4 align-middle">{children}</td>;
}

function FindingBadge({ finding }: { finding: Case["finding"] }) {
  const map = {
    cystic: { color: "var(--cyan)", label: "Cystic" },
    solid: { color: "var(--amber)", label: "Solid" },
    pending: { color: "var(--muted-foreground)", label: "Pending" },
  } as const;
  const f = map[finding];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium">
      <span
        className="size-1.5 rounded-full"
        style={{ backgroundColor: f.color }}
      />
      {f.label}
    </span>
  );
}

function StatusBadge({ status }: { status: Case["status"] }) {
  const Icon =
    status === "Specialist confirmed"
      ? CheckCircle2
      : status === "Awaiting review"
        ? AlertCircle
        : Clock;
  const cls =
    status === "Specialist confirmed"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : status === "Awaiting review"
        ? "bg-[var(--amber)]/15 text-[oklch(0.45_0.14_55)] ring-[var(--amber)]/30"
        : "bg-secondary text-muted-foreground ring-border";
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 " +
        cls
      }
    >
      <Icon className="size-3" />
      {status}
    </span>
  );
}
