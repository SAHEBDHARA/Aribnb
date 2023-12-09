import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import { RegisterModel } from "./components/Models/RegisterModel";
import ToasterProvider from "./providers/ToasterProvider";
import { LoginModel } from "./components/Models/LoginModel";
import getCurrnetUser from "./actions/getCurrentUser";
import RentModel from "./components/Models/RentModel";
import SearchModel from "./components/Models/SearchModel";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone ",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrnetUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Navbar currentUser= {currentUser} />
          <ToasterProvider/>
          <RentModel/>  
          <SearchModel/>
          <RegisterModel/>  
          <LoginModel/>
        </ClientOnly>
          <div className="pb-20 pt-28">
        {children}
        </div>
      </body>
    </html>
  );
}
