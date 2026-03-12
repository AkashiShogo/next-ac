import Link from "next/link";
import { ArrowLeft, PanelRight } from "lucide-react";

export const metadata = {
  title: "Guide | Next-AC",
};

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-12 space-y-12">

      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </Link>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold">使い方</h1>
      </div>

      <ol className="space-y-8">
        {[
          {
            step: "01",
            title: "IDを入力する",
            lines: ["AtCoder ID を入力するだけ。", "登録不要。"],
          },
          {
            step: "02",
            title: "次の問題を選ぶ",
            lines: ["Overview の「Next」から問題をクリック。", "表示は難易度の低い順。"],
          },
          {
            step: "03",
            title: "解いて「Solved」を押す",
            lines: ["ACしたら「Solved」を押すだけ。"],
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

      <div className="flex items-start gap-3 border-l-2 pl-4 text-sm text-muted-foreground">
        <PanelRight className="h-4 w-4 shrink-0 mt-0.5" />
        <p>狭い幅でも使用できます。<br />AtCoderの隣に並べて使うのがおすすめ。</p>
      </div>

      <div className="flex items-start gap-3 border-l-2 pl-4 text-sm text-muted-foreground">
        <PanelRight className="h-4 w-4 shrink-0 mt-0.5" />
        <p>破線のACは確認待ちの表示です。<br />リロードすると消える場合がありますが、<br />しばらくすると正式なACに切り替わります。</p>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-semibold">ステータスの見方</p>
        <div className="space-y-3">
          {[
            { cell: "–",   cellClass: "bg-zinc-100 text-zinc-500",                                       label: "未着手" },
            { cell: "WA",  cellClass: "bg-red-100 text-red-600",                                         label: "挑戦中 — AC なし" },
            { cell: "AC",  cellClass: "bg-green-100 text-green-600",                                     label: "クリア" },
            { cell: "AC",  cellClass: "bg-green-50 text-green-500 border border-dashed border-green-300", label: "クリア（確認中）" },
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
