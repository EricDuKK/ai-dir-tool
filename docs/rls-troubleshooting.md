# Supabase RLS 权限问题修复指南

## 🚨 问题描述

错误信息：`permission denied for table users` 或 `401 Unauthorized`

这表明 Supabase 的 Row Level Security (RLS) 策略阻止了匿名用户访问数据。

## 🔧 解决方案

### 方案 1：快速修复（开发环境）

在 Supabase Dashboard 的 SQL Editor 中执行：

```sql
-- 临时禁用 RLS（仅用于开发环境）
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE ai_tools DISABLE ROW LEVEL SECURITY;
```

### 方案 2：正确的 RLS 策略（推荐）

执行以下 SQL 语句创建正确的 RLS 策略：

```sql
-- 1. 删除现有策略
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
DROP POLICY IF EXISTS "Only admins can modify categories" ON categories;
DROP POLICY IF EXISTS "Active tools are viewable by everyone" ON ai_tools;
DROP POLICY IF EXISTS "Admins can view all tools" ON ai_tools;
DROP POLICY IF EXISTS "Only admins can modify tools" ON ai_tools;

-- 2. 创建新的公开读取策略
CREATE POLICY "Public read access for categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Public read access for active tools" ON ai_tools
  FOR SELECT USING (status = 'active');

-- 3. 验证策略
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('categories', 'ai_tools');
```

### 方案 3：检查表是否存在

如果表不存在，请先创建表：

```sql
-- 创建 categories 表
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  name_zh VARCHAR(100) NOT NULL,
  icon VARCHAR(10) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建 ai_tools 表
CREATE TABLE IF NOT EXISTS ai_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  name_zh VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  description_zh TEXT NOT NULL,
  detailed_introduction TEXT,
  logo_url VARCHAR(500),
  image_url TEXT NOT NULL,
  category_id VARCHAR(50) NOT NULL REFERENCES categories(id),
  website_url VARCHAR(500) NOT NULL,
  is_hot BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  tags TEXT[],
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔍 调试步骤

1. **检查环境变量**
   ```bash
   # 确保 .env.local 文件存在且包含正确的值
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. **检查 Supabase 项目设置**
   - 确保项目 URL 和 API 密钥正确
   - 检查项目是否处于活跃状态

3. **检查数据库表**
   - 在 Supabase Dashboard 的 Table Editor 中查看表是否存在
   - 检查表是否有数据

4. **检查 RLS 设置**
   - 在 Supabase Dashboard 的 Authentication > Policies 中查看 RLS 策略
   - 确保有正确的读取权限策略

## 🚀 验证修复

修复后，在浏览器控制台中应该看到：
- "Testing Supabase connection..." ✅
- "Supabase connection test successful" ✅
- "Testing ai_tools table..." ✅
- "ai_tools table test successful" ✅
- "Fetching data from Supabase..." ✅

## 📝 注意事项

- **开发环境**：可以临时禁用 RLS 进行快速测试
- **生产环境**：必须使用正确的 RLS 策略确保数据安全
- **权限最小化**：只授予必要的读取权限，避免过度授权