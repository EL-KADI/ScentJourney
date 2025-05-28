import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "ScentJourney",
  description:
    "Discover traditional perfumes from cultures around the world. Explore ingredients, stories, and cultural significance of fragrances from the Middle East, Japan, France, India, and Morocco.",
  keywords: "perfume, traditional, culture, oud, jasmine, rose, sandalwood, fragrance, aromatherapy",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
     suppressHydrationWarning   className={`${inter.variable} ${playfair.variable} font-sans bg-white dark:bg-slate-900 text-gray-900 dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      </body>
    </html>
  )
}
