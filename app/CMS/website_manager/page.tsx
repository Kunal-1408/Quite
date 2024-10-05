'use client'

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  File,
  Globe,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search,
  X,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Website {
  id: string
  backupDate: string
  Content_Update_Date: string
  Description: string
  Status: string
  Tags: string[]
  Title: string
  URL: string
  archive: boolean
}

// Mock function to simulate fetching data from a database
const getWebsites = (page: number = 1, perPage: number = 10): { websites: Website[], total: number } => {
  const allWebsites = Array.from({ length: 116 }, (_, i) => ({
    id: `${i + 1}`,
    backupDate: `2023-05-${(i % 30) + 1}`.padStart(10, '0'),
    Content_Update_Date: `2023-05-${(i % 30) + 1}`.padStart(10, '0'),
    Description: `Website ${i + 1} description`,
    Status: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Inactive" : "Archived",
    Tags: [`tag${i % 5 + 1}`, `tag${i % 3 + 1}`],
    Title: `Website ${i + 1}`,
    URL: `https://example${i + 1}.com`,
    archive: i % 5 === 0,
  }))

  const start = (page - 1) * perPage
  const end = start + perPage
  return {
    websites: allWebsites.slice(start, end),
    total: allWebsites.length
  }
}

// Mock function to get all available tags
const getAllTags = () => {
  return ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8', 'tag9', 'tag10']
}

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTagManager, setActiveTagManager] = useState<string | null>(null)
  const [websites, setWebsites] = useState<Website[]>([])
  const [total, setTotal] = useState(0)
  const websitesPerPage = 10
  const totalPages = Math.ceil(total / websitesPerPage)
  const allTags = getAllTags()

  useState(() => {
    const { websites, total } = getWebsites(currentPage, websitesPerPage)
    setWebsites(websites)
    setTotal(total)
  }, [currentPage])

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  const toggleTagManager = (websiteId: string) => {
    setActiveTagManager(activeTagManager === websiteId ? null : websiteId)
  }

  const addTag = (websiteId: string, newTag: string) => {
    setWebsites(websites.map(website => 
      website.id === websiteId
        ? { ...website, Tags: [...new Set([...website.Tags, newTag])] }
        : website
    ))
  }

  const removeTag = (websiteId: string, tagToRemove: string) => {
    setWebsites(websites.map(website => 
      website.id === websiteId
        ? { ...website, Tags: website.Tags.filter(tag => tag !== tagToRemove) }
        : website
    ))
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search websites..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Inactive</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-3 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Website
                </span>
              </button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Websites</CardTitle>
              <CardDescription>
                Manage your websites and view their status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">
                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 p-0">
                        Title
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {websites.map((website) => (
                    <TableRow key={website.id}>
                      <TableCell className="font-medium">{website.Title}</TableCell>
                      <TableCell>{website.Description}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          website.Status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {website.Status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {website.URL && (
                          <Link href={website.URL} className="flex items-center gap-1 text-blue-500 hover:underline">
                            <Globe className="h-4 w-4" />
                            {website.URL}
                          </Link>
                        )}
                      </TableCell>
                      <TableCell onClick={() => toggleTagManager(website.id)} className="cursor-pointer relative">
                        <div className="flex flex-wrap gap-1">
                          {website.Tags.map((tag, index) => (
                            <span key={index} className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                              {tag}
                              <button 
                                className="ml-1 text-blue-600 hover:text-blue-800"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeTag(website.id, tag)
                                }}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                        {activeTagManager === website.id && (
                          <div className="absolute z-10 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg">
                            <div className="p-2">
                              <input 
                                type="text" 
                                placeholder="Add new tag" 
                                className="w-full px-2 py-1 text-sm border rounded"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    addTag(website.id, e.currentTarget.value)
                                    e.currentTarget.value = ''
                                  }
                                }}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                            <div className="p-2 max-h-60 overflow-y-auto">
                              <div className="flex flex-wrap gap-1">
                                {allTags.filter(tag => !website.Tags.includes(tag)).map((tag, index) => (
                                  <span 
                                    key={index} 
                                    className="bg-white/0.2 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500 hover:shadow-[4px_4px_0px_0px_rgba(255,183,77)] transition duration-200"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      addTag(website.id, tag)
                                    }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{website.Content_Update_Date}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
                              aria-haspopup="true"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Backups</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              {website.archive ? "Unarchive" : "Archive"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{(currentPage - 1) * websitesPerPage + 1}-{Math.min(currentPage * websitesPerPage, total)}</strong> of <strong>{total}</strong> websites
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-4"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-4"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}