"use client";
import React from "react";
import { StickyScroll } from "../../components/ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Collaborative Editing",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae cursus erat. Proin hendrerit quam auctor venenatis tincidunt. Cras tristique mi eget ullamcorper pretium. Etiam semper elit arcu. Phasellus eu ex in libero interdum hendrerit id id magna. Donec id libero id massa rhoncus fringilla in ut ex. Vivamus augue enim, semper ac malesuada eget, maximus ut nisi. Sed sed odio mauris. Proin posuere massa sollicitudin mauris suscipit, id volutpat ante auctor.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae cursus erat. Proin hendrerit quam auctor venenatis tincidunt. Cras tristique mi eget ullamcorper pretium. Etiam semper elit arcu. Phasellus eu ex in libero interdum hendrerit id id magna. Donec id libero id massa rhoncus fringilla in ut ex. Vivamus augue enim, semper ac malesuada eget, maximus ut nisi. Sed sed odio mauris. Proin posuere massa sollicitudin mauris suscipit, id volutpat ante auctor.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/image.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Version control",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae cursus erat. Proin hendrerit quam auctor venenatis tincidunt. Cras tristique mi eget ullamcorper pretium. Etiam semper elit arcu. Phasellus eu ex in libero interdum hendrerit id id magna. Donec id libero id massa rhoncus fringilla in ut ex. Vivamus augue enim, semper ac malesuada eget, maximus ut nisi. Sed sed odio mauris. Proin posuere massa sollicitudin mauris suscipit, id volutpat ante auctor.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Version control
      </div>
    ),
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Running out of content
      </div>
    ),
  },
];
export default function AboutUs() {
  return (
    <main className="">
      <StickyScroll content={content} />
    </main>
  );
}
