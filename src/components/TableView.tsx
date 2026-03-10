"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProblemData, ProblemStatus } from "@/lib/types";

interface TableRow {
  contestId: string;
  cols: Record<"A" | "B" | "C", ProblemData | null>;
}

interface Props {
  tableData: TableRow[];
  onFocus: (problem: ProblemData) => void;
}

const STATUS_STYLE: Record<ProblemStatus, string> = {
  TODO: "bg-zinc-100 text-zinc-400 hover:bg-zinc-200",
  TRYING: "bg-red-100 text-red-700 hover:bg-red-200",
  AC_PENALTY: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
  AC_ONESHOT: "bg-green-100 text-green-700 hover:bg-green-200",
};

const STATUS_LABEL: Record<ProblemStatus, string> = {
  TODO: "–",
  TRYING: "WA",
  AC_PENALTY: "AC",
  AC_ONESHOT: "AC",
};

function ProblemCell({
  problem,
  onFocus,
}: {
  problem: ProblemData | null;
  onFocus: (problem: ProblemData) => void;
}) {
  if (!problem) {
    return <td className="p-1.5 text-center"><div className="h-8 rounded bg-zinc-50" /></td>;
  }

  return (
    <td className="p-1.5 text-center">
      <button
        onClick={() => onFocus(problem)}
        className={`block w-full rounded px-2 py-1.5 text-xs font-medium transition-colors ${STATUS_STYLE[problem.status]}`}
        title={problem.title}
      >
        {STATUS_LABEL[problem.status]}
      </button>
    </td>
  );
}

function ContestTable({ rows, ascending, onToggle, onFocus }: {
  rows: TableRow[];
  ascending: boolean;
  onToggle: () => void;
  onFocus: (problem: ProblemData) => void;
}) {
  const sorted = ascending ? [...rows].reverse() : rows;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left font-medium text-muted-foreground">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1 px-2 text-xs"
                onClick={onToggle}
              >
                Contest
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </th>
            {(["A", "B", "C"] as const).map((col) => (
              <th key={col} className="p-2 text-center font-medium w-20">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map(({ contestId, cols }) => (
            <tr key={contestId} className="border-b hover:bg-muted/30">
              <td className="p-2 font-mono text-xs text-muted-foreground">
                {contestId.toUpperCase()}
              </td>
              <ProblemCell problem={cols.A} onFocus={onFocus} />
              <ProblemCell problem={cols.B} onFocus={onFocus} />
              <ProblemCell problem={cols.C} onFocus={onFocus} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** "abc300" → 300 */
function contestNumber(contestId: string): number {
  return parseInt(contestId.replace(/\D/g, ""), 10) || 0;
}

/** 番号から100番台グループのラベルを生成: 300 → "300-399" */
function groupLabel(base: number): string {
  if (base === 0) return `001-099`;
  return `${base}-${base + 99}`;
}

export function TableView({ tableData, onFocus }: Props) {
  const [ascending, setAscending] = useState(false);

  // 100単位でグループ化
  const groups = useMemo(() => {
    const map = new Map<number, TableRow[]>();
    for (const row of tableData) {
      const num = contestNumber(row.contestId);
      const base = num < 100 ? 0 : Math.floor(num / 100) * 100;
      if (!map.has(base)) map.set(base, []);
      map.get(base)!.push(row);
    }
    // 降順（新しいグループが先頭）
    return Array.from(map.entries())
      .sort((a, b) => b[0] - a[0])
      .map(([base, rows]) => ({ base, label: groupLabel(base), rows }));
  }, [tableData]);

  const defaultTab = groups[0]?.label ?? "";

  return (
    <Tabs defaultValue={defaultTab}>
      <TabsList className="mb-4 flex-wrap h-auto gap-1">
        {groups.map(({ label }) => (
          <TabsTrigger key={label} value={label} className="text-xs">
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {groups.map(({ label, rows }) => (
        <TabsContent key={label} value={label}>
          <ContestTable
            rows={rows}
            ascending={ascending}
            onToggle={() => setAscending((v) => !v)}
            onFocus={onFocus}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
