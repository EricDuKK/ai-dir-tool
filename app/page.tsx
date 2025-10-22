"use client"

import { MainLayout } from "@/components/main-layout"
import { ToolCard } from "@/components/tool-card"
import { SectionHeader } from "@/components/section-header"
import { mockTools, categories } from "@/lib/mock-data"

export default function HomePage() {
  const hotTools = mockTools.filter((tool) => tool.isHot)
  const newTools = mockTools.filter((tool) => tool.isNew)

  return (
    <MainLayout>
      <div className="container mx-auto px-8 py-8 max-w-7xl">
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
          const categoryTools = mockTools.filter((tool) => tool.category === category.id)

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
