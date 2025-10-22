"use client"

import type React from "react"

import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter()

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  const handleSubmitClick = () => {
    const user = getCurrentUser()
    if (!user) {
      router.push("/login?redirect=/user?tab=submit")
    } else {
      router.push("/user?tab=submit")
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar onSubmitClick={handleSubmitClick} />
      <div className="ml-56 flex-1">
        <Header onSearch={handleSearch} />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  )
}
