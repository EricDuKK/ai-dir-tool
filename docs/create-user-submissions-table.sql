-- 创建用户提交表
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

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_user_submissions_user_id ON user_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_submissions_status ON user_submissions(status);
CREATE INDEX IF NOT EXISTS idx_user_submissions_slug ON user_submissions(slug);
CREATE INDEX IF NOT EXISTS idx_user_submissions_created_at ON user_submissions(created_at);

-- 启用 RLS
ALTER TABLE user_submissions ENABLE ROW LEVEL SECURITY;

-- 创建 RLS 策略
-- 1. 所有用户都可以查看自己的提交
CREATE POLICY "Users can view their own submissions" ON user_submissions
  FOR SELECT USING (auth.uid() = user_id);

-- 2. 登录用户可以创建自己的提交
CREATE POLICY "Users can create their own submissions" ON user_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 3. 用户可以更新自己的待审核提交
CREATE POLICY "Users can update their own pending submissions" ON user_submissions
  FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');

-- 4. 管理员可以查看所有提交
CREATE POLICY "Admins can view all submissions" ON user_submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- 5. 管理员可以更新所有提交
CREATE POLICY "Admins can update all submissions" ON user_submissions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- 6. 管理员可以删除所有提交
CREATE POLICY "Admins can delete all submissions" ON user_submissions
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_submissions_updated_at 
  BEFORE UPDATE ON user_submissions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();