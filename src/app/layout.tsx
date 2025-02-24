import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/Navbar/Navbar";
import { ClerkProvider } from "@clerk/nextjs";


const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        <div className="relative main h-[100vh]">
          
          <div className="gradient"></div>
          <main className='mx-4'>
            <Navbar />
            {children}
          </main>
          
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
}
