'use client'
import React, { useEffect, useState } from "react";
import ExpandableCardDemo from "@/components/blocks/expandable-card-demo-grid";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";


// function Tags(){
//   const [active, setActive]= useState<(typeof tag)>
// }

const checker =()=>{
  const [check,setChecked]= useState('false')

  useEffect(()=>{
    const handleCheck = ()=>{

    }
  })
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
                      {/* <Label htmlFor="Search">Search</Label> */}
                      <Input id="Search" placeholder="Search" type="text" className="rounded" />
                    </LabelInputContainer>
                    <div className="flex flex-col justify-center my-4 mx-4 border-t-2 border-b-2 border-neutral-200">
                      <h3 className="text-neutral-600">Site Type</h3>
                      <ul className="items-center text-sm list-none">
                        <li className="flex items-center py-2 mx-auto">
                          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          <Label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-neutral-400">Static</Label>
                        </li>
                        <li className="flex items-center py-2 mx-auto">
                          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          <Label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-neutral-400">Dynamic</Label>
                        </li>
                        <li className="flex items-center py-2 mx-auto">
                          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          <Label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-neutral-400">Micro</Label>
                        </li>
                        <li className="flex items-center py-2 mx-auto">
                          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          <Label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-neutral-400">E-commerce</Label>
                        </li>
                      </ul>

                    </div>

                    <div className="flex flex-col justify-center my-4 mx-4 border-b-2 border-neutral-200">
                      <h3 className="text-neutral-600">Countries</h3>
                      <ul className=" text-sm list-none">
                        <li className="flex items-center py-2 mx-auto">
                          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          <Label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-neutral-400">Static</Label>
                        </li>
                        <li className="flex items-center py-2 mx-auto">
                          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          <Label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-neutral-400">Dynamic</Label>
                        </li>
                        <li className="flex items-center py-2 mx-auto">
                          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          <Label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-neutral-400">Micro</Label>
                        </li>
                        <li className="flex items-center py-2 mx-auto">
                          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          <Label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-neutral-400">E-commerce</Label>
                        </li>
                      </ul>

                    </div>

                    <div className="flex flex-col justify-center my-4 mx-4 border-b-2 border-neutral-200">
                      <h3 className="text-neutral-600">Industry</h3>
                      <ul className="items-center text-sm list-none">
                        <li className="flex items-center py-2 mx-auto">
                          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          <Label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-neutral-400">Healthcare</Label>
                        </li>
                        <li className="flex items-center py-2 mx-auto">
                          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          <Label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-neutral-400">Industry1</Label>
                        </li>
                        <li className="flex items-center py-2 mx-auto">
                          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          <Label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-neutral-400">Industry2</Label>
                        </li>
                        <li className="flex items-center py-2 mx-auto">
                          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          <Label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-neutral-400">Industy3</Label>
                        </li>
                      </ul>

                    </div>
                </div>
                <div className="col-span-4">
                <ExpandableCardDemo/>
                </div>
              

              </div>

        </div>
    )
    

};

// const BottomGradient = () => {
//   return (
//     <>
//       <span className="group-hover/input:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-orange-300 to-transparent" />
//       {/* <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" /> */}
//     </>
//   );
// };
const tag =[
  {},
]