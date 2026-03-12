"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ProblemData } from "@/lib/types";

interface Props {
  problem: ProblemData | null;
  onClose: () => void;
  onComplete: (problem?: ProblemData) => Promise<void>;
}

export function FocusModal({ problem, onClose, onComplete }: Props) {
  const [completing, setCompleting] = useState(false);
  const [doneMessage, setDoneMessage] = useState<string | null>(null);

  // 新しい問題が開かれたら状態をリセット
  useEffect(() => {
    if (problem) {
      setDoneMessage(null);
      setCompleting(false);
    }
  }, [problem]);

  const MESSAGES = [
    "お疲れさまでした。",
    "着実に積み上がっています。",
    "その一問が、力になります。",
    "よい集中でした。",
    "また一つ、越えましたね。",
    "続けていることが、何より大切です。",
  ];

  const fireConfetti = () => {
    const burst = (x: number) =>
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { x, y: 0.6 },
        colors: ["#facc15", "#34d399", "#60a5fa", "#f472b6", "#a78bfa"],
      });
    burst(0.35);
    setTimeout(() => burst(0.65), 150);
  };

  const handleComplete = async () => {
    setCompleting(true);
    await onComplete(problem ?? undefined);
    setCompleting(false);
    fireConfetti();
    const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    setDoneMessage(msg);
    setTimeout(onClose, 2000);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setDoneMessage(null);
      onClose();
    }
  };

  return (
    <Dialog open={!!problem} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm">
        {problem && (
          <>
            <DialogHeader>
              <DialogTitle className="text-base">Focus</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 pt-1">
              {/* 問題情報 */}
              <div className="rounded-lg bg-muted/50 px-4 py-3 space-y-0.5">
                <p className="text-xs text-muted-foreground font-mono">
                  {problem.contestId.toUpperCase()} — {problem.index}
                </p>
                <p className="font-semibold">{problem.title}</p>
              </div>

              <div className="h-14 w-full">
                {doneMessage ? (
                  <div className="flex h-full items-center justify-center text-sm font-medium">
                    {doneMessage}
                  </div>
                ) : (
                  <Button
                    className="w-full h-full text-base"
                    onClick={handleComplete}
                    disabled={completing}
                  >
                    {completing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      "Solved"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
