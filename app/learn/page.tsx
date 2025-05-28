"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Header from "@/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const articles = [
  {
    id: "arabian-perfumery",
    title: "Arabian Perfumery: The Art of Oud",
    excerpt: "Discover the ancient traditions of Arabian perfumery and the sacred art of oud distillation.",
    content:
      "Arabian perfumery represents one of the world's oldest and most sophisticated fragrance traditions. At its heart lies oud, also known as agarwood, a resinous heartwood that forms in Aquilaria trees when they become infected with a specific type of mold. This infection triggers the tree to produce a dark, aromatic resin as a defense mechanism. The resulting wood is highly prized for its complex, deep fragrance that has been treasured for over 3,000 years. In Arabian culture, oud is more than just a fragrance; it's a symbol of luxury, spirituality, and hospitality. Traditional distillation methods involve soaking the wood chips for weeks, then slowly heating them in copper stills. The process can take months to complete, resulting in precious oils that are often more valuable than gold. Master perfumers, known as \"attars,\" blend oud with other precious ingredients like saffron, rose, and amber to create complex compositions that tell stories of desert winds, ancient trade routes, and royal courts.",
    unsplashQuery: "oud agarwood",
    relatedPerfumes: ["Oud Attar", "Saffron Rose"],
  },
  {
    id: "japanese-incense",
    title: "Japanese Incense: The Way of Fragrance",
    excerpt: "Explore the refined art of Japanese incense and its role in meditation and ceremony.",
    content:
      'Japanese incense culture, known as "Kōdō" (the way of fragrance), is one of the three classical Japanese arts of refinement, alongside flower arrangement and tea ceremony. Unlike Western perfumery, Japanese fragrance focuses on subtlety, seasonality, and spiritual connection. The tradition began in the 6th century when Buddhism was introduced to Japan, bringing with it the practice of burning incense during meditation and religious ceremonies. Japanese incense masters developed unique blending techniques using ingredients like sandalwood, aloeswood, cloves, and star anise. The art reached its peak during the Heian period (794-1185), when aristocrats would play "incense games" - sophisticated competitions involving the identification of different fragrance compositions. Modern Japanese perfumery maintains this philosophy of restraint and harmony, creating fragrances that capture the essence of cherry blossoms in spring, fresh rain on summer leaves, or the crisp air of mountain temples. These scents are designed to evoke emotions and memories rather than simply please the senses.',
    unsplashQuery: "japanese incense cherry blossom",
    relatedPerfumes: ["Sakura Essence", "Temple Mist"],
  },
  {
    id: "french-perfumery",
    title: "French Perfumery: The Birth of Modern Fragrance",
    excerpt: "Learn about the French revolution in perfumery and the creation of modern fragrance.",
    content:
      'French perfumery transformed from a craft into an art form during the 17th and 18th centuries, establishing France as the global capital of fragrance. The revolution began in Grasse, a small town in Provence, where the perfect climate and abundant flowers created ideal conditions for perfume production. French perfumers pioneered the use of alcohol as a base for fragrances, moving away from the oil-based perfumes of the past. This innovation allowed for lighter, more volatile compositions that could capture the fleeting essence of flowers. The French also developed the concept of fragrance "notes" - top, middle, and base - creating complex compositions that evolve over time on the skin. Master perfumers like François Coty and Ernest Beaux revolutionized the industry by introducing synthetic ingredients alongside natural ones, expanding the palette of available scents. The French approach emphasizes elegance, sophistication, and the art of seduction. Iconic French perfumes like Chanel No. 5 and Guerlain\'s Shalimar became cultural symbols, representing not just fragrance but entire lifestyles and attitudes. Today, French perfumery continues to lead innovation while maintaining its commitment to artisanal quality and timeless elegance.',
    unsplashQuery: "lavender fields provence",
    relatedPerfumes: ["Rose de Mai", "Lavande Royale"],
  },
]

export default function LearnPage() {
  const [selectedArticle, setSelectedArticle] = useState(articles[0])
  const [imageUrl, setImageUrl] = useState("/placeholder.svg?height=400&width=600")

  useEffect(() => {
    fetchImage()
  }, [selectedArticle])

  const fetchImage = async () => {
    try {
      const response = await fetch(`/api/images?query=${selectedArticle.unsplashQuery}`)
      const data = await response.json()
      if (data.imageUrl) {
        setImageUrl(data.imageUrl)
      }
    } catch (error) {
      console.error("Failed to fetch image:", error)
    }
  }

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
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 font-serif">Learn About Perfumery</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover the rich history and cultural significance of traditional perfumes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Articles</h2>
            <div className="space-y-4">
              {articles.map((article) => (
                <Card
                  key={article.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedArticle.id === article.id
                      ? "ring-2 ring-amber-500 bg-amber-50 dark:bg-amber-900/20"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedArticle(article)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{article.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={selectedArticle.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover rounded-t-lg"
                  priority
                />

                <div className="p-8">
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 font-serif">
                    {selectedArticle.title}
                  </h1>

                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{selectedArticle.content}</p>
                  </div>

                  {selectedArticle.relatedPerfumes.length > 0 && (
                    <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Related Perfumes</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedArticle.relatedPerfumes.map((perfume, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 text-sm rounded-full"
                          >
                            {perfume}
                          </span>
                        ))}
                      </div>
                      <Link href="/">
                        <Button className="mt-4" variant="outline">
                          Explore These Perfumes
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
