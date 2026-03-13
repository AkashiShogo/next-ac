"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, LayoutDashboard, TableProperties } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { UserIdForm } from "@/components/UserIdForm";
import { CoffeeACIcon } from "@/components/CoffeeACIcon";
import { TableView } from "@/components/TableView";
import { Dashboard } from "@/components/Dashboard";
import { FocusModal } from "@/components/FocusModal";
import { useAtCoderData } from "@/hooks/useAtCoderData";
import type { ProblemData } from "@/lib/types";

const STORAGE_KEY = "atcoder_user_id";

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setUserId(stored);
    setHydrated(true);
  }, []);

  const handleSetUserId = (id: string) => {
    localStorage.setItem(STORAGE_KEY, id);
    setUserId(id);
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUserId(null);
  };

  const { isLoading, error, tableData, trying, todo, cleared, stats, refresh, justConfirmed, clearConfirmed } =
    useAtCoderData(userId);

  useEffect(() => {
    if (!justConfirmed) return;
    const timer = setTimeout(clearConfirmed, 5000);
    return () => clearTimeout(timer);
  }, [justConfirmed, clearConfirmed]);

  const [focusProblem, setFocusProblem] = useState<ProblemData | null>(null);

  const handleFocus = (problem: ProblemData) => {
    window.open(problem.url, "_blank", "noopener,noreferrer,width=1200,height=800");
    setFocusProblem(problem);
  };

  // SSRとのhydration不一致を避けるため、クライアント側の準備が整うまで何も表示しない
  if (!hydrated) return null;

  if (!userId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
        {/* サービス紹介 */}
        <div className="text-center space-y-3 max-w-sm">
          <div className="flex flex-col items-center gap-2">
            <CoffeeACIcon size={72} />
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-slate-800 dark:text-slate-100">Next</span>
              <span className="text-slate-400 mx-1">-</span>
              <span className="text-[#2ecc71]">AC</span>
            </h1>
          </div>
          <p className="text-lg font-medium">
            精進に、迷いはいらない。
          </p>
          <p className="text-sm text-muted-foreground">
            AtCoder Beginner Contest の A・B・C 問題に絞って、<br />未解答を整理し、次の一問をすぐ見つける。
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-1 text-sm text-muted-foreground">
            {["登録不要", "ログイン不要", "無料"].map((label) => (
              <span key={label} className="flex items-center gap-1">
                <Check className="h-3.5 w-3.5" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <UserIdForm onSubmit={handleSetUserId} />

        {/* 使い方リンク */}
        <Link
          href="/guide"
          className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
        >
          使い方 →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        userId={userId}
        onChangeUserId={handleSetUserId}
        onReset={handleReset}
      />

      <main className="mx-auto max-w-5xl px-4 py-2">
        {error && (
          <div className="mb-4 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
            データの取得中にエラーが発生しました。しばらく待ってから再読み込みしてください。
          </div>
        )}

        <Tabs defaultValue="dashboard">
          <TabsList>
            <TabsTrigger value="dashboard" className="gap-1.5">
              <LayoutDashboard className="h-3.5 w-3.5" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="table" className="gap-1.5">
              <TableProperties className="h-3.5 w-3.5" />
              Log
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {isLoading ? (
              <LoadingState message="提出データを読み込み中..." />
            ) : (
              <Dashboard trying={trying} todo={todo} stats={stats} onRefresh={refresh} onFocus={handleFocus} />
            )}
          </TabsContent>

          <TabsContent value="table">
            {isLoading ? (
              <LoadingState message="問題データを読み込み中..." />
            ) : (
              <TableView tableData={tableData} onFocus={handleFocus} />
            )}
          </TabsContent>
        </Tabs>
      </main>

      <FocusModal
        problem={focusProblem}
        onClose={() => setFocusProblem(null)}
        onComplete={refresh}
      />

      {justConfirmed && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-lg border bg-card px-4 py-3 shadow-lg text-sm">
          <span className="text-green-600 dark:text-green-400">ACを確認しました。リロードしても大丈夫です。</span>
          <button
            onClick={clearConfirmed}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="閉じる"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

function LoadingState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center py-20 text-sm text-muted-foreground">
      <span className="animate-pulse">{message}</span>
    </div>
  );
}
