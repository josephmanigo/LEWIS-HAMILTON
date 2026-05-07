"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FlipLink } from "@/components/ui/flip-links"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)




  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [menuOpen])

  const navItems = [
    { label: "HOME", href: "#hero" },
    { label: "ON TRACK", href: "#on-track" },
    { label: "OFF TRACK", href: "#off-track" },
    { label: "GARAGE", href: "#garage" },
    { label: "CALENDAR", href: "#calendar" },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="mx-auto px-6 md:px-12 flex items-center justify-between py-6 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center items-start"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer group text-left flex items-center h-12"
            >
              <Image
                src="/logo.png"
                alt="Lewis Hamilton Logo"
                width={90}
                height={30}
                className="object-contain transition-opacity duration-300 group-hover:opacity-80"
                priority
              />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-accent transition-colors hover:text-white group"
              aria-label="Menu"
            >
              {menuOpen ? (
                <X className="w-8 h-8" strokeWidth={2} />
              ) : (
                <Menu className="w-8 h-8" strokeWidth={2} />
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-dark/95 backdrop-blur-xl z-40 flex items-center justify-center"
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              }}
              className="text-center"
            >
              <motion.ul className="space-y-4 md:space-y-6 text-white flex flex-col items-center">
                {navItems.map((item) => (
                  <motion.li
                    key={item.label}
                    variants={{
                      open: { opacity: 1, y: 0, rotate: 0 },
                      closed: { opacity: 0, y: 20, rotate: -5 },
                    }}
                  >
                    <FlipLink
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-white hover:text-white text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl"
                    >
                      {item.label}
                    </FlipLink>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 },
                }}
                className="mt-12 flex justify-center gap-6"
              >
                {[
                  { label: "INSTAGRAM", href: "https://www.instagram.com/lewishamilton" },
                  { label: "X", href: "https://x.com/LewisHamilton" },
                  { label: "YOUTUBE", href: "https://www.youtube.com/@lewishamilton/videos" },
                ].map((social) => (
                  <motion.div
                    key={social.label}
                    whileHover={{ scale: 1.1 }}
                  >
                    <FlipLink
                      href={social.href}
                      className="text-sm font-bold text-white/60 hover:text-white"
                    >
                      {social.label}
                    </FlipLink>
                  </motion.div>
                ))}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
