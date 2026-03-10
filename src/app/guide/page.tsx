import Link from "next/link";
import { ArrowLeft, PanelRight } from "lucide-react";

export const metadata = {
  title: "使い方 | Next-AC",
};

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-12 space-y-12">

      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        戻る
      </Link>

      {/* タイトル */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">使い方</h1>
        <p className="text-sm text-muted-foreground">3ステップで始められます。</p>
      </div>

      {/* ステップ */}
      <ol className="space-y-8">
        {[
          {
            step: "01",
            title: "IDを入力する",
            lines: ["AtCoder IDを入力するだけ。", "登録もログインも不要です。"],
          },
          {
            step: "02",
            title: "次の問題を選ぶ",
            lines: ["Dashboard の「次のターゲット」から問題をクリック。", "難易度の低い順に並んでいます。"],
          },
          {
            step: "03",
            title: "解いてリロード",
            lines: ["ACしたらこのページをリロード。", "進捗がすぐ反映されます。"],
          },
        ].map(({ step, title, lines }) => (
          <li key={step} className="flex gap-5">
            <span className="text-2xl font-bold text-muted-foreground/30 leading-none w-8 shrink-0">
              {step}
            </span>
            <div className="space-y-1">
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {lines.map((line, i) => (
                  <span key={i}>{line}{i < lines.length - 1 && <br />}</span>
                ))}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* 分割画面ヒント */}
      <div className="flex items-start gap-3 border-l-2 pl-4 text-sm text-muted-foreground">
        <PanelRight className="h-4 w-4 shrink-0 mt-0.5" />
        <p>
          狭い幅でも十分に使えます。<br />
          AtCoder の隣に小さく添えておくだけ。
        </p>
      </div>

      {/* ステータス */}
      <div className="space-y-4">
        <p className="text-sm font-semibold">ステータスの見方</p>
        <div className="space-y-3">
          {[
            { cell: "–",  cellClass: "bg-zinc-100 text-zinc-400",    label: "未着手" },
            { cell: "TRY", cellClass: "bg-red-100 text-red-700",     label: "挑戦中 — まだACなし" },
            { cell: "AC", cellClass: "bg-yellow-100 text-yellow-700", label: "苦戦クリア — 複数回でAC" },
            { cell: "AC", cellClass: "bg-green-100 text-green-700",   label: "一発クリア — 初回でAC" },
          ].map(({ cell, cellClass, label }) => (
            <div key={label} className="flex items-center gap-3 text-sm">
              <span className={`inline-block w-10 rounded px-2 py-1 text-center text-xs font-medium shrink-0 ${cellClass}`}>
                {cell}
              </span>
              <span className="text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
