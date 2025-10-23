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
}): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()
    
    // 检查 slug 是否已存在
    const { data: existingTool } = await supabase
      .from('ai_tools')
      .select('id')
      .eq('slug', formData.slug)
      .single()

    if (existingTool) {
      return {
        success: false,
        error: '该URL标识已被使用，请选择其他标识'
      }
    }

    // 检查用户提交中是否已有相同 slug
    const { data: existingSubmission } = await supabase
      .from('user_submissions')
      .select('id')
      .eq('slug', formData.slug)
      .single()

    if (existingSubmission) {
      return {
        success: false,
        error: '该URL标识已被使用，请选择其他标识'
      }
    }

    const { data, error } = await supabase
      .from('user_submissions')
      .insert({
        user_id: formData.userId,
        tool_name: formData.toolName,
        tool_name_zh: formData.toolNameZh,
        tool_description: formData.toolDescription,
        tool_description_zh: formData.toolDescriptionZh,
        tool_url: formData.toolUrl,
        tool_logo: formData.toolLogo,
        tool_image: formData.toolImage,
        slug: formData.slug,
        status: 'pending'
      })
      .select()

    if (error) {
      console.error('Error submitting tool:', error)
      
      // 提供更具体的错误信息
      if (error.message.includes('permission denied')) {
        return {
          success: false,
          error: '权限不足，请检查您的登录状态'
        }
      }
      
      if (error.message.includes('duplicate key')) {
        return {
          success: false,
          error: '该URL标识已被使用，请选择其他标识'
        }
      }
      
      return {
        success: false,
        error: error.message
      }
    }

    console.log('Tool submitted successfully:', data)
    return { success: true }
  } catch (error) {
    console.error('submitTool error:', error)
    return {
      success: false,
      error: '提交失败，请重试'
    }
  }
}