-- 初始化分类数据
-- 基于 supabase-sqls.mdc 中的设计

-- 创建分类表
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  name_zh VARCHAR(100) NOT NULL,
  icon VARCHAR(10) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入初始分类数据
INSERT INTO categories (id, name, name_zh, icon) VALUES
('writing', 'AI Writing Tools', 'AI写作工具', '✍️'),
('image', 'AI Image Tools', 'AI图像工具', '🖼️'),
('video', 'AI Video Tools', 'AI视频工具', '🎬'),
('office', 'AI Office Tools', 'AI办公工具', '📁'),
('agent', 'AI Agents', 'AI智能体', '🤖'),
('chat', 'AI Chat Assistants', 'AI聊天助手', '💬'),
('coding', 'AI Coding Tools', 'AI编程工具', '💻'),
('design', 'AI Design Tools', 'AI设计工具', '🎨'),
('audio', 'AI Audio Tools', 'AI音频工具', '🎵'),
('search', 'AI Search Engines', 'AI搜索引擎', '🔍')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_zh = EXCLUDED.name_zh,
  icon = EXCLUDED.icon,
  updated_at = NOW();

-- 启用 RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- 创建 RLS 策略：所有人都可以查看分类
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

-- 只有管理员可以修改分类
DROP POLICY IF EXISTS "Only admins can modify categories" ON categories;
CREATE POLICY "Only admins can modify categories" ON categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- 创建获取分类及其工具数量的函数
CREATE OR REPLACE FUNCTION get_categories_with_tool_count()
RETURNS TABLE (
  id VARCHAR(50),
  name VARCHAR(100),
  name_zh VARCHAR(100),
  icon VARCHAR(10),
  tool_count BIGINT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.name,
    c.name_zh,
    c.icon,
    COUNT(t.id) as tool_count,
    c.created_at,
    c.updated_at
  FROM categories c
  LEFT JOIN ai_tools t ON c.id = t.category_id AND t.status = 'active'
  GROUP BY c.id, c.name, c.name_zh, c.icon, c.created_at, c.updated_at
  ORDER BY c.id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 创建用户角色检查函数
CREATE OR REPLACE FUNCTION get_user_role(user_id UUID)
RETURNS TEXT AS $$
BEGIN
  RETURN (
    SELECT raw_user_meta_data->>'role' 
    FROM auth.users 
    WHERE id = user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 检查是否为管理员
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN get_user_role(user_id) = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;