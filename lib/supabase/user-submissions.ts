import { createClient } from '@/lib/supabase/client'
import type { Submission } from '@/lib/types'

export async function getUserSubmissions(userId: string): Promise<Submission[]> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('user_submissions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user submissions:', error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('getUserSubmissions error:', error)
    throw error
  }
}

export async function submitTool(formData: {
  toolName: string
  toolNameZh: string
  toolDescription: string
  toolDescriptionZh: string
  toolUrl: string
  toolLogo: string
  toolImage: string
  slug: string
  userId: string
}): Promise<{ success: boolean; error?: string; data?: any[] }> {
  console.log('submitTool called with:', formData)
  console.log('User ID:', formData.userId)
  
  try {
    const supabase = createClient()
    console.log('Supabase client created successfully')
    
    // 为潜在卡顿的请求添加超时保护
    const withTimeout = async <T>(promise: Promise<T>, label: string, ms = 10000): Promise<T> => {
      return await Promise.race([
        promise,
        new Promise<T>((_, reject) => {
          setTimeout(() => reject(new Error(`操作超时: ${label} 超过 ${ms}ms`)), ms)
        })
      ])
    }
    
    // 注意：此处不再调用 auth.getUser，避免在某些网络环境下 gotrue 请求超时
    // 直接相信从页面传入的 userId（已在页面端取自会话）
    
    // 调用内部 API，避免浏览器直连 Supabase 引发的 CORS/预检/网络限制问题
    console.log('Calling internal API /api/user-submissions ...')
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)

    const response = await fetch('/api/user-submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      signal: controller.signal,
    })
    clearTimeout(timeout)

    const result = await response.json()
    console.log('Internal API result:', result)

    if (!response.ok || !result?.success) {
      return { success: false, error: result?.error || '提交失败' }
    }

    return { success: true, data: result?.data }
  } catch (error) {
    console.error('submitTool exception:', error)
    console.error('Error type:', typeof error)
    console.error('Error name:', error instanceof Error ? error.name : 'unknown')
    console.error('Error message:', error instanceof Error ? error.message : String(error))
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    return {
      success: false,
      error: `提交失败: ${error instanceof Error ? error.message : String(error)}`
    }
  }
}