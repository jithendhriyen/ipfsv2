import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import ProfileForm from "@/components/profile-form"
import { SignOutButton } from "@/components/sign-out-button"

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
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <SignOutButton />
      </div>
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
