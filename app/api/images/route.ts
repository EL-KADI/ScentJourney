import { type NextRequest, NextResponse } from "next/server"

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || "-pJgozlq-4YKt_1ZO2YF6Lin2wPTX6ck8cm0jEHJSTM"

const cache = new Map<string, { url: string; timestamp: number }>()
const CACHE_DURATION = 24 * 60 * 60 * 1000

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  const cacheKey = query.toLowerCase()
  const cached = cache.get(cacheKey)

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json({ imageUrl: cached.url })
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch from Unsplash")
    }

    const data = await response.json()

    if (data.results && data.results.length > 0) {
      const imageUrl = data.results[0].urls.regular
      cache.set(cacheKey, { url: imageUrl, timestamp: Date.now() })
      return NextResponse.json({ imageUrl })
    } else {
      return NextResponse.json({ imageUrl: "/placeholder.svg?height=300&width=400" })
    }
  } catch (error) {
    console.error("Error fetching image:", error)
    return NextResponse.json({ imageUrl: "/placeholder.svg?height=300&width=400" })
  }
}
