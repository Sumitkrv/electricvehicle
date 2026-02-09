import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const ProductGallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [imageLoaded, setImageLoaded] = useState<{[key: number]: boolean}>({})
  const constraintsRef = useRef(null)

  const galleryImages = [
    { src: '/images/CD_EV15783.jpg', title: 'Aerodynamic Excellence', category: 'Design', color: 'from-blue-500/20 to-cyan-500/20' },
    { src: '/images/CD_EV15757.jpg', title: 'Intelligent Dashboard', category: 'Technology', color: 'from-purple-500/20 to-pink-500/20' },
    { src: '/images/CD_EV15705.jpg', title: 'Dynamic Performance', category: 'Power', color: 'from-orange-500/20 to-red-500/20' },
  ]

  // Preload all images immediately
  useEffect(() => {
    galleryImages.forEach((image, index) => {
      const img = new Image()
      img.onload = () => setImageLoaded(prev => ({ ...prev, [index]: true }))
      img.src = image.src
    })
  }, [])

  return (
    <section id="gallery" className="relative py-32 bg-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative container-custom">
        {/* Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-px bg-gray-900/20 mb-8"
          />
          
          <h2 className="font-light text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 text-gray-900">
            Gallery
          </h2>
          
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl">
            Every angle tells a story of precision engineering and timeless design
          </p>
        </motion.div>

        {/* Masonry-style Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ 
                delay: index * 0.05, 
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
                {/* Gradient Glow */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-br ${image.color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700`}
                  animate={{
                    scale: hoveredIndex === index ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200 group-hover:border-gray-300 transition-colors duration-500">
                  {/* Image */}
                  <motion.img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />

                  {/* Loading Skeleton */}
                  {!imageLoaded[index] && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  )}

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0" />

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: hoveredIndex === index ? '100%' : '-100%' }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                  />

                  {/* Category Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="absolute top-4 left-4 z-10"
                  >
                    <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                      <span className="text-xs font-medium tracking-wider uppercase text-white">
                        {image.category}
                      </span>
                    </div>
                  </motion.div>

                  {/* Title Overlay */}
                  <motion.div
                    className="absolute inset-x-0 bottom-0 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      y: hoveredIndex === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="text-xl font-light text-white tracking-tight">
                      {image.title}
                    </h3>
                  </motion.div>

                  {/* Border Accent on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      boxShadow: hoveredIndex === index ? '0 0 0 2px rgba(255,255,255,0.1)' : 'none',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-3 gap-8 py-12 border-t border-b border-gray-200 max-w-4xl mx-auto"
        >
          {[
            { 
              value: galleryImages.length.toString(), 
              label: 'Premium Shots',
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              )
            },
            { 
              value: '4K', 
              label: 'Ultra HD',
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )
            },
            { 
              value: '360°', 
              label: 'All Angles',
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              )
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-center"
            >
              <motion.div
                className="flex justify-center mb-3 text-gray-600"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {stat.icon}
              </motion.div>
              <div className="text-3xl md:text-4xl font-light mb-2 text-gray-900">{stat.value}</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}

export default ProductGallery
