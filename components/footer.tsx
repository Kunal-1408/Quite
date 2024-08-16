import React from "react";

import Link from "next/link";


export const Footer: React.FC = () =>{
    return (
        <div className="relative w-full flex items-center justify-center">
          
        </div>
      );
}

export const Footerimpli: React.FC = () =>{
    return (
        <div className="relative w-full flex items-center justify-between flex-col bg-white">
                <div className="flex flex-row items-center justify-center space-x-4 text-sm font-medium py-5">
                    <Link href={"#"}>
                        <span className="text-md text-slate-600"> Privacy Policy</span>
                    </Link>
                    <span className="text-md text-slate-600">|</span>
                    <Link href={"#"}>
                        <span className="text-md text-slate-600"> Terms Of Service </span>
                    </Link>
                </div>
                <div className="flex items-center justify-center space-x-1 py-5">
                    <span className="text-md text-slate-600">© 2024 Quite Good</span>
                </div>
        </div>
      );
}
