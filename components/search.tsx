"use client"

import { useState } from "react"
import { MagnifyingGlassIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline"

type Props = {
  darkMode?: boolean
  onSearch: (q: string) => void
  initialQuery?: string
  onOpenUpload?: () => void // optional: if caller wants to open upload modal
}

export default function Search({ darkMode, onSearch, initialQuery = "", onOpenUpload }: Props) {
  const [val, setVal] = useState(initialQuery)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const trimmed = val.trim()
        if (trimmed) onSearch(trimmed)
      }}
      className="relative"
    >
      <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Enter IPFS CID..."
        className={`w-full pl-12 pr-28 py-4 rounded-2xl text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
          darkMode
            ? "bg-gray-800/80 border border-gray-700/50 text-white backdrop-blur-sm focus:bg-gray-800"
            : "bg-white/80 border border-gray-300/50 text-gray-800 backdrop-blur-sm focus:bg-white"
        }`}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 transform flex items-center space-x-3">
        {onOpenUpload && (
          <button type="button" onClick={onOpenUpload} className="hover:scale-110 transition-transform duration-200">
            <ArrowUpTrayIcon className="w-5 h-5 text-blue-500" />
          </button>
        )}
        <button type="submit" className="hover:scale-110 transition-transform duration-200">
          <MagnifyingGlassIcon className="w-5 h-5 text-blue-500" />
        </button>
      </div>
    </form>
  )
}
