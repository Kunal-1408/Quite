import type { Metadata } from "next";
import { Inter } from "next/font/google";




const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Quiet Good Portfolio",
  description: "Your one stop for all Marketing needs",
};

export default function dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>

            {children}
    </section>
  );
}