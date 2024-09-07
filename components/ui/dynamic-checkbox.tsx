'use client'

import React, { useEffect, useState,useId } from "react"
import { AnimatePresence,motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { PrismaClient} from '@prisma/client'


// const prisma = new PrismaClient()
// async function main() {
//   const allUsers = await prisma.user.findMany()
//   console.log(allUsers)
// }

export const DynamicCheckbox =({
    tags
}:{
    tags:{item: string[];
    colors: string;
};
}) => { const [active, setActive]= useState<(typeof tags)|boolean|null >(null);
    const id = useId();
    const handleClick =()=>{
      setActive(active)
    }
    const onmousedown =()=>{
      setActive(false)
    }
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setActive(e.target.checked);
      };


    useEffect(()=>{
  
      window.addEventListener("mousedown",onmousedown);
      return ()=>{
        window.removeEventListener("mousedown", onmousedown)
      }
    },[active]);
  
    return(
      <>
      <AnimatePresence>
        {active && typeof active ==="object" &&(
  
          <div className="inset-0 top-0 grid items-center">
            <motion.span
            
            className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-neutral-50">
                <motion.button type="button" className="inline-flex items-center p-1 ms-2 text-neutral-50 rounded-sm hover:text-neutral-100"
                          key={`input-${active.item}-${id}`}
                          layout
                          initial={{
                              opacity:0,
                              scale:0.5
                          
                          }}
                          animate={{
                              opacity:1,
                              scale:1
                          }}
                          exit={{
                              opacity:0,
                              transition:{duration:0.05}
                          }}>
                    <CloseIcon/>
                </motion.button>

            </motion.span>
          </div>
  
        )}
      </AnimatePresence>
      <AnimatePresence>
        <ul className="w-full mx-auto items-center list-none">
            {tags.item.map((item,index)=>(
                        <li key={`${item}-${index}-${id}`} className="flex items-center py-2 mx-auto">
                        <input  type="checkbox" onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <Label className="ms-2 text-sm font-medium text-neutral-400">{item}</Label>
                      </li>

            ))}

        </ul>
      </AnimatePresence>
      </>
    )}

const CloseIcon=()=>{
    return(
        <motion.svg
            initial={{
                opacity:0,

            }}
            animate={{
                opacity:1,
            }}
            exit={{
                opacity:0,
                transition:{duration:0.05}
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="2"
            height="2"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="m1"/>
            </motion.svg>


    )
}