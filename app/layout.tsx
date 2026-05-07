import type React from "react"
import type { Metadata } from "next"
import { Roboto, Libre_Baskerville, Oswald } from "next/font/google"
import SmoothScroll from "@/components/smooth-scroll"
import Preloader from "@/components/preloader"
import "./globals.css"

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
})

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  display: "swap",
})

const oswald = Oswald({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
})

export const metadata: Metadata = {
  title: "LEWIS HAMILTON",
  description: "A Lewis Hamilton Formula 1 concept site celebrating speed, craft, legacy, and the next chapter in red.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans antialiased film-grain ${roboto.variable} ${libreBaskerville.variable} ${oswald.variable}`}
      >
        <Preloader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
