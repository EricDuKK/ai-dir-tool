import { createClient } from '@/lib/supabase/client'

export async function testSupabaseConnection() {
  try {
    const supabase = createClient()
    
    // 测试基本连接
    const { data, error } = await supabase
      .from('categories')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('Supabase connection test failed:', error)
      return {
        success: false,
        error: error.message,
        isPermissionError: error.message.includes('permission denied')
      }
    }
    
    console.log('Supabase connection test successful')
    return { success: true }
  } catch (error) {
    console.error('Supabase connection test error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function testUserSubmissionsTable() {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('user_submissions')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('user_submissions table test failed:', error)
      return {
        success: false,
        error: error.message
      }
    }
    
    console.log('user_submissions table test successful')
    return { success: true }
  } catch (error) {
    console.error('user_submissions table test error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function testAiToolsTable() {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('ai_tools')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('ai_tools table test failed:', error)
      return {
        success: false,
        error: error.message
      }
    }
    
    console.log('ai_tools table test successful')
    return { success: true }
  } catch (error) {
    console.error('ai_tools table test error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}