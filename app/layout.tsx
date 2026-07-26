import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import AuthProvider from "@/context/AuthContext";


export const metadata: Metadata = {
  title: "SkillExchange",
  description: "Exchange skills and grow together",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>

        <AuthProvider>

          <Navbar />

          <main>
            {children}
          </main>


        </AuthProvider>

      </body>
    </html>
  );
}