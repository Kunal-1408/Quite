"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"


interface Props{
  onIsActive: (active: string[])=> void;
  tags:{
    title: string,
    details: {
        items: string[];
        color: string;
    }
  }
}


export const DynamicCheckbox: React.FC<Props> =({ onIsActive, tags }) =>  {
  

  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const handleCheckboxChange = (item:string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item))
    } else {
      setSelectedItems([...selectedItems, item])
    }
    
    const updatedItems = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];

    onIsActive(updatedItems);
    
  }
  console.log(tags);
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        {selectedItems.length > 0 && (
          <div className="inline-flex items-center rounded-md justify-between  px-2.5 py-0.5 text-xs font-semibold text-white">
            {selectedItems.map((item) => (
              <span key={item} className={`flex items-center border-rounded gap-2 px-2 bg-${tags.details.color}`}>
                {item}
                <button
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-[#0070f3] focus:ring-offset-2"
                  aria-label={`Remove ${item}`}
                  onClick={() => handleCheckboxChange(item)}
                >
                  <XIcon className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-2 border-neutral-200">
      {/* <hr className=" h-0.5 border-t-0 bg-neutral-200 dark:bg-white/10" /> */}
      <h2 className="text-neutral-500 font-medium">{tags.title}</h2>
        {tags.details.items.map(( items ) => (
          <div>
            
          <Label key={items} className="flex items-center gap-2 font-normal pt-2 hover:bg-neutral-200">
            <Checkbox checked={selectedItems.includes(items)} onCheckedChange={() => handleCheckboxChange(items)} />
            {items}
          </Label>

          </div>

        ))}
        <hr className=" h-0.5 border-t-0 bg-neutral-200 dark:bg-white/10" />
      </div>
    </div>
  )
}
 
function XIcon(props: React.SVGProps<SVGSVGElement>) {
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