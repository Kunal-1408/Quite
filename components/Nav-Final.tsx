"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, useNavbarBackground,activeLogo, ProductItem,Item } from "./ui/navbar-menu";
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
    "fixed top-0 w-full max-w mx-auto z-50 transition-colors duration-300 flex ",
    className,
    {
      'bg-transparent text-white': !isSolid,
      'bg-white text-black shadow-md border-b-2 border-neutral-400': isSolid,
    
    }
  );
  const logoClass = cn(
    {
      '/QG BLACK.png': !isSecond,
      'Logo.svg': isSecond,
    }
  );
  return (
      <div
      className={ navbarClass}
    >   
        <div className="bg-transparent grow-0">
        <Link href={"http://localhost:3000"}>
          <Image src={logoClass} alt="logo" height={70} width={90} className="h-22"/>
        </Link>
        </div>

        
        <div className="grow">
        <Menu setActive={setActive}>
        <Item title="Home" href="http://localhost:3000" >
        </Item>
          <MenuItem setActive={setActive} active={active} item="Services">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/web-dev">Web Development</HoveredLink>
              <HoveredLink href="/interface-design">Interface Design</HoveredLink>
              <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
              <HoveredLink href="/branding">Branding</HoveredLink>
            </div>
          </MenuItem>
          <Item title="Works" href="/works"></Item>
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
          <Item title="About" href="/AboutUs" >
          </Item>
        </Menu>
        </div>

    </div>

    
  );
}
