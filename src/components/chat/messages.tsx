import React from 'react'
import { Message } from "#/components/chat/interface"
import { ChatMessage } from '#/components/chat/message';

export default function Messages({ messages, isLoading, messagesEndRef }: { messages: Message[]; isLoading: boolean; messagesEndRef: React.RefObject<HTMLDivElement> }) {
  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center animate-in fade-in duration-700">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-gradient-to-br from-primary/20 to-primary/5 animate-in zoom-in duration-500">
              <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-balance">Start a conversation</h2>
            <p className="text-center text-muted-foreground text-balance max-w-md">
              Ask me anything! I'm here to help you with information, ideas, and answers.
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-6">
            {messages.map((message, index) => (
              <ChatMessage key={message.id} message={message} index={index} />
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-gradient-to-br from-primary/20 to-primary/5">
                  <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div className="flex-1 space-y-2 pt-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </>
  )
}
