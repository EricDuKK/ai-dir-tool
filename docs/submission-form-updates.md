# 提交新工具表单更新说明

## 修改内容

### 1. 新增字段
- ✅ **slug 字段**：用于生成 SEO 友好的 URL（如 `/tool/doubao`）
- ✅ **工具名称（中文）**：`toolNameZh` 字段
- ✅ **工具描述（中文）**：`toolDescriptionZh` 字段
- ✅ **工具预览图**：`toolImage` 字段

### 2. 移除字段
- ✅ **工具分类选择**：已移除，分类由管理员设置

### 3. 新增功能
- ✅ **Logo 上传组件**：上传到 `tool-logos` bucket
- ✅ **预览图上传组件**：上传到 `tool-previews` bucket
- ✅ **图片预览功能**：显示小缩略图和完整预览
- ✅ **图片删除功能**：可以删除已上传的图片

### 4. 数据库更新
- ✅ **user_submissions 表**：新增字段匹配表单
- ✅ **RLS 策略**：用户只能管理自己的提交，管理员有全部权限
- ✅ **Storage buckets**：创建 `tool-logos` 和 `tool-previews` 存储桶

## 文件修改列表

### 新增文件
- `components/file-upload.tsx` - 文件上传组件
- `lib/supabase/user-submissions.ts` - 用户提交数据访问层
- `docs/create-user-submissions-table.sql` - 创建用户提交表
- `docs/init-storage-buckets.sql` - 创建存储桶
- `docs/fix-storage-permissions.sql` - 修复存储权限
- `docs/temp-storage-fix.sql` - 临时快速修复
- `docs/test-user-submission.sql` - 测试脚本

### 修改文件
- `app/user/page.tsx` - 更新表单字段和逻辑
- `lib/types.ts` - 更新 Submission 接口

## 部署步骤

### 1. 执行数据库脚本
```sql
-- 1. 创建用户提交表
\i docs/create-user-submissions-table.sql

-- 2. 创建存储桶
\i docs/init-storage-buckets.sql

-- 3. 如果遇到权限问题，执行快速修复
\i docs/temp-storage-fix.sql
```

### 2. 验证功能
```sql
-- 测试数据库连接
\i docs/test-user-submission.sql
```

### 3. 测试上传功能
1. 访问 `http://localhost:3000/user?tab=submit`
2. 填写表单信息
3. 上传 Logo 和预览图
4. 检查图片预览是否正常显示
5. 测试删除功能
6. 提交表单

## 注意事项

### Storage 权限问题
如果遇到 `ERROR: 42501: must be owner of table objects` 错误：

1. **快速修复**：执行 `docs/temp-storage-fix.sql`
2. **手动设置**：在 Supabase Dashboard 中手动设置 Storage 权限
3. **联系管理员**：如果是生产环境，联系 Supabase 项目管理员

### 字段映射
- `tool_logo` → `ai_tools.logo_url`
- `tool_image` → `ai_tools.image_url`
- `slug` → 用于生成工具详情页 URL

### 权限设置
- **用户**：只能查看和管理自己的提交
- **管理员**：可以查看和管理所有提交
- **公开访问**：存储桶内容对所有人可见

## 测试检查清单

- [ ] 表单字段完整显示
- [ ] Logo 上传功能正常
- [ ] 预览图上传功能正常
- [ ] 图片预览显示正确
- [ ] 图片删除功能正常
- [ ] 表单提交成功
- [ ] 数据库记录正确创建
- [ ] 提交历史正确显示