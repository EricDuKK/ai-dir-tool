"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useSearchParams } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface HeaderProps {
  onSearch?: (query: string) => void
}

// 提取使用 useSearchParams 的组件
function SearchBar({ onSearch }: { onSearch?: (query: string) => void }) {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const query = searchParams.get("q")
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  return (
    <form onSubmit={handleSearch} className="mx-auto w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="站内AI工具搜索"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-11 w-full rounded-full bg-muted/50 pl-11 pr-4 text-sm focus-visible:ring-primary"
        />
      </div>
    </form>
  )
}

export function Header({ onSearch }: HeaderProps) {
  const [user, setUser] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const supabase = createClient()
    
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-8">
        {/* Logo and Domain */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-primary-foreground">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.8" />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">AI工具集</h1>
            <p className="text-xs text-muted-foreground">AI-BOT.CN</p>
          </div>
        </div>

        {/* Search Bar - 使用 Suspense 包裹 */}
        <Suspense fallback={
          <div className="mx-auto w-full max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="站内AI工具搜索"
                disabled
                className="h-11 w-full rounded-full bg-muted/50 pl-11 pr-4 text-sm"
              />
            </div>
          </div>
        }>
          <SearchBar onSearch={onSearch} />
        </Suspense>

        {/* User Button with Dropdown */}
        {!isClient ? (
          // 服务器端渲染时显示登录按钮，避免水合不匹配
          <Link href="/login">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/user">个人中心</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/user?tab=submit">提交工具</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <form action="/auth/signout" method="post">
                  <button type="submit" className="w-full text-left">
                    退出登录
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}
