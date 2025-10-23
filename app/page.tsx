"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/main-layout"
import { ToolCard } from "@/components/tool-card"
import { SectionHeader } from "@/components/section-header"
import { getHotTools, getNewTools, getActiveTools } from "@/lib/supabase/ai-tools"
import { getCategories } from "@/lib/supabase/categories"
import { testSupabaseConnection, testAiToolsTable } from "@/lib/supabase/test-connection"
import { mockTools, categories as mockCategories } from "@/lib/mock-data"
import type { Tool, Category } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  const [hotTools, setHotTools] = useState<Tool[]>([])
  const [newTools, setNewTools] = useState<Tool[]>([])
  const [allTools, setAllTools] = useState<Tool[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        // 先测试连接
        console.log('Testing Supabase connection...')
        const connectionTest = await testSupabaseConnection()
        if (!connectionTest.success) {
          if (connectionTest.isPermissionError) {
            throw new Error(`RLS权限问题: ${connectionTest.error}\n\n请执行以下步骤修复:\n1. 在 Supabase Dashboard 中打开 SQL Editor\n2. 执行 docs/fix-rls-policies.sql 中的 SQL 语句\n3. 刷新页面重试`)
          }
          throw new Error(`Connection test failed: ${connectionTest.error}`)
        }

        // 测试 ai_tools 表
        console.log('Testing ai_tools table...')
        const tableTest = await testAiToolsTable()
        if (!tableTest.success) {
          throw new Error(`ai_tools table test failed: ${tableTest.error}`)
        }

        // 并行获取数据
        console.log('Fetching data from Supabase...')
        const [hotToolsData, newToolsData, allToolsData, categoriesData] = await Promise.all([
          getHotTools(),
          getNewTools(),
          getActiveTools(),
          getCategories()
        ])

        setHotTools(hotToolsData)
        setNewTools(newToolsData)
        setAllTools(allToolsData)
        setCategories(categoriesData)
      } catch (err) {
        console.error('Failed to fetch data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load data')
        
        // 使用模拟数据作为后备
        const hotToolsFallback = mockTools.filter((tool) => tool.isHot)
        const newToolsFallback = mockTools.filter((tool) => tool.isNew)
        setHotTools(hotToolsFallback)
        setNewTools(newToolsFallback)
        setAllTools(mockTools)
        setCategories(mockCategories)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-8 py-8 max-w-7xl">
          {/* 热门工具加载骨架 */}
          <section className="mb-12">
            <SectionHeader title="热门工具" icon="hot" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </section>

          {/* 最新收录加载骨架 */}
          <section className="mb-12">
            <SectionHeader title="最新收录" icon="new" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-8 py-8 max-w-7xl">
        {/* 错误提示 */}
        {error && (
          <div className="mb-8 rounded-lg bg-yellow-50 border border-yellow-200 p-4">
            <p className="text-yellow-800 text-sm">
              ⚠️ 数据加载失败，正在使用缓存数据: {error}
            </p>
          </div>
        )}

        {/* Hot Tools Section */}
        <section className="mb-12">
          <SectionHeader title="热门工具" icon="hot" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {hotTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Latest Additions Section */}
        <section className="mb-12">
          <SectionHeader title="最新收录" icon="new" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {newTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Category Sections */}
        {categories.map((category) => {
          const categoryTools = allTools.filter((tool) => tool.category === category.id)

          if (categoryTools.length === 0) return null

          return (
            <section key={category.id} id={`category-${category.id}`} className="mb-12 scroll-mt-20">
              <SectionHeader title={category.nameZh} />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categoryTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </MainLayout>
  )
}
