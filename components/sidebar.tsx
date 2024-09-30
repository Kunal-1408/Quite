'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ToggleButton({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  return (
    <button
      className="absolute top-4 left-1 z-10 hover:bg-accent hover:text-accent-foreground h-10 w-10"
      onClick={toggleSidebar}
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
    >
      {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </button>
  )
}

export default function SidebarDemo() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkViewport = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setIsOpen(!mobile)
    }

    checkViewport()
    window.addEventListener('resize', checkViewport)

    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  useEffect(() => {
    if (isMobile) {
      const openParam = searchParams.get('open')
      setIsOpen(openParam === null ? false : openParam !== 'false')
    }
  }, [searchParams, isMobile])

  const toggleSidebar = () => {
    if (isMobile) {
      const newIsOpen = !isOpen
      setIsOpen(newIsOpen)
      const params = new URLSearchParams(searchParams.toString())
      params.set('open', newIsOpen ? 'true' : 'false')
      router.push(`?${params.toString()}`)
    }
  }

  return (
    <div className="flex h-screen">
      <aside
        className={`bg-slate-50 dark:bg-neutral-700 border-r transition-all duration-300 ease-in-out relative
          ${isMobile ? (isOpen ? 'w-full' : 'w-0') : 'w-full sm:w-full'}`}
      >
        {isMobile && <ToggleButton isOpen={isOpen} toggleSidebar={toggleSidebar} />}
        <div className={`p-6 ${isMobile && !isOpen ? 'hidden' : 'block'}`}>
          <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
          <form action="/api/update-profile" method="POST">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" defaultValue="@peduarte" />
              </div>
              <button type="submit" className="w-full">Save changes</button>
            </div>
          </form>
        </div>
      </aside>
    </div>
  )
}