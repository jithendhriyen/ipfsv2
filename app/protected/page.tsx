import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import NexusBrowser from "@/components/nexus-browser"
import { ThemeToggle } from "@/components/theme-toggle"

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <NexusBrowser />
    </div>
  )
}
