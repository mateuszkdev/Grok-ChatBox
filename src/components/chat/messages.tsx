import React from 'react'
import { Message } from "#/components/chat/interface"
import { ChatMessage } from '#/components/chat/message';

export default function Messages({ messages, isLoading, messagesEndRef }: { messages: any; isLoading: boolean; messagesEndRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      <div className="relative min-h-full">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center animate-in fade-in duration-700">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-gradient-to-br from-primary/20 to-primary/5 animate-in zoom-in duration-500">
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-balance">Start a conversation</h2>
            <p className="text-center text-muted-foreground text-balance max-w-md">
              Ask me anything! I'm here to help you with information, ideas, and answers.
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-6">
            {messages.map((message: Message, index: number) => (
              <div key={message.id}>
                <ChatMessage message={message} index={index} />
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* ... (reszta kodu loadera pozostaje bez zmian) ... */}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  )
}
