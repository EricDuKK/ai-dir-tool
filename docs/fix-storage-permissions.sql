-- 修复 Storage 权限问题
-- 如果遇到 "must be owner of table objects" 错误，请使用此脚本

-- 1. 确保存储桶存在且为公开
UPDATE storage.buckets 
SET public = true 
WHERE id IN ('tool-logos', 'tool-previews', 'category-icons');

-- 2. 删除可能冲突的 RLS 策略
DROP POLICY IF EXISTS "Public buckets are viewable by everyone" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload to tool buckets" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can manage all storage" ON storage.objects;

-- 3. 重新创建简化的 RLS 策略
-- 允许所有人查看公开存储桶
CREATE POLICY "Public access to tool buckets" ON storage.objects
  FOR SELECT USING (bucket_id IN ('tool-logos', 'tool-previews', 'category-icons'));

-- 允许认证用户上传
CREATE POLICY "Authenticated upload to tool buckets" ON storage.objects
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' 
    AND bucket_id IN ('tool-logos', 'tool-previews')
  );

-- 允许认证用户删除
CREATE POLICY "Authenticated delete from tool buckets" ON storage.objects
  FOR DELETE USING (
    auth.role() = 'authenticated' 
    AND bucket_id IN ('tool-logos', 'tool-previews')
  );

-- 4. 验证存储桶设置
SELECT id, name, public, file_size_limit, allowed_mime_types
FROM storage.buckets
WHERE id IN ('tool-logos', 'tool-previews', 'category-icons');