import React from "react";
import { TypewriterEffect } from "./ui/typewriter-effect";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";

const words = [
    {
      text: "Advertise",
    },
    {
      text: "awesome",
    },
    {
      text: "with",
    },
    {
      text: "Quite Good",
      className: "text-orange-500",
    },
  ];
export const Hero: React.FC = () => {
  return (
    <div className="">
        <BackgroundGradientAnimation>
        <div className="absolute z-40 inset-0 flex items-center justify-center font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
            <div className="flex flex-col center">
                <div className="flex flex-col place-items-center">
                    <p className="text-slate-800 text-base  mb-10">
                        The road to freedom starts from here
                    </p> 
                </div>
                <TypewriterEffect words={words}/>

                <div className="flex flex-col place-items-center py-5">
                <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
                     Get Started
                </button>
                </div>
            </div>
        </div>
        </BackgroundGradientAnimation>
    </div>
  );
};


