import React, { useState, useMemo, useEffect } from 'react'

const Gallery = () => {
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/gallery');
        if (!res.ok) throw new Error('Failed to fetch gallery images');
        const data = await res.json();
        setAllImages(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load gallery images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(allImages.map(img => img.category));
    return ["All", ...Array.from(uniqueCategories)];
  }, [allImages]);

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") {
      return allImages;
    }
    return allImages.filter(img => img.category === activeCategory);
  }, [activeCategory, allImages]);

  if (loading) {
    return <div className="text-center py-12 text-lg text-gray-600">Loading gallery...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-lg text-red-600">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="bg-gradient-to-b from-navy-700 to-blue-800 text-white py-16 md:py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-extrabold tracking-tight mb-6">Gallery</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              A showcase of our athletes, events, and community work. See the passion and dedication in action.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-center flex-wrap gap-2 mb-10">
              {categories.map(category => (
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
                    key={image._id} 
                    className="bg-white border rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center text-center"
                  >
                    {/* 🔥 CHANGED: Replaced h-48 with aspect-[4/3] */}
                    <div className="aspect-[4/3] w-full relative">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>

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

export default Gallery