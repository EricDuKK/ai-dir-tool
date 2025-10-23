import { createClient } from './client'
import type { Tool } from '../types'

// 获取所有活跃的AI工具
export async function getActiveTools(): Promise<Tool[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('ai_tools')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching active tools:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      throw new Error(`Failed to fetch active tools: ${error.message}`)
    }

    if (!data || data.length === 0) {
      console.warn('No active tools found in database')
      return []
    }

    console.log('Found active tools:', data.length)

    // 转换数据格式以匹配 Tool 接口
    return data.map(tool => ({
      id: tool.id,
      name: tool.name,
      nameZh: tool.name_zh,
      slug: tool.slug,
      description: tool.description,
      descriptionZh: tool.description_zh,
      detailedIntroduction: tool.detailed_introduction || '',
      logoUrl: tool.logo_url || '',
      imageUrl: tool.image_url,
      category: tool.category_id,
      url: tool.website_url,
      isHot: tool.is_hot,
      isNew: tool.is_new,
      tags: tool.tags || [],
      viewCount: tool.view_count,
      likeCount: tool.like_count,
      createdAt: tool.created_at,
      updatedAt: tool.updated_at
    }))
  } catch (error) {
    console.error('Error in getActiveTools:', error)
    throw error
  }
}

// 获取热门工具
export async function getHotTools(): Promise<Tool[]> {
  try {
    const supabase = createClient()
    
    // 先尝试简单的查询，不包含关联表
    const { data, error } = await supabase
      .from('ai_tools')
      .select('*')
      .eq('status', 'active')
      .eq('is_hot', true)
      .order('view_count', { ascending: false })
      .limit(8)

    if (error) {
      console.error('Error fetching hot tools:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      throw new Error(`Failed to fetch hot tools: ${error.message}`)
    }

    if (!data || data.length === 0) {
      console.warn('No hot tools found in database')
      return []
    }

    console.log('Found hot tools:', data.length)

    return data.map(tool => ({
      id: tool.id,
      name: tool.name,
      nameZh: tool.name_zh,
      slug: tool.slug,
      description: tool.description,
      descriptionZh: tool.description_zh,
      detailedIntroduction: tool.detailed_introduction || '',
      logoUrl: tool.logo_url || '',
      imageUrl: tool.image_url,
      category: tool.category_id,
      url: tool.website_url,
      isHot: tool.is_hot,
      isNew: tool.is_new,
      tags: tool.tags || [],
      viewCount: tool.view_count,
      likeCount: tool.like_count,
      createdAt: tool.created_at,
      updatedAt: tool.updated_at
    }))
  } catch (error) {
    console.error('Error in getHotTools:', error)
    throw error
  }
}

// 获取最新工具
export async function getNewTools(): Promise<Tool[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('ai_tools')
      .select('*')
      .eq('status', 'active')
      .eq('is_new', true)
      .order('created_at', { ascending: false })
      .limit(8)

    if (error) {
      console.error('Error fetching new tools:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      throw new Error(`Failed to fetch new tools: ${error.message}`)
    }

    if (!data || data.length === 0) {
      console.warn('No new tools found in database')
      return []
    }

    console.log('Found new tools:', data.length)

    return data.map(tool => ({
      id: tool.id,
      name: tool.name,
      nameZh: tool.name_zh,
      slug: tool.slug,
      description: tool.description,
      descriptionZh: tool.description_zh,
      detailedIntroduction: tool.detailed_introduction || '',
      logoUrl: tool.logo_url || '',
      imageUrl: tool.image_url,
      category: tool.category_id,
      url: tool.website_url,
      isHot: tool.is_hot,
      isNew: tool.is_new,
      tags: tool.tags || [],
      viewCount: tool.view_count,
      likeCount: tool.like_count,
      createdAt: tool.created_at,
      updatedAt: tool.updated_at
    }))
  } catch (error) {
    console.error('Error in getNewTools:', error)
    throw error
  }
}

// 根据分类获取工具
export async function getToolsByCategory(categoryId: string): Promise<Tool[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('ai_tools')
    .select(`
      *,
      categories(name_zh, icon)
    `)
    .eq('status', 'active')
    .eq('category_id', categoryId)
    .order('view_count', { ascending: false })

  if (error) {
    console.error(`Error fetching tools for category ${categoryId}:`, error)
    throw error
  }

  return data.map(tool => ({
    id: tool.id,
    name: tool.name,
    nameZh: tool.name_zh,
    slug: tool.slug,
    description: tool.description,
    descriptionZh: tool.description_zh,
    detailedIntroduction: tool.detailed_introduction || '',
    logoUrl: tool.logo_url || '',
    imageUrl: tool.image_url,
    category: tool.category_id,
    url: tool.website_url,
    isHot: tool.is_hot,
    isNew: tool.is_new,
    tags: tool.tags || [],
    viewCount: tool.view_count,
    likeCount: tool.like_count,
    createdAt: tool.created_at,
    updatedAt: tool.updated_at
  }))
}

// 根据slug获取单个工具
export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('ai_tools')
    .select(`
      *,
      categories(name_zh, icon)
    `)
    .eq('status', 'active')
    .eq('slug', slug)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows found"
    console.error(`Error fetching tool with slug ${slug}:`, error)
    throw error
  }

  if (!data) return null

  return {
    id: data.id,
    name: data.name,
    nameZh: data.name_zh,
    slug: data.slug,
    description: data.description,
    descriptionZh: data.description_zh,
    detailedIntroduction: data.detailed_introduction || '',
    logoUrl: data.logo_url || '',
    imageUrl: data.image_url,
    category: data.category_id,
    url: data.website_url,
    isHot: data.is_hot,
    isNew: data.is_new,
    tags: data.tags || [],
    viewCount: data.view_count,
    likeCount: data.like_count,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  }
}

// 搜索工具
export async function searchTools(query: string): Promise<Tool[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('ai_tools')
    .select(`
      *,
      categories(name_zh, icon)
    `)
    .eq('status', 'active')
    .or(`name.ilike.%${query}%,name_zh.ilike.%${query}%,description.ilike.%${query}%,description_zh.ilike.%${query}%`)
    .order('view_count', { ascending: false })

  if (error) {
    console.error('Error searching tools:', error)
    throw error
  }

  return data.map(tool => ({
    id: tool.id,
    name: tool.name,
    nameZh: tool.name_zh,
    slug: tool.slug,
    description: tool.description,
    descriptionZh: tool.description_zh,
    detailedIntroduction: tool.detailed_introduction || '',
    logoUrl: tool.logo_url || '',
    imageUrl: tool.image_url,
    category: tool.category_id,
    url: tool.website_url,
    isHot: tool.is_hot,
    isNew: tool.is_new,
    tags: tool.tags || [],
    viewCount: tool.view_count,
    likeCount: tool.like_count,
    createdAt: tool.created_at,
    updatedAt: tool.updated_at
  }))
}

// 增加工具浏览次数
export async function incrementViewCount(toolId: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('ai_tools')
    .update({ view_count: supabase.raw('view_count + 1') })
    .eq('id', toolId)

  if (error) {
    console.error(`Error incrementing view count for tool ${toolId}:`, error)
    throw error
  }
}

// 增加工具点赞数
export async function incrementLikeCount(toolId: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('ai_tools')
    .update({ like_count: supabase.raw('like_count + 1') })
    .eq('id', toolId)

  if (error) {
    console.error(`Error incrementing like count for tool ${toolId}:`, error)
    throw error
  }
}