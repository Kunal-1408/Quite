"use client"

import Image from "next/image"
import React, { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

interface Social {
  id: string
  Brand: string
  Description: string
  Logo: string
  Stats: SocialStats[]
  banner: string
  highlighted: boolean
  tags: string[]
}

interface SocialStats {
  impression?: string
  interactions?: string
  reach?: string
}

interface SocialProjectsProps {
  socials: Social[]
  filterTags?: string[]
}

export default function SocialProjects({ socials, filterTags = [] }: SocialProjectsProps) {
    const [active, setActive] = useState<Social | null>(null)
    const [hoveredSocial, setHoveredSocial] = useState<Social | null>(null)
    const id = useId()
    const ref = useRef<HTMLDivElement>(null)
  
    const filteredBrands = filterTags.length
      ? brands.filter((brand) => filterTags.every((tag) => brand.tags.includes(tag)))
      : brands
  
    const sortedBrands = [...filteredBrands].sort((a, b) => {
      if (a.highlighted && !b.highlighted) return -1
      if (!a.highlighted && b.highlighted) return 1
      return 0 
    })
  
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
  
    const handleMouseEnter = (brand: Social) => {
      setHoveredSocial(brand)
    }
  
    const handleMouseLeave = () => {
      setHoveredSocial(null)
    }
  
    const handleClick = (brand: Social) => {
      setActive(brand)
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
                className="w-full max-w-[800px] h-[800px] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
              >
                <div className="m-4">
                  <motion.div layoutId={`image-${active.id}-${id}`} className="relative h-[400px] overflow-hidden rounded-xl">
                    <motion.div
                      animate={{
                        y: ["0%", "-62.5%", "-62.5%", "0%"],
                      }}
                      transition={{
                        y: {
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        },
                      }}
                      className="absolute inset-0 w-full"
                      style={{ height: "268.75%" }}  
                    >
                      <Image
                        priority
                        fill
                        src={active.banner}
                        alt={`${active.Brand} - Full Image`}
                        className="object-cover object-top"
                      />
                    </motion.div>
                  </motion.div>
                </div>
  
                <div className="p-6 flex flex-col h-full">
                  <div className="flex flex-row justify-between items-center">
                    <motion.h3
                      layoutId={`title-${active.id}-${id}`}
                      className="font-medium text-2xl text-neutral-700 dark:text-neutral-200"
                    >
                      {active.Brand}
                    </motion.h3>
                  </div>
                  
                  <div className="mt-6 flex-grow flex flex-col">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {active.tags.map((tag, index) => (
                        <motion.span
                          key={`${tag}-${index}-${id}`}
                          className="bg-white/0.2 text-gray-800 text-sm font-medium px-3 py-1 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
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
                    </div>
                    <motion.div
                      layoutId={`description-${active.id}-${id}`}
                      className="flex-grow overflow-y-auto pr-2"
                    >
                      <p className="text-neutral-600 text-base lg:text-lg dark:text-neutral-400">
                        {active.Description}
                      </p>
                    </motion.div>
                    {active.Stats.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium text-lg mb-2">Brand Stats</h4>
                        <ul>
                          {active.Stats.map((stat, index) => (
                            <li key={index} className="mb-1">
                              {stat.impression && <span>Impression: {stat.impression}</span>}
                              {stat.interactions && <span>Interactions: {stat.interactions}</span>}
                              {stat.reach && <span>Reach: {stat.reach}</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        <ul className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
        {sortedBrands.map((brand) => (
            <motion.div
              key={brand.id}
              onMouseEnter={() => handleMouseEnter(brand)}
              onMouseLeave={handleMouseLeave}
              className="p-4 flex flex-col h-[450px] w-[400px] md:h-[400px] md:w[250px] bg-card hover:bg-card/90 rounded-xl bg-neutral-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-200"
              style={{
                zIndex: hoveredSocial === brand ? 20 : 1,
              }}
            >
              <motion.div 
                layoutId={`image-${brand.id}-${id}`} 
                className="relative overflow-hidden rounded-xl"
                animate={{
                  height: hoveredSocial === brand ? 300 : 192,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{
                    y: hoveredSocial === brand ? ["0%", "-62.5%", "-62.5%", "0%"] : "0%",
                  }}
                  transition={{
                    y: {
                      duration: hoveredSocial === brand ? 20 : 0,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                  className="absolute inset-0 w-full"
                  style={{ height: "268.75%" }}
                >
                  <Image
                    fill
                    src={brand.banner}
                    alt={brand.Brand}
                    className="object-cover object-top"
                  />
                </motion.div>
              </motion.div>
              <div className="mt-4 flex justify-between items-center">
                <motion.h3
                  layoutId={`title-${brand.id}-${id}`}
                  className="font-medium text-card-foreground text-lg"
                >
                  {brand.Brand}
                </motion.h3>
                <motion.div 
                  layoutId={`logo-${brand.id}-${id}`} 
                  className="relative w-16 h-16 ml-4 flex-shrink-0"
                >
                  <Image 
                    src={brand.Logo} 
                    alt={`${brand.Brand} logo`} 
                    className="object-contain"
                    width={64}
                    height={64}
                  />
                </motion.div>
              </div>
              <motion.p
                layoutId={`description-${brand.id}-${id}`}
                className="text-muted-foreground text-sm mt-2 line-clamp-2 h-10 overflow-hidden"
              >
                {brand.Description}
              </motion.p>
              <div className="mt-3 flex flex-wrap gap-1">
                {brand.tags.slice(0, 3).map((tag, index) => (
                  <motion.span
                    key={`${tag}-${index}-${id}`}
                    className="bg-white/0.2 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
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
                {brand.tags.length > 3 && (
                  <span className="text-muted-foreground text-xs">+{brand.tags.length - 3} more</span>
                )}
              </div>
              <div className="mt-4 items-start">
                <button
                  onClick={() => handleClick(brand)}
                  className="px-4 py-2 mr-3 text-sm rounded-full font-bold text-white bg-black hover:bg-gray-800 transition-colors duration-200"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </ul>
      </>
    )
  }