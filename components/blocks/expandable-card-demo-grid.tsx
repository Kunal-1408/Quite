"use client"

import Image from "next/image"
import React, { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

interface Website {
  id: string
  Description: string
  Status?: string
  Tags: string[]
  Title: string
  URL?: string
  Images: string[]
}

interface ExpandableCardDemoProps {
  websites: Website[]
  filterTags?: string[]
}

export default function ExpandableCardDemo({ websites, filterTags = [] }: ExpandableCardDemoProps) {
  const [active, setActive] = useState<Website | null>(null)
  const [hoveredWebsite, setHoveredWebsite] = useState<Website | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const id = useId()
  const ref = useRef<HTMLDivElement>(null)

  const filteredWebsites = filterTags.length
    ? websites.filter((website) => filterTags.every((tag) => website.Tags.includes(tag)))
    : websites

  useEffect(() => {
    if (hoveredWebsite && hoveredWebsite.Images && hoveredWebsite.Images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hoveredWebsite.Images.length)
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [hoveredWebsite])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setActive(null)
      }
    }

    if (active) {
      document.addEventListener("mousedown", handleOutsideClick)
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [active])

  const handleMouseEnter = (website: Website) => {
    setHoveredWebsite(website)
  }

  const handleMouseLeave = () => {
    setHoveredWebsite(null)
    setCurrentImageIndex(0)
  }

  const handleClick = (website: Website) => {
    setActive(website)
  }

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.id}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <X className="h-4 w-4" />
            </motion.button>
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[600px] h-[600px] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.id}-${id}`} className="relative h-80">
                {active.Images && active.Images.length > 0 ? (
                  <Image
                    priority
                    fill
                    src={active.Images[0]}
                    alt={`${active.Title} - Main Image`}
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </motion.div>

              <div className="p-4">
                <div className="flex flex-row justify-between">
                <motion.h3
                  layoutId={`title-${active.id}-${id}`}
                  className="font-medium text-lg text-neutral-700 dark:text-neutral-200"
                >
                  {active.Title}
                </motion.h3>
                
                {active.URL && (
                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 text-sm rounded-full font-bold text-white bg-orange-400 hover:bg-orange-500 text-primary-foreground"
                  >
                    Visit Website
                  </motion.a>
                )}

                </div>
                
                <div className="mt-4">
                  {active.Tags.map((tag, index) => (
                    <motion.span
                    key={`${tag}-${index}-${id}`}
                    className="bg-white/0.2 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      duration: 0.05,   
                      ease: "easeInOut"  
                    }}
                  >
                    {tag}
                  </motion.span>
                  ))}
                  <motion.p
                  layoutId={`description-${active.id}-${id}`}
                  className="text-neutral-600 mt-5 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                >
                  {active.Description}
                </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ul className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
        {filteredWebsites.map((website) => (
          <motion.div
            key={website.id}
            onMouseEnter={() => handleMouseEnter(website)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(website)}
            className="p-4 flex flex-col h-[450px] w-[400px] bg-card hover:bg-card/90 rounded-xl bg-neutral-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-200"
            style={{
              zIndex: hoveredWebsite === website ? 20 : 1,
            }}
          >
            <motion.div layoutId={`image-${website.id}-${id}`} className="relative h-48">
              <AnimatePresence mode="wait" initial={false}>
                {hoveredWebsite === website && website.Images && website.Images.length > 0 ? (
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 1.1, zIndex: 10 }}
                    exit={{ opacity: 0, scale: 1, zIndex: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 overflow-hidden rounded-lg"
                    style={{
                      position: 'absolute',
                      top: '-25%',
                      left: '-25%',
                      width: '150%',
                      height: '150%',
                    }}
                  >
                    <Image
                      fill
                      src={website.Images[currentImageIndex]}
                      alt={`${website.Title} - Image ${currentImageIndex + 1}`}
                      className="object-cover object-center"
                    />
                  </motion.div>
                ) : (
                  website.Images && website.Images.length > 0 ? (
                    <Image
                      fill
                      src={website.Images[0]}
                      alt={website.Title}
                      className="rounded-lg object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )
                )}
              </AnimatePresence>
            </motion.div>
            <div className="mt-4">
              <motion.h3
                layoutId={`title-${website.id}-${id}`}
                className="font-medium text-card-foreground text-lg"
              >
                {website.Title}
              </motion.h3>
              <motion.p
                layoutId={`description-${website.id}-${id}`}
                className="text-muted-foreground text-sm mt-2 line-clamp-2"
              >
                {website.Description}
              </motion.p>
              <div className="mt-3 flex flex-wrap gap-2">
                {website.Tags.slice(0, 3).map((tag, index) => (
                  <motion.span
                      key={`${tag}-${index}-${id}`}
                      className="bg-white/0.2 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        duration: 0.05,   
                        ease: "easeInOut"  
                      }}
                    >
                      {tag}
                    </motion.span>
                ))}
                {website.Tags.length > 3 && (
                  <span className="text-muted-foreground text-xs">+{website.Tags.length - 3} more</span>
                )}
              </div>
            </div>
            <div>
            {website.URL && (
                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={website.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 mt-4 text-sm rounded-full font-bold text-white bg-orange-400 hover:bg-orange-500 text-primary-foreground"
                  >
                    Visit Website
                  </motion.a>
                )}
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  )
}