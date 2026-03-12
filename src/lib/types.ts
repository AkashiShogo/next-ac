export type ProblemStatus = "TODO" | "TRYING" | "AC_PENALTY" | "AC_ONESHOT" | "AC_OPTIMISTIC";

/** kenkoooo problems.json の1エントリ */
export interface KenkoooProblem {
  id: string;
  contest_id: string;
  problem_index: string;
  title: string;
}

/** kenkoooo problem-models.json の1エントリ */
export interface ProblemModel {
  difficulty?: number | null;
  is_experimental?: boolean;
}

/** kenkoooo submissions API の1エントリ */
export interface KenkoooSubmission {
  id: number;
  epoch_second: number;
  problem_id: string;
  contest_id: string;
  user_id: string;
  language: string;
  point: number;
  length: number;
  result: string;
}

/** フック内で構築する、問題ごとの解析済みデータ */
export interface ProblemData {
  id: string;
  contestId: string;
  index: "A" | "B" | "C";
  title: string;
  difficulty: number | null;
  status: ProblemStatus;
  url: string;
}
