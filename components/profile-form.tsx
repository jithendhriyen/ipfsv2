"use client"

import type React from "react"

import { useState } from "react"
import { getBrowserSupabase } from "@/lib/supabase/client"

type Props = {
  userId: string
  initialProfile: {
    display_name: string
    avatar_url: string
    bio: string
    website?: string
  }
}

export default function ProfileForm({ userId, initialProfile }: Props) {
  const supabase = getBrowserSupabase()
  const [form, setForm] = useState(initialProfile)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function onSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    try {
      console.log("Attempting to save profile for user:", userId)
      console.log("Form data:", form)
      
      const { error } = await supabase.from("profiles").upsert({
        id: userId,
        display_name: form.display_name || null,
        avatar_url: form.avatar_url || null,
        bio: form.bio || null,
        website: form.website || null,
        updated_at: new Date().toISOString(),
      })
      
      if (error) {
        console.error("Supabase error:", error)
        throw error
      }
      
      console.log("Profile saved successfully!")
      setMessage("Saved!")
    } catch (err: any) {
      console.error("Save error:", err)
      setMessage(err.message || "Failed to save profile")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSave} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Display name</label>
        <input
          className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
          value={form.display_name}
          onChange={(e) => setForm((f) => ({ ...f, display_name: e.target.value }))}
          placeholder="Ada Lovelace"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Website</label>
        <input
          className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
          value={form.website || ""}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
          placeholder="https://example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Avatar URL</label>
        <input
          className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
          value={form.avatar_url}
          onChange={(e) => setForm((f) => ({ ...f, avatar_url: e.target.value }))}
          placeholder="https://..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Bio</label>
        <textarea
          className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
          rows={4}
          value={form.bio}
          onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
          placeholder="Tell us about yourself..."
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    </form>
  )
}
