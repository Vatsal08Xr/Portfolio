"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import WireframeOrb from "@/components/ui/WireframeOrb"

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
      
      {/* Left Background Wireframe Orb */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] opacity-20 pointer-events-none -z-10 blur-[1px]">
        <WireframeOrb />
      </div>

      {/* Right Background Wireframe Orb */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] opacity-20 pointer-events-none -z-10 blur-[1px]">
        <WireframeOrb />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl">
          SAIVATSAL B
        </h1>
        <p className="mt-6 text-xl font-medium text-muted sm:text-2xl">
          AI & Machine Learning Student | Software Developer
        </p>
        <p className="mt-6 text-lg text-muted max-w-2xl mx-auto">
          Building practical AI-powered applications that solve real-world problems.
        </p>
        
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link href="#projects">View Projects</Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
            <Link href="#contact">Contact Me</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
