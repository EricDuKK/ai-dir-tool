import type React from "react"
import type { Metadata } from "next"
import { Geist, Noto_Sans_SC } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-sc",
})

export const metadata: Metadata = {
  title: "AI工具集 - AI-BOT.CN",
  description: "最全的AI工具导航网站",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`font-sans antialiased ${_notoSansSC.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
