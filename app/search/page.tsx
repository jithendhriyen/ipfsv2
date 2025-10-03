"use client"

import { useSearchParams } from "next/navigation"
import SearchResults from "@/components/search-results"

export default function Page() {
  // The SearchResults component internally reads search params and renders the full UI
  // It already includes its own Search input at the top area.
  // We just render it here.
  const _ = useSearchParams() // ensure client rendering sync
  return (
    <main className="min-h-screen">
      <SearchResults darkMode />
    </main>
  )
}
