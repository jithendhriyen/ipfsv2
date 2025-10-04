"use client"

import type React from "react"

import { useState } from "react"
import { getBrowserSupabase } from "@/lib/supabase/client"

type Item = {
  id: string
  user_id: string
  cid: string
  title: string | null
  created_at: string
}

export default function SavedList({ initialItems }: { initialItems: Item[] }) {
  const supabase = getBrowserSupabase()
  const [items, setItems] = useState<Item[]>(initialItems)
  const [cid, setCid] = useState("")
  const [title, setTitle] = useState("")
  const [saving, setSaving] = useState(false)

  async function addItem(e: React.FormEvent) {
    e.preventDefault()
    if (!cid.trim()) return
    setSaving(true)
    try {
      console.log("Attempting to add saved item:", { cid: cid.trim(), title: title.trim() })
      
      const { data: userRes, error: userErr } = await supabase.auth.getUser()
      if (userErr) {
        console.error("Auth error:", userErr)
        throw userErr
      }
      if (!userRes?.user) {
        alert("Not signed in")
        return
      }
      const userId = userRes.user.id
      console.log("User ID:", userId)

      const { data, error } = await supabase
        .from("saved_items")
        .insert({ cid: cid.trim(), title: title.trim() || null, user_id: userId })
        .select("*")
        .single()
        
      if (error) {
        console.error("Supabase insert error:", error)
        throw error
      }
      
      console.log("Item saved successfully:", data)
      setItems((prev) => [data as Item, ...prev])
      setCid("")
      setTitle("")
    } catch (err) {
      console.error("addItem error:", (err as any)?.message)
      alert("Failed to save item: " + (err as any)?.message)
    } finally {
      setSaving(false)
    }
  }

  async function removeItem(id: string) {
    try {
      const { error } = await supabase.from("saved_items").delete().eq("id", id)
      if (error) throw error
      setItems((prev) => prev.filter((i) => i.id !== id))
    } catch (err) {
      console.log("[v0] removeItem error:", (err as any)?.message)
      alert("Failed to delete item")
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={addItem} className="flex items-end gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">CID</label>
          <input
            className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
            value={cid}
            onChange={(e) => setCid(e.target.value)}
            placeholder="bafy..."
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Title (optional)</label>
          <input
            className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My file"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>

      <ul className="divide-y rounded-md border">
        {items.length === 0 && <li className="p-4 text-sm text-muted-foreground">No saved items yet.</li>}
        {items.map((item) => (
          <li key={item.id} className="p-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-medium truncate">{item.title || "(untitled)"}</p>
              <p className="text-xs text-muted-foreground break-all">{item.cid}</p>
            </div>
            <button onClick={() => removeItem(item.id)} className="text-red-600 hover:underline text-sm">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
