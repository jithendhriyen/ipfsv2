import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import SavedList from "@/components/saved-list"
import { SignOutButton } from "@/components/sign-out-button"
import { ThemeToggle } from "@/components/theme-toggle"

export default async function SavedPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: items } = await supabase
    .from("saved_items")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="flex-1 w-full flex flex-col">
      <header className="border-b bg-background">
        <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
          <Link href="/protected" className="text-lg font-semibold text-pretty">
            App
          </Link>
          <div className="flex items-center gap-3">
            <Link className="text-sm underline underline-offset-4" href="/protected">
              Home
            </Link>
            <Link className="text-sm underline underline-offset-4" href="/profile">
              Profile
            </Link>
            <ThemeToggle />
            <SignOutButton />
          </div>
        </nav>
      </header>
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4 text-balance">Your Saved CIDs</h1>
        <SavedList initialItems={items ?? []} />
      </main>
    </div>
  )
}
