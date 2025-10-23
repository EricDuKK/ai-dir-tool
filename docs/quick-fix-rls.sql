-- 快速修复所有 RLS 问题
-- 解决 403 Forbidden 和 406 Not Acceptable 错误

-- 1. 确保 user_submissions 表存在
CREATE TABLE IF NOT EXISTS user_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_name TEXT NOT NULL,
  tool_name_zh TEXT NOT NULL,
  tool_description TEXT NOT NULL,
  tool_description_zh TEXT NOT NULL,
  tool_url TEXT NOT NULL,
  tool_logo TEXT,
  tool_image TEXT,
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  review_note TEXT
);

-- 2. 创建索引
CREATE INDEX IF NOT EXISTS idx_user_submissions_user_id ON user_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_submissions_slug ON user_submissions(slug);

-- 3. 临时禁用 RLS 进行测试
ALTER TABLE user_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE ai_tools DISABLE ROW LEVEL SECURITY;

-- 4. 重新启用 RLS
ALTER TABLE user_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_tools ENABLE ROW LEVEL SECURITY;

-- 5. 创建最简单的公开访问策略
CREATE POLICY "user_submissions_public" ON user_submissions FOR ALL USING (true);
CREATE POLICY "ai_tools_public" ON ai_tools FOR ALL USING (true);

-- 6. 验证设置
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd
FROM pg_policies 
WHERE tablename IN ('user_submissions', 'ai_tools')
ORDER BY tablename, policyname;