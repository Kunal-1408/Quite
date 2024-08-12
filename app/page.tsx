'use client'
import { Hero } from "@/components/hero";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import React, { useEffect, useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { BidirectionalMarquee } from "@/components/ui/stream";
import { cn } from "@/lib/utils";
import { marq } from "./types";
import { m } from "framer-motion";


const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("Form submitted");
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

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


async function getData() {
  try {
    const res = await fetch(`https://api.unsplash.com/photos/?client_id=${process.env.ACCESS_KEY}`);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
}


export default function Home() {
  const data = getData()
  return (
    <main className="bg-slate-100">
      <Hero/>
      <HeroParallax products={products} />
      <BidirectionalMarquee items={images}
      speed="fast"/>
      <div className="h-[40rem] rounded-md flex flex-col bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <h2 className=" text-slate-900 font-bold text-5xl py-10 " >Testimonials</h2>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
      </div>
      <div className="justify-center bg-white">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h1 className="font-bold text-5xl text-neutral-800 dark:text-neutral-200 justify-center py-10">
        Connect with us!
      </h1>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Have a question or just want to chat? Drop us a line and we&apos;ll get back!!!
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="First" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Last" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="phone">Mobile number</Label>
          <Input id="number" placeholder="+91 000 000 0000" type="number" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="project@example.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4 box-content h-40">
          <Label htmlFor="Query">Query</Label>
          <Input id="Query" placeholder="....." type="text" />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-orange-400 dark:from-zinc-900 dark:to-zinc-900 to-orange-300 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Submit &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-orange-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      </form>
      </div>
    </div>

    </main>
  );
}


const testimonials = [
    {
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum urna mauris, congue in lectus vel, aliquam dictum mi. Curabitur tincidunt ipsum eu urna eleifend, sollicitudin pretium neque accumsan. Nam magna mi, posuere a consequat vitae, vulputate nec turpis. Proin aliquam justo tincidunt convallis vestibulum. Nulla ut auctor dui. Aliquam faucibus nisl ut nisi ullamcorper condimentum. Maecenas vitae nulla non ex eleifend lobortis eu eu mauris. ",
      name: "Charles Dickens",
      title: "A Tale of Two Cities",
    },
    {
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum urna mauris, congue in lectus vel, aliquam dictum mi. Curabitur tincidunt ipsum eu urna eleifend, sollicitudin pretium neque accumsan. Nam magna mi, posuere a consequat vitae, vulputate nec turpis. Proin aliquam justo tincidunt convallis vestibulum. Nulla ut auctor dui. Aliquam faucibus nisl ut nisi ullamcorper condimentum. Maecenas vitae nulla non ex eleifend lobortis eu eu mauris. ",
      name: "William Shakespeare",
      title: "Hamlet",
    },
    {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum urna mauris, congue in lectus vel, aliquam dictum mi. Curabitur tincidunt ipsum eu urna eleifend, sollicitudin pretium neque accumsan. Nam magna mi, posuere a consequat vitae, vulputate nec turpis. Proin aliquam justo tincidunt convallis vestibulum. Nulla ut auctor dui. Aliquam faucibus nisl ut nisi ullamcorper condimentum. Maecenas vitae nulla non ex eleifend lobortis eu eu mauris. ",
      name: "Edgar Allan Poe",
      title: "A Dream Within a Dream",
    },
    {
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum urna mauris, congue in lectus vel, aliquam dictum mi. Curabitur tincidunt ipsum eu urna eleifend, sollicitudin pretium neque accumsan. Nam magna mi, posuere a consequat vitae, vulputate nec turpis. Proin aliquam justo tincidunt convallis vestibulum. Nulla ut auctor dui. Aliquam faucibus nisl ut nisi ullamcorper condimentum. Maecenas vitae nulla non ex eleifend lobortis eu eu mauris. ",
      name: "Jane Austen",
      title: "Pride and Prejudice",
    },
    {
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum urna mauris, congue in lectus vel, aliquam dictum mi. Curabitur tincidunt ipsum eu urna eleifend, sollicitudin pretium neque accumsan. Nam magna mi, posuere a consequat vitae, vulputate nec turpis. Proin aliquam justo tincidunt convallis vestibulum. Nulla ut auctor dui. Aliquam faucibus nisl ut nisi ullamcorper condimentum. Maecenas vitae nulla non ex eleifend lobortis eu eu mauris. ",
      name: "Herman Melville",
      title: "Moby-Dick",
    },
  ];

  const products = [
    {
        title: "Product 1",
        link: "https://example.com/product1",
        thumbnail: "https://i.imgur.com/eLSAjEc.png"
    },
    {
        title: "Product 2",
        link: "https://example.com/product2",
        thumbnail: "https://i.imgur.com/eLSAjEc.png"
    },
    {
        title: "Product 3",
        link: "https://example.com/product3",
        thumbnail: "https://i.imgur.com/eLSAjEc.png"
    },
    {
        title: "Product 4",
        link: "https://example.com/product4",
        thumbnail:"https://i.imgur.com/eLSAjEc.png"
    },
    {
        title: "Product 5",
        link: "https://example.com/product5",
        thumbnail: "https://i.imgur.com/eLSAjEc.png"
    },
    {
      title: "Product 1",
      link: "https://example.com/product1",
      thumbnail: "https://i.imgur.com/eLSAjEc.png"
  },
  {
      title: "Product 2",
      link: "https://example.com/product2",
      thumbnail: "https://i.imgur.com/eLSAjEc.png"
  },
  {
      title: "Product 3",
      link: "https://example.com/product3",
      thumbnail: "https://i.imgur.com/eLSAjEc.png"
  },
  {
      title: "Product 4",
      link: "https://example.com/product4",
      thumbnail:"https://i.imgur.com/eLSAjEc.png"
  },
  {
      title: "Product 5",
      link: "https://example.com/product5",
      thumbnail: "https://i.imgur.com/eLSAjEc.png"
  }
    
  ];
  const images =[
    {
      image:'https://i.imgur.com/WUtsRM9.png',
      alt:'first photo',
      
    }
  ];