"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, LayoutDashboard, TableProperties } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { UserIdForm } from "@/components/UserIdForm";
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

  const { isLoading, error, tableData, trying, todo, cleared, refresh } =
    useAtCoderData(userId);

  const [focusProblem, setFocusProblem] = useState<ProblemData | null>(null);

  const handleFocus = (problem: ProblemData) => {
    window.open(problem.url, "_blank", "noopener,noreferrer");
    setFocusProblem(problem);
  };

  // SSRとのhydration不一致を避けるため、クライアント側の準備が整うまで何も表示しない
  if (!hydrated) return null;

  if (!userId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
        {/* サービス紹介 */}
        <div className="text-center space-y-3 max-w-sm">
          <h1 className="text-3xl font-bold tracking-tight">Next - AC</h1>
          <p className="text-lg font-medium">
            精進に、迷いはいらない。
          </p>
          <p className="text-sm text-muted-foreground">
            AtCoder ABC の次に解くべき問題が、すぐわかる。
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

        {/* ID入力フォーム */}
        <div className="w-full max-w-sm rounded-xl border bg-card p-6 shadow-sm space-y-4">
          <p className="text-sm font-medium text-center">AtCoder IDを入力して始める</p>
          <UserIdForm onSubmit={handleSetUserId} />
        </div>

        {/* 使い方リンク */}
        <Link
          href="/guide"
          className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
        >
          使い方を見る →
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

      <main className="mx-auto max-w-5xl px-4 py-6">
        {error && (
          <div className="mb-4 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
            データの取得中にエラーが発生しました。しばらく待ってから再読み込みしてください。
          </div>
        )}

        <Tabs defaultValue="table">
          <TabsList className="mb-4">
            <TabsTrigger value="table" className="gap-1.5">
              <TableProperties className="h-3.5 w-3.5" />
              Table
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="gap-1.5">
              <LayoutDashboard className="h-3.5 w-3.5" />
              Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="table">
            {isLoading ? (
              <LoadingState message="問題データを読み込み中..." />
            ) : (
              <TableView tableData={tableData} onFocus={handleFocus} />
            )}
          </TabsContent>

          <TabsContent value="dashboard">
            {isLoading ? (
              <LoadingState message="提出データを読み込み中..." />
            ) : (
              <Dashboard trying={trying} todo={todo} cleared={cleared} onRefresh={refresh} onFocus={handleFocus} />
            )}
          </TabsContent>
        </Tabs>
      </main>

      <FocusModal
        problem={focusProblem}
        onClose={() => setFocusProblem(null)}
        onComplete={refresh}
      />
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
