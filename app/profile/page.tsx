import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import ProfileForm from "@/components/profile-form"
import { SignOutButton } from "@/components/sign-out-button"
import { ThemeToggle } from "@/components/theme-toggle"

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Load existing profile (may be null if not created yet)
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

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
            <Link className="text-sm underline underline-offset-4" href="/saved">
              My Data
            </Link>
            <ThemeToggle />
            <SignOutButton />
          </div>
        </nav>
      </header>
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4 text-balance">Your Profile</h1>
        <ProfileForm
          userId={user.id}
          initialProfile={{
            display_name: profile?.display_name ?? "",
            avatar_url: profile?.avatar_url ?? "",
            bio: profile?.bio ?? "",
            website: profile?.website ?? "",
          }}
        />
      </main>
    </div>
  )
}
