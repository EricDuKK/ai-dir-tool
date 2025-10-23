// Type definitions for the AI tools directory

export interface Tool {
  id: string
  name: string
  nameZh: string // Chinese name
  slug: string // SEO-friendly URL slug
  description: string
  descriptionZh: string // Chinese description
  detailedIntroduction?: string // Detailed introduction for detail page
  logoUrl: string // Logo image URL
  imageUrl: string // Website preview image URL
  category: string
  url: string
  isHot?: boolean
  isNew?: boolean
  createdAt: string
  updatedAt: string
  viewCount?: number
  likeCount?: number
  tags?: string[]
  status?: 'active' | 'inactive' | 'archived'
}

export interface Category {
  id: string
  name: string
  name_zh: string
  icon: string
  created_at?: string
  updated_at?: string
}

export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  createdAt: string
}

export interface Submission {
  id: string
  user_id: string
  tool_name: string
  tool_name_zh: string
  tool_url: string
  tool_description: string
  tool_description_zh: string
  tool_logo?: string
  tool_image?: string
  slug: string
  status: "pending" | "approved" | "rejected"
  created_at: string
  updated_at?: string
  reviewed_at?: string
  review_note?: string
}

export interface QA {
  id: string
  toolId: string
  question: string
  answer: string
  createdAt: string
}
