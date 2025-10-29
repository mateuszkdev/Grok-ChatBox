"use client"

import Link from "next/link"
import { config } from "#/lib/config"

export default function Home() {
  return (

    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">

        <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 animate-in zoom-in duration-700 delay-200">
          <svg className="h-12 w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>

        <h1 className="mb-4 text-6xl font-bold text-balance bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent animate-in fade-in duration-1000 delay-300">
          AI Chat Assistant
        </h1>

        <p className="mb-12 text-xl text-muted-foreground text-balance animate-in fade-in duration-1000 delay-500">
          Experience the future of conversation with {config.aiModel}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
          <Link href="/chat">

            <button className="h-12 w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 px-8 font-medium text-primary-foreground rounded-lg shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]">
              Get Started
            </button>
          </Link>
          <Link href="/login">
            <button className="h-12 w-full sm:w-auto border border-white/10 bg-background/50 px-8 rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-background/80 hover:scale-[1.02] active:scale-[0.98]">
              Sign In
            </button>
          </Link>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-3 animate-in fade-in duration-1000 delay-1000">
          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-background/80 to-background/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">Get instant responses powered by {config.aiModel}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-background/80 to-background/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold">Secure & Private</h3>
            <p className="text-sm text-muted-foreground">Your conversations are encrypted and stored securely - in future updates, now no history will be saved</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-background/80 to-background/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold">Natural Conversations</h3>
            <p className="text-sm text-muted-foreground">Chat naturally with AI that understands context</p>
          </div>
        </div>
      </div>
    </div>
  )
}
