"use client";

import { Badge } from "@/components/ui/badge";
import type { ProblemData } from "@/lib/types";
import { StatsChart } from "@/components/StatsChart";

interface StatEntry { ac: number; trying: number; todo: number; total: number; }

interface Props {
  trying: ProblemData[];
  todo: { A: ProblemData[]; B: ProblemData[]; C: ProblemData[] };
  stats: { A: StatEntry; B: StatEntry; C: StatEntry };
  onRefresh: () => Promise<void>;
  onFocus: (problem: ProblemData) => void;
}


function formatContestLabel(contestId: string): string {
  return contestId.toUpperCase();
}

function formatDifficulty(difficulty: number | null): string | null {
  if (difficulty === null) return null;
  if (difficulty < 400) return "Grey";
  return String(Math.round(difficulty));
}

function ProblemLink({
  problem,
  onClick,
}: {
  problem: ProblemData;
  onClick?: () => void;
}) {
  const diffLabel = formatDifficulty(problem.difficulty);

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors cursor-pointer text-left"
      >
        <span className="font-mono text-xs text-muted-foreground w-24 shrink-0">
          {formatContestLabel(problem.contestId)}
        </span>
        <span className="flex-1 truncate">{problem.title}</span>
        {diffLabel !== null && (
          <span className="ml-2 text-xs text-muted-foreground shrink-0">{diffLabel}</span>
        )}
      </button>
    );
  }

  return (
    <a
      href={problem.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors cursor-pointer"
    >
      <span className="font-mono text-xs text-muted-foreground w-24 shrink-0">
        {formatContestLabel(problem.contestId)}
      </span>
      <span className="flex-1 truncate">{problem.title}</span>
      {diffLabel !== null && (
        <span className="ml-2 text-xs text-muted-foreground shrink-0">{diffLabel}</span>
      )}
    </a>
  );
}

function StatusCell({ label, className }: { label: string; className: string }) {
  return (
    <span className={`inline-block w-10 rounded px-1.5 py-0.5 text-center text-xs font-medium shrink-0 ${className}`}>
      {label}
    </span>
  );
}

function Section({
  badge,
  title,
  count,
  children,
  empty,
}: {
  badge: React.ReactNode;
  title: string;
  count: number;
  children: React.ReactNode;
  empty: string;
}) {
  return (
    <section className="rounded-lg border bg-card">
      <div className="flex items-center gap-2 px-4 py-3 border-b">
        {badge}
        <h2 className="font-semibold text-sm">{title}</h2>
        <Badge variant="secondary" className="ml-auto text-xs">
          {count}
        </Badge>
      </div>
      <div className="divide-y">
        {count === 0 ? (
          <p className="px-4 py-3 text-sm text-muted-foreground">{empty}</p>
        ) : (
          children
        )}
      </div>
    </section>
  );
}

export function Dashboard({ trying, todo, stats, onFocus }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <StatsChart stats={stats} />
      {/* やり残し */}
      {trying.length > 0 && (
        <Section
          badge={<StatusCell label="WA" className="bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400" />}
          title="In Progress"
          count={trying.length}
          empty="—"
        >
          {trying.map((p) => (
            <ProblemLink key={p.id} problem={p} onClick={() => onFocus(p)} />
          ))}
        </Section>
      )}

      {/* 次の問題 */}
      <section className="rounded-lg border bg-card">
        <div className="flex items-center gap-2 px-4 py-3 border-b">
          <h2 className="font-semibold text-sm">Next</h2>
        </div>
        <div className="grid grid-cols-3 divide-x">
          {(["A", "B", "C"] as const).map((idx) => (
            <div key={idx}>
              <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground border-b">
                {idx}
              </div>
              <div className="divide-y">
                {todo[idx].length === 0 ? (
                  <p className="px-3 py-2 text-xs text-muted-foreground">—</p>
                ) : (
                  todo[idx].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onFocus(p)}
                      className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted transition-colors"
                      title={p.title}
                    >
                      <span className="font-mono text-muted-foreground block">{p.contestId.toUpperCase()}</span>
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate">{p.title}</span>
                        {p.difficulty !== null && (
                          <span className="text-muted-foreground shrink-0 ml-auto">{p.difficulty < 400 ? "Grey" : p.difficulty}</span>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
