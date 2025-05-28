"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import InteractiveMap from "@/components/InteractiveMap"
import PerfumeSlider from "@/components/PerfumeSlider"
import Header from "@/components/Header"
import { perfumeData } from "@/data/perfumes"

export default function HomePage() {
  const [selectedRegion, setSelectedRegion] = useState("Middle East")
  const [perfumes, setPerfumes] = useState([])

  useEffect(() => {
    const regionPerfumes = perfumeData.filter((p) => p.region === selectedRegion)
    setPerfumes(regionPerfumes)
  }, [selectedRegion])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 dark:from-slate-900 dark:to-indigo-900 transition-all duration-500">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4 font-serif transition-colors duration-300">
            ScentJourney
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            Discover traditional perfumes from cultures around the world
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center transition-colors duration-300">
            Explore Regions
          </h2>
          <InteractiveMap onRegionSelect={setSelectedRegion} selectedRegion={selectedRegion} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center transition-colors duration-300">
            Traditional Perfumes from {selectedRegion}
          </h2>
          <PerfumeSlider perfumes={perfumes} />
        </motion.div>
      </main>
    </div>
  )
}
