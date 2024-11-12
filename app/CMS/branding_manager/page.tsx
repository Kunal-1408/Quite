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

interface Brand {
  id: string
  Brand: string
  Description: string
  Logo: string
  Stats: BrandStats
  banner: string
  highlighted: boolean
  tags: string[]
}

interface BrandStats {
  impression?: string
  interactions?: string
  reach?: string
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

export default function BrandingDashboard() {
  const [activeTagManager, setActiveTagManager] = useState<string | null>(null)
  const [editingBrand, setEditingBrand] = useState<string | null>(null)
  const [editedBrand, setEditedBrand] = useState<Brand | null>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const [brands, setBrands] = useState<Brand[]>([])
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [highlightedCount, setHighlightedCount] = useState(0)
  const [isAddingBrand, setIsAddingBrand] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const brandsPerPage = 10

  const allTags: TagGroup[] = [
    {title:"Brand Type", tags:["Luxury", "Budget", "Mid-range"], color: "hsl(221, 83%, 53%)"},
    {title:"Industry", tags:["Technology", "Fashion", "Food", "Automotive"], color: "hsl(140, 71%, 45%)"},
    {title:"Target Audience", tags:["Youth", "Adults", "Seniors"], color: "hsl(291, 64%, 42%)"}
  ]

  const [newBrand, setNewBrand] = useState<Brand>({
    id: '',
    Brand: '',
    Description: '',
    Logo: '',
    Stats: {},
    banner: '',
    highlighted: false,
    tags: []
  })

  useEffect(() => {
    fetchBrands()
  }, [currentPage, searchQuery])

  const fetchBrands = async () => {
    // Implement fetching logic here
    // This is a placeholder implementation
    const mockBrands: Brand[] = [
      {
        id: '1',
        Brand: 'Example Brand',
        Description: 'This is an example brand description.',
        Logo: '/placeholder.svg?height=100&width=100',
        Stats: { impression: '1000', interactions: '500', reach: '5000' },
        banner: '/placeholder.svg?height=200&width=400',
        highlighted: false,
        tags: ['Luxury', 'Technology']
      },
      // Add more mock brands as needed
    ]
    setBrands(mockBrands)
    setFilteredBrands(mockBrands)
    setTotal(mockBrands.length)
    setHighlightedCount(mockBrands.filter(b => b.highlighted).length)
  }

  const toggleHighlight = async (brandId: string) => {
    // Implement highlight toggling logic here
    // This is a placeholder implementation
    const updatedBrands = brands.map(brand =>
      brand.id === brandId ? { ...brand, highlighted: !brand.highlighted } : brand
    )
    setBrands(updatedBrands)
    setFilteredBrands(updatedBrands)
    setHighlightedCount(updatedBrands.filter(b => b.highlighted).length)
    addNotification(`Brand has been ${updatedBrands.find(b => b.id === brandId)?.highlighted ? 'highlighted' : 'unhighlighted'}.`, 'success')
  }

  const addNotification = (message: string, type: 'success' | 'error') => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id))
    }, 5000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Brand) => {
    if (editedBrand) {
      setEditedBrand({
        ...editedBrand,
        [field]: e.target.value
      })
    } else if (isAddingBrand) {
      setNewBrand({
        ...newBrand,
        [field]: e.target.value
      })
    }
  }

  const handleStatsChange = (e: React.ChangeEvent<HTMLInputElement>, stat: keyof BrandStats) => {
    if (editedBrand) {
      setEditedBrand({
        ...editedBrand,
        Stats: {
          ...editedBrand.Stats,
          [stat]: e.target.value
        }
      })
    } else if (isAddingBrand) {
      setNewBrand({
        ...newBrand,
        Stats: {
          ...newBrand.Stats,
          [stat]: e.target.value
        }
      })
    }
  }

  const toggleTagManager = () => {
    setActiveTagManager(activeTagManager ? null : editingBrand || 'new')
  }

  const addTag = (newTag: string) => {
    if (editedBrand) {
      setEditedBrand({
        ...editedBrand,
        tags: [...new Set([...editedBrand.tags, newTag])]
      })
    } else if (isAddingBrand) {
      setNewBrand({
        ...newBrand,
        tags: [...new Set([...newBrand.tags, newTag])]
      })
    }
  }

  const removeTag = (tagToRemove: string) => {
    if (editedBrand) {
      setEditedBrand({
        ...editedBrand,
        tags: editedBrand.tags.filter(tag => tag !== tagToRemove)
      })
    } else if (isAddingBrand) {
      setNewBrand({
        ...newBrand,
        tags: newBrand.tags.filter(tag => tag !== tagToRemove)
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
    setFilteredBrands(brands)
  }

  const exportBrands = () => {
    // Implement export logic here
    console.log('Exporting brands...')
    addNotification('Brands exported successfully', 'success')
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex items-center">
            <div className="relative w-full max-w-sm">
              <Input
                type="search"
                placeholder="Search brands..."
                className="w-full pr-20"
                value={searchQuery}
                onChange={handleSearch}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button 
                  className="h-full px-2 text-gray-400 hover:text-gray-600" 
                  onClick={() => fetchBrands()}
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
                onClick={exportBrands}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-neutral-300 hover:bg-accent hover:text-accent-foreground h-8 px-3 gap-1"
              >
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </button>
              <button 
                onClick={() => setIsAddingBrand(true)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-3 gap-1"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Brand
                </span>
              </button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Brands</CardTitle>
              <CardDescription>
                Manage your brands and view their statistics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">
                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 p-0">
                        Brand
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </button>
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Logo</TableHead>
                    <TableHead>Stats</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBrands.length > 0 ? (
                    filteredBrands.map((brand) => (
                      <TableRow key={brand.id}>
                        <TableCell className="font-medium">{brand.Brand}</TableCell>
                        <TableCell className="max-w-md">
                          <div className="line-clamp-3 overflow-hidden text-ellipsis">
                            {brand.Description}
                          </div>
                        </TableCell>
                        <TableCell>
                          <img src={brand.Logo} alt={`${brand.Brand} logo`} className="w-10 h-10 object-contain" />
                        </TableCell>
                        <TableCell>
                          <div>Impressions: {brand.Stats.impression}</div>
                          <div>Interactions: {brand.Stats.interactions}</div>
                          <div>Reach: {brand.Stats.reach}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {brand.tags.map((tag, index) => (
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
                              <DropdownMenuItem onClick={() => setEditingBrand(brand.id)} className="items-center">
                                Edit
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => toggleHighlight(brand.id)}
                            className={`p-1 rounded-full ${
                              brand.highlighted ? 'text-yellow-500' : 'text-gray-300'
                            } hover:text-yellow-500 transition-colors`}
                          >
                            <Star className="h-5 w-5" fill={brand.highlighted ? 'currentColor' : 'none'} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No brands found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{filteredBrands.length > 0 ? (currentPage - 1) * brandsPerPage + 1 : 0}-{Math.min(currentPage * brandsPerPage, filteredBrands.length)}</strong> of <strong>{filteredBrands.length}</strong> brands
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
                  disabled={currentPage === Math.ceil(total / brandsPerPage)}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
      {(editingBrand !== null || isAddingBrand) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={popoverRef} className="bg-white rounded-lg p-6 w-[800px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{isAddingBrand ? "Add Brand" : "Edit Brand"}</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="brand" className="block text-md font-semibold text-gray-700">Brand Name</label>
                <Input
                  id="brand"
                  value={isAddingBrand ? newBrand.Brand : editedBrand?.Brand ?? ''}
                  onChange={(e) => handleInputChange(e, 'Brand')}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-md font-semibold text-gray-700">Description</label>
                <Input
                  id="description"
                  value={isAddingBrand ? newBrand.Description : editedBrand?.Description ?? ''}
                  onChange={(e) => handleInputChange(e, 'Description')}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="logo" className="block text-md font-semibold text-gray-700">Logo URL</label>
                <Input
                  id="logo"
                  value={isAddingBrand ? newBrand.Logo : editedBrand?.Logo ?? ''}
                  onChange={(e) => handleInputChange(e, 'Logo')}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="banner" className="block text-md font-semibold text-gray-700">Banner URL</label>
                <Input
                  id="banner"
                  value={isAddingBrand ? newBrand.banner : editedBrand?.banner ?? ''}
                  onChange={(e) => handleInputChange(e, 'banner')}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="block text-md font-semibold text-gray-700">Stats</label>
                <div className="mt-1 space-y-2">
                  <Input
                    placeholder="Impressions"
                    value={isAddingBrand ? newBrand.Stats.impression : editedBrand?.Stats.impression ?? ''}
                    onChange={(e) => handleStatsChange(e, 'impression')}
                  />
                  <Input
                    placeholder="Interactions"
                    value={isAddingBrand ? newBrand.Stats.interactions : editedBrand?.Stats.interactions ?? ''}
                    onChange={(e) => handleStatsChange(e, 'interactions')}
                  />
                  <Input
                    placeholder="Reach"
                    value={isAddingBrand ? newBrand.Stats.reach : editedBrand?.Stats.reach ?? ''}
                    onChange={(e) => handleStatsChange(e, 'reach')}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="tags" className="block text-md font-semibold text-gray-700">Tags</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {(isAddingBrand ? newBrand.tags : editedBrand?.tags ?? []).map((tag, index) => (
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
                  Manage Tags
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
                  setEditingBrand(null)
                  setEditedBrand(null)
                  setIsAddingBrand(false)
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Implement save logic here
                  console.log('Saving brand...')
                  setEditingBrand(null)
                  setEditedBrand(null)
                  setIsAddingBrand(false)
                  addNotification('Brand saved successfully', 'success')
                }}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isAddingBrand ? "Add" : "Save"}
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