import React from "react";
import ExpandableCardDemo from "@/components/blocks/expandable-card-demo-grid";
export default function Works (){

    return(
        <div className="bg-white">
    <div className="max-w-7xl relative py-20 md:py-40 px-4 w-full  left-0 top-0">
      <h1 className="text-xl md:text-7xl font-bold dark:text-white">
        Here's a peek at our <span className="text-orange-400">works</span>
      </h1>

    </div>
            <ExpandableCardDemo/>
        </div>
    )
    

};