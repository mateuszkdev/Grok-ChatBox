import { Loader2, Send } from 'lucide-react';
import React from 'react'

export default function Input({ input, setInput, isLoading, handleSubmit, handleKeyDown, textareaRef }: { input: string; setInput: React.Dispatch<React.SetStateAction<string>>; isLoading: boolean; handleSubmit: (e: React.FormEvent) => void; handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void; textareaRef: React.RefObject<HTMLTextAreaElement> }) {
  return (
    <>
      <div className="border-t border-white/10 bg-background/80 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mx-auto max-w-3xl p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Shift + Enter for new line)"
              className="min-h-[60px] max-h-[200px] w-full resize-none rounded-lg border border-white/10 bg-background/50 px-3 py-2 pr-12 text-sm backdrop-blur-sm transition-all duration-300 placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-lg bg-linear-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </form>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            AI can make mistakes. Check important information.
          </p>
        </div>
      </div>
    </>
  )
}
