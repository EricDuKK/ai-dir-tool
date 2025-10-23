-- 测试提交功能修复
-- 验证 RLS 策略是否正确设置

-- 1. 检查表是否存在
SELECT 
  table_name,
  CASE WHEN table_name = 'user_submissions' THEN '✅ 存在' ELSE '❌ 不存在' END as status
FROM information_schema.tables 
WHERE table_name IN ('user_submissions', 'ai_tools')
AND table_schema = 'public';

-- 2. 检查 RLS 策略
SELECT 
  tablename,
  policyname,
  cmd,
  CASE WHEN qual = 'true' THEN '✅ 公开访问' ELSE '⚠️ 受限访问' END as access_level
FROM pg_policies 
WHERE tablename IN ('user_submissions', 'ai_tools')
ORDER BY tablename, policyname;

-- 3. 测试查询权限
-- 测试 ai_tools 查询
SELECT 'ai_tools 查询测试' as test_name, COUNT(*) as record_count
FROM ai_tools 
WHERE slug = 'doubao';

-- 4. 检查 user_submissions 表结构
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'user_submissions'
ORDER BY ordinal_position;

-- 5. 验证索引
SELECT 
  indexname,
  tablename,
  indexdef
FROM pg_indexes 
WHERE tablename = 'user_submissions';