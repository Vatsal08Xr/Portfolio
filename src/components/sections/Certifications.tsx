"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Award } from "lucide-react"

const certifications = [
  "Google Cybersecurity Certificate",
  "Wadhwani Entrepreneurship Certification"
]

export default function Certifications() {
  return (
    <section id="certifications" className="container mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle title="Certifications" />
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {certifications.map((cert, idx) => (
            <div 
              key={idx} 
              className="flex items-center p-6 border border-border rounded-lg bg-background hover:bg-secondary transition-colors duration-200"
            >
              <Award className="h-8 w-8 text-foreground mr-6 shrink-0" />
              <h3 className="text-lg font-medium text-foreground">{cert}</h3>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
