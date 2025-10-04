"use client"

import Link from "next/link"
import { SignOutButton } from "@/components/sign-out-button"
import { ThemeToggle } from "@/components/theme-toggle"

export function ProfileNavigation() {
  return (
    <header className="border-b bg-background">
      <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <Link href="/protected" className="text-lg font-semibold text-pretty">
          IPFS Browser
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
  )
}
