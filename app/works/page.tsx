import React from "react";
import ExpandableCardDemo from "@/components/blocks/expandable-card-demo-grid";
export default function Works (){

    return(
        <div className="bg-white">
              <div className="max-w-7xl py-20 md:py-40  px-4 w-full top-0 border-b-2 border-orange-100">
                <h1 className="text-xl md:text-7xl font-bold dark:text-white">
                  Here's a peek at our <span className="text-orange-400">works</span>
                </h1>
              </div>
              <div className="grid grid-cols-5"> 
                <div className="col-span-1">

                </div>
                <div className="col-span-4">
                <ExpandableCardDemo/>
                </div>
              

              </div>

        </div>
    )
    

};