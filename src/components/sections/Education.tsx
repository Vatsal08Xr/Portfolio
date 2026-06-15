"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionTitle } from "@/components/ui/SectionTitle"

export default function Education() {
  return (
    <section id="education" className="bg-secondary">
      <div className="container mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle title="Education" />
          
          <div className="relative border-l border-border ml-3 md:ml-6">
            <div className="mb-10 ml-6 md:ml-10">
              <span className="absolute flex items-center justify-center w-4 h-4 rounded-full -left-2 bg-foreground ring-4 ring-secondary"></span>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="flex items-center text-xl font-bold text-foreground">
                  Certificate of Higher Education
                </h3>
                <span className="text-sm font-medium text-muted mt-1 md:mt-0 px-3 py-1 bg-background border border-border rounded-full inline-block w-fit">
                  2025 - Present
                </span>
              </div>
              <h4 className="text-lg font-medium text-foreground mb-2">Artificial Intelligence and Machine Learning</h4>
              <p className="text-base font-normal text-muted mb-1">Reva University</p>
              <p className="text-sm font-normal text-muted">Bengaluru, India</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
