"use client"

import { useState } from "react"
import { ChatInterface } from "#/components/chat/interface"
import { ChatSidebar } from "#/components/chat/sidebar"
import Header from "#/components/chat/header"

const MOCK_SESSIONS = [
  {
    id: "session-1",
    title: "Sessions will be in future updates",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  }
]

export default function ChatPage() {

  const userName = localStorage.getItem("userName") || "User";

  const [sessions, setSessions] = useState(MOCK_SESSIONS) // future implementation
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleLogout = () => {
    window.location.href = "/logout"
  }

  const handleNewChat = () => {
    setCurrentSessionId(null) // future implementation
    setIsSidebarOpen(false)
  }

  const handleSelectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId) // future implementation
    setIsSidebarOpen(false)
  }

  const handleDeleteSession = (sessionId: string) => {
    if (currentSessionId === sessionId) { // future implementation
      setCurrentSessionId(null)
    }
  }

  return (
    <div className="flex h-screen flex-col">

      <Header
        userName={userName}
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
        handleLogout={handleLogout}
      />

      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSelectSession={handleSelectSession}
          onNewChat={handleNewChat}
          onDeleteSession={handleDeleteSession}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex-1 lg:ml-72">
          <ChatInterface currentSessionId={currentSessionId} />
        </div>
      </div>
    </div>
  )
}
