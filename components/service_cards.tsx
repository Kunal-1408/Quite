"use client"

import { useState } from "react"
import { Code, Search, Megaphone, BarChart3, LineChartIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    title: "Web Development",
    description: "Custom websites tailored to your unique business needs, built with cutting-edge technologies for optimal performance and user experience.",
    icon: Code,
  },
  {
    title: "SEO",
    description: "Boost your online visibility and rankings with our data-driven SEO strategies, helping you reach your target audience effectively.",
    icon: Search,
  },
  {
    title: "Advertising",
    description: "Create impactful ad campaigns that resonate with your audience, leveraging multiple channels for maximum reach and conversion.",
    icon: Megaphone,
  },
  {
    title: "Digital Marketing",
    description: "Comprehensive online marketing strategies to grow your brand, engage customers, and drive measurable results across all digital platforms.",
    icon: BarChart3,
  },
  {
    title: "Branding",
    description: "Comprehensive online marketing strategies to grow your brand, engage customers, and drive measurable results across all digital platforms.",
    icon: LineChartIcon,
  }
]

export default function Cards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4  ${}">
        {services.map((service, index) => (
          <Card 
            key={index} 
            className={`overflow-hidden transition-all duration-300 ${
              hoveredIndex === null || hoveredIndex === index
                ? "hover:shadow-xl scale-100 blur-none"
                : "scale-95 "
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <CardHeader className="p-6 transition-all bg-white">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="p-3 rounded-full bg-orange-100 text-orange-500 mb-4">
                  <service.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-orange-400">{service.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 bg-white flex flex-col items-center">
              <p className="text-sm text-gray-700 leading-relaxed text-center font-semibold tracking-wide py-6">
                {service.description}
              </p>
              <button className="bg-orange-400 text-sm text-white font-semibold h-10 px-4 py-2 border hover:bg-orange-500 rounded ">
                    Explore
              </button>
            </CardContent>
            <div className="h-1 w-full bg-orange-400 transition-all group-hover:h-2"></div>
          </Card>
        ))}
      </div>
    </div>
  )
}