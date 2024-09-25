'use client'
import Link from "next/link";
import Image from "next/image";
import {
    Bell,
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package2,
    Search,
    Users,
    Globe,
    Package,
    DollarSign,
    Activity,
    CreditCard,
    ArrowUpRight,
    Badge,
    Table,
    ShoppingCart,
    User
  } from "lucide-react"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useState, useEffect } from "react";



export default function Dashboard() {

  return (
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-white dark:bg-neutral-600 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-14 items-center border-b px-4 ">
                <Link href={'/'} className="flex items-center gap-2 font-semibold">
                    <Image src={"/iCON.svg"} alt="logo" height={6} width={10} ></Image>
                    <span className="text-black dark:text-neutral-200"> Quite Good</span>
                </Link>
                <button className="ml-auto h-8 w-8 rounded-sm outline hover:bg-gray-400">
                  <Bell className="h-4 w-4"/>
                  <span className="sr-only"> Toggle Notification</span>
                </button>
              </div>
              <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium">
                  <Link href={"/"} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                    <Home className="h-4 w-4"/>
                    Dashboard
                  </Link>
                  <Link href={"/"} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                    <Globe className="h-4 w-4"/>
                    Website Manager
                  </Link>
                  <Link href={"/"} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                    <User className="h-4 w-4"/>
                    Clients
                  </Link>
                  <Link href={"/"} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                    <LineChart className="h-4 w-4"/>
                    Analytics
                  </Link>

                </nav>

              </div>

            </div>
            <div className="flex flex-col">
              <header className="flex h-14 items-center gap-4 border-b bg-neutral-100 dark:bg-neutral-700">
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="shrink-0 outline hover: bg-gray-500 h-5 w-5">
                      <Menu className="h-5 w-5"/>
                      <span className="sr-only-">Toggle Navigation</span>
                    </button>
                  </SheetTrigger>
                  <SheetContent side={"left"} className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                      <Link href={"/"} className="flex items-center gap-2 text-lg font-semibold">
                          <Image src={"/logo.svg"} alt="logo" fill={true } className="h-6 w-6">

                          </Image>
                          <span className="sr-only"> Quite Good</span>

                      </Link>
                      <Link href={"/"} className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        <Home className="h-5 w-5"/>
                        Dashboard
                      </Link>
                      <Link href={"/"} className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        <Globe className="h-5 w-5"/>
                        Website Manager
                      </Link>
                      <Link href={"/"} className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        <User className="h-5 w-5"/>
                        Clients
                      </Link>
                      <Link href={"/"} className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        <LineChart className="h-5 w-5"/>
                        Analytics
                      </Link>

                    </nav>

                  </SheetContent>

                </Sheet>
                <div className="w-full flex-1">
                  <form>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                      />
                    </div>
                  </form>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 w-10">
                      <CircleUser className="h-5 w-5"/>
                      <span className="sr-only"> Toggle Menu</span>

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

              </header>

            </div>

          </div>

      </div>
  )
}