import type { Tool, Category, QA, Submission } from "./types"

export const categories: Category[] = [
  { id: "writing", name: "AI Writing Tools", nameZh: "AI写作工具", icon: "✍️" },
  { id: "image", name: "AI Image Tools", nameZh: "AI图像工具", icon: "🖼️" },
  { id: "video", name: "AI Video Tools", nameZh: "AI视频工具", icon: "🎬" },
  { id: "office", name: "AI Office Tools", nameZh: "AI办公工具", icon: "📁" },
  { id: "agent", name: "AI Agents", nameZh: "AI智能体", icon: "🤖" },
  { id: "chat", name: "AI Chat Assistants", nameZh: "AI聊天助手", icon: "💬" },
  { id: "coding", name: "AI Coding Tools", nameZh: "AI编程工具", icon: "💻" },
  { id: "design", name: "AI Design Tools", nameZh: "AI设计工具", icon: "🎨" },
  { id: "audio", name: "AI Audio Tools", nameZh: "AI音频工具", icon: "🎵" },
  { id: "search", name: "AI Search Engines", nameZh: "AI搜索引擎", icon: "🔍" },
]

export const mockTools: Tool[] = [
  {
    id: "1",
    name: "Doubao",
    nameZh: "豆包",
    slug: "doubao",
    description: "Free AI assistant with powerful capabilities",
    descriptionZh: "免费全能AI助手，功能强大",
    detailedIntroduction:
      "豆包是字节跳动推出的AI智能助手，基于云雀大模型开发。它能够进行自然流畅的对话交流，帮助用户解答问题、提供建议、辅助创作等。豆包支持多轮对话，能够理解上下文，提供更加精准的回答。\n\n豆包的核心优势在于其强大的中文理解能力和丰富的知识储备。无论是日常咨询、学习辅导、工作协助还是创意写作，豆包都能提供专业的帮助。它还支持代码生成、文档撰写、翻译等多种实用功能。\n\n作为免费工具，豆包为用户提供了高质量的AI服务体验，是个人和企业提升工作效率的得力助手。",
    logo: "/purple-chat-bot-icon.jpg",
    category: "chat",
    url: "https://doubao.com",
    isHot: true,
    createdAt: "2024-01-15",
    tags: ["chat", "free", "chinese"],
  },
  {
    id: "2",
    name: "Kimi",
    nameZh: "绘蛙",
    slug: "kimi",
    description: "AI image generation tool",
    descriptionZh: "AI电商营销工具，快速生成商品图",
    detailedIntroduction:
      "绘蛙是一款专为电商营销设计的AI图像生成工具。它能够快速生成高质量的商品展示图、促销海报、社交媒体配图等营销素材，大大提升电商运营效率。\n\n绘蛙的智能算法能够理解商品特点和营销需求，自动生成符合品牌调性的视觉设计。用户只需输入简单的描述或上传商品图片，即可获得多种风格的营销图片方案。工具内置了丰富的模板和设计元素，支持一键应用和自定义调整。\n\n对于电商从业者来说，绘蛙不仅节省了设计成本，还能快速响应营销活动需求，是提升店铺视觉吸引力的利器。",
    logo: "/orange-frog-icon.jpg",
    category: "image",
    url: "https://kimi.ai",
    isHot: true,
    createdAt: "2024-01-20",
    tags: ["image", "ecommerce"],
  },
  {
    id: "3",
    name: "Koala PPT",
    nameZh: "扣子PPT",
    slug: "koala-ppt",
    description: "Generate PPT presentations with AI",
    descriptionZh: "免费一键生成精美PPT",
    detailedIntroduction:
      "扣子PPT是一款革命性的AI演示文稿生成工具，能够根据用户输入的主题和大纲，自动生成结构完整、设计精美的PPT。它彻底改变了传统的PPT制作流程，让演示文稿制作变得简单高效。\n\n扣子PPT内置了数百套专业设计模板，涵盖商务汇报、教育培训、产品发布等多个场景。AI算法会根据内容自动选择合适的版式、配色和图表样式，确保每一页都具有专业水准。用户还可以通过简单的指令对生成的PPT进行调整和优化。\n\n无论是职场人士准备工作汇报，还是学生制作课程展示，扣子PPT都能在几分钟内生成高质量的演示文稿，大幅提升工作和学习效率。",
    logo: "/blue-koala-presentation-icon.jpg",
    category: "office",
    url: "https://koala.com",
    isHot: true,
    createdAt: "2024-02-01",
    tags: ["ppt", "presentation", "free"],
  },
  {
    id: "4",
    name: "AiPPT",
    nameZh: "AiPPT",
    slug: "aippt",
    description: "AI-powered presentation maker",
    descriptionZh: "AI快速生成高质量PPT",
    detailedIntroduction:
      "AiPPT是一款专业的AI驱动演示文稿制作平台，专注于为企业和个人用户提供高效的PPT生成服务。通过先进的自然语言处理技术，AiPPT能够理解用户的演讲意图，生成逻辑清晰、视觉出众的演示文稿。\n\nAiPPT的核心优势在于其智能内容组织能力。它不仅能生成美观的幻灯片，还能帮助用户梳理演讲思路，优化内容结构。平台提供了丰富的行业模板和设计元素，支持数据可视化、图表生成等高级功能。\n\n对于需要频繁制作演示文稿的用户，AiPPT提供了团队协作功能和素材库管理，让PPT制作更加系统化和专业化。",
    logo: "/purple-presentation-ai-icon.jpg",
    category: "office",
    url: "https://aippt.com",
    isHot: true,
    createdAt: "2024-02-05",
    tags: ["ppt", "ai"],
  },
  {
    id: "5",
    name: "Secret AI Search",
    nameZh: "秘塔AI搜索",
    slug: "secret-ai-search",
    description: "AI-powered search engine",
    descriptionZh: "超好用的AI搜索工具",
    detailedIntroduction:
      "秘塔AI搜索是新一代智能搜索引擎，它不仅能够快速检索信息，还能理解用户的搜索意图，提供深度整合的答案。与传统搜索引擎不同，秘塔AI搜索会对搜索结果进行智能分析和总结，直接呈现最有价值的信息。\n\n秘塔AI搜索的核心技术包括语义理解、知识图谱和大语言模型。它能够处理复杂的查询问题，提供结构化的答案，并附上可靠的信息来源。对于学术研究、市场调研、技术学习等场景，秘塔AI搜索能够大幅提升信息获取效率。\n\n平台还支持多语言搜索、专业领域检索等高级功能，是知识工作者不可或缺的研究工具。",
    logo: "/blue-magnifying-glass-ai-icon.jpg",
    category: "search",
    url: "https://metaso.cn",
    isHot: true,
    createdAt: "2024-02-10",
    tags: ["search", "ai"],
  },
  {
    id: "6",
    name: "Coze AI",
    nameZh: "堆友AI",
    slug: "coze-ai",
    description: "Free AI drawing tool",
    descriptionZh: "免费AI绘画工具，快速生成图片",
    detailedIntroduction:
      "堆友AI是一款功能强大的免费AI绘画工具，让艺术创作变得触手可及。无论你是专业设计师还是绘画爱好者，都能通过简单的文字描述生成令人惊艳的艺术作品。\n\n堆友AI支持多种绘画风格，包括写实、动漫、水彩、油画等。它的AI模型经过大量艺术作品训练，能够理解复杂的创作需求，生成高质量的图像。用户可以通过调整参数来控制画面细节、色彩风格和构图方式。\n\n工具还提供了图像编辑、风格迁移、局部重绘等高级功能，让创作过程更加灵活。对于需要快速产出视觉内容的创作者来说，堆友AI是理想的创作伙伴。",
    logo: "/yellow-robot-drawing-icon.jpg",
    category: "image",
    url: "https://coze.com",
    isHot: true,
    createdAt: "2024-02-15",
    tags: ["image", "drawing", "free"],
  },
  {
    id: "7",
    name: "Figma AI",
    nameZh: "美图设计室",
    slug: "figma-ai",
    description: "AI image creation and design",
    descriptionZh: "AI图像创作和设计工具",
    detailedIntroduction:
      "美图设计室是一款集AI图像生成、编辑和设计于一体的综合性创作平台。它结合了美图多年的图像处理技术积累和最新的AI生成能力，为用户提供专业级的设计体验。\n\n平台支持从零开始创作图像，也可以对现有图片进行AI增强、风格转换、智能抠图等操作。内置的设计模板涵盖社交媒体、电商、广告等多个领域，用户可以快速制作出符合各种场景需求的视觉内容。\n\n美图设计室特别注重用户体验，界面简洁直观，即使是设计新手也能快速上手。对于需要批量生成设计素材的用户，平台还提供了批处理和API接口服务。",
    logo: "/colorful-design-palette-icon.jpg",
    category: "design",
    url: "https://figma.com",
    isHot: true,
    createdAt: "2024-02-20",
    tags: ["design", "image"],
  },
  {
    id: "8",
    name: "Spark Fire",
    nameZh: "讯飞星火",
    slug: "spark-fire",
    description: "AI smart assistant",
    descriptionZh: "AI智能助手，免费使用",
    detailedIntroduction:
      "讯飞星火是科大讯飞推出的新一代认知智能大模型，具备跨领域的知识和语言理解能力。作为国内领先的AI助手，星火在文本生成、知识问答、逻辑推理等方面表现出色。\n\n星火的核心优势在于其强大的中文处理能力和多模态交互功能。它不仅能进行流畅的对话，还能理解和生成图片、处理文档、编写代码等。星火特别擅长专业领域的知识问答，能够为教育、医疗、法律等行业提供专业支持。\n\n作为免费开放的AI平台，讯飞星火为个人用户和企业提供了强大的AI能力，支持API接入和定制化开发，是构建智能应用的理想选择。",
    logo: "/blue-flame-spark-icon.jpg",
    category: "agent",
    url: "https://xinghuo.xfyun.cn",
    isHot: true,
    createdAt: "2024-02-25",
    tags: ["assistant", "free"],
  },
  {
    id: "9",
    name: "Office Coolie",
    nameZh: "办公小浣熊",
    slug: "office-coolie",
    description: "AI data analysis tool",
    descriptionZh: "最强AI数据分析工具",
    detailedIntroduction:
      "办公小浣熊是一款专为数据分析设计的AI工具，能够帮助用户快速处理和分析各类数据。它将复杂的数据分析过程简化为简单的对话交互，让非专业人士也能轻松完成数据洞察。\n\n工具支持Excel、CSV等多种数据格式，能够自动识别数据特征，生成统计报表、趋势图表和分析报告。用户只需用自然语言描述分析需求，AI就能自动完成数据清洗、计算和可视化。\n\n办公小浣熊特别适合市场分析、销售统计、财务报表等业务场景，能够大幅提升数据处理效率，帮助决策者快速获取业务洞察。",
    logo: "/gray-raccoon-office-icon.jpg",
    category: "office",
    url: "https://office.com",
    isNew: true,
    createdAt: "2024-03-01",
    tags: ["office", "data"],
  },
  {
    id: "10",
    name: "Feishu Docs",
    nameZh: "讯飞绘文",
    slug: "feishu-docs",
    description: "Free AI writing tool",
    descriptionZh: "免费AI写作工具，快速生成文章",
    detailedIntroduction:
      "讯飞绘文是一款专业的AI写作助手，能够帮助用户快速创作各类文本内容。无论是文章撰写、文案创作还是文档编辑，讯飞绘文都能提供智能化的写作支持。\n\n工具内置了多种写作模板和风格选项，支持新闻报道、营销文案、学术论文、创意故事等多种文体。AI能够根据用户提供的关键词和大纲，自动扩展内容、优化表达、调整语气。还提供了改写、续写、总结等实用功能。\n\n讯飞绘文特别注重内容质量，生成的文本逻辑清晰、语言流畅，能够满足专业写作需求。对于内容创作者和文字工作者来说，这是提升创作效率的得力工具。",
    logo: "/purple-document-writing-icon.jpg",
    category: "writing",
    url: "https://feishu.cn",
    isNew: true,
    createdAt: "2024-03-05",
    tags: ["writing", "free"],
  },
  {
    id: "11",
    name: "Code Fly",
    nameZh: "码上飞",
    slug: "code-fly",
    description: "AI code generation",
    descriptionZh: "一句话生成微信小程序",
    detailedIntroduction:
      "码上飞是一款革命性的AI代码生成工具，专注于微信小程序的快速开发。它能够根据用户的自然语言描述，自动生成完整的小程序代码，大幅降低开发门槛。\n\n工具支持多种小程序类型，包括电商、社交、工具、内容等。用户只需描述功能需求和界面设计，AI就能生成包含页面结构、样式代码和业务逻辑的完整项目。生成的代码遵循最佳实践，结构清晰，易于维护和扩展。\n\n码上飞还提供了代码优化、bug修复、功能扩展等辅助功能，是小程序开发者提升效率的利器。即使是编程新手，也能通过码上飞快速实现自己的创意。",
    logo: "/blue-code-brackets-icon.jpg",
    category: "coding",
    url: "https://codefly.com",
    isNew: true,
    createdAt: "2024-03-10",
    tags: ["coding", "miniprogram"],
  },
  {
    id: "12",
    name: "Mini AI",
    nameZh: "千页小说AI",
    slug: "mini-ai",
    description: "AI novel writing",
    descriptionZh: "一站式AI小说创作平台",
    detailedIntroduction:
      "千页小说AI是专为小说创作者打造的智能写作平台。它不仅能够辅助创作，还能提供从构思到完稿的全流程支持，让小说创作变得更加高效和有趣。\n\n平台提供了角色设定、情节规划、场景描写等多种创作工具。AI能够根据作者的设定自动生成符合人物性格的对话、推进情节发展、丰富场景细节。还支持多种文学风格和题材，包括言情、玄幻、悬疑、科幻等。\n\n千页小说AI特别注重创作的连贯性和逻辑性，能够记住前文内容，保持故事的一致性。对于网文作者来说，这是提升更新速度和作品质量的强大助手。",
    logo: "/red-book-pages-icon.jpg",
    category: "writing",
    isNew: true,
    createdAt: "2024-03-12",
    tags: ["writing", "novel"],
  },
  {
    id: "13",
    name: "Tunee",
    nameZh: "Tunee",
    slug: "tunee",
    description: "AI music creation",
    descriptionZh: "音乐对话式音乐创作工具",
    detailedIntroduction:
      "Tunee是一款创新的AI音乐创作工具，通过对话式交互让音乐创作变得简单有趣。无论你是否有音乐基础，都能通过Tunee创作出专业水准的音乐作品。\n\n工具支持多种音乐风格，包括流行、摇滚、电子、古典等。用户只需描述想要的音乐氛围、节奏和情感，AI就能自动生成完整的音乐作品，包括旋律、和声、编曲等。还可以对生成的音乐进行细节调整和风格变换。\n\nTunee特别适合视频配乐、游戏音效、广告背景音乐等场景。它大大降低了音乐创作的门槛，让每个人都能成为音乐创作者。",
    logo: "/black-music-note-icon.jpg",
    category: "audio",
    isNew: true,
    createdAt: "2024-03-15",
    tags: ["music", "audio"],
  },
  {
    id: "14",
    name: "Transor",
    nameZh: "Transor沉浸式翻译",
    slug: "transor",
    description: "AI translation tool",
    descriptionZh: "AI翻译工具，提供沉浸式体验",
    detailedIntroduction:
      "Transor沉浸式翻译是一款革新性的AI翻译工具，它不仅提供准确的翻译，还创造了独特的双语对照阅读体验。通过智能排版和实时翻译，让用户在阅读外文内容时获得流畅自然的体验。\n\n工具支持网页、PDF、视频字幕等多种内容形式的翻译。采用先进的神经机器翻译技术，能够理解上下文语境，提供更加准确和自然的翻译结果。还支持专业术语库和个性化翻译设置。\n\nTransor特别适合学术研究、外语学习、跨境工作等场景。它的沉浸式体验让用户在翻译和原文之间无缝切换，大幅提升阅读效率和理解深度。",
    logo: "/pink-translation-globe-icon.jpg",
    category: "office",
    isNew: true,
    createdAt: "2024-03-18",
    tags: ["translation", "language"],
  },
  {
    id: "15",
    name: "Toca",
    nameZh: "搭叨",
    slug: "toca",
    description: "AI mind mapping",
    descriptionZh: "心流AI脑图下载AI工具",
    detailedIntroduction:
      "搭叨是一款智能思维导图工具，结合AI技术帮助用户更好地组织思路、梳理知识。它不仅是一个绘图工具，更是一个思维助手，能够激发创意、优化思维结构。\n\n工具支持自动生成思维导图、智能扩展节点、优化布局等功能。用户只需输入主题，AI就能自动生成完整的思维导图框架。还支持多人协作、模板库、导出分享等实用功能。\n\n搭叨特别适合项目规划、学习笔记、会议记录、创意构思等场景。它的AI辅助功能能够帮助用户发现思维盲点，建立知识关联，是提升思维效率的强大工具。",
    logo: "/purple-mind-map-nodes-icon.jpg",
    category: "office",
    isNew: true,
    createdAt: "2024-03-20",
    tags: ["mindmap", "productivity"],
  },
  {
    id: "16",
    name: "iFlow CLI",
    nameZh: "iFlow CLI",
    slug: "iflow-cli",
    description: "AI command line interface",
    descriptionZh: "心流AI脑图的命令行工具",
    detailedIntroduction:
      "iFlow CLI是一款面向开发者的AI命令行工具，将思维导图和知识管理能力带入终端环境。它让开发者能够在熟悉的命令行界面中高效地组织项目、管理任务、记录笔记。\n\n工具提供了丰富的命令集，支持快速创建思维导图、导出多种格式、与Git集成等功能。AI助手能够理解自然语言命令，自动完成复杂操作。还支持脚本化和自动化工作流。\n\niFlow CLI特别适合技术文档编写、项目架构设计、代码审查记录等开发场景。它将可视化思维工具与开发者工作流完美结合，提升技术团队的协作效率。",
    logo: "/placeholder.svg?height=48&width=48",
    category: "coding",
    isNew: true,
    createdAt: "2024-03-22",
    tags: ["cli", "developer"],
  },
]

export const mockQAs: Record<string, QA[]> = {
  "1": [
    {
      id: "qa1-1",
      toolId: "1",
      question: "豆包是免费的吗？",
      answer:
        "是的，豆包提供免费版本，包含大部分核心功能。用户可以免费使用对话、问答、创作等基础功能，无需付费即可体验强大的AI能力。",
      createdAt: "2024-01-20",
    },
    {
      id: "qa1-2",
      toolId: "1",
      question: "豆包支持哪些语言？",
      answer:
        "豆包主要支持中文和英文，能够进行流畅的双语对话。在中文理解和生成方面表现尤为出色，特别适合中文用户使用。",
      createdAt: "2024-01-21",
    },
    {
      id: "qa1-3",
      toolId: "1",
      question: "豆包可以帮我写代码吗？",
      answer:
        "可以的。豆包支持多种编程语言的代码生成和解释，包括Python、JavaScript、Java等。它可以帮助你编写代码、调试错误、解释代码逻辑，是编程学习和开发的好帮手。",
      createdAt: "2024-01-22",
    },
  ],
  "2": [
    {
      id: "qa2-1",
      toolId: "2",
      question: "绘蛙可以生成什么类型的图片？",
      answer:
        "绘蛙专注于电商营销图片生成，包括商品展示图、促销海报、社交媒体配图、详情页banner等。它特别擅长生成具有商业价值的营销素材。",
      createdAt: "2024-01-25",
    },
    {
      id: "qa2-2",
      toolId: "2",
      question: "生成的图片可以商用吗？",
      answer:
        "可以的。绘蛙生成的图片用户拥有使用权，可以用于商业用途。建议在使用前查看具体的服务条款，了解详细的版权说明。",
      createdAt: "2024-01-26",
    },
    {
      id: "qa2-3",
      toolId: "2",
      question: "如何提高生成图片的质量？",
      answer:
        "建议提供详细的描述，包括商品特点、风格要求、色彩偏好等。可以上传参考图片，使用平台提供的模板，并通过多次调整参数来优化效果。",
      createdAt: "2024-01-27",
    },
  ],
  "3": [
    {
      id: "qa3-1",
      toolId: "3",
      question: "扣子PPT生成一份PPT需要多长时间？",
      answer:
        "通常只需要1-3分钟即可生成一份完整的PPT。具体时间取决于内容的复杂程度和页数。简单的演示文稿可能只需几十秒。",
      createdAt: "2024-02-05",
    },
    {
      id: "qa3-2",
      toolId: "3",
      question: "生成的PPT可以编辑吗？",
      answer:
        "完全可以。生成的PPT支持在线编辑和下载后编辑。你可以修改文字、调整布局、更换配色、添加图片等，就像使用普通的PPT编辑器一样。",
      createdAt: "2024-02-06",
    },
    {
      id: "qa3-3",
      toolId: "3",
      question: "支持哪些导出格式？",
      answer: "支持导出为PPTX、PDF等常用格式。PPTX格式可以在PowerPoint、WPS等软件中打开和编辑，PDF格式适合分享和打印。",
      createdAt: "2024-02-07",
    },
  ],
  "4": [
    {
      id: "qa4-1",
      toolId: "4",
      question: "AiPPT和扣子PPT有什么区别？",
      answer:
        "AiPPT更注重专业性和定制化，提供了更多的行业模板和高级功能。它特别适合企业用户和对PPT质量要求较高的场景，支持团队协作和素材库管理。",
      createdAt: "2024-02-10",
    },
    {
      id: "qa4-2",
      toolId: "4",
      question: "是否支持团队协作？",
      answer:
        "是的，AiPPT提供了完善的团队协作功能。团队成员可以共同编辑PPT、分享模板素材、统一管理品牌资源，提升团队工作效率。",
      createdAt: "2024-02-11",
    },
    {
      id: "qa4-3",
      toolId: "4",
      question: "如何保证生成的PPT符合公司品牌规范？",
      answer:
        "AiPPT支持自定义品牌模板，可以设置公司的标准色、字体、logo等品牌元素。生成的PPT会自动应用这些规范，确保视觉统一。",
      createdAt: "2024-02-12",
    },
  ],
  "5": [
    {
      id: "qa5-1",
      toolId: "5",
      question: "秘塔AI搜索和普通搜索引擎有什么不同？",
      answer:
        "秘塔AI搜索不仅检索信息，还会对结果进行智能分析和总结，直接提供答案而不是链接列表。它能理解复杂问题，提供结构化的回答，大大提升信息获取效率。",
      createdAt: "2024-02-15",
    },
    {
      id: "qa5-2",
      toolId: "5",
      question: "搜索结果的信息来源可靠吗？",
      answer:
        "秘塔AI搜索会标注信息来源，并优先选择权威网站的内容。用户可以查看原始链接，验证信息的可靠性。建议对重要信息进行交叉验证。",
      createdAt: "2024-02-16",
    },
    {
      id: "qa5-3",
      toolId: "5",
      question: "是否支持学术搜索？",
      answer:
        "支持。秘塔AI搜索可以检索学术论文、研究报告等专业文献，并提供文献摘要和关键信息提取，特别适合学术研究和专业学习。",
      createdAt: "2024-02-17",
    },
  ],
  "6": [
    {
      id: "qa6-1",
      toolId: "6",
      question: "堆友AI完全免费吗？",
      answer:
        "是的，堆友AI提供免费版本，包含基础的AI绘画功能。用户可以免费生成图片，体验多种绘画风格。高级功能可能需要付费。",
      createdAt: "2024-02-20",
    },
    {
      id: "qa6-2",
      toolId: "6",
      question: "支持哪些绘画风格？",
      answer:
        "堆友AI支持多种风格，包括写实、动漫、水彩、油画、素描、赛博朋克等。用户可以在生成时选择风格，或者对已有图片进行风格转换。",
      createdAt: "2024-02-21",
    },
    {
      id: "qa6-3",
      toolId: "6",
      question: "如何写好AI绘画的提示词？",
      answer:
        "建议描述要具体，包括主体、风格、色彩、光线、构图等要素。可以参考优秀作品的提示词，使用专业术语。多次尝试和调整能获得更好的效果。",
      createdAt: "2024-02-22",
    },
  ],
  "7": [
    {
      id: "qa7-1",
      toolId: "7",
      question: "美图设计室适合设计新手使用吗？",
      answer:
        "非常适合。美图设计室界面简洁直观，提供了丰富的模板和智能辅助功能。即使没有设计经验，也能通过模板快速制作出专业水准的设计作品。",
      createdAt: "2024-02-25",
    },
    {
      id: "qa7-2",
      toolId: "7",
      question: "可以批量处理图片吗？",
      answer:
        "可以。美图设计室支持批量上传和处理图片，可以同时对多张图片应用相同的效果或调整。对于需要处理大量素材的用户非常方便。",
      createdAt: "2024-02-26",
    },
    {
      id: "qa7-3",
      toolId: "7",
      question: "支持哪些设计场景？",
      answer:
        "支持社交媒体配图、电商海报、广告banner、名片设计、海报制作等多种场景。内置了针对不同平台和用途的专业模板。",
      createdAt: "2024-02-27",
    },
  ],
  "8": [
    {
      id: "qa8-1",
      toolId: "8",
      question: "讯飞星火在哪些方面表现突出？",
      answer:
        "讯飞星火在中文理解、知识问答、逻辑推理方面表现出色。特别是在专业领域知识问答、文本生成、代码编写等任务上有很强的能力。",
      createdAt: "2024-03-01",
    },
    {
      id: "qa8-2",
      toolId: "8",
      question: "是否支持API接入？",
      answer: "支持。讯飞星火提供了完善的API接口，开发者可以将AI能力集成到自己的应用中。支持多种编程语言和开发框架。",
      createdAt: "2024-03-02",
    },
    {
      id: "qa8-3",
      toolId: "8",
      question: "讯飞星火可以处理图片吗？",
      answer:
        "可以。讯飞星火支持多模态交互，能够理解和分析图片内容，进行图文对话。可以识别图片中的文字、物体、场景等信息。",
      createdAt: "2024-03-03",
    },
  ],
  "9": [
    {
      id: "qa9-1",
      toolId: "9",
      question: "办公小浣熊支持哪些数据格式？",
      answer:
        "支持Excel、CSV、JSON等常见数据格式。可以直接上传文件进行分析，也支持复制粘贴数据。处理后的结果可以导出为多种格式。",
      createdAt: "2024-03-05",
    },
    {
      id: "qa9-2",
      toolId: "9",
      question: "不懂数据分析也能使用吗？",
      answer:
        "完全可以。办公小浣熊将复杂的数据分析简化为对话交互，你只需用自然语言描述需求，AI会自动完成分析。不需要掌握专业的数据分析知识。",
      createdAt: "2024-03-06",
    },
    {
      id: "qa9-3",
      toolId: "9",
      question: "可以生成什么类型的图表？",
      answer:
        "支持柱状图、折线图、饼图、散点图、热力图等多种图表类型。AI会根据数据特点自动选择合适的可视化方式，也支持手动指定。",
      createdAt: "2024-03-07",
    },
  ],
  "10": [
    {
      id: "qa10-1",
      toolId: "10",
      question: "讯飞绘文可以写哪些类型的文章？",
      answer:
        "支持新闻报道、营销文案、学术论文、产品说明、社交媒体内容、创意故事等多种文体。可以根据不同场景和需求调整写作风格。",
      createdAt: "2024-03-10",
    },
    {
      id: "qa10-2",
      toolId: "10",
      question: "生成的内容会重复吗？",
      answer:
        "讯飞绘文采用先进的AI模型，每次生成的内容都是独特的。即使使用相同的提示，也会产生不同的表达方式，确保内容的原创性。",
      createdAt: "2024-03-11",
    },
    {
      id: "qa10-3",
      toolId: "10",
      question: "如何提高生成文章的质量？",
      answer:
        "建议提供详细的写作要求，包括主题、大纲、关键点、目标读者等。可以提供参考资料，指定写作风格和语气。生成后可以进行多次优化调整。",
      createdAt: "2024-03-12",
    },
  ],
  "11": [
    {
      id: "qa11-1",
      toolId: "11",
      question: "码上飞生成的小程序代码质量如何？",
      answer:
        "码上飞生成的代码遵循微信小程序开发规范和最佳实践，结构清晰，注释完整。代码可以直接运行，也方便后续的维护和扩展。",
      createdAt: "2024-03-15",
    },
    {
      id: "qa11-2",
      toolId: "11",
      question: "不会编程也能用码上飞吗？",
      answer:
        "可以。码上飞的设计目标就是降低开发门槛。你只需用自然语言描述想要的功能，AI会自动生成代码。不过，了解一些基础的小程序知识会更有帮助。",
      createdAt: "2024-03-16",
    },
    {
      id: "qa11-3",
      toolId: "11",
      question: "生成的小程序可以直接发布吗？",
      answer:
        "生成的代码可以作为项目基础，但建议在发布前进行测试和优化。需要配置小程序的AppID、服务器域名等信息，并通过微信官方审核。",
      createdAt: "2024-03-17",
    },
  ],
  "12": [
    {
      id: "qa12-1",
      toolId: "12",
      question: "千页小说AI适合写什么类型的小说？",
      answer:
        "支持言情、玄幻、都市、悬疑、科幻、历史等多种题材。AI能够适应不同的写作风格，无论是轻松幽默还是严肃深沉都能胜任。",
      createdAt: "2024-03-20",
    },
    {
      id: "qa12-2",
      toolId: "12",
      question: "AI会不会让小说失去个人风格？",
      answer:
        "不会。千页小说AI是辅助工具，作者仍然掌握创作主导权。你可以设定人物性格、情节走向、写作风格等，AI会在你的框架内进行创作，保持作品的独特性。",
      createdAt: "2024-03-21",
    },
    {
      id: "qa12-3",
      toolId: "12",
      question: "如何保持长篇小说的连贯性？",
      answer:
        "千页小说AI会记录人物设定、情节发展、世界观设定等信息，确保前后内容的一致性。建议定期回顾和整理设定，使用平台的大纲管理功能。",
      createdAt: "2024-03-22",
    },
  ],
  "13": [
    {
      id: "qa13-1",
      toolId: "13",
      question: "Tunee生成的音乐有版权吗？",
      answer: "用户对通过Tunee生成的音乐拥有使用权，可以用于个人和商业项目。具体的版权条款建议查看平台的服务协议。",
      createdAt: "2024-03-25",
    },
    {
      id: "qa13-2",
      toolId: "13",
      question: "可以指定音乐的长度吗？",
      answer:
        "可以。在生成音乐时可以指定时长，从几秒的音效到几分钟的完整曲目都支持。也可以对生成的音乐进行剪辑和循环。",
      createdAt: "2024-03-26",
    },
    {
      id: "qa13-3",
      toolId: "13",
      question: "支持导出什么格式的音频？",
      answer: "支持MP3、WAV等常用音频格式。可以选择不同的音质和比特率，满足不同场景的需求。",
      createdAt: "2024-03-27",
    },
  ],
  "14": [
    {
      id: "qa14-1",
      toolId: "14",
      question: "Transor支持哪些语言的翻译？",
      answer:
        "支持英语、中文、日语、韩语、法语、德语、西班牙语等数十种语言。可以进行任意语言对之间的互译，翻译质量稳定可靠。",
      createdAt: "2024-03-30",
    },
    {
      id: "qa14-2",
      toolId: "14",
      question: "什么是沉浸式翻译体验？",
      answer:
        "沉浸式翻译是指在阅读时，原文和译文同时呈现，通过智能排版让你可以对照阅读。这种方式既能理解内容，又能学习原文表达，提升阅读效率。",
      createdAt: "2024-03-31",
    },
    {
      id: "qa14-3",
      toolId: "14",
      question: "可以翻译PDF文档吗？",
      answer: "可以。Transor支持PDF文档的翻译，能够保持原文档的格式和排版。翻译后可以导出为双语对照的PDF文件。",
      createdAt: "2024-04-01",
    },
  ],
  "15": [
    {
      id: "qa15-1",
      toolId: "15",
      question: "搭叨的AI功能具体有哪些？",
      answer:
        "AI可以自动生成思维导图框架、智能扩展节点内容、优化布局结构、提供创意建议等。它能理解你的主题，帮助你完善思维体系。",
      createdAt: "2024-04-05",
    },
    {
      id: "qa15-2",
      toolId: "15",
      question: "支持多人协作吗？",
      answer: "支持。团队成员可以共同编辑思维导图，实时查看彼此的修改。适合头脑风暴、项目规划等需要团队协作的场景。",
      createdAt: "2024-04-06",
    },
    {
      id: "qa15-3",
      toolId: "15",
      question: "可以导出为哪些格式？",
      answer: "支持导出为图片（PNG、JPG）、PDF、Markdown、思维导图专用格式等。方便在不同场景下使用和分享。",
      createdAt: "2024-04-07",
    },
  ],
  "16": [
    {
      id: "qa16-1",
      toolId: "16",
      question: "iFlow CLI需要什么环境？",
      answer: "iFlow CLI是跨平台的命令行工具，支持Windows、macOS和Linux。需要Node.js环境，通过npm或yarn即可安装。",
      createdAt: "2024-04-10",
    },
    {
      id: "qa16-2",
      toolId: "16",
      question: "可以和Git集成吗？",
      answer:
        "可以。iFlow CLI支持Git集成，可以将思维导图作为项目文档管理，跟踪版本变化。适合技术团队的文档协作和知识管理。",
      createdAt: "2024-04-11",
    },
    {
      id: "qa16-3",
      toolId: "16",
      question: "是否支持自定义命令？",
      answer: "支持。可以通过配置文件自定义命令别名和工作流。还支持编写插件扩展功能，满足个性化需求。",
      createdAt: "2024-04-12",
    },
  ],
}

// Function to initialize mock submissions in localStorage
export function initializeMockSubmissions(userId: string) {
  if (typeof window === "undefined") return

  const SUBMISSIONS_KEY = "ai_tools_submissions"
  const existingSubmissions = localStorage.getItem(SUBMISSIONS_KEY)

  // Parse existing submissions
  let allSubmissions: Submission[] = []
  if (existingSubmissions) {
    try {
      allSubmissions = JSON.parse(existingSubmissions)
    } catch {
      allSubmissions = []
    }
  }

  // Check if this user already has submissions
  const userHasSubmissions = allSubmissions.some((sub) => sub.userId === userId)
  if (userHasSubmissions) return

  // Create mock submissions for this user
  const mockSubmissions: Submission[] = [
    {
      id: `sub-${userId}-1`,
      userId: userId,
      toolName: "ChatGPT中文版",
      toolUrl: "https://chatgpt-cn.example.com",
      toolDescription: "OpenAI推出的强大对话AI工具，支持中文对话，可以回答问题、写作、编程等",
      category: "chat",
      status: "approved",
      submittedAt: "2024-03-01T10:30:00.000Z",
      reviewNote: "工具质量优秀，已通过审核并上线",
    },
    {
      id: `sub-${userId}-2`,
      userId: userId,
      toolName: "Midjourney国内版",
      toolUrl: "https://midjourney-cn.example.com",
      toolDescription: "顶级AI绘画工具，可以根据文字描述生成高质量的艺术作品和插画",
      category: "image",
      status: "pending",
      submittedAt: "2024-03-15T14:20:00.000Z",
    },
    {
      id: `sub-${userId}-3`,
      userId: userId,
      toolName: "AI视频剪辑大师",
      toolUrl: "https://video-editor-ai.example.com",
      toolDescription: "智能视频剪辑工具，自动识别精彩片段，一键生成短视频",
      category: "video",
      status: "rejected",
      submittedAt: "2024-02-20T09:15:00.000Z",
      reviewNote: "工具链接无法访问，请检查后重新提交",
    },
    {
      id: `sub-${userId}-4`,
      userId: userId,
      toolName: "智能简历生成器",
      toolUrl: "https://resume-ai.example.com",
      toolDescription: "AI辅助简历制作工具，根据职位要求自动优化简历内容和格式",
      category: "office",
      status: "approved",
      submittedAt: "2024-02-10T16:45:00.000Z",
      reviewNote: "实用工具，已收录",
    },
    {
      id: `sub-${userId}-5`,
      userId: userId,
      toolName: "代码审查助手",
      toolUrl: "https://code-review-ai.example.com",
      toolDescription: "AI代码审查工具，自动检测代码问题，提供优化建议和最佳实践",
      category: "coding",
      status: "pending",
      submittedAt: "2024-03-18T11:00:00.000Z",
    },
  ]

  // Add mock submissions to existing submissions
  allSubmissions.push(...mockSubmissions)
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(allSubmissions))
}
