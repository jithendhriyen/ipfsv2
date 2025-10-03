"use client"
import dynamic from "next/dynamic"
import { getApiBase } from "@/lib/api-base"

// If your component accepts props for base URL, you can plumb it here.
// If not, your imported UI will call relative paths; the proxy route will handle it.
const NexusBrowser = dynamic(() => import("./nexus-browser"), { ssr: false })

export default function NexusBrowserBridge() {
  const apiBase = getApiBase()
  // If NexusBrowser supports props: return <NexusBrowser apiBase={apiBase} />
  return <NexusBrowser />
}
