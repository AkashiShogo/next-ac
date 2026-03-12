import type { ProblemStatus } from "./types";

export const STATUS_STYLE: Record<ProblemStatus, string> = {
  TODO:         "bg-zinc-100  text-zinc-500  hover:bg-zinc-200  dark:bg-zinc-700/50  dark:text-zinc-400  dark:hover:bg-zinc-700",
  TRYING:       "bg-red-100   text-red-600   hover:bg-red-200   dark:bg-red-900/40   dark:text-red-400   dark:hover:bg-red-900",
  AC_PENALTY:   "bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-400 dark:hover:bg-green-900",
  AC_ONESHOT:   "bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-400 dark:hover:bg-green-900",
  AC_OPTIMISTIC:"bg-green-50  text-green-500 border border-dashed border-green-300 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700 dark:hover:bg-green-900/40",
};

export const STATUS_LABEL: Record<ProblemStatus, string> = {
  TODO:         "–",
  TRYING:       "WA",
  AC_PENALTY:   "AC",
  AC_ONESHOT:   "AC",
  AC_OPTIMISTIC:"AC",
};
