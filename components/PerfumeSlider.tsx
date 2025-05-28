"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import PerfumeCard from "./PerfumeCard"
import { Button } from "@/components/ui/button"

interface Perfume {
  id: string
  name: string
  region: string
  ingredients: string[]
  story: string
  unsplashQuery: string
}

interface PerfumeSliderProps {
  perfumes: Perfume[]
}

export default function PerfumeSlider({ perfumes }: PerfumeSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3)
      } else if (window.innerWidth >= 640) {
        setSlidesPerView(2)
      } else {
        setSlidesPerView(1)
      }
    }

    updateSlidesPerView()
    window.addEventListener("resize", updateSlidesPerView)
    return () => window.removeEventListener("resize", updateSlidesPerView)
  }, [])

  useEffect(() => {
    setCurrentIndex(0)
  }, [perfumes])

  if (perfumes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No perfumes found for this region</p>
      </div>
    )
  }

  const maxIndex = Math.max(0, perfumes.length - slidesPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        <motion.div
          ref={sliderRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / slidesPerView}%)`,
          }}
        >
          {perfumes.map((perfume, index) => (
            <motion.div
              key={perfume.id}
              className={`flex-shrink-0 px-4 ${
                slidesPerView === 1 ? "w-full" : slidesPerView === 2 ? "w-1/2" : "w-1/3"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PerfumeCard perfume={perfume} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {perfumes.length > slidesPerView && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-slate-800"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-slate-800"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </>
      )}

      {perfumes.length > slidesPerView && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex
                  ? "bg-amber-600 dark:bg-amber-400"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {currentIndex + 1} of {maxIndex + 1} • {perfumes.length} perfume{perfumes.length !== 1 ? "s" : ""} total
        </p>
      </div>
    </div>
  )
}
