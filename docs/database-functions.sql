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