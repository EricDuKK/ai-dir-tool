-- 创建 Storage buckets
-- 注意：这些操作需要在 Supabase Dashboard 中手动执行，因为 Storage 操作通常需要管理员权限

-- 1. 创建工具 Logo 存储桶
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'tool-logos',
  'tool-logos',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- 2. 创建工具预览图存储桶
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'tool-previews',
  'tool-previews',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- 3. 创建分类图标存储桶
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'category-icons',
  'category-icons',
  true,
  2097152, -- 2MB
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

-- 创建 Storage RLS 策略
-- 1. 任何人都可以查看公开的存储桶内容
CREATE POLICY "Public buckets are viewable by everyone" ON storage.objects
  FOR SELECT USING (bucket_id IN ('tool-logos', 'tool-previews', 'category-icons'));

-- 2. 登录用户可以上传文件到工具相关存储桶
CREATE POLICY "Authenticated users can upload to tool buckets" ON storage.objects
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' 
    AND bucket_id IN ('tool-logos', 'tool-previews')
  );

-- 3. 用户可以删除自己上传的文件
CREATE POLICY "Users can delete their own files" ON storage.objects
  FOR DELETE USING (
    auth.role() = 'authenticated' 
    AND bucket_id IN ('tool-logos', 'tool-previews')
    AND (storage.foldername(name))[1] = 'submissions'
  );

-- 4. 管理员可以管理所有存储桶
CREATE POLICY "Admins can manage all storage" ON storage.objects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );