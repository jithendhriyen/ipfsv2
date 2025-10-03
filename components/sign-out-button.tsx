"use client"
import { getBrowserSupabase } from "@/lib/supabase/client"

export function SignOutButton() {
  async function onSignOut() {
    const supabase = getBrowserSupabase()
    await supabase.auth.signOut()
    window.location.assign("/auth/login")
  }
  return (
    <button onClick={onSignOut} className="text-sm underline">
      Sign out
    </button>
  )
}
