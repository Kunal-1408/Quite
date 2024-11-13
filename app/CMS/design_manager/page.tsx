'use client'

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  File,
  MoreHorizontal,
  PlusCircle,
  Search,
  Star,
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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

interface Design {
  id: string
  Banner: string
  Brands: string
  Description: string
  Logo: string
  Type: string
  highlighted: boolean
  tags: string[]
}

interface TagGroup {
  title: string
  tags: string[]
  color: string
}

interface Notification {
  id: number
  message: string
  type: 'success' | 'error'
}

export default function DesignDashboard() {
  const [activeTagManager, setActiveTagManager] = useState<string | null>(null)
  const [editingDesign, setEditingDesign] = useState<string | null>(null)
  const [editedDesign, setEditedDesign] = useState<Design | null>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const [designs, setDesigns] = useState<Design[]>([])
  const [filteredDesigns, setFilteredDesigns] = useState<Design[]>([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [highlightedCount, setHighlightedCount] = useState(0)
  const [isAddingDesign, setIsAddingDesign] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const designsPerPage = 10

  const allTags: TagGroup[] = [
    {title:"Design Type", tags:["Logo", "Brochure", "Website", "Packaging"], color: "hsl(221, 83%, 53%)"},
    {title:"Style", tags:["Minimalist", "Modern", "Vintage", "Abstract"], color: "hsl(140, 71%, 45%)"},
    {title:"Color Scheme", tags:["Monochrome", "Pastel", "Vibrant", "Earth Tones"], color: "hsl(291, 64%, 42%)"}
  ]

  const [newDesign, setNewDesign] = useState<Design>({
    id: '',
    Banner: '',
    Brands: '',
    Description: '',
    Logo: '',
    Type: '',
    highlighted: false,
    tags: []
  })

  useEffect(() => {
    fetchDesigns()
  }, [currentPage, searchQuery])

  const fetchDesigns = async () => {
    try {
      const response = await fetch(`/api/fetch?projectType=design&page=${currentPage}&search=${searchQuery}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDesigns(data.designs);
      setFilteredDesigns(data.designs);
      setTotal(data.total);
      setHighlightedCount(data.designs.filter((d: { highlighted: any }) => d.highlighted).length);
    } catch (error) {
      console.error("Error fetching designs:", error);
      addNotification("Failed to fetch designs.", "error");
    }
  }

  const toggleHighlight = async (designId: string) => {
    try {
      const response = await fetch(`/api/designs/${designId}/highlight`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectType: 'design' }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedDesign = await response.json();
      const updatedDesigns = designs.map(design =>
        design.id === designId ? { ...design, highlighted: !design.highlighted } : design
      );
      setDesigns(updatedDesigns);
      setFilteredDesigns(updatedDesigns);
      setHighlightedCount(updatedDesigns.filter(d => d.highlighted).length);
      addNotification(`Design has been ${updatedDesign.highlighted ? 'highlighted' : 'unhighlighted'}.`, 'success');
    } catch (error) {
      console.error("Error toggling highlight:", error);
      addNotification("Failed to toggle highlight.", "error");
    }
  }

  const addNotification = (message: string, type: 'success' | 'error') => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id))
    }, 5000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Design) => {
    if (editedDesign) {
      setEditedDesign({
        ...editedDesign,
        [field]: e.target.value
      })
    } else if (isAddingDesign) {
      setNewDesign({
        ...newDesign,
        [field]: e.target.value
      })
    }
  }

  const toggleTagManager = () => {
    setActiveTagManager(activeTagManager ? null : 'active');
  }

  const addTag = (newTag: string) => {
    if (editedDesign) {
      setEditedDesign({
        ...editedDesign,
        tags: [...new Set([...editedDesign.tags, newTag])]
      })
    } else if (isAddingDesign) {
      setNewDesign({
        ...newDesign,
        tags: [...new Set([...newDesign.tags, newTag])]
      })
    }
  }

  const removeTag = (tagToRemove: string) => {
    if (editedDesign) {
      setEditedDesign({
        ...editedDesign,
        tags: editedDesign.tags.filter(tag => tag !== tagToRemove)
      })
    } else if (isAddingDesign) {
      setNewDesign({
        ...newDesign,
        tags: newDesign.tags.filter(tag => tag !== tagToRemove)
      })
    }
  }

  const getTagColor = (tag: string) => {
    const tagGroup = allTags.find(group => group.tags.includes(tag))
    return tagGroup ? tagGroup.color : 'hsl(0, 0%, 50%)'
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setIsSearching(true)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setIsSearching(false)
    setFilteredDesigns(designs)
  }

  const exportDesigns = () => {
    // Implement export logic here
    console.log('Exporting designs...')
    addNotification('Designs exported successfully', 'success')
  }

  const handleSave = async () => {
    try {
      const response = await fetch('/api/designs', {
        method: isAddingDesign ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...(isAddingDesign ? newDesign : editedDesign!), projectType: 'design' }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const savedDesign = await response.json();
      addNotification('Design saved successfully!', 'success');
      fetchDesigns();
      setEditingDesign(null);
      setEditedDesign(null);
      setIsAddingDesign(false);
      setNewDesign({
        id: '',
        Banner: '',
        Brands: '',
        Description: '',
        Logo: '',
        Type: '',
        highlighted: false,
        tags: []
      });
    } catch (error) {
      console.error('Error saving design:', error);
      addNotification('Failed to save design.', 'error');
    }
  };


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex items-center">
            <div className="relative w-full max-w-sm">
              <Input
                type="search"
                placeholder="Search designs..."
                className="w-full pr-20"
                value={searchQuery}
                onChange={handleSearch}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button 
                  className="h-full px-2 text-gray-400 hover:text-gray-600" 
                  onClick={() => fetchDesigns()}
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </button>
                {isSearching && (
                  <button
                    onClick={clearSearch}
                    className="h-full px-2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={exportDesigns}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-neutral-300 hover:bg-accent hover:text-accent-foreground h-8 px-3 gap-1"
              >
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </button>
              <button 
                onClick={() => setIsAddingDesign(true)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-3 gap-1"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Design
                </span>
              </button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Designs</CardTitle>
              <CardDescription>
                Manage your design projects and view their details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">
                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 p-0">
                        Type
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Brands</TableHead>
                    <TableHead>Banner</TableHead>
                    <TableHead>Logo</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDesigns.length > 0 ? (
                    filteredDesigns.map((design) => (
                      <TableRow key={design.id}>
                        <TableCell className="font-medium">{design.Type}</TableCell>
                        <TableCell className="max-w-md">
                          <div className="line-clamp-3 overflow-hidden text-ellipsis">
                            {design.Description}
                          </div>
                        </TableCell>
                        <TableCell>{design.Brands}</TableCell>
                        <TableCell>
                          <img src={design.Banner} alt={`${design.Type} banner`} className="w-20 h-10 object-cover" />
                        </TableCell>
                        <TableCell>
                          <img src={design.Logo} alt={`${design.Type} logo`} className="w-10 h-10 object-contain" />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {design.tags.map((tag, index) => (
                              <span 
                                key={index} 
                                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" 
                                style={{
                                  backgroundColor: `color-mix(in srgb, ${getTagColor(tag)} 25%, white)`,
                                  color: getTagColor(tag),
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </TableCell>
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
                              <DropdownMenuItem onClick={() => setEditingDesign(design.id)} className="items-center">
                                Edit
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => toggleHighlight(design.id)}
                            className={`p-1 rounded-full ${
                              design.highlighted ? 'text-yellow-500' : 'text-gray-300'
                            } hover:text-yellow-500 transition-colors`}
                          >
                            <Star className="h-5 w-5" fill={design.highlighted ? 'currentColor' : 'none'} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No designs found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{filteredDesigns.length > 0 ? (currentPage - 1) * designsPerPage + 1 : 0}-{Math.min(currentPage * designsPerPage, filteredDesigns.length)}</strong> of <strong>{filteredDesigns.length}</strong> designs
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-black text-neutral-200 hover:bg-accent hover:text-accent-foreground h-8 px-4"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-black text-neutral-200 hover:bg-accent hover:text-accent-foreground h-8 px-4"
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={currentPage === Math.ceil(total / designsPerPage)}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
      {(editingDesign !== null || isAddingDesign) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={popoverRef} className="bg-white rounded-lg p-6 w-[800px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{isAddingDesign ? "Add Design" : "Edit Design"}</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="type" className="block text-md font-semibold text-gray-700">Type</label>
                <Input
                  id="type"
                  value={isAddingDesign ? newDesign.Type : editedDesign?.Type ?? ''}
                  onChange={(e) => handleInputChange(e, 'Type')}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-md font-semibold text-gray-700">Description</label>
                <Input
                  id="description"
                  value={isAddingDesign ? newDesign.Description : editedDesign?.Description ?? ''}
                  onChange={(e) => handleInputChange(e, 'Description')}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="brands" className="block text-md font-semibold text-gray-700">Brands</label>
                <Input
                  id="brands"
                  value={isAddingDesign ? newDesign.Brands : editedDesign?.Brands ?? ''}
                  onChange={(e) => handleInputChange(e, 'Brands')}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="banner" className="block text-md font-semibold text-gray-700">Banner URL</label>
                <Input
                  id="banner"
                  value={isAddingDesign ? newDesign.Banner : editedDesign?.Banner ?? ''}
                  onChange={(e) => handleInputChange(e, 'Banner')}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="logo" className="block text-md font-semibold text-gray-700">Logo URL</label>
                <Input
                  id="logo"
                  value={isAddingDesign ? newDesign.Logo : editedDesign?.Logo ?? ''}
                  onChange={(e) => handleInputChange(e, 'Logo')}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="tags" className="block text-md font-semibold text-gray-700">Tags</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {(isAddingDesign ? newDesign.tags : editedDesign?.tags ?? []).map((tag, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" 
                      style={{
                        backgroundColor: `color-mix(in srgb, ${getTagColor(tag)} 25%, white)`,
                        color: getTagColor(tag),
                      }}
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 inline-flex items-center justify-center rounded-full h-4 w-4 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <button
                  onClick={toggleTagManager}
                  className="mt-2 px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  {activeTagManager ? 'Close Tag Manager' : 'Manage Tags'}
                </button>
                {activeTagManager && (
                  <div className="mt-2 p-2 border border-gray-200 rounded">
                    {allTags.map((tagGroup, groupIndex) => (
                      <div key={groupIndex} className="mb-2">
                        <h6 className="font-semibold" style={{ color: tagGroup.color }}>{tagGroup.title}</h6>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {tagGroup.tags.map((tag, tagIndex) => (
                            <button
                              key={tagIndex}
                              onClick={() => addTag(tag)}
                              className="px-2 py-1 text-xs rounded"
                              style={{
                                backgroundColor: `color-mix(in srgb, ${tagGroup.color} 25%, white)`,
                                color: tagGroup.color,
                              }}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setEditingDesign(null)
                  setEditedDesign(null)
                  setIsAddingDesign(false)
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isAddingDesign ? "Add" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="fixed bottom-4 right-4 z-50">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`mb-2 p-4 rounded-md ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            {notification.message}
          </div>
        ))}
      </div>
    </div>
  )
}