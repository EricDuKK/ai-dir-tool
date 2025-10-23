-- 修复 user_submissions 表的 RLS 问题
-- 解决 "permission denied for table users" 错误

-- 1. 检查表是否存在
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'user_submissions'
ORDER BY ordinal_position;

-- 2. 如果表不存在，创建它
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

-- 3. 创建索引
CREATE INDEX IF NOT EXISTS idx_user_submissions_user_id ON user_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_submissions_status ON user_submissions(status);
CREATE INDEX IF NOT EXISTS idx_user_submissions_slug ON user_submissions(slug);
CREATE INDEX IF NOT EXISTS idx_user_submissions_created_at ON user_submissions(created_at);

-- 4. 启用 RLS
ALTER TABLE user_submissions ENABLE ROW LEVEL SECURITY;

-- 5. 删除可能冲突的策略
DROP POLICY IF EXISTS "Users can view their own submissions" ON user_submissions;
DROP POLICY IF EXISTS "Users can create their own submissions" ON user_submissions;
DROP POLICY IF EXISTS "Users can update their own pending submissions" ON user_submissions;
DROP POLICY IF EXISTS "Admins can view all submissions" ON user_submissions;
DROP POLICY IF EXISTS "Admins can update all submissions" ON user_submissions;
DROP POLICY IF EXISTS "Admins can delete all submissions" ON user_submissions;

-- 6. 创建简化的 RLS 策略
-- 允许认证用户查看自己的提交
CREATE POLICY "user_submissions_select_own" ON user_submissions
  FOR SELECT USING (auth.uid() = user_id);

-- 允许认证用户插入自己的提交
CREATE POLICY "user_submissions_insert_own" ON user_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 允许认证用户更新自己的待审核提交
CREATE POLICY "user_submissions_update_own" ON user_submissions
  FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');

-- 7. 临时允许所有操作（仅用于测试）
-- 注意：生产环境请删除此策略
CREATE POLICY "user_submissions_all_access" ON user_submissions
  FOR ALL USING (true);

-- 8. 验证策略
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'user_submissions';