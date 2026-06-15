"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Card, CardHeader, CardTitle } from "@/components/ui/Card"
import { Palette, Cpu, BookOpen, Blocks } from "lucide-react"

const interests = [
  { name: "Drawing and Animation", icon: Palette },
  { name: "Exploring New Technologies", icon: Cpu },
  { name: "Learning New Skills", icon: BookOpen },
  { name: "Building Software Projects", icon: Blocks },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Interests() {
  return (
    <section id="interests" className="container mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <SectionTitle title="Interests" />
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {interests.map((interest, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="h-full bg-background border-border flex flex-col items-center justify-center text-center p-6 hover:bg-secondary/50 transition-colors">
                <interest.icon className="h-10 w-10 text-foreground mb-4" strokeWidth={1.5} />
                <CardTitle className="text-lg leading-snug">{interest.name}</CardTitle>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
