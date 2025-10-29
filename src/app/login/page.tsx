"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Loader2 } from "lucide-react"

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    setError("")
    setIsLoading(true)

    const response = await fetch("/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (data.error) {
      setError(data.error || "An error occurred. Please try again.")
      return setIsLoading(false)
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))

    router.push("/chat")

  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="glass-card rounded-2xl border border-white/10 bg-linear-gradient-to-br from-background/80 to-background/40 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-gradient-to-br from-primary/20 to-primary/5 animate-in zoom-in duration-500">
              <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-balance bg-linear-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to continue your conversations</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              <label htmlFor="email" className="text-sm font-medium text-foreground/90">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex h-11 w-full rounded-lg border border-white/10 bg-background/50 px-3 py-2 text-sm backdrop-blur-sm transition-all duration-300 placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <label htmlFor="password" className="text-sm font-medium text-foreground/90">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="flex h-11 w-full rounded-lg border border-white/10 bg-background/50 px-3 py-2 text-sm backdrop-blur-sm transition-all duration-300 placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive animate-in fade-in slide-in-from-top-2 duration-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full rounded-lg bg-linear-gradient-to-r from-primary to-primary/80 font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed animate-in fade-in slide-in-from-bottom-4 delay-300"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm animate-in fade-in duration-700 delay-500">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link
              href="/signup"
              className="font-medium text-primary transition-colors hover:text-primary/80 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
