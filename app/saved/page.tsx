import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import SavedList from "@/components/saved-list"

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
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4 text-balance">Your Saved CIDs</h1>
      <SavedList initialItems={items ?? []} />
    </main>
  )
}
