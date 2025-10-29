"use client"

import type { Message } from "#/components/chat/interface"
import { cn } from "#/lib/utils"
import { config } from "#/lib/config"

interface ChatMessageProps {
  message: Message
  index: number
}

export function ChatMessage({ message, index }: ChatMessageProps) {

  const isUser = message.role === "user"
  const userName = localStorage.getItem("userName") || "You"
  
  return (
    <div
      className={cn("flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4", "duration-500")}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          isUser
            ? "bg-linear-gradient-to-br from-secondary to-secondary/50"
            : "bg-linear-gradient-to-br from-primary/20 to-primary/5",
        )}
      >
        {isUser ? (
          <svg className="h-4 w-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        ) : (
          <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-2 pt-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{isUser ? userName : config.aiModel}</span>
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div
          className={cn(
            "rounded-xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-linear-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
              : "bg-linear-gradient-to-br from-secondary/50 to-secondary/30 border border-white/10",
          )}
        >
          <p className="whitespace-pre-wrap text-pretty">{message.content}</p>
        </div>
      </div>
    </div>
  )
}
