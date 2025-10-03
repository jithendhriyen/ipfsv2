import { redirect } from "next/navigation"
import Link from "next/link"

import { createClient } from "@/lib/supabase/server"
import NexusBrowser from "@/components/nexus-browser"

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex-1 w-full flex flex-col">
      <header className="border-b bg-background">
        <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
          <h1 className="text-lg font-semibold text-pretty">App</h1>
          <div className="flex items-center gap-3">
            <Link className="text-sm underline underline-offset-4" href="/profile">
              Profile
            </Link>
            <Link className="text-sm underline underline-offset-4" href="/saved">
              My Data
            </Link>
          </div>
        </nav>
      </header>

      {/* existing code */}
      <NexusBrowser darkMode />
    </div>
  )
}
