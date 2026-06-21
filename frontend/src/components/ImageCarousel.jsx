import React, { useMemo, useState } from 'react'

function normalizeImages(imageUrls, fallbackSrc) {
  if (Array.isArray(imageUrls) && imageUrls.length > 0) return imageUrls.filter(Boolean)
  if (fallbackSrc) return [fallbackSrc]
  return []
}

export default function ImageCarousel({
  imageUrls,
  src,
  alt,
  aspectClass = 'aspect-[4/3]',
  showCountBadge = false,
  badgeText,
}) {
  const images = useMemo(() => normalizeImages(imageUrls, src), [imageUrls, src])
  const [index, setIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className={`flex ${aspectClass} w-full items-center justify-center bg-slate-100 text-sm text-slate-500`}>
        No image
      </div>
    )
  }

  const hasMany = images.length > 1
  const safeIndex = index < images.length ? index : 0

  const goPrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length)
  const goNext = () => setIndex((prev) => (prev + 1) % images.length)

  return (
    <div className={`relative w-full overflow-hidden ${aspectClass} bg-slate-200`}>
      <img
        src={images[safeIndex]}
        alt={alt || 'Image'}
        className="h-full w-full object-cover"
        loading="lazy"
      />

      {showCountBadge && hasMany ? (
        <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur">
          {badgeText || `${images.length} photos`}
        </div>
      ) : null}

      {hasMany ? (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:bg-white"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:bg-white"
            aria-label="Next image"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-slate-900/60 px-2 py-1 backdrop-blur">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={[
                  'h-2 w-2 rounded-full transition',
                  i === safeIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70',
                ].join(' ')}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}

