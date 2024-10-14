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
}

interface ExpandableCardDemoProps {
  websites: Website[]
  filterTags?: string[]
  imagePlaceholder: string
}

export default function ExpandableCardDemo({ websites, filterTags = [], imagePlaceholder }: ExpandableCardDemoProps) {

  const [active, setActive] = useState<Website | null>(null)
  const id = useId()
  const ref = useRef<HTMLDivElement>(null)

  const filteredWebsites = filterTags.length
    ? websites.filter((website) => filterTags.every((tag) => website.Tags.includes(tag)))
    : websites

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null)
      }
    }

    if (active) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [active])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setActive(null)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [ref])

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
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.id}-${id}`}>
                <Image
                  priority
                  width={500}
                  height={300}
                  src={imagePlaceholder}
                  alt={active.Title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div className="p-4">
                <motion.h3
                  layoutId={`title-${active.id}-${id}`}
                  className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                >
                  {active.Title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${active.id}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-base mt-2"
                >
                  {active.Description}
                </motion.p>
                {active.URL && (
                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-4 py-2 text-sm rounded-full font-bold  text-primary-foreground bg-orange-300 hover:bg-orange-400"
                  >
                    Visit Website
                  </motion.a>
                )}
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
                </div>
               
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ul className="max-w-5xl mx-auto w-full grid grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  items-start gap-4 py-10">
        {filteredWebsites.map((website) => (
          <motion.div
            layoutId={`card-${website.id}-${id}`}
            key={website.id}
            onClick={() => setActive(website)}
            className="p-4 flex flex-col bg-neutral-50  hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <motion.div layoutId={`image-${website.id}-${id}`}>
              <Image
                width={400}
                height={225}
                src={imagePlaceholder}
                alt={website.Title}
                className="h-60 w-full  rounded-lg object-cover object-top"
              />
            </motion.div>
            <div className="mt-4">
              <motion.h3
                layoutId={`title-${website.id}-${id}`}
                className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
              >
                {website.Title}
              </motion.h3>
              <motion.p
                layoutId={`description-${website.id}-${id}`}
                className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
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
          </motion.div>
        ))}
      </ul>
    </>
  )
}


