"use client";

interface SliceStat {
  ac: number;
  trying: number;
  todo: number;
  total: number;
}

interface DonutProps {
  label: string;
  stat: SliceStat;
}

function DonutChart({ label, stat }: DonutProps) {
  const { ac, total } = stat;
  const r = 40;
  const cx = 56;
  const cy = 56;
  const circumference = 2 * Math.PI * r;
  const pct = total > 0 ? ac / total : 0;
  const dash = pct * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={112} height={112} viewBox="0 0 112 112">
        {/* 背景トラック */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth={8} className="text-zinc-200 dark:text-zinc-600" />
        {/* AC 進捗 */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#4ade80"
          strokeWidth={8}
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeDashoffset={circumference / 4} /* 12時スタート */
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
        {/* 中央テキスト */}
        <text x={cx} y={cy - 8} textAnchor="middle" dominantBaseline="middle" className="fill-foreground" style={{ fontSize: 14, fontWeight: 700 }}>
          {Math.round(pct * 100)}%
        </text>
        <text x={cx} y={cy + 8} textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground" style={{ fontSize: 10 }}>
          {ac}/{total}
        </text>
      </svg>
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}

interface Props {
  stats: {
    A: SliceStat;
    B: SliceStat;
    C: SliceStat;
  };
}

export function StatsChart({ stats }: Props) {
  return (
    <section className="rounded-lg border bg-card px-4 py-4">
      <h2 className="text-sm font-semibold mb-4">Progress</h2>
      <div className="flex justify-around">
        <DonutChart label="A" stat={stats.A} />
        <DonutChart label="B" stat={stats.B} />
        <DonutChart label="C" stat={stats.C} />
      </div>
    </section>
  );
}
