'use client'
import React, { useEffect, useState } from "react";
import ExpandableCardDemo  from "@/components/blocks/expandable-card-demo-grid";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { DynamicCheckbox } from "@/components/ui/checkbox-test";
import { ChevronLeft, ChevronRight } from "lucide-react";
 
interface Website {
  id: string
  Description: string
  Status?: string
  Tags: string[]
  Title: string
  URL?: string
}


const LabelInputContainer = ({
  children,
  className, 
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
export default function Works (){
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [websites, setWebsites] = useState<Website[]>([])

  const websitesPerPage = 9;
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
  const totalPages = Math.ceil(total / websitesPerPage);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  const [active,Isactive]= useState<string[]>([]);

  const handleIsactive=(items: string[])=>{
    Isactive(items)
  }
  console.log(websites)

  console.log(active);

    return(
        <div className="bg-white">
              <div className="max-w-7xl pt-20 md:pt-40 pb-10  px-4 w-full top-0 border-b-2 border-orange-100">
                <h1 className="text-xl md:text-7xl font-bold dark:text-white">
                  Here's a peek at our <span className="text-orange-400">works</span>
                </h1>
              </div>
              <div className="grid grid-cols-5"> 
                <div className="col-span-1 py-10 mx-5 flex flex-col">
                  <LabelInputContainer>
                      <Input id="Search" placeholder="Search" type="text" className="rounded" />
                    </LabelInputContainer>
                    {tag.map((tag)=>(
                        <DynamicCheckbox onIsActive={handleIsactive} tags={tag}/>
                    ))}
                    
                </div>
                <div className="col-span-4 flex flex-col">
                  <div className="flex flex-1 col-span-4">

                    <div
                      className="inline-block h-full min-h-[1em] w-0.5 self-stretch bg-neutral-100 dark:bg-white/10 my-4"></div>
                      <ExpandableCardDemo websites={websites} filterTags={active} imagePlaceholder="/website.png"/>
                  </div>
              <div className="absolute right-0 bottom-0">
              <div className="flex items- space-x-2">
              <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-orange-400 text-neutral-200 hover:bg-accent hover:text-accent-foreground h-8 px-4"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-orange-400 text-neutral-200 hover:bg-accent hover:text-accent-foreground h-8 px-4"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                
                  <ChevronRight className="h-4 w-4 ml-2" />
                </button>
              </div>
              <div className="text-sm text-muted-foreground">
              Showing <strong>{websites.length > 0 ? (currentPage - 1) * websitesPerPage + 1 : 0}-{Math.min(currentPage * websitesPerPage, total)}</strong> of <strong>{total}</strong> websites
            </div>
              </div>


            </div>
              

              </div>

        </div>
    )      
    

};

const tag =[
  {title:"Site Type",
    details:{items:["Static","Dynamic","Micro"],
      color:"blue-400"
    }
  },
  {title:"Industry",
    details:{items:["Pharamceutical","Agriculture","Hardware","Mining","Fashion"],
      color:"yellow-400"
    }
  },
  {title:"Country",
    details:{items:["India","Sri-Lanka","Dubai"],
      color:"green-400"
    }
  }

]
