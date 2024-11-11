import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Users, BarChart3, MousePointerClick, Activity } from 'lucide-react'

interface BrandStats {
  impression?: string
  interactions?: string
  reach?: string
}

interface Brand {
  id: string
  Brand: string
  Description: string
  Logo: string
  Stats: BrandStats[]
  tags: string[]
}

async function getBrand(id: string): Promise<Brand | null> {
  try {
    const res = await fetch(`/api/brands?id=${id}`, { cache: 'no-store' })
    if (!res.ok) {
      if (res.status === 404) return null
      throw new Error('Failed to fetch brand')
    }
    return res.json()
  } catch (error) {
    console.error('Error fetching brand:', error)
    return null
  }
}

export default async function BrandPage({ params }: { params: { id: string } }) {
  const brand = await getBrand(params.id)

  if (!brand) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900">{brand.Brand}</h1>
          <div className="mt-2">
            <span className="inline-block bg-gray-100 px-3 py-1 text-sm rounded-full">
              {brand.tags[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-800 to-pink-700 py-20">
        <div className="container mx-auto px-4">
          <div className="relative h-[400px] w-full">
            <Image
              src={brand.Logo}
              alt={brand.Brand}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed">
            {brand.Description}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-red-500 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            A TOTAL REACH OF {brand.Stats[0]?.reach} AND {brand.Stats[0]?.impression} IMPRESSIONS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 mb-4" />
              <div className="text-4xl font-bold mb-2">{brand.Stats[0]?.reach}</div>
              <div>Reach</div>
            </div>
            <div className="flex flex-col items-center">
              <BarChart3 className="w-12 h-12 mb-4" />
              <div className="text-4xl font-bold mb-2">{brand.Stats[0]?.impression}</div>
              <div>Impressions</div>
            </div>
            <div className="flex flex-col items-center">
              <MousePointerClick className="w-12 h-12 mb-4" />
              <div className="text-4xl font-bold mb-2">{brand.Stats[0]?.interactions}</div>
              <div>Interactions</div>
            </div>
            <div className="flex flex-col items-center">
              <Activity className="w-12 h-12 mb-4" />
              <div className="text-4xl font-bold mb-2">762</div>
              <div>Activity</div>
            </div>
          </div>
        </div>
      </div>

      {/* Local Engagement Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-red-500 rounded-full p-2">
            <MousePointerClick className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold">
            LOCAL<span className="text-red-500">ENGAGEMENT</span> METRICS
          </h2>
        </div>
        <p className="text-gray-600">
          A total reach of {brand.Stats[0]?.reach} and {brand.Stats[0]?.impression} impressions
        </p>
      </div>

      {/* Activity Section */}
      <div className="bg-purple-800 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-8">0 Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg"
                  alt="Activity Image"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View Projects Section */}
      {/* <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">VIEW PROJECTS</h2>
          <Link 
            href="/brands" 
            className="text-red-500 hover:text-red-600 flex items-center gap-2"
          >
            See More
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/placeholder.svg"
                alt="Project Thumbnail"
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  )
}