'use client'
import Hero  from "../components/hero";

import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";


import  {Marquee}  from "@/components/ui/marquee";
import { useState } from "react";
import Cards from "@/components/service_cards";
import Infor from "@/components/info";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Choose from "@/components/choose";

async function sendEmail() {

  event.preventDefault();
  
    try {
      // Trigger toast before the fetch request
      toast.info('Submitted!', { 
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
  
      // Fetch request
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ /* your data */ }),
      });
  
      // Handle response
      const data = await res.json();
  
      if (res.ok) {
        // Show success toast after email is successfully sent
        toast.success('Email sent successfully!', { 
          position: "bottom-left",
          autoClose: 2000,
          theme: "light",
        });
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      // Assert error as Error type to access the message
      const errorMessage = (error as Error).message || 'Unknown error occurred';
      toast.error(`Error: ${errorMessage}`, { 
        position: "bottom-left",
        autoClose: 2000,
        theme: "light",
      });
      console.log(error)
    }
  
}
  
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
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



export default function Home() {
  

  // const data = getData()
  return (
    <main className="bg-white dark:bg-neutral-900">
      <Hero/>
      
      <Infor/>
      <h1 className=" text-slate-900 font-bold text-5xl pb-5 ml-5">Why Choose us?</h1>
      <Choose/>
      <div className="flex flex-col bg mx-10 py-16">
          <h2 className=" text-slate-900 font-extrabold text-5xl pb-5 " >Our Clients </h2>  
      </div>
      <div className="items-center ">
        <Marquee logos={images} />
      </div>
      
      <div className="flex flex-col bg mx-10 pt-20">
          <h2 className=" text-slate-900 font-bold text-5xl pb-5 " >Solutions</h2>  
          <h3 className=" text-slate-900  text-3xl  " >Others are okay but we are <span className="text-orange-400 font-bold">Quite Good</span></h3>  
      </div>
      <Cards/>
      <div className=" bg-white flex flex-row justify-between py-12">
        <div className="place-items-center flex-row px-5 py-5 mx-auto">
            <h1 className="font-bold text-5xl text-orange-500 dark:text-neutral-200 justify-center py-10">
              Want better Reach?
            <p className="text-slate-700 text-lg max-w-sm mt-2 dark:text-neutral-300 flex flex-col">
            <text>Connect with us!!</text>
             <text>Drop us a line and we&apos;ll get back!!!</text>
            </p>
          </h1>
          {/* <div className="flex flex-col justify-between">
          <div  className=" items-center flex flex-row mx-auto my-auto  ">
              <p className="text-md text-slate-600 py-2 px-2 flex flex-col items-center">
                Business Queries
                <span className="text-sm text-slate-500 py-4">
                    example@quitegood.com
                </span>
              </p>
              <div
                  className="h-20 min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
              <p className="text-md text-slate-600 py-2 px-2 flex flex-col items-center">
                Business Queries
                <span className="text-sm text-slate-500 py-4">
                    example@quitegood.com
                </span>
              </p>
              <div
                  className="h-20 min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
              <p className="text-md text-slate-600 py-2 px-2 flex flex-col items-center">
                Business Queries
                <span className="text-sm text-slate-500 py-4">
                    example@quitegood.com
                </span>
              </p>
              <div
                  className="h-20 min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
              <p className="text-md text-slate-600 py-2 px-2 flex flex-col items-center">
                Business Queries
                <span className="text-sm text-slate-500 py-4">
                    example@quitegood.com
                </span>
              </p>

          </div>
           
           <div  className=" items-start justify-between flex flex-row mx-auto my-auto  ">
          <p className="text-md text-slate-600 py-2 px-2 flex flex-col items-center">
                Business Queries
                <span className="text-sm text-slate-500 py-4">
                    example@quitegood.com
                </span>
              </p>
              <div
                  className="h-20 min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
              <p className="text-md text-slate-600 py-2  px-2 flex flex-col items-center">
                Business Queries
                <span className="text-sm text-slate-500 py-4">
                    example@quitegood.com
                </span>
              </p>

          </div>
          <div className=" flex flex-row items-start py-8">
              <Link href={"#"}>
                <FaFacebook className="h-12 w-12 py-2 px-2 mx-auto"/>
              </Link>
              <Link href={"#"}>
                <FaInstagram className="h-12 w-12 py-2 px-2 mx-auto"/> 
              </Link>
              <Link href={"#"}>
                <FaTwitter className="h-12 w-12 py-2 px-2 mx-auto"/>
              </Link>
              <Link href={"#"}>
                <FaLinkedin className="h-12 w-12 py-2 px-2 mx-auto"/>
              </Link>
          </div>
          </div> */}
        </div>
          <div className="max-w-md w-full mx-auto rounded-none border-slate-400 md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
              <p className="text-2xl text-slate-700 text-bold py-5 ">Let us know your requirements!!</p>
              <form className="my-8" onSubmit={sendEmail}>
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
                <LabelInputContainer className="mb-4 box-content">
                  <Label htmlFor="Query">Query</Label>
                  <Input id="Query" placeholder="....." type="text" />
                </LabelInputContainer>


                <button onClick={sendEmail}
                  className="bg-gradient-to-br relative group/btn from-orange-400 dark:from-zinc-900 dark:to-zinc-900 to-orange-300 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="submit"
                >
                  Submit &rarr;
                  <BottomGradient />
                </button>
                <ToastContainer
                    position="bottom-left"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    
                    />

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
      src:'https://i.imgur.com/WUtsRM9.png',
      alt:'second photo',
  
      
    },    {
      src:'https://i.imgur.com/WUtsRM9.png',
      alt:'first photo',
  
      
    },    {
      src:'https://i.imgur.com/WUtsRM9.png',
      alt:'third photo',
  
      
    },    {
      src:'https://i.imgur.com/WUtsRM9.png',
      alt:'fourth photo',
  
      
    },    {
      src:'https://i.imgur.com/WUtsRM9.png',
      alt:'fifth photo',
  
      
    },    {
      src:'https://i.imgur.com/WUtsRM9.png',
      alt:'sixth photo',
  
      
    },
    
  ];
