import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface WebsitePreviewProps {
  url: string
  title?: string
  className?: string
}

export function WebsitePreview({ url, title, className }: WebsitePreviewProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            网站预览
          </CardTitle>
          <Button asChild size="sm" variant="outline" className="gap-2">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              访问网站
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg border">
            <Image
              src="/placeholder.jpg"
              alt={`${title || '网站'}预览图`}
              width={1280}
              height={720}
              className="w-full h-auto max-h-96 object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>网站预览图</span>
            <span className="text-xs">点击"访问网站"按钮查看完整网站</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}