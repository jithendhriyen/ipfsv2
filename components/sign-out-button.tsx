"use client"
import { getBrowserSupabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export function SignOutButton() {
  async function onSignOut() {
    const supabase = getBrowserSupabase()
    await supabase.auth.signOut()
    window.location.assign("/auth/login")
  }
  return (
    <Button variant="outline" size="sm" onClick={onSignOut}>
      Sign out
    </Button>
  )
}
