"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export const Component =({tags}:{tags:{item:string[]; color:string};}) =>  {

  const [selectedItems, setSelectedItems] = useState([])
  const handleCheckboxChange = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }
  const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"]
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        {selectedItems.length > 0 && (
          <div className="inline-flex items-center rounded-md bg-[#0070f3] px-2.5 py-0.5 text-xs font-semibold text-white">
            {selectedItems.map((item) => (
              <div key={item} className="flex items-center gap-2">
                {item}
                <button
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-[#0070f3] focus:ring-offset-2"
                  aria-label={`Remove ${item}`}
                  onClick={() => handleCheckboxChange(item)}
                >
                  <XIcon className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-2">
        {options.map((option) => (
          <Label key={option} className="flex items-center gap-2 font-normal">
            <Checkbox checked={selectedItems.includes(option)} onCheckedChange={() => handleCheckboxChange(option)} />
            {option}
          </Label>
        ))}
      </div>
    </div>
  )
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}