#!/usr/bin/env tsx

/**
 * Supabase 连接测试脚本
 * 用于诊断 Supabase 连接问题
 */

import { createClient } from '@supabase/supabase-js'

async function testSupabaseConnection() {
  console.log('🔍 测试 Supabase 连接...')
  
  // 检查环境变量
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  console.log('📋 环境变量检查:')
  console.log(`- NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✅ 已设置' : '❌ 未设置'}`)
  console.log(`- NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✅ 已设置' : '❌ 未设置'}`)
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ 缺少必要的环境变量')
    console.log('请检查您的 .env.local 文件是否包含:')
    console.log('- NEXT_PUBLIC_SUPABASE_URL')
    console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY')
    return
  }
  
  // 创建 Supabase 客户端
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  try {
    console.log('🌐 测试网络连接...')
    
    // 测试基本连接
    const { data, error } = await supabase
      .from('ai_tools')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('❌ Supabase 查询失败:', error.message)
      console.log('可能的原因:')
      console.log('1. Supabase URL 不正确')
      console.log('2. 网络连接问题')
      console.log('3. Supabase 服务不可用')
      console.log('4. RLS 策略问题')
    } else {
      console.log('✅ Supabase 连接成功!')
    }
    
  } catch (error) {
    console.error('❌ 网络连接失败:', error)
    console.log('可能的原因:')
    console.log('1. 网络连接问题')
    console.log('2. 防火墙阻止连接')
    console.log('3. DNS 解析问题')
    console.log('4. Supabase 服务不可用')
  }
  
  // 测试认证连接
  try {
    console.log('🔐 测试认证连接...')
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) {
      console.error('❌ 认证连接失败:', authError.message)
    } else {
      console.log('✅ 认证连接成功!')
      console.log(`用户状态: ${user ? '已登录' : '未登录'}`)
    }
  } catch (error) {
    console.error('❌ 认证连接异常:', error)
  }
}

// 运行测试
testSupabaseConnection().catch(console.error)