'use client'

import { useEffect, useRef, useState } from "react"
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

interface tags{
  tag:{
    type: string;
    content: string[];
  }
}




export default function Dashboard() {
  // const [currentPage, setCurrentPage] = useState(1)
  const [activeTagManager, setActiveTagManager] = useState<string | null>(null)

  const allTags = [{title:"Site Type",tags:["E-commerce","Dynamic","Micro"]},
  {title:"Industry",tags:["Agriculture","Healthcare","Manufacturing","Fashion","Cosmetic"]},
  {title:"Country",tags:["India","Dubai","Sri-Lanka"]}]


  const [editingWebsite, setEditingWebsite] = useState<string | null>(null)
  const [editedWebsite, setEditedWebsite] = useState<Website | null>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const [websites, setWebsites] = useState<Website[]>([]); 
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const websitesPerPage = 10;

  useEffect(() => {
    const fetchWebsites = async () => {
      const response = await fetch(`/api/fetch?page=${currentPage}&limit=${websitesPerPage}`, {
        method: 'GET',
      });
      const { websites, total } = await response.json();

      setWebsites(websites);
      setTotal(total);
    };

    fetchWebsites();
  }, [currentPage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setEditingWebsite(null)
        setEditedWebsite(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const totalPages = Math.ceil(total / websitesPerPage);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))


  const toggleTagManager = () => {
    setActiveTagManager(activeTagManager ? null : editingWebsite)
  }

  const addTag = (newTag: string) => {
    if (editedWebsite) {
      setEditedWebsite({
        ...editedWebsite,
        Tags: [...new Set([...editedWebsite.Tags, newTag])]
      })
    }
  }

  const removeTag = (tagToRemove: string) => {
    if (editedWebsite) {
      setEditedWebsite({
        ...editedWebsite,
        Tags: editedWebsite.Tags.filter(tag => tag !== tagToRemove)
      })
    }
  }

  const toggleEdit = (website: Website) => {
    if (editingWebsite === website.id) {
      setEditingWebsite(null)
      setEditedWebsite(null)
      setActiveTagManager(null)
    } else {
      setEditingWebsite(website.id)
      setEditedWebsite(website)
    }
  }

  const updateWebsite = () => {
    if (editedWebsite) {
      setWebsites(websites.map(w => w.id === editedWebsite.id ? editedWebsite : w))
      setEditingWebsite(null)
      setEditedWebsite(null)
      setActiveTagManager(null)
    }
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Website) => {
    if (editedWebsite) {
      setEditedWebsite({
        ...editedWebsite,
        [field]: e.target.value
      })
    }
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
              className="w-full bg-neutral-200 rounded-lg pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-neutral-300 hover:bg-accent hover:text-accent-foreground h-8 px-3 gap-1">
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
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-neutral-300 hover:bg-accent hover:text-accent-foreground h-8 px-3 gap-1">
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
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {website.Tags.map((tag, index) => (
                            <span key={index} className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                              {tag}
                            </span>
                          ))}
                        </div>
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
                            <DropdownMenuItem onClick={() => toggleEdit(website)}>
                              Edit
                            </DropdownMenuItem>
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
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-black text-neutral-200 hover:bg-accent hover:text-accent-foreground h-8 px-4"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-black text-neutral-200 hover:bg-accent hover:text-accent-foreground h-8 px-4"
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
      {editingWebsite && editedWebsite && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={popoverRef} className="bg-white rounded-lg p-6 w-[800px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Website</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-md font-semibold text-gray-700">Title</label>
                <Input
                  id="title"
                  value={editedWebsite.Title}
                  onChange={(e) => setEditedWebsite({...editedWebsite, Title: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-md font-semibold text-gray-700">Description</label>
                <Input
                      id="description"
                      value={editedWebsite.Description}
                      onChange={(e) => handleInputChange(e, 'Description')}
                      className="mt-1"
                      onInput={(e) => {
                        e.currentTarget.style.height = 'auto'
                        e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px'
                      }}
                      style={{
                        minHeight: '100px',
                        height: 'auto',
                        overflow: 'hidden',
                        resize: 'none',
                      }}
                  />
              </div>
              <div>
                <label htmlFor="status" className="block text-md font-semibold text-gray-700">Status</label>
                <select
                  id="status"
                  value={editedWebsite.Status}
                  onChange={(e) => setEditedWebsite({...editedWebsite, Status: e.target.value})}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
              <div>
                <label htmlFor="url" className="block text-md font-semibold text-gray-700">URL</label>
                <Input
                  id="url"
                  value={editedWebsite.URL}
                  onChange={(e) => setEditedWebsite({...editedWebsite, URL: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="tags" className="block text-md font-semibold text-gray-700">Tags</label>
                <div className="mt-1 flex flex-wrap gap-2 cursor-pointer" onClick={toggleTagManager}>
                  {editedWebsite.Tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {tag}
                    </span>
                  ))}
                </div>
                {activeTagManager === editingWebsite && (
                    <div className="mt-2 p-2 ">
                      <div className="flex flex-col space-y-4">
                        {allTags.map((title, index) => (
                          <div key={index} className="pb-2 flex flex-col border border-dashed border-gray-200 rounded-md"> 
                            <h5 className="text-neutral-400 text-md font-semibold mb-2">
                              {title.title}
                            </h5>
                            <div className="flex flex-wrap gap-2 "> 
                              {title.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className={`cursor-pointer h-6 max-w-full flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full border border-orange-300 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0)] transition duration-200 ${
                                    editedWebsite.Tags.includes(tag)
                                      ? "bg-orange-200 text-orange-800"
                                      : "bg-white/20 text-gray-800 hover:bg-gray-200"
                                  }`}
                                  onClick={() =>
                                    editedWebsite.Tags.includes(tag) ? removeTag(tag) : addTag(tag)
                                  }
                                >
                                  {tag}
                                  {editedWebsite.Tags.includes(tag) && (
                                    <X
                                      className="ml-1 h-3 w-3"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeTag(tag);
                                      }}
                                    />
                                  )}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

              </div>
              <div>
                <label htmlFor="lastUpdated" className="block text-sm font-medium text-gray-700">Last Updated</label>
                <Input
                  id="lastUpdated"
                  type="date"
                  value={editedWebsite.Content_Update_Date}
                  onChange={(e) => setEditedWebsite({...editedWebsite, Content_Update_Date: e.target.value})}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setEditingWebsite(null)
                  setEditedWebsite(null)
                  setActiveTagManager(null)
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={updateWebsite}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}