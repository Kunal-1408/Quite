'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BarChart, Bell, ChevronLeftIcon, ChevronRightIcon, CircleUser, Cog, Globe2, Home, LineChartIcon, Package, ShoppingCart, User, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu'
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'

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
        <div className="w-full bg-slate-50 border-t border-gray-200 flex flex-col">
                <div className="p-4 flex justify-between items-center border-b border-gray-200">
                  <h1 className="text-xl font-semibold flex items-center">
                    <Package className="mr-2 h-6 w-6" />
                    Quite Good
                  </h1>
                  <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 items-center">
                                <CircleUser className="h-6 w-6 " />
                                <span className="sr-only">Toggle user menu</span>
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>My Account</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Settings</DropdownMenuItem>
                              <DropdownMenuItem>Support</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <nav className="flex-1 overflow-y-auto">
                  <ul className="py-8 space-y-2">
                    <li className='text-sm font-medium text-neutral-500 mx-auto'>
                      <Link href="/CMS/Dashboard">
                      <button className='flex flex-row p-4  rounded w-full hover:bg-slate-200'>
                      <Home className='h-5 w-5'/>
                        <span className='px-2'>
                          Dashoard
                        </span>
                      </button>  
                      </Link>
   
                    </li>
                    <li className='text-sm font-medium text-neutral-500 mx-auto'>
                      <Link href="/CMS/website_manager">
                      <button className='flex flex-row p-4  rounded w-full hover:bg-slate-200'>
                      <Globe2 className='h-5 w-5'/>
                        <span className='px-2'>
                          Website Manager
                        </span>
                      </button>
                      </Link>

                    </li>
                    <li className='text-sm font-medium text-neutral-500 mx-auto'>

                      <Link href="/CMS/Customers">
                      <button className='flex flex-row p-4  rounded w-full hover:bg-slate-200'>
                      <User className='h-5 w-5'/>
                        <span className='px-2'>
                          Clients
                        </span>
                      </button>
                      </Link>

                    </li>
                    <li className='text-sm font-medium text-neutral-500 mx-auto'>
                      <Link href="/CMS/analytics">
                      <button className='flex flex-row p-4  rounded w-full hover:bg-slate-200'>
                      <LineChartIcon className='h-5 w-5'/>
                        <span className='px-2'>
                          Analytics
                        </span>
                      </button>
                      </Link>

                    </li>

                  </ul>
                </nav>
              </div>
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