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
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth={8} />
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
      <h2 className="text-sm font-semibold mb-4">完了率</h2>
      <div className="flex justify-around">
        <DonutChart label="A問題" stat={stats.A} />
        <DonutChart label="B問題" stat={stats.B} />
        <DonutChart label="C問題" stat={stats.C} />
      </div>
    </section>
  );
}
