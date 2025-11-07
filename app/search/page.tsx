"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { MainLayout } from "@/components/main-layout"
import { ToolCard } from "@/components/tool-card"
import { mockTools } from "@/lib/mock-data"
import { Search } from "lucide-react"
import { useMemo } from "react"

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const searchResults = useMemo(() => {
    if (!query.trim()) return []

    const lowerQuery = query.toLowerCase()

    return mockTools.filter((tool) => {
      return (
        tool.nameZh.toLowerCase().includes(lowerQuery) ||
        tool.name.toLowerCase().includes(lowerQuery) ||
        tool.descriptionZh.toLowerCase().includes(lowerQuery) ||
        tool.description.toLowerCase().includes(lowerQuery) ||
        tool.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
      )
    })
  }, [query])

  return (
    <MainLayout>
      <div className="container mx-auto px-8 py-8 max-w-7xl">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Search className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">搜索结果</h1>
          </div>
          <p className="text-muted-foreground">
            搜索 "<span className="font-semibold text-foreground">{query}</span>" 找到 {searchResults.length} 个结果
          </p>
        </div>

        {/* Search Results */}
        {searchResults.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">未找到相关工具</h2>
            <p className="text-muted-foreground text-center max-w-md">
              尝试使用不同的关键词，或浏览我们的分类查找您需要的AI工具
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {searchResults.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <MainLayout>
        <div className="container mx-auto px-8 py-8 max-w-7xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">搜索结果</h1>
            </div>
            <p className="text-muted-foreground">加载中...</p>
          </div>
        </div>
      </MainLayout>
    }>
      <SearchResults />
    </Suspense>
  )
}
