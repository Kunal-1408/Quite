"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, useNavbarBackground,activeLogo, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export const Navbarimpli: React.FC = () =>{
    return (
        <div className="relative w-full flex items-center justify-center">
          <Navbar className="" />
        </div>
      );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const isSolid= useNavbarBackground();
  const isSecond = activeLogo();

  const navbarClass = cn(
    "fixed top-0 inset-x-0 max-w mx-auto z-50 transition-colors duration-300",
    className,
    {
      'bg-transparent text-white': !isSolid,
      'bg-white text-black shadow-md': isSolid,
    
    }
  );
  const logoClass = cn(
    {
      '../public/iCON.svg': !isSecond,
      '../public/Logo.svg': isSecond,
    }
  );
  return (
    <div
      className={ navbarClass}
    >
        <Link href={"#"}>
          <Image src={logoClass} alt="logo" fill={true} className="duration-300"/>
        </Link>
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Services">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/web-dev">Web Development</HoveredLink>
              <HoveredLink href="/interface-design">Interface Design</HoveredLink>
              <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
              <HoveredLink href="/branding">Branding</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Case studies">
            <div className="  text-sm grid grid-cols-2 gap-10 p-4">
              <ProductItem
                title="Algochurn"
                href="https://algochurn.com"
                src="https://i.imgur.com/0K1CoIw.jpeg"
                description="Prepare for tech interviews like never before."
              />
              <ProductItem
                title="Tailwind Master Kit"
                href="https://tailwindmasterkit.com"
                src="https://i.imgur.com/0K1CoIw.jpeg"
                description="Production ready Tailwind css components for your next project"
              />
              <ProductItem
                title="Moonbeam"
                href="https://gomoonbeam.com"
                src="https://i.imgur.com/0K1CoIw.jpeg"
                description="Never write from scratch again. Go from idea to blog in minutes."
              />
              <ProductItem
                title="Rogue"
                href="https://userogue.com"
                src="https://i.imgur.com/0K1CoIw.jpeg"
                description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
              />
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Pricing">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/hobby">Hobby</HoveredLink>
              <HoveredLink href="/individual">Individual</HoveredLink>
              <HoveredLink href="/team">Team</HoveredLink>
              <HoveredLink href="/enterprise">Enterprise</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Careers">
          <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/hobby">1</HoveredLink>
              <HoveredLink href="/individual">2</HoveredLink>
              <HoveredLink href="/team">3</HoveredLink>
              <HoveredLink href="/enterprise">4</HoveredLink>
          </div>
          </MenuItem>
        </Menu>
    </div>
  );
}
