"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Header from "@/components/Header"
import PerfumeCard from "@/components/PerfumeCard"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Perfume {
  id: string
  name: string
  region: string
  ingredients: string[]
  story: string
  unsplashQuery: string
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Perfume[]>([])
  const [filteredFavorites, setFilteredFavorites] = useState<Perfume[]>([])
  const [regionFilter, setRegionFilter] = useState("all")
  const [ingredientFilter, setIngredientFilter] = useState("all")

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setFavorites(storedFavorites)
    setFilteredFavorites(storedFavorites)
  }, [])

  useEffect(() => {
    let filtered = favorites

    if (regionFilter !== "all") {
      filtered = filtered.filter((perfume) => perfume.region === regionFilter)
    }

    if (ingredientFilter !== "all") {
      filtered = filtered.filter((perfume) =>
        perfume.ingredients.some((ingredient) => ingredient.toLowerCase().includes(ingredientFilter.toLowerCase())),
      )
    }

    setFilteredFavorites(filtered)
  }, [favorites, regionFilter, ingredientFilter])

  const clearAllFavorites = () => {
    localStorage.removeItem("favorites")
    setFavorites([])
    setFilteredFavorites([])
  }

  const regions = [...new Set(favorites.map((perfume) => perfume.region))]
  const ingredients = [...new Set(favorites.flatMap((perfume) => perfume.ingredients))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 dark:from-slate-900 dark:to-indigo-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 font-serif">Your Favorite Perfumes</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {favorites.length} perfume{favorites.length !== 1 ? "s" : ""} saved
          </p>
        </motion.div>

        {favorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={ingredientFilter} onValueChange={setIngredientFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by ingredient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ingredients</SelectItem>
                  {ingredients.map((ingredient) => (
                    <SelectItem key={ingredient} value={ingredient}>
                      {ingredient}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={clearAllFavorites}>
                Clear All
              </Button>
            </div>
          </motion.div>
        )}

        {filteredFavorites.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredFavorites.map((perfume) => (
              <PerfumeCard key={perfume.id} perfume={perfume} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">
              {favorites.length === 0 ? "No favorite perfumes yet" : "No perfumes match your filters"}
            </p>
            <p className="text-gray-400 dark:text-gray-500">
              {favorites.length === 0 ? "Start exploring to add some favorites!" : "Try adjusting your filters"}
            </p>
          </motion.div>
        )}
      </main>
    </div>
  )
}
