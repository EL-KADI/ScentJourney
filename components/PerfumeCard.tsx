"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, HeartOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Perfume {
  id: string
  name: string
  region: string
  ingredients: string[]
  story: string
  unsplashQuery: string
}

interface PerfumeCardProps {
  perfume: Perfume
}

export default function PerfumeCard({ perfume }: PerfumeCardProps) {
  const [imageUrl, setImageUrl] = useState("/placeholder.svg?height=300&width=400")
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setIsFavorite(favorites.some((fav: Perfume) => fav.id === perfume.id))

    fetchImage()
  }, [perfume.id, perfume.unsplashQuery])

  const fetchImage = async () => {
    try {
      const response = await fetch(`/api/images?query=${perfume.unsplashQuery}`)
      const data = await response.json()
      if (data.imageUrl) {
        setImageUrl(data.imageUrl)
      }
    } catch (error) {
      console.error("Failed to fetch image:", error)
    }
  }

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")

    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav: Perfume) => fav.id !== perfume.id)
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
      setIsFavorite(false)
    } else {
      favorites.push(perfume)
      localStorage.setItem("favorites", JSON.stringify(favorites))
      setIsFavorite(true)
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="h-full">
      <Card className="h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-0">
          <div className="relative">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={perfume.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover rounded-t-lg"
              priority
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFavorite}
              className="absolute top-2 right-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? (
                <Heart className="w-5 h-5 text-red-500 fill-current" />
              ) : (
                <HeartOff className="w-5 h-5 text-gray-500" />
              )}
            </Button>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 font-serif">{perfume.name}</h3>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Ingredients:</h4>
              <div className="flex flex-wrap gap-2">
                {perfume.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-xs rounded-full"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{perfume.story}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
