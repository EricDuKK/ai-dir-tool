-- 修复 RLS 策略，允许匿名用户访问数据
-- 这个脚本需要您在 Supabase Dashboard 的 SQL Editor 中执行

-- 1. 修复 categories 表的 RLS 策略
-- 删除现有的限制性策略
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
DROP POLICY IF EXISTS "Only admins can modify categories" ON categories;

-- 创建新的策略：所有人都可以查看分类
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

-- 创建新的策略：所有人都可以查看分类（更宽松的版本）
CREATE POLICY "Public read access for categories" ON categories
  FOR SELECT USING (true);

-- 2. 修复 ai_tools 表的 RLS 策略
-- 删除现有的限制性策略
DROP POLICY IF EXISTS "Active tools are viewable by everyone" ON ai_tools;
DROP POLICY IF EXISTS "Admins can view all tools" ON ai_tools;
DROP POLICY IF EXISTS "Only admins can modify tools" ON ai_tools;

-- 创建新的策略：所有人都可以查看活跃的工具
CREATE POLICY "Public read access for active tools" ON ai_tools
  FOR SELECT USING (status = 'active');

-- 3. 确保 RLS 已启用但策略正确
-- 检查当前策略
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('categories', 'ai_tools');

-- 4. 测试查询（可选）
-- 这些查询应该能够成功执行
SELECT COUNT(*) FROM categories;
SELECT COUNT(*) FROM ai_tools WHERE status = 'active';

-- 5. 如果需要完全禁用 RLS（仅用于开发环境）
-- 注意：生产环境不推荐这样做
-- ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE ai_tools DISABLE ROW LEVEL SECURITY;