
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";


export const BidirectionalMarquee = ({
  items,
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    image: string;
    alt: string;
  }[];
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef1 = React.useRef<HTMLDivElement>(null);
  const scrollerRef1 = React.useRef<HTMLUListElement>(null);

  const containerRef2 = React.useRef<HTMLDivElement>(null);
  const scrollerRef2 = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation(scrollerRef1, containerRef1, "forwards");
    addAnimation(scrollerRef2, containerRef2, "reverse");
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation(
    scrollerRef: React.RefObject<HTMLUListElement>,
    containerRef: React.RefObject<HTMLDivElement>,
    direction: "forwards" | "reverse"
  ) {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      if (containerRef.current) {
        containerRef.current.style.setProperty(
          "--animation-direction",
          direction
        );
      }
      getSpeed(containerRef);
      setStart(true);
    }
  }

  const getSpeed = (containerRef: React.RefObject<HTMLDivElement>) => {
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
    <div className={cn("relative z-20 max-w-screen-2xl overflow-hidden", className)}>
      <div
        ref={containerRef1}
        className={cn(
          "scroller relative mb-4 overflow-hidden",
          className
        )}
      >
        <ul
          ref={scrollerRef1}
          className={cn(
            "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
            start && "animate-scroll ",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {items.map((item, idx) => (
            <li key={idx} className="w-[150px] max-w-full flex-shrink-0">
              <Image src={item.image} alt={item.alt} fill={true} className="w-full h-auto" />
            </li>
          ))}
        </ul>
      </div> 

      <div
        ref={containerRef2}
        className={cn(
          "scroller relative overflow-hidden",
          className
        )}
      >
        <ul
          ref={scrollerRef2}
          className={cn(
            "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
            start && "animate-scroll_rev ",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {items.map((item, idx) => (
            <li key={idx} className="w-[150px] max-w-full flex-shrink-0">
              <Image src={item.image} alt={item.alt} fill={true} className="w-full h-auto" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
