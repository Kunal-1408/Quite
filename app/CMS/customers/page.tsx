"use client"
import React, { useState } from 'react'

import { Input } from "@/components/ui/input"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PlusCircle, Minus } from 'lucide-react'

interface ContentItem {
  title: string;
  description: string;
  image: File | null;
  imagePreview: string | null;
}

interface ServiceItem extends ContentItem {}

interface ServicePageContent {
  description: string;
  carouselImages: { image: File | null; imagePreview: string | null }[];
  whatWeDo: {
    description: string;
    cards: { title: string; description: string }[];
  };
  relatedProjects: { title: string; description: string; image: File | null; imagePreview: string | null }[];
}

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
  servicePages: {
    [key: string]: ServicePageContent;
  };
}

export default function ContentManager() {
  const [activeMainTab, setActiveMainTab] = useState<string>('landingPage')
  const [activeLandingPageTab, setActiveLandingPageTab] = useState<string>('hero')
  const [activeServicePageTab, setActiveServicePageTab] = useState<string>('webDevelopment')
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
      { title: "Design", description: "Create stunning visuals that captivate your audience and elevate your brand identity.", image: null, imagePreview: null },
      { title: "Branding", description: "Develop a strong, cohesive brand identity that sets you apart from the competition and resonates with your target audience.", image: null, imagePreview: null }
    ],
    clients: Array(8).fill({ logo: null, logoPreview: null }),
    servicePages: {
      webDevelopment: {
        description: "We create custom websites that drive results.",
        carouselImages: Array(3).fill({ image: null, imagePreview: null }),
        whatWeDo: {
          description: "Our web development services cover all aspects of creating a successful online presence.",
          cards: Array(5).fill({ title: "Service", description: "Description of the service" })
        },
        relatedProjects: Array(3).fill({ title: "Project", description: "Project description", image: null, imagePreview: null })
      },
      seo: {
        description: "We boost your online visibility and rankings.",
        carouselImages: Array(3).fill({ image: null, imagePreview: null }),
        whatWeDo: {
          description: "Our SEO services are designed to improve your search engine rankings and drive organic traffic.",
          cards: Array(5).fill({ title: "Service", description: "Description of the service" })
        },
        relatedProjects: Array(3).fill({ title: "Project", description: "Project description", image: null, imagePreview: null })
      },
      design: {
        description: "We create stunning visuals that captivate your audience.",
        carouselImages: Array(3).fill({ image: null, imagePreview: null }),
        whatWeDo: {
          description: "Our design services cover everything from branding to user interface design.",
          cards: Array(5).fill({ title: "Service", description: "Description of the service" })
        },
        relatedProjects: Array(3).fill({ title: "Project", description: "Project description", image: null, imagePreview: null })
      },
      branding: {
        description: "We develop strong, cohesive brand identities.",
        carouselImages: Array(3).fill({ image: null, imagePreview: null }),
        whatWeDo: {
          description: "Our branding services help you create a unique and memorable brand identity.",
          cards: Array(5).fill({ title: "Service", description: "Description of the service" })
        },
        relatedProjects: Array(3).fill({ title: "Project", description: "Project description", image: null, imagePreview: null })
      }
    }
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

  const handleAddClientLogo = () => {
    setContent(prev => ({
      ...prev,
      clients: [...prev.clients, { logo: null, logoPreview: null }]
    }))
  }

  const handleRemoveClientLogo = (index: number) => {
    setContent(prev => ({
      ...prev,
      clients: prev.clients.filter((_, i) => i !== index)
    }))
  }

  const handleServicePageChange = (service: string, field: keyof ServicePageContent, value: string | File | null) => {
    if (field === 'description') {
      setContent(prev => ({
        ...prev,
        servicePages: {
          ...prev.servicePages,
          [service]: { ...prev.servicePages[service], description: value as string }
        }
      }))
    }
  }

  const handleServicePageImageChange = (service: string, index: number, file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent(prev => ({
          ...prev,
          servicePages: {
            ...prev.servicePages,
            [service]: {
              ...prev.servicePages[service],
              carouselImages: prev.servicePages[service].carouselImages.map((img, i) => 
                i === index ? { image: file, imagePreview: reader.result as string } : img
              )
            }
          }
        }))
      };
      reader.readAsDataURL(file);
    }
  }

  const handleAddServicePageImage = (service: string) => {
    setContent(prev => ({
      ...prev,
      servicePages: {
        ...prev.servicePages,
        [service]: {
          ...prev.servicePages[service],
          carouselImages: [...prev.servicePages[service].carouselImages, { image: null, imagePreview: null }]
        }
      }
    }))
  }

  const handleWhatWeDoChange = (service: string, field: 'description' | 'cards', value: string | { title: string; description: string }, index?: number) => {
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
    } else if (field === 'cards' && typeof index === 'number' && typeof value === 'object') {
      setContent(prev => ({
        ...prev,
        servicePages: {
          ...prev.servicePages,
          [service]: {
            ...prev.servicePages[service],
            whatWeDo: {
              ...prev.servicePages[service].whatWeDo,
              cards: prev.servicePages[service].whatWeDo.cards.map((card, i) => 
                i === index ? value : card
              )
            }
          }
        }
      }))
    }
  }

  const handleAddWhatWeDoCard = (service: string) => {
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

  const handleRelatedProjectChange = (service: string, index: number, field: keyof (typeof content.servicePages)[keyof typeof content.servicePages]['relatedProjects'][0], value: string | File | null) => {
    if (field === 'image' && value instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent(prev => ({
          ...prev,
          servicePages: {
            ...prev.servicePages,
            [service]: {
              ...prev.servicePages[service],
              relatedProjects: prev.servicePages[service].relatedProjects.map((project, i) => 
                i === index ? { ...project, image: value, imagePreview: reader.result as string } : project
              )
            }
          }
        }))
      };
      reader.readAsDataURL(value);
    } else {
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
  }

  const handleAddRelatedProject = (service: string) => {
    setContent(prev => ({
      ...prev,
      servicePages: {
        ...prev.servicePages,
        [service]: {
          ...prev.servicePages[service],
          relatedProjects: [...prev.servicePages[service].relatedProjects, { title: "New Project", description: "Description of the new project", image: null, imagePreview: null }]
        }
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting content:', content)
    // Here you would typically send this data to your backend
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
                          className="mb-2 flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
              )}

              {activeLandingPageTab === 'services' && (
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
                          className="mb-2 flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
              )}

              {activeLandingPageTab === 'clients' && (
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
                            <img src={client.logoPreview} alt={`Client logo ${index + 1}`} className="w-24 h-24 object-contain mb-2" />
                          )}
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
                    value={content.servicePages[activeServicePageTab].description}
                    onChange={(e) => handleServicePageChange(activeServicePageTab, 'description', e.target.value)}
                    rows={3}
                    className='flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                  />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Image Carousel</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {content.servicePages[activeServicePageTab].carouselImages.map((img, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <Input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files ? e.target.files[0] : null;
                              if (file) handleServicePageImageChange(activeServicePageTab, index, file);
                            }}
                            accept="image/*"
                            className="mb-2"
                          />
                          {img.imagePreview && (
                            <img src={img.imagePreview} alt={`Carousel image ${index + 1}`} className="w-24 h-24 object-cover" />
                          )}
                        </div>
                      ))}
                    </div>
                    <button type="button"  onClick={() => handleAddServicePageImage(activeServicePageTab)} className="mt-2 flex flex-col px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-neutral-600 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500">
                      <PlusCircle className="w-4 h-4 mr-2" /> Add Image
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">What We Do</h3>
                    <textarea
                      placeholder="Section Description"
                      value={content.servicePages[activeServicePageTab].whatWeDo.description}
                      onChange={(e) => handleWhatWeDoChange(activeServicePageTab, 'description', e.target.value)}
                      rows={3}
                      className="mb-2 flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {content.servicePages[activeServicePageTab].whatWeDo.cards.map((card, index) => (
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
                    {content.servicePages[activeServicePageTab].relatedProjects.map((project, index) => (
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
                        <div className="flex items-center space-x-4">
                          <Input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files ? e.target.files[0] : null;
                              if (file) handleRelatedProjectChange(activeServicePageTab, index, 'image', file);
                            }}
                            accept="image/*"
                          />
                          {project.imagePreview && (
                            <img src={project.imagePreview} alt={`Preview of ${project.title}`} className="w-24 h-24 object-cover" />
                          )}
                        </div>
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