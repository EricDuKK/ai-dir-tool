-- 测试用户提交功能
-- 请先执行 create-user-submissions-table.sql 和 init-storage-buckets.sql

-- 1. 检查表是否存在
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'user_submissions'
ORDER BY ordinal_position;

-- 2. 检查 RLS 策略
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'user_submissions';

-- 3. 检查存储桶
SELECT id, name, public, file_size_limit, allowed_mime_types
FROM storage.buckets
WHERE id IN ('tool-logos', 'tool-previews', 'category-icons');

-- 4. 检查存储 RLS 策略
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';

-- 5. 测试插入（需要先有用户登录）
-- 注意：这个测试需要用户已经登录
/*
INSERT INTO user_submissions (
  user_id,
  tool_name,
  tool_name_zh,
  tool_description,
  tool_description_zh,
  tool_url,
  tool_logo,
  tool_image,
  slug,
  status
) VALUES (
  auth.uid(),
  'Test Tool',
  '测试工具',
  'A test tool for development',
  '用于开发的测试工具',
  'https://example.com',
  'https://example.com/logo.png',
  'https://example.com/preview.png',
  'test-tool',
  'pending'
);
*/

-- 6. 检查插入结果
-- SELECT * FROM user_submissions WHERE user_id = auth.uid();