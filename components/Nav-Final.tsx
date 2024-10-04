"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, useNavbarBackground,activeLogo,Item } from "./ui/navbar-menu";
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
    "fixed top-0 center w-full mx-auto z-50 transition-colors duration-300 flex px-10",
    className,
    {
      'bg-transparent text-white': !isSolid,
      'bg-white  shadow-md border-b-2 border-neutral-400': isSolid,
    
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
          <Image src={logoClass} alt="logo" height={50} width={90} className=""/>
        </Link>
        </div>

        
        <div className="grow justify-between">
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
          <Item title="About" href="/AboutUs" >
          </Item>
        </Menu>
        </div>

    </div>

    
  );
}
