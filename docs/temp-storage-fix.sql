-- 临时快速修复 Storage 权限
-- 如果遇到权限问题，请先执行此脚本

-- 1. 确保存储桶存在
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('tool-logos', 'tool-logos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']),
  ('tool-previews', 'tool-previews', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']),
  ('category-icons', 'category-icons', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. 临时禁用 RLS 进行测试（仅用于开发环境）
-- 注意：生产环境请勿使用此方法
-- ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- 3. 或者创建最简单的公开访问策略
DROP POLICY IF EXISTS "Public access" ON storage.objects;
CREATE POLICY "Public access" ON storage.objects
  FOR ALL USING (true);

-- 4. 验证设置
SELECT 
  id, 
  name, 
  public, 
  file_size_limit,
  allowed_mime_types
FROM storage.buckets 
WHERE id IN ('tool-logos', 'tool-previews', 'category-icons');