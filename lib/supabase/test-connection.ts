import { createClient } from './client'

// 测试 Supabase 连接
export async function testSupabaseConnection() {
  try {
    const supabase = createClient()
    
    // 测试基本连接
    console.log('Testing Supabase connection...')
    
    // 先尝试最简单的查询
    const { data, error } = await supabase
      .from('categories')
      .select('id')
      .limit(1)
    
    if (error) {
      console.error('Supabase connection test failed:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      
      // 检查是否是权限问题
      if (error.message.includes('permission denied') || error.message.includes('401')) {
        return { 
          success: false, 
          error: `Permission denied. Please check RLS policies. Original error: ${error.message}`,
          isPermissionError: true
        }
      }
      
      return { success: false, error: error.message }
    }
    
    console.log('Supabase connection test successful')
    console.log('Sample data:', data)
    
    return { success: true, data }
  } catch (error) {
    console.error('Supabase connection test error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// 测试 ai_tools 表是否存在
export async function testAiToolsTable() {
  try {
    const supabase = createClient()
    
    console.log('Testing ai_tools table...')
    
    // 尝试查询 ai_tools 表
    const { data, error } = await supabase
      .from('ai_tools')
      .select('id')
      .limit(1)
    
    if (error) {
      console.error('ai_tools table test failed:', error)
      return { success: false, error: error.message }
    }
    
    console.log('ai_tools table test successful')
    console.log('Table exists, sample data:', data)
    
    return { success: true, data }
  } catch (error) {
    console.error('ai_tools table test error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}