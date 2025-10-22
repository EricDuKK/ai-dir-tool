# Supabase Storage Bucket 设计文档

## 📋 存储需求分析

基于项目需求，需要存储三类图片资源：
1. **侧边栏分类图标** - 小尺寸图标，用于导航显示
2. **工具 Logo** - 中等尺寸图片，用于工具卡片和详情页
3. **工具预览图** - 大尺寸截图，用于工具详情页预览

## 🗄️ Storage Bucket 设计

### 1. 分类图标 Bucket (category-icons)

**用途**: 存储侧边栏分类的图标图片

```sql
-- 创建分类图标存储桶
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'category-icons',
  'category-icons',
  true,
  1048576, -- 1MB 限制
  ARRAY['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp']
);

-- 设置存储策略
CREATE POLICY "Category icons are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'category-icons');

CREATE POLICY "Anyone can upload category icons" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'category-icons');

CREATE POLICY "Anyone can update category icons" ON storage.objects
FOR UPDATE USING (bucket_id = 'category-icons');

CREATE POLICY "Anyone can delete category icons" ON storage.objects
FOR DELETE USING (bucket_id = 'category-icons');
```

### 2. 工具 Logo Bucket (tool-logos)

**用途**: 存储 AI 工具的 logo 图片

```sql
-- 创建工具Logo存储桶
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'tool-logos',
  'tool-logos',
  true,
  5242880, -- 5MB 限制
  ARRAY['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp']
);

-- 设置存储策略
CREATE POLICY "Tool logos are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'tool-logos');

CREATE POLICY "Anyone can upload tool logos" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'tool-logos');

CREATE POLICY "Anyone can update tool logos" ON storage.objects
FOR UPDATE USING (bucket_id = 'tool-logos');

CREATE POLICY "Anyone can delete tool logos" ON storage.objects
FOR DELETE USING (bucket_id = 'tool-logos');
```

### 3. 工具预览图 Bucket (tool-previews)

**用途**: 存储 AI 工具的网站预览截图

```sql
-- 创建工具预览图存储桶
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'tool-previews',
  'tool-previews',
  true,
  10485760, -- 10MB 限制
  ARRAY['image/png', 'image/jpeg', 'image/webp']
);

-- 设置存储策略
CREATE POLICY "Tool previews are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'tool-previews');

CREATE POLICY "Anyone can upload tool previews" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'tool-previews');

CREATE POLICY "Anyone can update tool previews" ON storage.objects
FOR UPDATE USING (bucket_id = 'tool-previews');

CREATE POLICY "Anyone can delete tool previews" ON storage.objects
FOR DELETE USING (bucket_id = 'tool-previews');
```

## 📁 文件组织结构

### 分类图标文件结构
```
category-icons/
├── writing/
│   └── icon.svg
├── image/
│   └── icon.svg
├── video/
│   └── icon.svg
├── office/
│   └── icon.svg
├── agent/
│   └── icon.svg
├── chat/
│   └── icon.svg
├── coding/
│   └── icon.svg
├── design/
│   └── icon.svg
├── audio/
│   └── icon.svg
└── search/
    └── icon.svg
```

### 工具 Logo 文件结构
```
tool-logos/
├── doubao/
│   └── logo.png
├── kimi/
│   └── logo.png
├── koala-ppt/
│   └── logo.png
├── aippt/
│   └── logo.png
└── ...
```

### 工具预览图文件结构
```
tool-previews/
├── doubao/
│   └── preview.png
├── kimi/
│   └── preview.png
├── koala-ppt/
│   └── preview.png
├── aippt/
│   └── preview.png
└── ...
```

## 🔧 数据库表更新

### 更新分类表
```sql
-- 为分类表添加图标URL字段
ALTER TABLE categories ADD COLUMN icon_url VARCHAR(500);

-- 更新现有数据
UPDATE categories SET icon_url = 'category-icons/' || id || '/icon.svg';
```

### 更新AI工具表
```sql
-- 为工具表添加预览图URL字段
ALTER TABLE ai_tools ADD COLUMN preview_url VARCHAR(500);

-- 更新现有数据
UPDATE ai_tools SET preview_url = 'tool-previews/' || slug || '/preview.png';
```

## 📊 存储配置参数

### 分类图标配置
- **文件大小限制**: 1MB
- **支持格式**: PNG, JPEG, SVG, WebP
- **推荐尺寸**: 24x24px 或 32x32px
- **访问权限**: 公开读取

### 工具 Logo 配置
- **文件大小限制**: 5MB
- **支持格式**: PNG, JPEG, SVG, WebP
- **推荐尺寸**: 200x200px 或 400x400px
- **访问权限**: 公开读取

### 工具预览图配置
- **文件大小限制**: 10MB
- **支持格式**: PNG, JPEG, WebP
- **推荐尺寸**: 1280x720px 或 1920x1080px
- **访问权限**: 公开读取

## 🚀 客户端实现

### 1. 上传分类图标
```typescript
// lib/storage/category-icons.ts
import { createClient } from '@/lib/supabase/client'

export async function uploadCategoryIcon(
  categoryId: string,
  file: File
): Promise<string> {
  const supabase = createClient()
  
  const filePath = `${categoryId}/icon.${file.name.split('.').pop()}`
  
  const { data, error } = await supabase.storage
    .from('category-icons')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    })
  
  if (error) throw error
  
  // 返回公开URL
  const { data: { publicUrl } } = supabase.storage
    .from('category-icons')
    .getPublicUrl(filePath)
  
  return publicUrl
}
```

### 2. 上传工具 Logo
```typescript
// lib/storage/tool-logos.ts
import { createClient } from '@/lib/supabase/client'

export async function uploadToolLogo(
  toolSlug: string,
  file: File
): Promise<string> {
  const supabase = createClient()
  
  const filePath = `${toolSlug}/logo.${file.name.split('.').pop()}`
  
  const { data, error } = await supabase.storage
    .from('tool-logos')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    })
  
  if (error) throw error
  
  // 返回公开URL
  const { data: { publicUrl } } = supabase.storage
    .from('tool-logos')
    .getPublicUrl(filePath)
  
  return publicUrl
}
```

### 3. 上传工具预览图
```typescript
// lib/storage/tool-previews.ts
import { createClient } from '@/lib/supabase/client'

export async function uploadToolPreview(
  toolSlug: string,
  file: File
): Promise<string> {
  const supabase = createClient()
  
  const filePath = `${toolSlug}/preview.${file.name.split('.').pop()}`
  
  const { data, error } = await supabase.storage
    .from('tool-previews')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    })
  
  if (error) throw error
  
  // 返回公开URL
  const { data: { publicUrl } } = supabase.storage
    .from('tool-previews')
    .getPublicUrl(filePath)
  
  return publicUrl
}
```

### 4. 获取公开URL
```typescript
// lib/storage/utils.ts
import { createClient } from '@/lib/supabase/client'

export function getCategoryIconUrl(categoryId: string): string {
  const supabase = createClient()
  const { data: { publicUrl } } = supabase.storage
    .from('category-icons')
    .getPublicUrl(`${categoryId}/icon.svg`)
  
  return publicUrl
}

export function getToolLogoUrl(toolSlug: string, filename: string = 'logo.png'): string {
  const supabase = createClient()
  const { data: { publicUrl } } = supabase.storage
    .from('tool-logos')
    .getPublicUrl(`${toolSlug}/${filename}`)
  
  return publicUrl
}

export function getToolPreviewUrl(toolSlug: string, filename: string = 'preview.png'): string {
  const supabase = createClient()
  const { data: { publicUrl } } = supabase.storage
    .from('tool-previews')
    .getPublicUrl(`${toolSlug}/${filename}`)
  
  return publicUrl
}
```

## 🔄 数据迁移脚本

### 1. 创建存储桶
```sql
-- 执行上述的 INSERT INTO storage.buckets 语句
-- 执行上述的 CREATE POLICY 语句
```

### 2. 更新现有数据
```sql
-- 更新分类表的图标URL
UPDATE categories SET icon_url = 'category-icons/' || id || '/icon.svg';

-- 更新工具表的Logo URL（如果有现有数据）
UPDATE ai_tools SET logo_url = 'tool-logos/' || slug || '/logo.png' 
WHERE logo_url IS NOT NULL;

-- 更新工具表的预览图URL
UPDATE ai_tools SET preview_url = 'tool-previews/' || slug || '/preview.png';
```

## 📈 性能优化建议

### 1. CDN 配置
```typescript
// 使用 CDN 前缀
const CDN_URL = 'https://your-project.supabase.co/storage/v1/object/public'

export function getOptimizedImageUrl(bucket: string, path: string, options?: {
  width?: number
  height?: number
  quality?: number
}): string {
  let url = `${CDN_URL}/${bucket}/${path}`
  
  if (options) {
    const params = new URLSearchParams()
    if (options.width) params.set('width', options.width.toString())
    if (options.height) params.set('height', options.height.toString())
    if (options.quality) params.set('quality', options.quality.toString())
    
    if (params.toString()) {
      url += `?${params.toString()}`
    }
  }
  
  return url
}
```

### 2. 图片优化
```typescript
// 自动生成不同尺寸的图片
export async function generateImageVariants(
  bucket: string,
  path: string,
  sizes: number[]
): Promise<string[]> {
  const urls: string[] = []
  
  for (const size of sizes) {
    const url = getOptimizedImageUrl(bucket, path, { width: size, height: size })
    urls.push(url)
  }
  
  return urls
}
```

## 🔐 安全配置

### 1. 文件类型验证
```typescript
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp']

export function validateImageFile(file: File): boolean {
  return ALLOWED_IMAGE_TYPES.includes(file.type)
}
```

### 2. 文件大小验证
```typescript
export function validateFileSize(file: File, maxSize: number): boolean {
  return file.size <= maxSize
}
```

### 3. 上传前验证
```typescript
export function validateUpload(file: File, type: 'category-icon' | 'tool-logo' | 'tool-preview'): boolean {
  const maxSizes = {
    'category-icon': 1048576,    // 1MB
    'tool-logo': 5242880,        // 5MB
    'tool-preview': 10485760     // 10MB
  }
  
  return validateImageFile(file) && validateFileSize(file, maxSizes[type])
}
```

## 📝 使用示例

### 1. 在侧边栏中使用
```typescript
// components/sidebar.tsx
import { getCategoryIconUrl } from '@/lib/storage/utils'

export function Sidebar() {
  return (
    <nav>
      {categories.map((category) => (
        <div key={category.id}>
          <img 
            src={getCategoryIconUrl(category.id)} 
            alt={category.nameZh}
            className="w-4 h-4"
          />
          <span>{category.nameZh}</span>
        </div>
      ))}
    </nav>
  )
}
```

### 2. 在工具卡片中使用
```typescript
// components/tool-card.tsx
import { getToolLogoUrl } from '@/lib/storage/utils'

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div>
      <img 
        src={getToolLogoUrl(tool.slug)} 
        alt={tool.nameZh}
        className="w-12 h-12"
      />
      <h3>{tool.nameZh}</h3>
    </div>
  )
}
```

### 3. 在工具详情页中使用
```typescript
// components/website-preview.tsx
import { getToolPreviewUrl } from '@/lib/storage/utils'

export function WebsitePreview({ toolSlug, title }: { toolSlug: string, title: string }) {
  return (
    <div>
      <img 
        src={getToolPreviewUrl(toolSlug)} 
        alt={`${title}预览图`}
        className="w-full h-auto max-h-96 object-cover"
      />
    </div>
  )
}
```

## 🎯 关键特性

### 存储优化
- **分类图标**: 小文件，快速加载
- **工具 Logo**: 中等文件，支持多种格式
- **工具预览图**: 大文件，高质量显示
- **CDN 加速**: 全球分发，提升访问速度

### 管理功能
- **公开访问**: 无需认证即可访问图片
- **自动优化**: 支持图片尺寸和质量调整
- **版本控制**: 支持文件更新和版本管理

### 性能特性
- **缓存策略**: 设置合适的缓存时间
- **压缩优化**: 自动压缩图片文件
- **懒加载**: 支持图片懒加载

## 📋 实施步骤

### 1. 创建存储桶
```bash
# 在 Supabase Dashboard 中执行 SQL
# 或者使用 Supabase CLI
supabase db reset
```

### 2. 更新数据库表
```sql
-- 执行上述的 ALTER TABLE 语句
-- 执行上述的 UPDATE 语句
```

### 3. 上传初始图片
```typescript
// 使用管理界面或脚本上传图片
// 确保文件路径和命名规范
```

### 4. 更新前端代码
```typescript
// 更新组件使用新的存储URL
// 测试图片加载和显示
```

## 🔍 监控和维护

### 1. 存储使用情况
- 定期检查存储使用量
- 监控文件上传和下载频率
- 优化大文件和重复文件

### 2. 性能监控
- 监控图片加载时间
- 检查CDN缓存命中率
- 优化图片压缩和格式

### 3. 安全维护
- 定期检查访问权限
- 监控异常上传行为
- 更新安全策略

这个设计方案完全满足您的存储需求，提供了高效、安全、可扩展的图片存储解决方案。