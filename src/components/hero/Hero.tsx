import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface HeroSectionProps {
  onBookTestRide: () => void
}

// Desktop images
const heroImages = [
  '/images/blue scooty.jpg',
  '/images/CD ev 1.jpg',
  '/images/CD 2.jpg',
  '/images/CD 3.jpg',
  '/images/CD 4.jpg',
  '/images/ChatGPT Image Nov 27, 2025, 05_26_27 PM.png',
]

// Mobile-specific images (fallback to public images to avoid missing assets)
const mobileHeroImages = heroImages

const productInfo = [
  {
    title: 'Blue Elegance',
    subtitle: 'Premium Electric Scooter',
    cta: 'Explore Model'
  },
  {
    title: 'Urban Rider',
    subtitle: 'City Commuting Redefined',
    cta: 'Learn More'
  },
  {
    title: 'Sport Edition',
    subtitle: 'Performance Meets Style',
    cta: 'View Details'
  },
  {
    title: 'Classic Design',
    subtitle: 'Timeless Electric Mobility',
    cta: 'Discover'
  },
  {
    title: 'Advanced Model',
    subtitle: 'Next-Gen Technology',
    cta: 'See Features'
  },
  {
    title: 'Future Vision',
    subtitle: 'Tomorrow\'s Ride Today',
    cta: 'Pre-Order Now'
  },
]

const HeroSection = ({ onBookTestRide }: HeroSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagesToLoad = isMobile ? mobileHeroImages : heroImages
      const imagePromises = imagesToLoad.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = resolve
          img.onerror = reject
          img.src = src
        })
      })
      
      try {
        await Promise.all(imagePromises)
        setImagesLoaded(true)
      } catch (error) {
        console.error('Error preloading images:', error)
        setImagesLoaded(true) // Continue even if some images fail
      }
    }
    
    preloadImages()
  }, [isMobile])

  // Auto-play slideshow
  useEffect(() => {
    if (!imagesLoaded) return
    
    const currentImages = isMobile ? mobileHeroImages : heroImages
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 4500) // 4.5 seconds

    return () => clearInterval(interval)
  }, [imagesLoaded, isMobile])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    const currentImages = isMobile ? mobileHeroImages : heroImages
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? currentImages.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    const currentImages = isMobile ? mobileHeroImages : heroImages
    setCurrentIndex((prevIndex) => 
      prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1
    )
  }

  // Loading state
  if (!imagesLoaded) {
    return (
      <section className="relative h-[56.25vw] max-h-[90vh] min-h-[500px] w-full bg-gradient-to-br from-gray-900 to-black overflow-hidden mt-[72px] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-12 h-12 border-3 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-light">Loading...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-[56.25vw] max-h-[90vh] min-h-[500px] w-full bg-black overflow-hidden mt-[72px]">
      {/* Image Container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              opacity: { duration: 0.8, ease: "easeInOut" },
              scale: { duration: 1.2, ease: "easeOut" }
            }}
          >
            {/* Desktop/Tablet (md and up): use desktop images with object-contain */}
            <img
              src={heroImages[currentIndex % heroImages.length]}
              alt={`EV Scooter ${currentIndex + 1}`}
              className="hidden md:block w-full h-full object-contain"
              loading="eager"
              onError={(e) => {
                console.error('Failed to load image:', heroImages[currentIndex % heroImages.length])
                e.currentTarget.style.backgroundColor = '#374151'
              }}
            />
            
            {/* Mobile: use mobile-specific images with object-cover */}
            <img
              src={mobileHeroImages[currentIndex % mobileHeroImages.length]}
              alt={`EV Scooter Mobile ${currentIndex + 1}`}
              className="md:hidden w-full h-full object-cover"
              loading="eager"
              onError={(e) => {
                console.error('Failed to load image:', mobileHeroImages[currentIndex % mobileHeroImages.length])
                e.currentTarget.style.backgroundColor = '#374151'
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 p-4 md:p-8">
        <div className="max-w-4xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="space-y-4 md:space-y-6 text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {productInfo[currentIndex].title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light">
                {productInfo[currentIndex].subtitle}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBookTestRide}
                className="px-6 md:px-8 py-3 md:py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors mt-4"
              >
                {productInfo[currentIndex].cta}
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {(isMobile ? mobileHeroImages : heroImages).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white w-6 md:w-8' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
    </section>
  )
}

export default HeroSection