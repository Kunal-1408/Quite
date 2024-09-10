'use client'
import React, { useEffect, useState } from "react";
import {CardRender} from "@/components/blocks/expandable-card-demo-grid";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { DynamicCheckbox } from "@/components/ui/checkbox-test";
 

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

  const [active,Isactive]= useState<string[]>([]);

  const handleIsactive=(items: string[])=>{
    Isactive(items)
  }

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
                    <DynamicCheckbox onIsActive={handleIsactive} tags={tag}/>
                </div>
                <div className="col-span-4 flex flex-row">
                  <div className="flex flex-1 col-span-4">

                    <div
                      className="inline-block h-full min-h-[1em] w-0.5 self-stretch bg-neutral-100 dark:bg-white/10 my-4"></div>
                      <CardRender tags={active}/>
                  </div>

                </div>
              

              </div>

        </div>
    )
    

};

const tag =
  {items:["Static","Dynamic","Micro"],
    color:"blue"
  }
