-- 更新工具的预览图片
-- 在 Supabase Dashboard 的 SQL Editor 中执行

-- 1. 检查现有的图片 URL
SELECT name, name_zh, logo_url, image_url FROM ai_tools;

-- 2. 更新图片 URL（使用占位图片）
UPDATE ai_tools
SET 
  logo_url = '/placeholder-logo.svg',
  image_url = '/placeholder.jpg'
WHERE logo_url IS NULL OR image_url IS NULL OR logo_url = '' OR image_url = '';

-- 3. 为特定工具设置自定义图片
UPDATE ai_tools
SET 
  logo_url = CASE name
    WHEN 'ChatGPT' THEN '/tool-logos/chatgpt.svg'
    WHEN 'Claude' THEN '/tool-logos/claude.svg'
    WHEN 'Midjourney' THEN '/tool-logos/midjourney.svg'
    WHEN 'DALL·E' THEN '/tool-logos/dalle.svg'
    WHEN 'GitHub Copilot' THEN '/tool-logos/github-copilot.svg'
    WHEN 'Notion AI' THEN '/tool-logos/notion.svg'
    WHEN 'Perplexity AI' THEN '/tool-logos/perplexity.svg'
    WHEN 'Runway' THEN '/tool-logos/runway.svg'
    ELSE '/placeholder-logo.svg'
  END,
  image_url = CASE name
    WHEN 'ChatGPT' THEN '/tool-previews/chatgpt.jpg'
    WHEN 'Claude' THEN '/tool-previews/claude.jpg'
    WHEN 'Midjourney' THEN '/tool-previews/midjourney.jpg'
    WHEN 'DALL·E' THEN '/tool-previews/dalle.jpg'
    WHEN 'GitHub Copilot' THEN '/tool-previews/github-copilot.jpg'
    ELSE '/placeholder.jpg'
  END
WHERE TRUE;

-- 4. 验证更新
SELECT 
  name,
  name_zh,
  logo_url,
  image_url,
  website_url
FROM ai_tools
ORDER BY created_at DESC;

-- 5. 检查是否有空值
SELECT 
  COUNT(*) as total_tools,
  COUNT(logo_url) as tools_with_logo,
  COUNT(image_url) as tools_with_image
FROM ai_tools;