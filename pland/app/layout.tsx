import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import Model from "./components/Models/Model";
import { RegisterModel } from "./components/Models/RegisterModel";
import ToasterProvider from "./providers/ToasterProvider";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Navbar />
          <ToasterProvider/>
          <RegisterModel/>  
        </ClientOnly>

        {children}
      </body>
    </html>
  );
}
