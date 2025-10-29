"use client"
import { CheckCircle2 } from 'lucide-react'
import { useEffect } from 'react'

export default function Logout() {

    useEffect(() => {
        const logout = async () => {
            const data = await fetch('/api/account/logout', { method: 'POST' })
            console.log(await data.json())
        }
        logout().then(() => {
            setTimeout(() => {
                window.location.href = "/"
            }, 1000)
        })
    }, [])

    return (

    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-gradient-to-br from-purple-900/20 via-background to-blue-900/20" />

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 text-center space-y-8 animate-fade-in-up">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full border-4 border-green-500/30 animate-ping" />
            <div className="absolute inset-0 rounded-full border-4 border-green-500/20 animate-pulse" />

            <div className="relative bg-green-500/20 p-8 rounded-full border-2 border-green-500">
              <CheckCircle2 className="w-24 h-24 text-green-500 animate-bounce" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-foreground animate-fade-in delay-200">Successful Logout</h1>
          <p className="text-xl text-muted-foreground animate-fade-in delay-300">See you soon!</p>
        </div>

        <div className="w-64 mx-auto animate-fade-in delay-500">
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-linear-gradient-to-r from-purple-500 to-blue-500 animate-[loading_3s_ease-in-out]" />
          </div>
          <p className="text-sm text-muted-foreground mt-2">Redirecting...</p>
        </div>
      </div>
    </div>

    )

}