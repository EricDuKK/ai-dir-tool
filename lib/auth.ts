import { createClient } from '@/lib/supabase/server'
import type { User } from "./types"

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  return {
    id: user.id,
    username: user.user_metadata?.username || user.email?.split('@')[0] || '',
    email: user.email || '',
    avatar: user.user_metadata?.avatar_url || '/placeholder.svg?height=40&width=40',
    createdAt: user.created_at,
  }
}
