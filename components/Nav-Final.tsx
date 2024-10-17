"use client"

import React, { useState } from "react"
import { HoveredLink, Menu, MenuItem, useNavbarBackground, activeLogo, Item } from "./ui/navbar-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from 'next/navigation'

export const Navbarimpli: React.FC = () => {
  const pathname = usePathname()
  const isLandingPage = pathname === '/'

  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="" isLandingPage={isLandingPage} />
    </div>
  )
}

function Navbar({ className, isLandingPage }: { className?: string; isLandingPage: boolean }) {
  const [active, setActive] = useState<string | null>(null)
  const isSolid = useNavbarBackground()
  const isSecond = activeLogo()

  const navbarClass = cn(
    "fixed top-0 w-full mx-auto z-50 transition-colors duration-300 flex items-center justify-between px-6",
    className,
    {
      'bg-transparent': !isSolid && isLandingPage,
      'bg-white shadow-md': isSolid || !isLandingPage,
    }
  )

  const logoClass = cn({
    '/Logo-02.png': !isSecond && isLandingPage,
    '/Logo-01.png': isSecond || !isLandingPage,
  })

  const textColorClass = isLandingPage
    ? isSolid
      ? 'text-black'
      : 'text-neutral-300'
    : 'text-black'

  return (
    <div className={navbarClass}>
      <div className="flex-shrink-0 w-48 h-20 flex items-center ml-12">
        <Link href="/">
          <Image 
            src={logoClass} 
            alt="logo" 
            width={4500} 
            height={4500} 
            className="w-auto h-full object-contain"
          />
        </Link>
      </div>

      <div className="flex-grow flex justify-center">
        <Menu setActive={setActive} isLandingPage={isLandingPage} isSolid={isSolid}>
          <div className="flex space-x-8">
            <Item title="Home" href="/" isLandingPage={isLandingPage} isSolid={isSolid} />
            <MenuItem setActive={setActive} active={active} item="Services" isLandingPage={isLandingPage} isSolid={isSolid}>
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/services/web">Web Development</HoveredLink>
                <HoveredLink href="/interface-design">Interface Design</HoveredLink>
                <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
                <HoveredLink href="/branding">Branding</HoveredLink>
              </div>
            </MenuItem>
            <Item title="Works" href="/works" isLandingPage={isLandingPage} isSolid={isSolid} />
            <Item title="About" href="/AboutUs" isLandingPage={isLandingPage} isSolid={isSolid} />
          </div>
        </Menu>
      </div>

      {/* This empty div balances the layout */}
      <div className="flex-shrink-0 w-48"></div>
    </div>
  )
}

export default Navbarimpli