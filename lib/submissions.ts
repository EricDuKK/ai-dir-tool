"use client"

import type { Submission } from "./types"

const SUBMISSIONS_KEY = "ai_tools_submissions"

export function getSubmissions(userId?: string): Submission[] {
  if (typeof window === "undefined") return []

  const submissionsStr = localStorage.getItem(SUBMISSIONS_KEY)
  if (!submissionsStr) return []

  try {
    const allSubmissions: Submission[] = JSON.parse(submissionsStr)
    if (userId) {
      return allSubmissions.filter((s) => s.userId === userId)
    }
    return allSubmissions
  } catch {
    return []
  }
}

export function addSubmission(submission: Omit<Submission, "id" | "submittedAt" | "status">): Submission {
  const newSubmission: Submission = {
    ...submission,
    id: Date.now().toString(),
    status: "pending",
    submittedAt: new Date().toISOString(),
  }

  const submissions = getSubmissions()
  submissions.push(newSubmission)
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions))

  return newSubmission
}

export function updateSubmission(id: string, updates: Partial<Submission>): void {
  const submissions = getSubmissions()
  const index = submissions.findIndex((s) => s.id === id)

  if (index !== -1) {
    submissions[index] = { ...submissions[index], ...updates }
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions))
  }
}
