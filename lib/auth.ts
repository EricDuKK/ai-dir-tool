"use client"

import type { User } from "./types"

// Client-side auth using localStorage
export const AUTH_KEY = "ai_tools_user"

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem(AUTH_KEY)
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function login(email: string, password: string): User | null {
  // Mock login - in production, this would call an API
  if (email && password) {
    const user: User = {
      id: "1",
      username: email.split("@")[0],
      email,
      avatar: "/placeholder.svg?height=40&width=40",
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))
    return user
  }
  return null
}

export function register(email: string, password: string, username: string): User | null {
  // Mock registration
  if (email && password && username) {
    const user: User = {
      id: Date.now().toString(),
      username,
      email,
      avatar: "/placeholder.svg?height=40&width=40",
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))
    return user
  }
  return null
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY)
}
