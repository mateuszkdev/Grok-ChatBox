"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Messages from "#/components/chat/messages"
import Input from "#/components/chat/input"

import { useChat } from "@ai-sdk/react"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

// Mock messages for different sessions
const MOCK_MESSAGES: Record<string, Message[]> = {
  "session-1": [
    {
      id: "1",
      role: "user",
      content: "What is artificial intelligence?",
      timestamp: new Date("2024-01-15T10:00:00"),
    },
    {
      id: "2",
      role: "assistant",
      content:
        "Artificial Intelligence (AI) is the simulation of human intelligence in machines that are programmed to think and learn like humans. It encompasses various technologies including machine learning, natural language processing, and computer vision.",
      timestamp: new Date("2024-01-15T10:00:05"),
    },
  ]
}

interface ChatInterfaceProps {
  currentSessionId: string | null
}

export function ChatInterface({ currentSessionId }: ChatInterfaceProps) {
  
  const [messagesCache, setMessagesCache] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null!)
  const textareaRef = useRef<HTMLTextAreaElement>(null!)

  const { messages, status, sendMessage } = useChat()

  // useEffect(() => {
  //   if (currentSessionId && MOCK_MESSAGES[currentSessionId]) {
  //     setMessages(MOCK_MESSAGES[currentSessionId])
  //   } else {
  //     setMessages([]) // future implementation: fetch messages from backend
  //   }
  // }, [currentSessionId])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    if (!input.trim() || isLoading) return

    setInput("")
    setIsLoading(true)

    sendMessage({ text: input.trim() })
    setIsLoading(false)

  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">

      <Messages
        messages={messages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
      />

      <Input
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        handleKeyDown={handleKeyDown}
        textareaRef={textareaRef}
      />

    </div>
  )
}
