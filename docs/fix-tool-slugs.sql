-- 修复工具的 slug
-- 在 Supabase Dashboard 的 SQL Editor 中执行

-- 1. 检查现有的 slug
SELECT name, name_zh, slug FROM ai_tools;

-- 2. 更新特定工具的 slug（如果需要）
UPDATE ai_tools
SET slug = CASE name
  WHEN 'ChatGPT' THEN 'chatgpt'
  WHEN 'Claude' THEN 'claude'
  WHEN 'Midjourney' THEN 'midjourney'
  WHEN 'DALL·E' THEN 'dalle'
  WHEN 'Runway' THEN 'runway'
  WHEN 'GitHub Copilot' THEN 'github-copilot'
  WHEN 'Figma AI' THEN 'figma-ai'
  WHEN 'Murf AI' THEN 'murf-ai'
  WHEN 'Perplexity AI' THEN 'perplexity-ai'
  WHEN 'Notion AI' THEN 'notion-ai'
  ELSE LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g'))
END
WHERE TRUE;

-- 3. 验证更新
SELECT name, name_zh, slug, website_url
FROM ai_tools
ORDER BY created_at DESC;