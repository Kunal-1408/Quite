'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ToggleButton({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  return (
    <button
      className="fixed top-4 left-4 z-50 md:hidden border border-input bg-slate-100 hover:bg-accent hover:text-accent-foreground h-10 w-10"
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
      if (!mobile && !isOpen) {
        setIsOpen(true)
        const params = new URLSearchParams(searchParams.toString())
        params.delete('open')
        router.push(`?${params.toString()}`)
      }
    }

    checkViewport()
    window.addEventListener('resize', checkViewport)

    return () => window.removeEventListener('resize', checkViewport)
  }, [isOpen, searchParams, router])

  useEffect(() => {
    if (isMobile) {
      const openParam = searchParams.get('open')
      setIsOpen(openParam === null ? false : openParam !== 'false')
    } else {
      setIsOpen(true)
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
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <aside
        className={`bg-background border-r transition-all duration-300 ease-in-out h-full
          ${isMobile 
            ? `fixed top-0 left-0 z-40 ${isOpen ? 'w-[300px]' : 'w-0'}`
            : 'w-[300px] sm:w-[400px]'
          }`}
      >
        <div className={`p-6 h-full bg-slate-50 overflow-y-auto ${isMobile && !isOpen ? 'hidden' : 'block'}`}>
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
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          aria-hidden="true"
          onClick={toggleSidebar}
        />
      )}
      <ToggleButton isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </div>
  )
}