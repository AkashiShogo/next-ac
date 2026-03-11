# 🏁 Next AC — AtCoder Progress Tracker

**A〜C問題に集中したい人のための、ノイズレスな AtCoder 進捗ダッシュボード**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-black)](https://ui.shadcn.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://next-ac-peach.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

🔗 **デモサイト**: https://next-ac-peach.vercel.app/

---

## 📖 About

AtCoder の学習を支える [AtCoder Problems](https://kenkoooo.com/atcoder/) は、豊富な統計・分析機能を備えた素晴らしいツールです。
Next AC はその API を活用させていただきながら、初心者が感じやすい次のような悩みにフォーカスした補助的なダッシュボードです。

> 「D問題以降は今は関係ない」「どれが次にやるべき問題か分からない」「ACしたのに画面が更新されていない」

**A〜C問題だけに絞って**、いま自分がやるべきことをシンプルに把握することを目的としています。

- 🚫 **ノイズレス** — D問題以降を完全に排除し、今やるべき問題だけを表示
- ✋ **手入力ゼロ** — ユーザーIDを入力するだけで、提出履歴を自動取得・自動分類
- ⚡ **ラグなし** — 公式の最新提出をマージし、AC直後にリロードすれば即座に反映

### スクリーンショット

![Table View](./docs/table.png)

![Dashboard View](./docs/dashboard.png)

---

## ✨ Features

### 📊 Table View

ABCのコンテスト × 問題（A/B/C）のマトリックス形式で進捗を一覧表示。
D問題以降を排除した**ノイズレスな進捗マトリックス**で、自分の実力帯が一目でわかります。

### 🗂️ Dashboard

問題を3カテゴリに自動分類して整理表示。手動でのステータス変更は一切不要です。

| カテゴリ | 内容 |
|---|---|
| 🔴 やり残し | 提出したが AC できていない問題 |
| ⚪ 次のターゲット | 未挑戦の問題（Difficulty 順にソート） |
| 🟢 クリア済み | AC 済み（一発 AC / 苦戦 AC を区別して表示） |

### ⚡ ゼロ・ラグ同期

AtCoder 公式の最新提出をスクレイピングでマージすることで、**AtCoder で AC した直後にリロードすれば即座に画面へ反映**されます。
キャッシュによるタイムラグや、手動でのチェック作業は不要です。

---

## 🛠️ Tech Stack

| カテゴリ | 技術 |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) |
| Scraping | [cheerio](https://cheerio.js.org/) |
| Hosting | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### 必要な環境

- Node.js 18 以上
- npm / yarn / pnpm

### セットアップ

```bash
# 1. リポジトリをクローン
git clone https://github.com/AkashiShogo/next-ac.git
cd next-ac

# 2. 依存パッケージをインストール
npm install

# 3. 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて、AtCoder のユーザーIDを入力するだけで使えます。

---

## 🙏 Acknowledgments

問題データおよびユーザーの提出履歴の取得において、[**kenkoooo/AtCoderProblems**](https://github.com/kenkoooo/AtCoderProblems) の公開 API を利用させていただいています。

AtCoder Problems は AtCoder の学習を支える素晴らしいプロジェクトです。開発・運営されている kenkoooo さんをはじめとするコントリビューターの皆さんに感謝いたします。

---

## 📄 License

[MIT](./LICENSE)
