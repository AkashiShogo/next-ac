"use client";

import { useState } from "react";
import { Check, LogIn, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onSubmit: (userId: string) => void;
  defaultValue?: string;
  isEdit?: boolean;
  onCancel?: () => void;
}

export function UserIdForm({ onSubmit, defaultValue = "", isEdit, onCancel }: Props) {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      {!isEdit && (
        <p className="text-sm text-muted-foreground">
          AtCoder IDを入力して進捗管理を始めましょう
        </p>
      )}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="AtCoder ID"
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring w-48"
          autoFocus
        />
        {isEdit ? (
          <>
            <Button type="submit" size="icon" className="h-9 w-9" title="保存">
              <Check className="h-3.5 w-3.5" />
            </Button>
            {onCancel && (
              <Button type="button" size="icon" variant="outline" className="h-9 w-9" title="キャンセル" onClick={onCancel}>
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </>
        ) : (
          <Button type="submit" className="h-9 gap-1.5">
            <LogIn className="h-3.5 w-3.5" />開始
          </Button>
        )}
      </div>
    </form>
  );
}
