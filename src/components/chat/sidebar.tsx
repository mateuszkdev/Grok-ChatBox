"use client"

import { cn } from "#/lib/utils"
import { Plus, Trash2 } from "lucide-react"

interface Session {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
}

interface ChatSidebarProps {
  sessions: Session[]
  currentSessionId: string | null
  onSelectSession: (sessionId: string) => void
  onNewChat: () => void
  onDeleteSession: (sessionId: string) => void
  isOpen: boolean
  onClose: () => void
}

export function ChatSidebar({
  sessions,
  currentSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  isOpen,
  onClose,
}: ChatSidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-72 border-r border-white/10 bg-background/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col p-4">
          <button
            onClick={onNewChat}
            className="mb-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-linear-gradient-to-r from-primary to-primary/80 font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </button>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto">
            <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Chat History</h3>
            <div className="space-y-1">
              {sessions.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">No chat history yet</p>
              ) : (
                sessions
                  .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
                  .map((session) => (
                    <div
                      key={session.id}
                      className={cn(
                        "group relative rounded-lg border border-transparent transition-all duration-200",
                        currentSessionId === session.id
                          ? "border-primary/20 bg-primary/10"
                          : "hover:border-white/10 hover:bg-secondary/50",
                      )}
                    >
                      <button onClick={() => onSelectSession(session.id)} className="w-full px-3 py-2 text-left">
                        <p className="truncate text-sm font-medium">{session.title}</p>
                        <p className="text-xs text-muted-foreground">{session.updatedAt.toLocaleDateString()}</p>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteSession(session.id)
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 opacity-0 transition-opacity hover:bg-destructive/20 group-hover:opacity-100"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
