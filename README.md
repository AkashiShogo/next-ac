# 🔰 Next AC — AtCoder Progress Tracker

**A〜C問題に集中したい人のための、ノイズレスな AtCoder 進捗ダッシュボード**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-black)](https://ui.shadcn.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://next-ac-peach.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

🔗 **デモサイト**: [https://next-ac-peach.vercel.app/](https://next-ac-atcoder.vercel.app/)

## 📖 About

AtCoder の学習を支える [AtCoder Problems](https://kenkoooo.com/atcoder/) は、豊富な統計・分析機能を備えた素晴らしいツールです。
Next AC はその API を活用させていただきながら、初心者が感じやすい次のような悩みにフォーカスした補助的なダッシュボードです。

> 「D問題以降は今は関係ない」「どれが次にやるべき問題か分からない」「ACしたのになかなか画面が更新されていない」

**まずはA〜C問題だけに絞って**、いま自分がやるべきことをシンプルに把握することを目的としています。

- 🚫 **ノイズレス** — D問題以降を完全に排除し、今まさに取り組むべき問題だけを表示
- ✋ **手入力ゼロ** — ユーザーIDを入力するだけで、提出履歴を自動取得・自動分類
- ⚡ **ラグなし** — 「Solved」を押した瞬間にオプティミスティック更新。API の反映遅延を待たず即座に画面へ反映

## ✨ Features

### 📊 Log

ABCのコンテスト × 問題（A/B/C）のマトリックス形式で進捗を一覧表示。
D問題以降を排除した**ノイズレスな進捗マトリックス**で、自分の実力帯が一目でわかります。

### 🗂️ Overview

問題を自動分類して整理表示。手動でのステータス変更は一切不要です。

| カテゴリ | 内容 |
|---|---|
| 🔴 In Progress | 提出したが AC できていない問題 |
| ⚪ Next | 未挑戦の問題（Difficulty 順にソート、A/B/C 各3件） |

### 🎯 集中モード

問題をクリックすると集中モードが起動し、AtCoder の問題ページが別ウィンドウで開きます。
解き終わったら「Solved」ボタンを押すだけ。紙吹雪のアニメーションで達成感を演出します。

### 📈 完了率グラフ

Overview に A・B・C 問題それぞれの AC 完了率をドーナツグラフで表示。

### ⚡ オプティミスティック AC

「Solved」を押した瞬間にローカルで即時 AC 反映。kenkoooo API のインデックス遅延に関わらず、Overview・Log が即座に更新されます。
API が実際に AC を返した時点で自動的にローカル状態をクリーンアップし、確認通知を表示します。

## 🛠️ Tech Stack

| カテゴリ | 技術 |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) |
| Animation | [canvas-confetti](https://github.com/catdad/canvas-confetti) |
| Hosting | [Vercel](https://vercel.com/) |

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

## 🙏 Acknowledgments

本プロジェクトは、[**kenkoooo/AtCoderProblems**](https://github.com/kenkoooo/AtCoderProblems) の公開 API なしには成立しませんでした。

AtCoder Problems は、問題データ・ユーザーの提出履歴・難易度推定など、AtCoder 学習に必要な情報を無償で提供し続けてくださっている、コミュニティにとってかけがえのない存在です。
Next-AC はその恩恵を受けて動いているアプリケーションであり、kenkoooo さんをはじめ、長年にわたってこのプロジェクトを支えてくださっているすべてのコントリビューターの皆さんに、心より感謝申し上げます。

## 📄 License

[MIT](./LICENSE)
