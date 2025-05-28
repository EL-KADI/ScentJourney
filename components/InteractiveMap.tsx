"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const regions = [
  { name: "Middle East", coordinates: [45, 25], color: "bg-amber-500" },
  { name: "Japan", coordinates: [138, 36], color: "bg-red-500" },
  { name: "France", coordinates: [2, 46], color: "bg-blue-500" },
  { name: "India", coordinates: [77, 20], color: "bg-green-500" },
  { name: "Morocco", coordinates: [-7, 32], color: "bg-purple-500" },
]

interface InteractiveMapProps {
  onRegionSelect: (region: string) => void
  selectedRegion: string
}

export default function InteractiveMap({ onRegionSelect, selectedRegion }: InteractiveMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-4xl h-64 md:h-96 bg-gradient-to-br from-blue-100 to-green-100 dark:from-slate-700 dark:to-slate-600 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.2"
                className="text-gray-400 dark:text-gray-500"
              />
            </pattern>
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" className="dark:stop-color-slate-700" />
              <stop offset="100%" stopColor="#f1f8e9" className="dark:stop-color-slate-600" />
            </linearGradient>
          </defs>

          <rect width="800" height="400" fill="url(#mapGradient)" />
          <rect width="800" height="400" fill="url(#grid)" />

          <g
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.6"
            className="text-gray-400 dark:text-gray-500"
          >
            <path d="M 350 180 Q 380 160 420 180 Q 440 220 420 260 Q 380 280 350 260 Q 330 220 350 180 Z" />
            <path d="M 380 120 Q 420 100 460 120 Q 480 140 460 160 Q 420 180 380 160 Q 360 140 380 120 Z" />
            <path d="M 460 100 Q 520 80 580 100 Q 620 140 580 180 Q 520 200 460 180 Q 440 140 460 100 Z" />
            <path d="M 150 100 Q 200 80 250 100 Q 280 140 250 180 Q 200 200 150 180 Q 120 140 150 100 Z" />
            <path d="M 200 220 Q 230 200 260 220 Q 280 280 260 340 Q 230 360 200 340 Q 180 280 200 220 Z" />
          </g>

          {regions.map((region, index) => {
            const x = ((region.coordinates[0] + 180) / 360) * 800
            const y = ((90 - region.coordinates[1]) / 180) * 400
            const isSelected = selectedRegion === region.name
            const isHovered = hoveredRegion === region.name

            return (
              <g key={region.name}>
                <motion.circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 12 : isHovered ? 10 : 8}
                  fill={isSelected ? "#f59e0b" : "#6b7280"}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="cursor-pointer drop-shadow-lg"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRegionSelect(region.name)}
                  onMouseEnter={() => setHoveredRegion(region.name)}
                  onMouseLeave={() => setHoveredRegion(null)}
                />

                {(isSelected || isHovered) && (
                  <motion.text
                    x={x}
                    y={y - 20}
                    textAnchor="middle"
                    className="fill-gray-800 dark:fill-white text-sm font-medium pointer-events-none"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                  >
                    {region.name}
                  </motion.text>
                )}
              </g>
            )
          })}
        </svg>

        <div className="absolute bottom-4 left-4 right-4 md:hidden">
          <div className="flex flex-wrap gap-2 justify-center">
            {regions.map((region) => (
              <Button
                key={region.name}
                variant={selectedRegion === region.name ? "default" : "outline"}
                size="sm"
                onClick={() => onRegionSelect(region.name)}
                className="text-xs"
              >
                {region.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg hidden md:block border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Regions</h3>
          <div className="space-y-1">
            {regions.map((region) => (
              <div
                key={region.name}
                className={`flex items-center space-x-2 text-xs cursor-pointer p-1 rounded transition-colors ${
                  selectedRegion === region.name
                    ? "bg-amber-100 dark:bg-amber-900/30"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => onRegionSelect(region.name)}
              >
                <div
                  className={`w-3 h-3 rounded-full ${selectedRegion === region.name ? "bg-amber-500" : "bg-gray-400 dark:bg-gray-500"}`}
                />
                <span className="text-gray-700 dark:text-gray-300">{region.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
