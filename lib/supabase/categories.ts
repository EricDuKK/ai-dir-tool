import { createClient } from '@/lib/supabase/client'

export interface Category {
  id: string
  name: string
  name_zh: string
  icon: string
  created_at?: string
  updated_at?: string
}

/**
 * 获取所有分类数据
 * 基于RLS策略，所有用户都可以查看分类
 */
export async function getCategories(): Promise<Category[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, name_zh, icon, created_at, updated_at')
    .order('id')
  
  if (error) {
    console.error('Error fetching categories:', error)
    throw new Error(`Failed to fetch categories: ${error.message}`)
  }
  
  return data || []
}

/**
 * 根据ID获取单个分类
 */
export async function getCategoryById(id: string): Promise<Category | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, name_zh, icon, created_at, updated_at')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching category:', error)
    return null
  }
  
  return data
}

/**
 * 获取分类及其工具数量统计
 */
export async function getCategoriesWithToolCount() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .rpc('get_categories_with_tool_count')
  
  if (error) {
    console.error('Error fetching categories with tool count:', error)
    throw new Error(`Failed to fetch categories with tool count: ${error.message}`)
  }
  
  return data || []
}

/**
 * 检查用户是否为管理员
 */
export async function isAdmin(): Promise<boolean> {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return false
  
  const { data, error } = await supabase
    .from('auth.users')
    .select('raw_user_meta_data')
    .eq('id', user.id)
    .single()
  
  if (error) {
    console.error('Error checking admin status:', error)
    return false
  }
  
  return data?.raw_user_meta_data?.role === 'admin'
}

/**
 * 创建新分类（仅管理员）
 */
export async function createCategory(category: Omit<Category, 'created_at' | 'updated_at'>): Promise<Category> {
  const supabase = createClient()
  
  // 检查管理员权限
  const admin = await isAdmin()
  if (!admin) {
    throw new Error('Unauthorized: Only admins can create categories')
  }
  
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single()
  
  if (error) {
    console.error('Error creating category:', error)
    throw new Error(`Failed to create category: ${error.message}`)
  }
  
  return data
}

/**
 * 更新分类（仅管理员）
 */
export async function updateCategory(id: string, updates: Partial<Category>): Promise<Category> {
  const supabase = createClient()
  
  // 检查管理员权限
  const admin = await isAdmin()
  if (!admin) {
    throw new Error('Unauthorized: Only admins can update categories')
  }
  
  const { data, error } = await supabase
    .from('categories')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating category:', error)
    throw new Error(`Failed to update category: ${error.message}`)
  }
  
  return data
}

/**
 * 删除分类（仅管理员）
 */
export async function deleteCategory(id: string): Promise<void> {
  const supabase = createClient()
  
  // 检查管理员权限
  const admin = await isAdmin()
  if (!admin) {
    throw new Error('Unauthorized: Only admins can delete categories')
  }
  
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting category:', error)
    throw new Error(`Failed to delete category: ${error.message}`)
  }
}