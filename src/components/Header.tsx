"use client";

import { useState, useEffect } from "react";
import { BookOpen, Pencil, RotateCcw, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { UserIdForm } from "./UserIdForm";

interface Props {
  userId: string;
  onChangeUserId: (id: string) => void;
  onReset: () => void;
}

export function Header({ userId, onChangeUserId, onReset }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleSave = (newId: string) => {
    onChangeUserId(newId);
    setIsEditing(false);
  };

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold tracking-tight hover:opacity-80 shrink-0">
            Next-AC
          </Link>
          <Link
            href="/guide"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <BookOpen className="h-3.5 w-3.5" />
            使い方
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              title="テーマ切り替え"
            >
              {resolvedTheme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </Button>
          )}
          {isEditing ? (
            <UserIdForm
              onSubmit={handleSave}
              defaultValue={userId}
              isEdit
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              <span className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{userId}</span>
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setIsEditing(true)}
                title="IDを変更"
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={onReset}
                title="リセット"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
