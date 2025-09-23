import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Biện Chứng Cơ Sở - Thượng Tầng | Triết Học Marxist",
  description: "Khám phá mối quan hệ biện chứng giữa cơ sở hạ tầng và kiến trúc thượng tầng trong triết học Marxist",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`font-sans ${inter.variable} antialiased`}>
        <Suspense fallback={null}>
          <div className="side-beam left" />
          <div className="side-beam right" />
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
