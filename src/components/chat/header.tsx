"use client"
import { LogOut, Menu, SettingsIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Popup from "#/components/chat/aiEgoPopUp"

export default function Header({ userName, setIsSidebarOpen, isSidebarOpen, handleLogout }: { userName: string; setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>; isSidebarOpen: boolean; handleLogout: () => void }) {
  
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [aiEgo, setAiEgo] = useState<string>("")

  // useEffect(() => {

  //   fetch("/api/account/getAiEgo")
  //     .then(res => res.json())
  //     .then(json => {
  //       console.log(json)
  //       setAiEgo(json.aiEgo)
  //     })
  // }, [])

  const handleAiEgoChange = async () => {
    
    const response = await fetch("/api/account/updateAiEgo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        aiEgo
      })
    })

    const json = await response.json()
    console.log({json})

  }
  
  return (
    <>
      <header className="border-b border-white/10 bg-background/80 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-secondary/50 lg:hidden"
            >
            <Menu className="h-5 w-5" />
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-gradient-to-br from-primary/20 to-primary/5">
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold">AI Chat</h1>
              <p className="text-xs text-muted-foreground">Welcome, {userName}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex h-9 items-center gap-1 rounded-lg border border-white/10 bg-background/50 px-3 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:bg-background/80"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className='flex h-9 items-center gap-1 rounded-lg border border-white/10 bg-background/50 px-3 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:bg-background/80'
          >
            <SettingsIcon className='h-4 w-4' />
            Change AI Alterego
          </button>

          <Popup
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onConfirm={handleAiEgoChange}
            inputValue={aiEgo}
            onInputChange={e => setAiEgo((e.target as any).value)}
          />

        </div>
      </header>
    </>
  )
}
