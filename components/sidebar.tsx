"use client"

import type React from "react"
import { useState, useEffect } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { getCategories, type Category } from "@/lib/supabase/categories"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PenSquare, ImageIcon, Video, FolderOpen, Bot, MessageSquare, Code, Palette, Music, Search, BookOpen, TrendingUp, BarChart3, DollarSign } from "lucide-react"

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
  education: BookOpen,      // 📚 教育工具
  marketing: TrendingUp,    // 📈 营销工具  
  analytics: BarChart3,    // 📊 数据分析
  finance: DollarSign,      // 💰 金融工具
}

interface SidebarProps {
  onCategoryClick?: (categoryId: string) => void
  onSubmitClick?: () => void
}

export function Sidebar({ onCategoryClick, onSubmitClick }: SidebarProps) {
  const pathname = usePathname()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 从数据库获取分类数据
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        setError(null)
        const data = await getCategories()
        setCategories(data)
      } catch (err) {
        console.error('Failed to fetch categories:', err)
        setError(err instanceof Error ? err.message : 'Failed to load categories')
        // 如果数据库连接失败，使用默认数据作为后备
        setCategories([
          { id: "writing", name: "AI Writing Tools", name_zh: "AI写作工具", icon: "✍️" },
          { id: "image", name: "AI Image Tools", name_zh: "AI图像工具", icon: "🖼️" },
          { id: "video", name: "AI Video Tools", name_zh: "AI视频工具", icon: "🎬" },
          { id: "office", name: "AI Office Tools", name_zh: "AI办公工具", icon: "📁" },
          { id: "agent", name: "AI Agents", name_zh: "AI智能体", icon: "🤖" },
          { id: "chat", name: "AI Chat Assistants", name_zh: "AI聊天助手", icon: "💬" },
          { id: "coding", name: "AI Coding Tools", name_zh: "AI编程工具", icon: "💻" },
          { id: "design", name: "AI Design Tools", name_zh: "AI设计工具", icon: "🎨" },
          { id: "audio", name: "AI Audio Tools", name_zh: "AI音频工具", icon: "🎵" },
          { id: "search", name: "AI Search Engines", name_zh: "AI搜索引擎", icon: "🔍" },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

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
            {loading ? (
              // 加载状态
              <div className="space-y-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm"
                  >
                    <div className="h-4 w-4 shrink-0 animate-pulse rounded bg-muted" />
                    <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
                  </div>
                ))}
              </div>
            ) : error ? (
              // 错误状态
              <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground">
                <div className="h-4 w-4 shrink-0" />
                <span className="truncate">加载失败，使用默认数据</span>
              </div>
            ) : (
              // 正常状态
              categories.map((category) => {
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
                    <span className="truncate">{category.name_zh}</span>
                  </button>
                )
              })
            )}
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
