import React, { useEffect, useMemo, useState } from 'react'
import ImageCarousel from './components/ImageCarousel'

export default function Media() {
  const [allImages, setAllImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch('/api/media')
        if (!res.ok) throw new Error('Failed to fetch media images')
        const data = await res.json()
        setAllImages(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error(err)
        setError('Failed to load media gallery. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  const categories = useMemo(() => {
    const uniqueCategories = new Set(allImages.map((img) => img.category).filter(Boolean))
    return ['All', ...Array.from(uniqueCategories)]
  }, [allImages])

  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') return allImages
    return allImages.filter((img) => img.category === activeCategory)
  }, [activeCategory, allImages])

  if (loading) {
    return <div className="text-center py-12 text-lg text-gray-600">Loading media...</div>
  }

  if (error) {
    return <div className="text-center py-12 text-lg text-red-600">{error}</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="bg-gradient-to-b from-navy-700 to-blue-800 text-white py-16 md:py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-extrabold tracking-tight mb-6">Media</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Photos and highlights from training, tournaments, camps, and community events.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-center flex-wrap gap-2 mb-10">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                    activeCategory === category
                      ? 'bg-navy-700 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredImages.length === 0 ? (
                <p className="col-span-full text-center text-gray-500">No images found for this category.</p>
              ) : (
                filteredImages.map((image) => (
                  <div
                    key={image._id || image.id}
                    className="bg-white border rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center text-center"
                  >
                    <ImageCarousel
                      imageUrls={image.imageUrls}
                      src={image.src}
                      alt={image.alt}
                      aspectClass="aspect-[4/3]"
                      showCountBadge
                    />

                    <div className="p-6 flex-1 flex flex-col items-center">
                      <span className="bg-navy-700/10 text-navy-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                        {image.category || 'Uncategorized'}
                      </span>
                      <p className="text-gray-600 text-sm">{image.caption}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
