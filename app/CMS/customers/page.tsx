"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface TabsTriggerProps {
  value: string;
  activeTab: string;
  onClick: (value: string) => void;
  children: React.ReactNode;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, activeTab, onClick, children }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
      activeTab === value
        ? 'bg-neutral-300 text-foreground shadow-sm'
        : 'text-muted-foreground hover:text-foreground'
    }`}
    onClick={() => onClick(value)}
  >
    {children}
  </button>
)

interface TabsListProps {
  children: React.ReactNode;
}

const TabsList: React.FC<TabsListProps> = ({ children }) => (
  <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
    {children}
  </div>
)

interface TabsContentProps {
  value: string;
  activeTab: string;
  children: React.ReactNode;
}

const TabsContent: React.FC<TabsContentProps> = ({ value, activeTab, children }) => (
  <div className={activeTab === value ? 'mt-4' : 'hidden'}>
    {children}
  </div>
)

interface ContentItem {
  title: string;
  description: string;
  image: File | null;
  imagePreview: string | null;
}

interface ServiceItem extends ContentItem {}

interface Content {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  whyChooseUs: ContentItem[];
  services: ServiceItem[];
  clients: {
    logo: File | null;
    logoPreview: string | null;
  }[];
}

export default function LandingPageEditor() {
  const [activeTab, setActiveTab] = useState<string>('hero')
  const [content, setContent] = useState<Content>({
    hero: {
      title: "We are Quite Good",
      subtitle: "The Ultimate Marketing Agency",
      description: "We build beautiful products with the latest technologies and frameworks. We are a team of passionate developers and designers that love to build amazing products."
    },
    whyChooseUs: [
      { title: "Get online fast. No design skills needed.", description: "Build your site in minutes. Choose from 100s of beautiful, mobile-friendly templates with our Website Builder, many optimized for SEO.", image: null, imagePreview: null },
      { title: "Build trust with email that matches your domain.", description: "Keep your brand credibility with customers with free custom email that matches your domain name.", image: null, imagePreview: null },
      { title: "Engage with marketing tools.", description: "Grow your audience fast with built-in SEO and promote your business with social media and email marketing tools.", image: null, imagePreview: null }
    ],
    services: [
      { title: "Web Development", description: "Custom websites tailored to your unique business needs. Built with cutting-edge technologies for optimal performance and user experience.", image: null, imagePreview: null },
      { title: "SEO", description: "Boost your online visibility and rankings with our data-driven SEO strategies. We help you reach your target audience effectively.", image: null, imagePreview: null },
      { title: "Advertising", description: "Create impactful ad campaigns that resonate with your audience. Leveraging multiple channels for maximum reach and conversion.", image: null, imagePreview: null },
      { title: "Digital Marketing", description: "Comprehensive online marketing strategies to grow your brand, engage customers, and drive measurable results across all digital platforms.", image: null, imagePreview: null },
      { title: "Branding", description: "Develop a strong, cohesive brand identity that sets you apart from the competition and resonates with your target audience.", image: null, imagePreview: null }
    ],
    clients: Array(8).fill({ logo: null, logoPreview: null })
  })

  const handleHeroChange = (field: keyof Content['hero'], value: string) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }))
  }

  const handleWhyChooseUsChange = (index: number, field: keyof ContentItem, value: string | File | null) => {
    if (field === 'image' && value instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent(prev => ({
          ...prev,
          whyChooseUs: prev.whyChooseUs.map((item, i) => 
            i === index ? { ...item, image: value, imagePreview: reader.result as string } : item
          )
        }))
      };
      reader.readAsDataURL(value);
    } else {
      setContent(prev => ({
        ...prev,
        whyChooseUs: prev.whyChooseUs.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }))
    }
  }

  const handleServicesChange = (index: number, field: keyof ServiceItem, value: string | File | null) => {
    if (field === 'image' && value instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent(prev => ({
          ...prev,
          services: prev.services.map((service, i) => 
            i === index ? { ...service, image: value, imagePreview: reader.result as string } : service
          )
        }))
      };
      reader.readAsDataURL(value);
    } else {
      setContent(prev => ({
        ...prev,
        services: prev.services.map((service, i) => 
          i === index ? { ...service, [field]: value } : service
        )
      }))
    }
  }

  const handleClientLogoChange = (index: number, file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent(prev => ({
          ...prev,
          clients: prev.clients.map((client, i) => 
            i === index ? { logo: file, logoPreview: reader.result as string } : client
          )
        }))
      };
      reader.readAsDataURL(file);
    } else {
      setContent(prev => ({
        ...prev,
        clients: prev.clients.map((client, i) => 
          i === index ? { logo: null, logoPreview: null } : client
        )
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting content:', content)
    // Here you would typically send this data to your backend
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Home Page Editor</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <TabsList>
            <TabsTrigger value="hero" activeTab={activeTab} onClick={setActiveTab}>Hero</TabsTrigger>
            <TabsTrigger value="whyChooseUs" activeTab={activeTab} onClick={setActiveTab}>Why Choose Us</TabsTrigger>
            <TabsTrigger value="services" activeTab={activeTab} onClick={setActiveTab}>Services</TabsTrigger>
            <TabsTrigger value="clients" activeTab={activeTab} onClick={setActiveTab}>Our Clients</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" activeTab={activeTab}>
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Title"
                  value={content.hero.title}
                  onChange={(e) => handleHeroChange('title', e.target.value)}
                />
                <Input
                  placeholder="Subtitle"
                  value={content.hero.subtitle}
                  onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                />
                <textarea
                  placeholder="Description"
                  value={content.hero.description}
                  onChange={(e) => handleHeroChange('description', e.target.value)}
                  rows={3}
                  className='flex min-h-[80px] w-full rounded-md border border-input bg-neutral-100 dark:bg-zinc-400 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whyChooseUs" activeTab={activeTab}>
            <Card>
              <CardHeader>
                <CardTitle>Why Choose Us</CardTitle>
              </CardHeader>
              <CardContent>
                {content.whyChooseUs.map((item, index) => (
                  <div key={index} className="mb-4 p-4 border rounded">
                    <Input
                      placeholder="Title"
                      value={item.title}
                      onChange={(e) => handleWhyChooseUsChange(index, 'title', e.target.value)}
                      className="mb-2"
                    />
                    <textarea
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => handleWhyChooseUsChange(index, 'description', e.target.value)}
                      rows={3}
                      className="mb-2 flex min-h-[80px] w-full rounded-md border border-input bg-neutral-100 dark:bg-zinc-400 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    
                    />
                    <div className="flex items-center space-x-4">
                      <Input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files ? e.target.files[0] : null;
                          if (file) handleWhyChooseUsChange(index, 'image', file);
                        }}
                        accept="image/*"
                      />
                      {item.imagePreview && (
                        <img src={item.imagePreview} alt={`Preview of ${item.title}`} className="w-24 h-24 object-cover" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" activeTab={activeTab}>
            <Card>
              <CardHeader>
                <CardTitle>Services</CardTitle>
              </CardHeader>
              <CardContent>
                {content.services.map((service, index) => (
                  <div key={index} className="mb-4 p-4 border rounded">
                    <Input
                      placeholder="Service Title"
                      value={service.title}
                      onChange={(e) => handleServicesChange(index, 'title', e.target.value)}
                      className="mb-2"
                    />
                    <textarea
                      placeholder="Service Description"
                      value={service.description}
                      onChange={(e) => handleServicesChange(index, 'description', e.target.value)}
                      rows={3}
                      className="mb-2 flex min-h-[80px] w-full rounded-md border border-input bg-neutral-100 dark:bg-zinc-400 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <div className="flex items-center space-x-4">
                      <Input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files ? e.target.files[0] : null;
                          if (file) handleServicesChange(index, 'image', file);
                        }}
                        accept="image/*"
                      />
                      {service.imagePreview && (
                        <img src={service.imagePreview} alt={`Preview of ${service.title}`} className="w-24 h-24 object-cover" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" activeTab={activeTab}>
            <Card>
              <CardHeader>
                <CardTitle>Our Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {content.clients.map((client, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <Input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files ? e.target.files[0] : null;
                          handleClientLogoChange(index, file);
                        }}
                        accept="image/*"
                        className="mb-2"
                      />
                      {client.logoPreview && (
                        <img src={client.logoPreview} alt={`Client logo ${index + 1}`} className="w-24 h-24 object-contain" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>

        <button type="submit" className="px-4 py-2 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">Save Changes</button>
      </form>
    </div>
  )
}