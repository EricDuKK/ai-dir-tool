-- 快速修复 RLS 问题 - 临时解决方案
-- 在 Supabase Dashboard 的 SQL Editor 中执行以下语句

-- 1. 临时禁用 RLS（仅用于开发环境）
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE ai_tools DISABLE ROW LEVEL SECURITY;

-- 2. 验证修改
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('categories', 'ai_tools');

-- 3. 测试查询
SELECT COUNT(*) as categories_count FROM categories;
SELECT COUNT(*) as ai_tools_count FROM ai_tools;

-- 注意：生产环境请使用正确的 RLS 策略而不是禁用 RLS