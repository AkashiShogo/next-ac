"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProblemData } from "@/lib/types";
import { STATUS_STYLE, STATUS_LABEL } from "@/lib/status";

interface TableRow {
  contestId: string;
  cols: Record<"A" | "B" | "C", ProblemData | null>;
}

interface Props {
  tableData: TableRow[];
  onFocus: (problem: ProblemData) => void;
}

function ProblemCell({
  problem,
  onFocus,
}: {
  problem: ProblemData | null;
  onFocus: (problem: ProblemData) => void;
}) {
  if (!problem) {
    return <td className="p-1.5 text-center"><div className="h-8 rounded bg-zinc-50 dark:bg-zinc-700/40" /></td>;
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

function ContestTable({ rows, ascending, onFocus }: {
  rows: TableRow[];
  ascending: boolean;
  onFocus: (problem: ProblemData) => void;
}) {
  const sorted = ascending ? [...rows].reverse() : rows;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse table-fixed">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left font-medium text-muted-foreground" />
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
      <div className="flex items-center justify-between mb-2">
        <TabsList className="flex-wrap h-auto gap-1">
          {groups.map(({ label }) => (
            <TabsTrigger key={label} value={label} className="text-xs">
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1 px-2 text-xs text-muted-foreground shrink-0"
          onClick={() => setAscending((v) => !v)}
        >
          Contest
          <ArrowUpDown className="h-3 w-3" />
        </Button>
      </div>

      {groups.map(({ label, rows }) => (
        <TabsContent key={label} value={label}>
          <ContestTable
            rows={rows}
            ascending={ascending}
            onFocus={onFocus}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
