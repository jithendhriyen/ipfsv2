"use client"

import NexusBrowser from "@/components/nexus-browser"

export default function Page() {
  return (
    <main className="min-h-screen p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold text-balance">Backend to frontend integration</h1>
        <p className="text-sm text-muted-foreground">
          {"Connecting to "}
          {process.env.NEXT_PUBLIC_API_BASE || "configured API"}
        </p>
        <nav className="mt-3 flex items-center gap-3">
          <a href="/profile" className="text-blue-600 hover:underline text-sm">
            Profile
          </a>
          <a href="/saved" className="text-blue-600 hover:underline text-sm">
            Saved
          </a>
        </nav>
      </header>
      <NexusBrowser darkMode />
    </main>
  )
}
