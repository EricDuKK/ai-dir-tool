import Link from "next/link"
import Image from "next/image"
import type { Tool } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ToolCardProps {
  tool: Tool
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tool/${tool.slug}`}>
      <Card className="group h-full transition-all hover:shadow-md hover:border-primary/50">
        <CardContent className="flex items-start gap-3 p-4">
          {/* Tool Logo */}
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
            <Image src={tool.logo || "/placeholder.svg"} alt={tool.nameZh} fill className="object-cover" />
          </div>

          {/* Tool Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                {tool.nameZh}
              </h3>
              {(tool.isHot || tool.isNew) && (
                <Badge variant={tool.isHot ? "default" : "secondary"} className="shrink-0 text-xs">
                  {tool.isHot ? "热门" : "新"}
                </Badge>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{tool.descriptionZh}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
