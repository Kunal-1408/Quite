"use client"
import React, { useState, useEffect } from 'react'

import { Input } from "@/components/ui/input"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PlusCircle, Minus } from 'lucide-react'

interface Hero {
  title: string
  subtitle: string
  description: string
}

interface WhyChooseUsItem {
  title: string
  description: string
  imageUrl: string
}

interface Service {
  title: string
  description: string
  imageUrl: string
}

interface Client {
  logoUrl: string
}

interface WhatWeDoCard {
  title: string
  description: string
}

interface RelatedProject {
  title: string
  description: string
  imageUrl: string
}

interface ServicePage {
  description: string
  carouselImages: { imageUrl: string }[]
  whatWeDo: {
    description: string
    cards: WhatWeDoCard[]
  }
  relatedProjects: RelatedProject[]
}

interface Content {
  hero: Hero
  whyChooseUs: WhyChooseUsItem[]
  services: Service[]
  clients: Client[]
  servicePages: {
    webDevelopment: ServicePage
    seo: ServicePage
    design: ServicePage
    branding: ServicePage
  }
}

export default function ContentManager() {
  const [activeMainTab, setActiveMainTab] = useState<string>('landingPage')
  const [activeLandingPageTab, setActiveLandingPageTab] = useState<string>('hero')
  const [activeServicePageTab, setActiveServicePageTab] = useState<string>('webDevelopment')
  const [content, setContent] = useState<Content>({
    hero: { title: '', subtitle: '', description: '' },
    whyChooseUs: [],
    services: [],
    clients: [],
    servicePages: {
      webDevelopment: { description: '', carouselImages: [], whatWeDo: { description: '', cards: [] }, relatedProjects: [] },
      seo: { description: '', carouselImages: [], whatWeDo: { description: '', cards: [] }, relatedProjects: [] },
      design: { description: '', carouselImages: [], whatWeDo: { description: '', cards: [] }, relatedProjects: [] },
      branding: { description: '', carouselImages: [], whatWeDo: { description: '', cards: [] }, relatedProjects: [] },
    }
  })

  useEffect(() => {
    // Fetch landing page content
    fetch('/api/landing-page-content')
      .then(response => response.json())
      .then(data => setContent(prevContent => ({ ...prevContent, ...data })))
      .catch(error => console.error('Error fetching landing page content:', error))

    // Fetch service pages content
    fetch('/api/service-pages-content')
      .then(response => response.json())
      .then(data => setContent(prevContent => ({ ...prevContent, ...data })))
      .catch(error => console.error('Error fetching service pages content:', error))
  }, [])

  const handleHeroChange = (field: keyof Hero, value: string) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }))
  }

  const handleWhyChooseUsChange = (index: number, field: keyof WhyChooseUsItem, value: string) => {
    setContent(prev => ({
      ...prev,
      whyChooseUs: prev.whyChooseUs.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const handleServicesChange = (index: number, field: keyof Service, value: string) => {
    setContent(prev => ({
      ...prev,
      services: prev.services.map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      )
    }))
  }

  const handleClientLogoChange = (index: number, logoUrl: string) => {
    setContent(prev => ({
      ...prev,
      clients: prev.clients.map((client, i) => 
        i === index ? { logoUrl } : client
      )
    }))
  }

  const handleAddClientLogo = () => {
    setContent(prev => ({
      ...prev,
      clients: [...prev.clients, { logoUrl: '' }]
    }))
  }

  const handleRemoveClientLogo = (index: number) => {
    setContent(prev => ({
      ...prev,
      clients: prev.clients.filter((_, i) => i !== index)
    }))
  }

  const handleServicePageChange = (service: keyof Content['servicePages'], field: keyof ServicePage, value: string) => {
    setContent(prev => ({
      ...prev,
      servicePages: {
        ...prev.servicePages,
        [service]: { ...prev.servicePages[service], [field]: value }
      }
    }))
  }

  const handleServicePageImageChange = (service: keyof Content['servicePages'], index: number, imageUrl: string) => {
    setContent(prev => ({
      ...prev,
      servicePages: {
        ...prev.servicePages,
        [service]: {
          ...prev.servicePages[service],
          carouselImages: prev.servicePages[service].carouselImages.map((img, i) => 
            i === index ? { imageUrl } : img
          )
        }
      }
    }))
  }

  const handleAddServicePageImage = (service: keyof Content['servicePages']) => {
    setContent(prev => ({
      ...prev,
      servicePages: {
        ...prev.servicePages,
        [service]: {
          ...prev.servicePages[service],
          carouselImages: [...prev.servicePages[service].carouselImages, { imageUrl: '' }]
        }
      }
    }))
  }

  const handleWhatWeDoChange = (service: keyof Content['servicePages'], field: 'description' | 'cards', value: string | WhatWeDoCard, index?: number) => {
    if (field === 'description') {
      setContent(prev => ({
        ...prev,
        servicePages: {
          ...prev.servicePages,
          [service]: {
            ...prev.servicePages[service],
            whatWeDo: {
              ...prev.servicePages[service].whatWeDo,
              description: value as string
            }
          }
        }
      }))
    } else if (field === 'cards' && typeof index === 'number') {
      setContent(prev => ({
        ...prev,
        servicePages: {
          ...prev.servicePages,
          [service]: {
            ...prev.servicePages[service],
            whatWeDo: {
              ...prev.servicePages[service].whatWeDo,
              cards: prev.servicePages[service].whatWeDo.cards.map((card, i) => 
                i === index ? value as WhatWeDoCard : card
              )
            }
          }
        }
      }))
    }
  }

  const handleAddWhatWeDoCard = (service: keyof Content['servicePages']) => {
    setContent(prev => ({
      ...prev,
      servicePages: {
        ...prev.servicePages,
        [service]: {
          ...prev.servicePages[service],
          whatWeDo: {
            ...prev.servicePages[service].whatWeDo,
            cards: [...prev.servicePages[service].whatWeDo.cards, { title: "New Service", description: "Description of the new service" }]
          }
        }
      }
    }))
  }

  const handleRelatedProjectChange = (service: keyof Content['servicePages'], index: number, field: keyof RelatedProject, value: string) => {
    setContent(prev => ({
      ...prev,
      servicePages: {
        ...prev.servicePages,
        [service]: {
          ...prev.servicePages[service],
          relatedProjects: prev.servicePages[service].relatedProjects.map((project, i) => 
            i === index ? { ...project, [field]: value } : project
          )
        }
      }
    }))
  }

  const handleAddRelatedProject = (service: keyof Content['servicePages']) => {
    setContent(prev => ({
      ...prev,
      servicePages: {
        ...prev.servicePages,
        [service]: {
          ...prev.servicePages[service],
          relatedProjects: [...prev.servicePages[service].relatedProjects, { title: "New Project", description: "Description of the new project", imageUrl: "" }]
        }
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Save landing page content
      await fetch('/api/landing-page-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hero: content.hero,
          whyChooseUs: content.whyChooseUs,
          services: content.services,
          clients: content.clients,
        }),
      })

      // Save service pages content
      await fetch('/api/service-pages-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          servicePages: content.servicePages,
        }),
      })

      alert('Content saved successfully!')
    } catch (error) {
      console.error('Error saving content:', error)
      alert('Error saving content. Please try again.')
    }
  }


  const TabButton: React.FC<{ id: string; active: boolean; onClick: () => void; children: React.ReactNode }> = ({ id, active, onClick, children }) => (
    <button
      id={id}
      className={`px-4 py-2 font-medium text-sm rounded-md ${active ? 'bg-orange-400 text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
      onClick={onClick}
    >
      {children}
    </button>
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Content Manager</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="flex space-x-2 mb-4 bg-neutral-100">
            <TabButton id="landingPage" active={activeMainTab === 'landingPage'} onClick={() => setActiveMainTab('landingPage')}>
              Landing Page
            </TabButton>
            <TabButton id="servicePages" active={activeMainTab === 'servicePages'} onClick={() => setActiveMainTab('servicePages')}>
              Service Pages
            </TabButton>
            <TabButton id="ContactUs" active={activeMainTab === 'ContactUs'} onClick={() => setActiveMainTab('ContactUs')}>
              Contact Us
            </TabButton>
          </div>

          {activeMainTab === 'landingPage' && (
            <div>
              <div className="flex space-x-2 mb-4 bg-neutral-100">
                <TabButton id="hero" active={activeLandingPageTab === 'hero'} onClick={() => setActiveLandingPageTab('hero')}>
                  
                  Hero
                </TabButton>
                <TabButton id="whyChooseUs" active={activeLandingPageTab === 'whyChooseUs'} onClick={() => setActiveLandingPageTab('whyChooseUs')}>
                  Why Choose Us
                </TabButton>
                <TabButton id="services" active={activeLandingPageTab === 'services'} onClick={() => setActiveLandingPageTab('services')}>
                  Services
                </TabButton>
                <TabButton id="clients" active={activeLandingPageTab === 'clients'} onClick={() => setActiveLandingPageTab('clients')}>
                  Our Clients
                </TabButton>
              </div>

              {activeLandingPageTab === 'hero' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Hero Section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Title"
                      value={landingPageContent.hero.title}
                      onChange={(e) => handleHeroChange('title', e.target.value)}
                    />
                    <Input
                      placeholder="Subtitle"
                      value={landingPageContent.hero.subtitle}
                      onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                    />
                    <textarea
                      placeholder="Description"
                      value={landingPageContent.hero.description}
                      onChange={(e) => handleHeroChange('description', e.target.value)}
                      rows={3}
                      className='flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                    />
                  </CardContent>
                </Card>
              )}

              {activeLandingPageTab === 'whyChooseUs' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Why Choose Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {landingPageContent.whyChooseUs.map((item, index) => (
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
                          className="mb-2 flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <Input
                          placeholder="Image URL"
                          value={item.imageUrl}
                          onChange={(e) => handleWhyChooseUsChange(index, 'imageUrl', e.target.value)}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {activeLandingPageTab === 'services' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {landingPageContent.services.map((service, index) => (
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
                          className="mb-2 flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <Input
                          placeholder="Image URL"
                          value={service.imageUrl}
                          onChange={(e) => handleServicesChange(index, 'imageUrl',   e.target.value)}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {activeLandingPageTab === 'clients' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Our Clients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {landingPageContent.clients.map((client, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <Input
                            placeholder="Logo URL"
                            value={client.logoUrl}
                            onChange={(e) => handleClientLogoChange(index, e.target.value)}
                            className="mb-2"
                          />
                          <button type="button" className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-8 rounded-md px-3 text-xs" onClick={() => handleRemoveClientLogo(index)}>
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button type="button" onClick={handleAddClientLogo} className="mt-4 flex flex-col px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-neutral-600 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500">
                      <PlusCircle className="w-4 h-4 mr-2" /> Add Client Logo
                    </button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeMainTab === 'servicePages' && (
            <div>
              <div className="flex space-x-2 mb-4 bg-neutral-100 mx-auto">
                <TabButton id="webDevelopment" active={activeServicePageTab === 'webDevelopment'} onClick={() => setActiveServicePageTab('webDevelopment')}>
                  Web Development
                </TabButton>
                <TabButton id="seo" active={activeServicePageTab === 'seo'} onClick={() => setActiveServicePageTab('seo')}>
                  SEO
                </TabButton>
                <TabButton id="design" active={activeServicePageTab === 'design'} onClick={() => setActiveServicePageTab('design')}>
                  Design
                </TabButton>
                <TabButton id="branding" active={activeServicePageTab === 'branding'} onClick={() => setActiveServicePageTab('branding')}>
                  Branding
                </TabButton>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{activeServicePageTab.charAt(0).toUpperCase() + activeServicePageTab.slice(1)} Service Page</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <textarea
                    placeholder="Description"
                    value={servicePagesContent.servicePages[activeServicePageTab]?.description || ''}
                    onChange={(e) => handleServicePageChange(activeServicePageTab, 'description', e.target.value)}
                    rows={3}
                    className='flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                  />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Image Carousel</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {servicePagesContent.servicePages[activeServicePageTab]?.carouselImages.map((img, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <Input
                            placeholder="Image URL"
                            value={img.imageUrl}
                            onChange={(e) => handleServicePageImageChange(activeServicePageTab, index, e.target.value)}
                            className="mb-2"
                          />
                        </div>
                      ))}
                    </div>
                    <button type="button" onClick={() => handleAddServicePageImage(activeServicePageTab)} className="mt-2 flex flex-col px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-neutral-600 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500">
                      <PlusCircle className="w-4 h-4 mr-2" /> Add Image
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">What We Do</h3>
                    <textarea
                      placeholder="Section Description"
                      value={servicePagesContent.servicePages[activeServicePageTab]?.whatWeDo.description || ''}
                      onChange={(e) => handleWhatWeDoChange(activeServicePageTab, 'description', e.target.value)}
                      rows={3}
                      className="mb-2 flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {servicePagesContent.servicePages[activeServicePageTab]?.whatWeDo.cards.map((card, index) => (
                      <div key={index} className="mb-2 p-2 border rounded">
                        <Input
                          placeholder="Card Title"
                          value={card.title}
                          onChange={(e) => handleWhatWeDoChange(activeServicePageTab, 'cards', { ...card, title: e.target.value }, index)}
                          className="mb-2"
                        />
                        <textarea
                          placeholder="Card Description"
                          value={card.description}
                          onChange={(e) => handleWhatWeDoChange(activeServicePageTab, 'cards', { ...card, description: e.target.value }, index)}
                          rows={2}
                          className='flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                        />
                      </div>
                    ))}
                    <button type="button" className='px-4 flex flex-col py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-neutral-600 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500' onClick={() => handleAddWhatWeDoCard(activeServicePageTab)}>
                      <PlusCircle className="w-4 h-4 mr-2" /> Add Card
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Related Projects</h3>
                    {servicePagesContent.servicePages[activeServicePageTab]?.relatedProjects.map((project, index) => (
                      <div key={index} className="mb-2 p-2 border rounded">
                        <Input
                          placeholder="Project Title"
                          value={project.title}
                          onChange={(e) => handleRelatedProjectChange(activeServicePageTab, index, 'title', e.target.value)}
                          className="mb-2"
                        />
                        <textarea
                          placeholder="Project Description"
                          value={project.description}
                          onChange={(e) => handleRelatedProjectChange(activeServicePageTab, index, 'description', e.target.value)}
                          rows={2}
                          className="mb-2 flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <Input
                          placeholder="Image URL"
                          value={project.imageUrl}
                          onChange={(e) => handleRelatedProjectChange(activeServicePageTab, index, 'imageUrl', e.target.value)}
                        />
                      </div>
                    ))}
                    <button type="button" className='px-4 flex flex-col py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-neutral-600 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500' onClick={() => handleAddRelatedProject(activeServicePageTab)}>
                      <PlusCircle className="w-4 h-4 mr-2" /> Add Related Project
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {activeMainTab === 'ContactUs' && (
            <div>
              <div className="flex space-x-2 mb-4 bg-neutral-100">
                <TabButton id="hero" active={activeLandingPageTab === 'hero'} onClick={() => setActiveLandingPageTab('hero')}>
                  
                  Header
                </TabButton>
                <TabButton id="whyChooseUs" active={activeLandingPageTab === 'whyChooseUs'} onClick={() => setActiveLandingPageTab('whyChooseUs')}>
                  Form
                </TabButton>
                <TabButton id="services" active={activeLandingPageTab === 'services'} onClick={() => setActiveLandingPageTab('services')}>
                  Contact Cards
                </TabButton>
                <TabButton id="clients" active={activeLandingPageTab === 'clients'} onClick={() => setActiveLandingPageTab('clients')}>
                  FAQ
                </TabButton>
              </div>
              </div>)}
              
        </div>

        <button type="submit" className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">Save Changes</button>
      </form>
    </div>
  )
}