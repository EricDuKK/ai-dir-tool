"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FileUploadProps {
  bucket: string
  path: string
  onUpload: (url: string) => void
  onRemove: () => void
  previewUrl?: string
  label: string
  accept?: string
  maxSize?: number // in MB
}

export function FileUpload({
  bucket,
  path,
  onUpload,
  onRemove,
  previewUrl,
  label,
  accept = "image/*",
  maxSize = 5
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(previewUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 检查文件大小
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "文件过大",
        description: `文件大小不能超过 ${maxSize}MB`,
        variant: "destructive",
      })
      return
    }

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      toast({
        title: "文件类型错误",
        description: "请选择图片文件",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      const supabase = createClient()
      
      // 生成唯一文件名
      const timestamp = Date.now()
      const fileExt = file.name.split('.').pop()
      const fileName = `${timestamp}.${fileExt}`
      const filePath = `${path}/${fileName}`

      // 上传文件到 Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (error) {
        console.error('Upload error:', error)
        throw error
      }

      // 获取公共URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      console.log('Upload successful:', { data, publicUrl })
      
      setPreview(publicUrl)
      onUpload(publicUrl)
      
      toast({
        title: "上传成功",
        description: "图片已成功上传",
      })

    } catch (error) {
      console.error('Upload failed:', error)
      toast({
        title: "上传失败",
        description: "图片上传失败，请重试",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = async () => {
    if (!preview) return

    try {
      const supabase = createClient()
      
      // 从URL中提取文件路径
      const url = new URL(preview)
      const pathParts = url.pathname.split('/')
      const bucketIndex = pathParts.findIndex(part => part === bucket)
      const filePath = pathParts.slice(bucketIndex + 1).join('/')
      
      console.log('Removing file:', { bucket, filePath })

      // 删除文件
      const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath])

      if (error) {
        console.error('Delete error:', error)
        throw error
      }

      console.log('File removed successfully')
      
      setPreview(null)
      onRemove()
      
      toast({
        title: "删除成功",
        description: "图片已删除",
      })

    } catch (error) {
      console.error('Delete failed:', error)
      toast({
        title: "删除失败",
        description: "图片删除失败，请重试",
        variant: "destructive",
      })
    }
  }

  const handleImageLoad = () => {
    console.log('Image loaded successfully')
  }

  const handleImageError = (error: any) => {
    console.error('Image load error:', error)
    toast({
      title: "图片加载失败",
      description: "无法显示图片预览",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
        <CardContent className="p-4">
          {preview ? (
            <div className="space-y-3">
              {/* 小缩略图预览 */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded border overflow-hidden bg-muted flex items-center justify-center">
                  <img
                    src={preview}
                    alt="预览"
                    className="h-full w-full object-cover"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">图片已上传</p>
                  <p className="text-xs text-muted-foreground">点击删除按钮可移除图片</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRemove}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                  删除
                </Button>
              </div>
              
              {/* 完整预览 */}
              <div className="border rounded-lg overflow-hidden">
                <img
                  src={preview}
                  alt="完整预览"
                  className="w-full h-32 object-cover"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                点击上传图片，或拖拽图片到此处
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                {isUploading ? "上传中..." : "选择图片"}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                支持 JPG、PNG、GIF 格式，最大 {maxSize}MB
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}