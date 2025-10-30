import { NextResponse } from 'next/server'
import { createClient as createServerSupabase } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabase()

    const {
      toolName,
      toolNameZh,
      toolDescription,
      toolDescriptionZh,
      toolUrl,
      toolLogo,
      toolImage,
      slug,
      userId,
    } = await request.json()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError) {
      return NextResponse.json({ success: false, error: `认证失败: ${authError.message}` }, { status: 401 })
    }
    if (!user) {
      return NextResponse.json({ success: false, error: '未登录' }, { status: 401 })
    }
    if (user.id !== userId) {
      return NextResponse.json({ success: false, error: '用户身份不匹配' }, { status: 403 })
    }

    const { data, error } = await supabase
      .from('user_submissions')
      .insert({
        user_id: user.id,
        tool_name: toolName,
        tool_name_zh: toolNameZh,
        tool_description: toolDescription,
        tool_description_zh: toolDescriptionZh,
        tool_url: toolUrl,
        tool_logo: toolLogo || '',
        tool_image: toolImage || '',
        slug,
        status: 'pending',
      })
      .select()

    if (error) {
      const msg = error.message || '未知错误'
      const code = (error as any).code || 'unknown'
      return NextResponse.json({ success: false, error: `${msg} (${code})` }, { status: 400 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    const message = error instanceof Error ? error.message : '内部错误'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}




