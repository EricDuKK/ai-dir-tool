"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { getUserSubmissions, submitTool } from "@/lib/supabase/user-submissions"
import { testSupabaseConnection, testUserSubmissionsTable } from "@/lib/supabase/test-connection"
import type { Submission } from "@/lib/types"
import { LogOut, Clock, CheckCircle2, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { FileUpload } from "@/components/file-upload"

export default function UserCenterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "history")

  // Form state
  const [formData, setFormData] = useState({
    toolName: "",
    toolNameZh: "",
    toolUrl: "",
    toolDescription: "",
    toolDescriptionZh: "",
    toolLogo: "",
    toolImage: "",
    slug: "",
  })

  useEffect(() => {
    async function initializeUser() {
      try {
        // 首先测试 Supabase 连接
        console.log('Testing Supabase connection...')
        const connectionTest = await testSupabaseConnection()
        if (!connectionTest.success) {
          console.error('Supabase connection failed:', connectionTest.error)
          toast({
            title: "连接失败",
            description: `无法连接到数据库: ${connectionTest.error}`,
            variant: "destructive",
          })
          return
        }
        
        // 测试 user_submissions 表
        console.log('Testing user_submissions table...')
        const tableTest = await testUserSubmissionsTable()
        if (!tableTest.success) {
          console.error('user_submissions table test failed:', tableTest.error)
          toast({
            title: "表访问失败",
            description: `无法访问提交表: ${tableTest.error}`,
            variant: "destructive",
          })
          return
        }
        
        const supabase = createClient()
        
        // Get initial user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push("/login")
          return
        }
        setUser(user)
        
        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('Auth state changed:', event, session?.user?.id)
          if (!session?.user) {
            router.push("/login")
            return
          }
          setUser(session.user)
          // 当认证状态变化时，重新加载提交历史
          await loadSubmissionsForUser(session.user.id)
        })

        // 初始加载提交历史
        await loadSubmissionsForUser(user.id)

        return () => subscription.unsubscribe()
      } catch (error) {
        console.error('Error initializing user:', error)
        toast({
          title: "初始化失败",
          description: "无法初始化用户数据",
          variant: "destructive",
        })
      }
    }
    
    initializeUser()
  }, [router, toast])

  // 监听用户状态变化，重新加载提交历史
  useEffect(() => {
    if (user?.id) {
      console.log('User state changed, reloading submissions for:', user.id)
      loadSubmissionsForUser(user.id)
    }
  }, [user?.id])

  const loadSubmissionsForUser = async (userId: string) => {
    try {
      console.log('Loading submissions for user:', userId)
      const userSubmissions = await getUserSubmissions(userId)
      console.log('Loaded submissions:', userSubmissions.length)
      setSubmissions(userSubmissions)
    } catch (error) {
      console.error('Error loading submissions:', error)
      toast({
        title: "加载失败",
        description: "无法加载提交记录",
        variant: "destructive",
      })
    }
  }

  const loadSubmissions = async () => {
    if (user) {
      await loadSubmissionsForUser(user.id)
    }
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('Submit button clicked, form data:', formData)

    if (!user) {
      console.error('No user found')
      toast({
        title: "提交失败",
        description: "用户未登录",
        variant: "destructive",
      })
      return
    }

    if (!formData.toolName || !formData.toolNameZh || !formData.toolUrl || !formData.toolDescription || !formData.toolDescriptionZh || !formData.slug) {
      console.log('Missing required fields:', {
        toolName: formData.toolName,
        toolNameZh: formData.toolNameZh,
        toolUrl: formData.toolUrl,
        toolDescription: formData.toolDescription,
        toolDescriptionZh: formData.toolDescriptionZh,
        slug: formData.slug
      })
      toast({
        title: "提交失败",
        description: "请填写所有必填字段",
        variant: "destructive",
      })
      return
    }

    console.log('Starting tool submission...')
    
    try {
      console.log('Calling submitTool with user ID:', user.id)
      const result = await submitTool({
        toolName: formData.toolName,
        toolNameZh: formData.toolNameZh,
        toolDescription: formData.toolDescription,
        toolDescriptionZh: formData.toolDescriptionZh,
        toolUrl: formData.toolUrl,
        toolLogo: formData.toolLogo,
        toolImage: formData.toolImage,
        slug: formData.slug,
        userId: user.id,
      })

      console.log('Submit result:', result)
      console.log('Result type:', typeof result, 'Success:', result?.success)

      if (result.success) {
        toast({
          title: "提交成功",
          description: "您的工具已提交，等待审核",
        })

        // 乐观更新历史列表，避免手动刷新
        if ((result as any).data?.[0]) {
          const created = (result as any).data[0]
          setSubmissions((prev) => [created, ...prev])
        } else {
          // 如果没有返回数据，退化为主动刷新
          loadSubmissions()
        }

        setFormData({
          toolName: "",
          toolNameZh: "",
          toolUrl: "",
          toolDescription: "",
          toolDescriptionZh: "",
          toolLogo: "",
          toolImage: "",
          slug: "",
        })
        setActiveTab("history")
      } else {
        toast({
          title: "提交失败",
          description: result.error || "提交失败，请重试",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Submit error:', error)
      toast({
        title: "提交失败",
        description: `提交失败: ${error instanceof Error ? error.message : '未知错误'}`,
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: Submission["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            待审核
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="default" className="gap-1 bg-green-600">
            <CheckCircle2 className="h-3 w-3" />
            已通过
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            已拒绝
          </Badge>
        )
    }
  }

  if (!user) {
    return null
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-8 py-8 max-w-5xl">
        {/* User Header */}
        <Card className="mb-8">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{(user.user_metadata?.username || user.email?.split('@')[0] || 'U')[0].toUpperCase()}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{user.user_metadata?.username || user.email?.split('@')[0] || '用户'}</h1>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              退出登录
            </Button>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="history">提交历史</TabsTrigger>
            <TabsTrigger value="submit">提交工具</TabsTrigger>
            <TabsTrigger value="profile">个人信息</TabsTrigger>
          </TabsList>

          {/* Submission History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>我的提交</CardTitle>
              </CardHeader>
              <CardContent>
                {submissions.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">暂无提交记录</p>
                    <Button variant="link" onClick={() => setActiveTab("submit")} className="mt-2">
                      立即提交工具
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {submissions.map((submission) => (
                      <div
                        key={submission.id}
                        className="flex items-start justify-between rounded-lg border border-border p-4"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-foreground">{submission.tool_name_zh || submission.tool_name}</h3>
                            {getStatusBadge(submission.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{submission.tool_description_zh || submission.tool_description}</p>
                          <a
                            href={submission.tool_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline"
                          >
                            {submission.tool_url}
                          </a>
                          <p className="text-xs text-muted-foreground mt-2">
                            提交时间: {new Date(submission.created_at).toLocaleDateString("zh-CN")}
                          </p>
                          {submission.review_note && (
                            <p className="text-xs text-muted-foreground mt-1">审核备注: {submission.review_note}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submit Tool Tab */}
          <TabsContent value="submit">
            <Card>
              <CardHeader>
                <CardTitle>提交新工具</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="toolName">
                      工具名称（英文） <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="toolName"
                      placeholder="请输入工具英文名称"
                      value={formData.toolName}
                      onChange={(e) => setFormData({ ...formData, toolName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="toolNameZh">
                      工具名称（中文） <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="toolNameZh"
                      placeholder="请输入工具中文名称"
                      value={formData.toolNameZh}
                      onChange={(e) => setFormData({ ...formData, toolNameZh: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="toolUrl">
                      工具网址 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="toolUrl"
                      type="url"
                      placeholder="https://example.com"
                      value={formData.toolUrl}
                      onChange={(e) => setFormData({ ...formData, toolUrl: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">
                      URL标识 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="slug"
                      placeholder="doubao"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      required
                    />
                    <p className="text-xs text-muted-foreground">用于生成工具详情页URL，如：/tool/doubao</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUpload
                      bucket="tool-logos"
                      path="submissions"
                      label="工具Logo"
                      onUpload={(url) => setFormData({ ...formData, toolLogo: url })}
                      onRemove={() => setFormData({ ...formData, toolLogo: "" })}
                      previewUrl={formData.toolLogo}
                    />

                    <FileUpload
                      bucket="tool-previews"
                      path="submissions"
                      label="工具预览图"
                      onUpload={(url) => setFormData({ ...formData, toolImage: url })}
                      onRemove={() => setFormData({ ...formData, toolImage: "" })}
                      previewUrl={formData.toolImage}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="toolDescription">
                      工具描述（英文） <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="toolDescription"
                      placeholder="请简要描述工具的功能和特点（英文）"
                      rows={4}
                      value={formData.toolDescription}
                      onChange={(e) => setFormData({ ...formData, toolDescription: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="toolDescriptionZh">
                      工具描述（中文） <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="toolDescriptionZh"
                      placeholder="请简要描述工具的功能和特点（中文）"
                      rows={4}
                      value={formData.toolDescriptionZh}
                      onChange={(e) => setFormData({ ...formData, toolDescriptionZh: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    提交工具
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>个人信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>用户名</Label>
                  <Input value={user.user_metadata?.username || user.email?.split('@')[0] || ''} disabled />
                </div>
                <div className="space-y-2">
                  <Label>邮箱</Label>
                  <Input value={user.email} disabled />
                </div>
                <div className="space-y-2">
                  <Label>注册时间</Label>
                  <Input value={new Date(user.createdAt).toLocaleDateString("zh-CN")} disabled />
                </div>
                <p className="text-sm text-muted-foreground">个人信息修改功能即将上线</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
