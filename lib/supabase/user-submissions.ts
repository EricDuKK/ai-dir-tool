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
    console.log('submitTool called with:', formData)
    const supabase = createClient()
    console.log('Supabase client created successfully')
    
    // 检查 slug 是否已存在（使用更安全的查询方式）
    try {
      const { data: existingTool, error: toolError } = await supabase
        .from('ai_tools')
        .select('id')
        .eq('slug', formData.slug)
        .limit(1)

      if (toolError) {
        console.warn('Error checking ai_tools slug:', toolError)
        // 如果查询失败，继续执行，不阻止提交
      } else if (existingTool && existingTool.length > 0) {
        return {
          success: false,
          error: '该URL标识已被使用，请选择其他标识'
        }
      }
    } catch (error) {
      console.warn('Error checking ai_tools slug:', error)
      // 继续执行，不阻止提交
    }

    // 检查用户提交中是否已有相同 slug
    try {
      const { data: existingSubmission, error: submissionError } = await supabase
        .from('user_submissions')
        .select('id')
        .eq('slug', formData.slug)
        .limit(1)

      if (submissionError) {
        console.warn('Error checking user_submissions slug:', submissionError)
        // 如果查询失败，继续执行，不阻止提交
      } else if (existingSubmission && existingSubmission.length > 0) {
        return {
          success: false,
          error: '该URL标识已被使用，请选择其他标识'
        }
      }
    } catch (error) {
      console.warn('Error checking user_submissions slug:', error)
      // 继续执行，不阻止提交
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