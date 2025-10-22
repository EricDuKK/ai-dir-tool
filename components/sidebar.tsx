"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { categories } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PenSquare, ImageIcon, Video, FolderOpen, Bot, MessageSquare, Code, Palette, Music, Search } from "lucide-react"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  writing: PenSquare,
  image: ImageIcon,
  video: Video,
  office: FolderOpen,
  agent: Bot,
  chat: MessageSquare,
  coding: Code,
  design: Palette,
  audio: Music,
  search: Search,
}

interface SidebarProps {
  onCategoryClick?: (categoryId: string) => void
  onSubmitClick?: () => void
}

export function Sidebar({ onCategoryClick, onSubmitClick }: SidebarProps) {
  const pathname = usePathname()

  const handleCategoryClick = (categoryId: string) => {
    if (pathname === "/") {
      // Scroll to section on home page
      const element = document.getElementById(`category-${categoryId}`)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
    onCategoryClick?.(categoryId)
  }

  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-56 border-r border-sidebar-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-sidebar-border px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-primary-foreground">
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
            <span className="text-lg font-bold text-sidebar-foreground">AI工具集</span>
          </Link>
        </div>

        {/* Categories */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {categories.map((category) => {
              const Icon = iconMap[category.id]
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    "text-sidebar-foreground",
                  )}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0" />}
                  <span className="truncate">{category.nameZh}</span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* Submit Button */}
        <div className="border-t border-sidebar-border p-4">
          <Button onClick={onSubmitClick} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            提交网站
          </Button>
        </div>
      </div>
    </aside>
  )
}
