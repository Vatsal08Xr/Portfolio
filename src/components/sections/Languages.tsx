"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionTitle } from "@/components/ui/SectionTitle"

const languages = [
  { name: "English", level: "Advanced" },
  { name: "Hindi", level: "Advanced" },
  { name: "Telugu", level: "Advanced" },
  { name: "Kannada", level: "Advanced" },
]

export default function Languages() {
  return (
    <section id="languages" className="bg-secondary">
      <div className="container mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle title="Languages" />
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {languages.map((lang, idx) => (
              <div key={idx} className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-foreground">{lang.name}</span>
                  <span className="text-sm text-muted">{lang.level}</span>
                </div>
                {/* Visual Progress Indicator */}
                <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-foreground rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "90%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
