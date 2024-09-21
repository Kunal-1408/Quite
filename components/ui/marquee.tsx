"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export const Marquee = ({
    logos,
    direction ,
    speed = "fast",
    pauseOnHover = true,
    className,
  }: {
    logos: {
      src: string;
      alt: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const containerRef1 = React.useRef<HTMLDivElement>(null);
  const scrollerRef1 = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

    //   getDirection();
      getSpeed();
      setStart(true);
    }
  }
  useEffect(() => {
    addAnimation1();
  }, []);
  const [Starter,setStarter] = useState(false);
  function addAnimation1() {
    if (containerRef1.current && scrollerRef1.current) {
      const scrollerContent = Array.from(scrollerRef1.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef1.current) {
          scrollerRef1.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStarter(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div className="flex flex-col">
            <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-screen-2xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]",
          direction && "left"
        )}
      >
        {logos.map((item, idx) => (
          <li
            className="w-[350px] max-w-full relative  border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
            style={{
              background:
                "linear-gradient(180deg, var(--gray-800), var(--gray-900)",
            }}
            key={idx}
          >
            <Image src={item.src} alt={item.alt} fill={true}></Image>
          </li>
        ))}
      </ul>
    </div>
    <div
      ref={containerRef1}
      className={cn(
        "scroller relative z-20  max-w-screen-2xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef1}
        className={cn(
          " flex min-w-full shrink-0 w-max flex-nowrap",
          Starter && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]",
          direction && "right"
        )}
      >
        {logos.map((item, idx) => (
          <li
            className="w-[350px] max-w-full relative border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
            style={{
              background:
                "linear-gradient(180deg, var(--gray-800), var(--gray-900)",
            }}
            key={idx}
          >
            <Image src={item.src} alt={item.alt} fill={true} className=""></Image>
          </li>
        ))}
      </ul>
    </div>

    </div>
  );
};
