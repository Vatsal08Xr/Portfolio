"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

export default function Navbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = React.useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold tracking-tight text-xl">SB.</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="#about" className="transition-colors hover:text-foreground/80 text-foreground">
            About
          </Link>
          <Link href="#skills" className="transition-colors hover:text-foreground/80 text-foreground">
            Skills
          </Link>
          <Link href="#projects" className="transition-colors hover:text-foreground/80 text-foreground">
            Projects
          </Link>
          <Link href="#contact" className="transition-colors hover:text-foreground/80 text-foreground">
            Contact
          </Link>
        </nav>
      </div>
    </motion.header>
  )
}
