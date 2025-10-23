import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Tag } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { WebsitePreview } from "@/components/website-preview"
import { getToolBySlug } from "@/lib/supabase/ai-tools"
import { getCategories } from "@/lib/supabase/categories"
import { mockQAs } from "@/lib/mock-data" // 暂时保留 QA 数据

interface ToolDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { slug } = await params

  try {
    // 并行获取工具和分类数据
    const [tool, categories] = await Promise.all([
      getToolBySlug(slug),
      getCategories()
    ])

    if (!tool) {
      notFound()
    }

    const category = categories.find((c) => c.id === tool.category)
    const qas = mockQAs[tool.id] || [] // 暂时保留 QA 数据

    return (
      <MainLayout>
        <div className="container mx-auto px-8 py-8 max-w-5xl">
          {/* Website Preview */}
          <WebsitePreview 
            url={tool.url} 
            title={tool.nameZh}
            imageUrl={tool.imageUrl}
            className="mb-8"
          />

          {/* Tool Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                {/* Tool Logo */}
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border-2 border-border">
                  <Image src={tool.logoUrl || "/placeholder.svg"} alt={tool.nameZh} fill className="object-cover" />
                </div>

                {/* Tool Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">{tool.nameZh}</h1>
                      <p className="text-sm text-muted-foreground mb-3">{tool.name}</p>
                    </div>
                    <div className="flex gap-2">
                      {tool.isHot && (
                        <Badge variant="default" className="shrink-0">
                          热门
                        </Badge>
                      )}
                      {tool.isNew && (
                        <Badge variant="secondary" className="shrink-0">
                          最新
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-base text-foreground leading-relaxed mb-4">{tool.descriptionZh}</p>

                  {/* Category and Tags */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {category && (
                      <Badge variant="outline" className="gap-1">
                        <Tag className="h-3 w-3" />
                        {category.name_zh}
                      </Badge>
                    )}
                    {tool.tags?.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Visit Button */}
                  <Button asChild size="lg" className="gap-2">
                    <a href={tool.url} target="_blank" rel="noopener noreferrer">
                      访问工具
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tool Description */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>工具介绍</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-foreground leading-relaxed whitespace-pre-line">
                {tool.detailedIntroduction || tool.descriptionZh}
              </div>
              {tool.detailedIntroduction && (
                <>
                  <Separator className="my-4" />
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </>
              )}
            </CardContent>
          </Card>

          {/* Q&A Section */}
          {qas.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>常见问题</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {qas.map((qa, index) => (
                    <div key={qa.id}>
                      {index > 0 && <Separator className="mb-6" />}
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{qa.question}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{qa.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </MainLayout>
    )
  } catch (error) {
    console.error('Error loading tool details:', error)
    notFound()
  }
}