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
import { getSubmissions, addSubmission } from "@/lib/submissions"
import { categories, initializeMockSubmissions } from "@/lib/mock-data"
import type { Submission } from "@/lib/types"
import { LogOut, Clock, CheckCircle2, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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
    toolUrl: "",
    toolDescription: "",
    toolLogo: "",
    category: "",
  })

  useEffect(() => {
    const supabase = createClient()
    
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/login")
        return
      }
      setUser(user)
      initializeMockSubmissions(user.id)
      loadSubmissions()
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        router.push("/login")
        return
      }
      setUser(session.user)
    })

    return () => subscription.unsubscribe()
  }, [router])

  const loadSubmissions = () => {
    if (user) {
      const userSubmissions = getSubmissions(user.id)
      setSubmissions(userSubmissions)
    }
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    if (!formData.toolName || !formData.toolUrl || !formData.toolDescription || !formData.category) {
      toast({
        title: "提交失败",
        description: "请填写所有必填字段",
        variant: "destructive",
      })
      return
    }

    addSubmission({
      userId: user.id,
      toolName: formData.toolName,
      toolUrl: formData.toolUrl,
      toolDescription: formData.toolDescription,
      toolLogo: formData.toolLogo,
      category: formData.category,
    })

    toast({
      title: "提交成功",
      description: "您的工具已提交，等待审核",
    })

    setFormData({
      toolName: "",
      toolUrl: "",
      toolDescription: "",
      toolLogo: "",
      category: "",
    })

    loadSubmissions()
    setActiveTab("history")
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
                            <h3 className="font-semibold text-foreground">{submission.toolName}</h3>
                            {getStatusBadge(submission.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{submission.toolDescription}</p>
                          <a
                            href={submission.toolUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline"
                          >
                            {submission.toolUrl}
                          </a>
                          <p className="text-xs text-muted-foreground mt-2">
                            提交时间: {new Date(submission.submittedAt).toLocaleDateString("zh-CN")}
                          </p>
                          {submission.reviewNote && (
                            <p className="text-xs text-muted-foreground mt-1">审核备注: {submission.reviewNote}</p>
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
                      工具名称 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="toolName"
                      placeholder="请输入工具名称"
                      value={formData.toolName}
                      onChange={(e) => setFormData({ ...formData, toolName: e.target.value })}
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
                    <Label htmlFor="toolLogo">网站Logo</Label>
                    <Input
                      id="toolLogo"
                      type="url"
                      placeholder="https://example.com/logo.png"
                      value={formData.toolLogo}
                      onChange={(e) => setFormData({ ...formData, toolLogo: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">请输入Logo图片的URL地址（选填）</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">
                      工具分类 <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="请选择分类" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.nameZh}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="toolDescription">
                      工具描述 <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="toolDescription"
                      placeholder="请简要描述工具的功能和特点"
                      rows={4}
                      value={formData.toolDescription}
                      onChange={(e) => setFormData({ ...formData, toolDescription: e.target.value })}
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
