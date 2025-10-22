import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ErrorPageProps {
  searchParams: { error?: string }
}

export default function AuthErrorPage({ searchParams }: ErrorPageProps) {
  const error = searchParams.error || '未知错误'

  return (
    <MainLayout>
      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-destructive">认证错误</CardTitle>
            <CardDescription>
              处理您的请求时发生了错误
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-6">
              {error}
            </p>
            <div className="space-y-2">
              <Link href="/login">
                <Button className="w-full">
                  返回登录
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  返回首页
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}