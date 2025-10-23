-- 初始化 ai_tools 表的示例数据
-- 在 Supabase Dashboard 的 SQL Editor 中执行

-- 清空现有数据（可选）
-- TRUNCATE TABLE ai_tools;

-- 插入示例数据
INSERT INTO ai_tools (
  id,
  name,
  name_zh,
  slug,
  description,
  description_zh,
  detailed_introduction,
  logo_url,
  image_url,
  category_id,
  website_url,
  is_hot,
  is_new,
  tags,
  view_count,
  like_count,
  status,
  created_at,
  updated_at
) VALUES
-- AI 写作工具
(
  gen_random_uuid(),
  'ChatGPT',
  'ChatGPT',
  'chatgpt',
  'ChatGPT is an advanced AI language model developed by OpenAI.',
  'ChatGPT 是由 OpenAI 开发的先进 AI 语言模型。',
  'ChatGPT can engage in conversations, answer questions, write content, and help with various tasks.',
  '/placeholder-logo.svg',
  '/placeholder.jpg',
  'writing',
  'https://chat.openai.com',
  true,
  false,
  ARRAY['AI', 'ChatBot', 'Writing', 'Language Model'],
  1000,
  500,
  'active',
  NOW() - INTERVAL '30 days',
  NOW()
),
(
  gen_random_uuid(),
  'Claude',
  'Claude',
  'claude',
  'Claude is an AI assistant created by Anthropic, known for its helpfulness and honesty.',
  'Claude 是 Anthropic 开发的 AI 助手，以其帮助性和诚实性著称。',
  'Claude excels in writing, analysis, math, and coding tasks while maintaining high ethical standards.',
  '/placeholder-logo.svg',
  '/placeholder.jpg',
  'writing',
  'https://claude.ai',
  true,
  true,
  ARRAY['AI', 'ChatBot', 'Writing', 'Analysis'],
  800,
  400,
  'active',
  NOW() - INTERVAL '7 days',
  NOW()
),

-- AI 图像工具
(
  gen_random_uuid(),
  'Midjourney',
  'Midjourney',
  'midjourney',
  'Midjourney is an AI-powered tool that generates high-quality images from text descriptions.',
  'Midjourney 是一款能根据文字描述生成高质量图像的 AI 工具。',
  'Create stunning artwork and illustrations using simple text prompts.',
  '/placeholder-logo.svg',
  '/placeholder.jpg',
  'image',
  'https://www.midjourney.com',
  true,
  false,
  ARRAY['AI', 'Image Generation', 'Art', 'Design'],
  1200,
  600,
  'active',
  NOW() - INTERVAL '60 days',
  NOW()
),
(
  gen_random_uuid(),
  'DALL·E',
  'DALL·E',
  'dalle',
  'DALL·E is an AI system by OpenAI that creates realistic images and art from natural language descriptions.',
  'DALL·E 是 OpenAI 开发的 AI 系统，可以根据自然语言描述创建逼真的图像和艺术作品。',
  'Generate, edit, and manipulate images using text commands.',
  '/placeholder-logo.svg',
  '/placeholder.jpg',
  'image',
  'https://labs.openai.com',
  true,
  false,
  ARRAY['AI', 'Image Generation', 'Art', 'OpenAI'],
  900,
  450,
  'active',
  NOW() - INTERVAL '45 days',
  NOW()
),

-- AI 视频工具
(
  gen_random_uuid(),
  'Runway',
  'Runway',
  'runway',
  'Runway is a creative suite powered by AI for video editing and generation.',
  'Runway 是一套由 AI 驱动的视频编辑和生成创意套件。',
  'Create and edit videos with AI-powered tools and effects.',
  '/placeholder-logo.svg',
  '/placeholder.jpg',
  'video',
  'https://runway.ml',
  true,
  true,
  ARRAY['AI', 'Video Editing', 'Creative Tools'],
  700,
  350,
  'active',
  NOW() - INTERVAL '15 days',
  NOW()
),

-- AI 编程工具
(
  gen_random_uuid(),
  'GitHub Copilot',
  'GitHub Copilot',
  'github-copilot',
  'GitHub Copilot is your AI pair programmer that helps you write better code faster.',
  'GitHub Copilot 是您的 AI 结对编程助手，帮助您更快地编写更好的代码。',
  'Get code suggestions and complete functions in real-time while coding.',
  '/placeholder-logo.svg',
  '/placeholder.jpg',
  'coding',
  'https://github.com/features/copilot',
  true,
  false,
  ARRAY['AI', 'Programming', 'Code Generation', 'Developer Tools'],
  1500,
  750,
  'active',
  NOW() - INTERVAL '90 days',
  NOW()
),

-- AI 设计工具
(
  gen_random_uuid(),
  'Figma AI',
  'Figma AI',
  'figma-ai',
  'Figma AI features help designers work faster and more creatively.',
  'Figma AI 功能帮助设计师更快速、更有创意地工作。',
  'Use AI to generate design variations, content, and layout suggestions.',
  '/placeholder-logo.svg',
  '/placeholder.jpg',
  'design',
  'https://www.figma.com',
  false,
  true,
  ARRAY['AI', 'Design', 'UI/UX', 'Collaboration'],
  600,
  300,
  'active',
  NOW() - INTERVAL '5 days',
  NOW()
),

-- AI 音频工具
(
  gen_random_uuid(),
  'Murf AI',
  'Murf AI',
  'murf-ai',
  'Murf AI is a text-to-speech platform with realistic AI voices.',
  'Murf AI 是一个具有逼真 AI 语音的文本转语音平台。',
  'Convert text to natural-sounding speech in multiple languages and voices.',
  '/placeholder-logo.svg',
  '/placeholder.jpg',
  'audio',
  'https://murf.ai',
  false,
  true,
  ARRAY['AI', 'Text-to-Speech', 'Voice Generation', 'Audio'],
  400,
  200,
  'active',
  NOW() - INTERVAL '3 days',
  NOW()
),

-- AI 搜索工具
(
  gen_random_uuid(),
  'Perplexity AI',
  'Perplexity AI',
  'perplexity-ai',
  'Perplexity AI is an AI-powered search engine that provides accurate and cited answers.',
  'Perplexity AI 是一个由 AI 驱动的搜索引擎，提供准确且有引用的答案。',
  'Get comprehensive answers to your questions with sources and citations.',
  '/placeholder-logo.svg',
  '/placeholder.jpg',
  'search',
  'https://www.perplexity.ai',
  true,
  true,
  ARRAY['AI', 'Search Engine', 'Research', 'Knowledge'],
  800,
  400,
  'active',
  NOW() - INTERVAL '10 days',
  NOW()
),

-- AI 办公工具
(
  gen_random_uuid(),
  'Notion AI',
  'Notion AI',
  'notion-ai',
  'Notion AI helps you write, brainstorm, edit, and summarize content right in your workspace.',
  'Notion AI 帮助您在工作区中写作、头脑风暴、编辑和总结内容。',
  'Enhance your productivity with AI-powered writing and organization tools.',
  '/placeholder-logo.svg',
  '/placeholder.jpg',
  'office',
  'https://www.notion.so',
  true,
  false,
  ARRAY['AI', 'Productivity', 'Writing', 'Organization'],
  1100,
  550,
  'active',
  NOW() - INTERVAL '40 days',
  NOW()
);

-- 验证插入的数据
SELECT 
  name,
  name_zh,
  category_id,
  is_hot,
  is_new,
  created_at
FROM ai_tools
ORDER BY created_at DESC;

-- 按分类统计工具数量
SELECT 
  c.name_zh as category_name,
  COUNT(*) as tool_count
FROM ai_tools t
JOIN categories c ON t.category_id = c.id
WHERE t.status = 'active'
GROUP BY c.id, c.name_zh
ORDER BY tool_count DESC;