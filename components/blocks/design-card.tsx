"use client"

import Image from "next/image"
import Link from 'next/link'
import React, { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

interface BrandStats {
  impression?: string
  interactions?: string
  reach?: string
}

interface Brand {
  id: string
  Brand: string
  Description: string
  Logo: string
  Stats: BrandStats[]
  tags: string[]
}

interface BrandingProjectsGridProps {
  brands: Brand[]
  filterTags?: string[]
}

export default function BrandingProjectsGrid({ brands, filterTags = [] }: BrandingProjectsGridProps) {
  const [hoveredBrand, setHoveredBrand] = useState<Brand | null>(null)
  const id = useId()

  const filteredBrands = filterTags.length
    ? brands.filter((brand) => filterTags.every((tag) => brand.tags.includes(tag)))
    : brands

  const handleMouseEnter = (brand: Brand) => {
    setHoveredBrand(brand)
  }

  const handleMouseLeave = () => {
    setHoveredBrand(null)
  }

  return (
    <>
      <ul className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
      {filteredBrands.map((brand) => (
          <motion.div
            key={brand.id}
            onMouseEnter={() => handleMouseEnter(brand)}
            onMouseLeave={handleMouseLeave}
            className="p-4 flex flex-col h-[450px] w-[400px] md:h-[400px] md:w[250px] bg-card hover:bg-card/90 rounded-xl bg-neutral-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-200"
            style={{
              zIndex: hoveredBrand === brand ? 20 : 1,
            }}
          >
            <motion.div 
              layoutId={`logo-${brand.id}-${id}`} 
              className="relative overflow-hidden rounded-xl h-48"
            >
              <Image
                fill
                src={brand.Logo}
                alt={brand.Brand}
                className="object-contain"
              />
            </motion.div>
            <div className="mt-4">
              <motion.h3
                layoutId={`title-${brand.id}-${id}`}
                className="font-medium text-card-foreground text-lg"
              >
                {brand.Brand}
              </motion.h3>
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
              <Link
                href={`/works/brands/${brand.id}`}
                className="px-4 py-2 mr-3 text-sm rounded-full font-bold text-white bg-black hover:bg-gray-800 transition-colors duration-200"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  )
}