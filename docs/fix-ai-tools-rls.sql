-- 修复 ai_tools 表的 RLS 问题
-- 解决 406 Not Acceptable 错误

-- 1. 检查 ai_tools 表结构
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'ai_tools'
ORDER BY ordinal_position;

-- 2. 检查现有 RLS 策略
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'ai_tools';

-- 3. 删除可能冲突的策略
DROP POLICY IF EXISTS "ai_tools_select_public" ON ai_tools;
DROP POLICY IF EXISTS "ai_tools_select_all" ON ai_tools;
DROP POLICY IF EXISTS "ai_tools_insert_authenticated" ON ai_tools;
DROP POLICY IF EXISTS "ai_tools_update_authenticated" ON ai_tools;
DROP POLICY IF EXISTS "ai_tools_delete_authenticated" ON ai_tools;

-- 4. 创建简化的 RLS 策略
-- 允许所有人查看 ai_tools 表
CREATE POLICY "ai_tools_select_public" ON ai_tools
  FOR SELECT USING (true);

-- 允许认证用户插入
CREATE POLICY "ai_tools_insert_authenticated" ON ai_tools
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 允许认证用户更新
CREATE POLICY "ai_tools_update_authenticated" ON ai_tools
  FOR UPDATE USING (auth.role() = 'authenticated');

-- 5. 验证策略
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'ai_tools';

-- 6. 测试查询
SELECT id, name, slug FROM ai_tools WHERE slug = 'doubao' LIMIT 1;