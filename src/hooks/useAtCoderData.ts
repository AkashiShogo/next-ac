"use client";

import useSWR from "swr";
import { useMemo } from "react";
import type {
  KenkoooProblem,
  ProblemModel,
  KenkoooSubmission,
  ProblemData,
  ProblemStatus,
} from "@/lib/types";

const jsonFetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`fetch failed: ${url}`);
    return r.json();
  });

function classifyStatus(
  problemId: string,
  allSubs: KenkoooSubmission[]
): ProblemStatus {
  const subs = allSubs.filter((s) => s.problem_id === problemId);

  if (subs.length === 0) return "TODO";

  const hasAc = subs.some((s) => s.result === "AC");
  if (!hasAc) return "TRYING";

  const sorted = [...subs].sort((a, b) => a.epoch_second - b.epoch_second);
  const firstSubmission = sorted[0];
  if (firstSubmission.result === "AC") return "AC_ONESHOT";
  return "AC_PENALTY";
}

export function useAtCoderData(userId: string | null) {
  const isReady = Boolean(userId);

  const { data: allProblems, error: problemsError } = useSWR<KenkoooProblem[]>(
    "https://kenkoooo.com/atcoder/resources/problems.json",
    jsonFetcher,
    { revalidateOnFocus: false, dedupingInterval: 3_600_000 }
  );

  const { data: problemModels, error: modelsError } = useSWR<
    Record<string, ProblemModel>
  >(
    "https://kenkoooo.com/atcoder/resources/problem-models.json",
    jsonFetcher,
    { revalidateOnFocus: false, dedupingInterval: 3_600_000 }
  );

  // 全提出履歴（5分キャッシュ）
  const { data: historicSubmissions, error: subsError } = useSWR<
    KenkoooSubmission[]
  >(
    isReady
      ? `https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${userId}&from_second=0`
      : null,
    jsonFetcher,
    { revalidateOnFocus: false, dedupingInterval: 300_000 }
  );

  // 直近24時間の提出を30秒ポーリング（リアルタイム補完）
  const recentFrom = useMemo(
    () => Math.floor(Date.now() / 1000) - 86_400,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // マウント時に1度だけ計算
  );
  const recentKey = isReady
    ? `https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${userId}&from_second=${recentFrom}`
    : null;
  const { data: recentSubmissions, mutate: mutateRecent } = useSWR<KenkoooSubmission[]>(
    recentKey,
    jsonFetcher,
    { refreshInterval: 30_000 }
  );

  const problems = useMemo<ProblemData[]>(() => {
    if (!allProblems || !problemModels || !historicSubmissions) return [];

    // historicと直近をマージ（重複はIDで除去）
    const seenIds = new Set<number>();
    const allSubs: KenkoooSubmission[] = [];
    for (const s of [...(recentSubmissions ?? []), ...historicSubmissions]) {
      if (!seenIds.has(s.id)) {
        seenIds.add(s.id);
        allSubs.push(s);
      }
    }

    const TARGET_INDEXES = new Set(["A", "B", "C"]);
    const filtered = allProblems.filter(
      (p) =>
        /^abc\d+$/.test(p.contest_id) &&
        TARGET_INDEXES.has(p.problem_index.toUpperCase())
    );

    return filtered.map((p): ProblemData => {
      const model = problemModels[p.id];
      const difficulty =
        model?.difficulty != null ? Math.round(model.difficulty) : null;

      const status = userId ? classifyStatus(p.id, allSubs) : "TODO";

      return {
        id: p.id,
        contestId: p.contest_id,
        index: p.problem_index.toUpperCase() as "A" | "B" | "C",
        title: p.title,
        difficulty,
        status,
        url: `https://atcoder.jp/contests/${p.contest_id}/tasks/${p.id}`,
      };
    });
  }, [allProblems, problemModels, historicSubmissions, recentSubmissions, userId]);

  const tableData = useMemo(() => {
    const map = new Map<string, Record<"A" | "B" | "C", ProblemData | null>>();
    for (const p of problems) {
      if (!map.has(p.contestId)) {
        map.set(p.contestId, { A: null, B: null, C: null });
      }
      map.get(p.contestId)![p.index] = p;
    }
    return Array.from(map.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([contestId, cols]) => ({ contestId, cols }));
  }, [problems]);

  const trying = useMemo(
    () => problems.filter((p) => p.status === "TRYING"),
    [problems]
  );

  const todo = useMemo(() => {
    const todoList = problems.filter((p) => p.status === "TODO");
    return [...todoList]
      .sort((a, b) => {
        if (a.difficulty === null && b.difficulty === null) return 0;
        if (a.difficulty === null) return 1;
        if (b.difficulty === null) return -1;
        return a.difficulty - b.difficulty;
      })
      .slice(0, 10);
  }, [problems]);

  const cleared = useMemo(
    () =>
      problems.filter(
        (p) => p.status === "AC_ONESHOT" || p.status === "AC_PENALTY"
      ),
    [problems]
  );

  const isLoading =
    !allProblems || !problemModels || (isReady && !historicSubmissions);

  const error = problemsError ?? modelsError ?? subsError ?? null;

  // 集中モード完了時に呼ぶ手動リフレッシュ
  const refresh = async () => { await mutateRecent(); };

  return { isLoading, error, tableData, trying, todo, cleared, refresh };
}
