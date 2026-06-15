"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { MapPin, GraduationCap, Code, Briefcase } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="container mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle title="About" />
        
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-24">
          <div>
            <h3 className="mb-4 text-2xl font-bold tracking-tight">Summary</h3>
            <p className="text-lg leading-relaxed text-muted">
              I am an Artificial Intelligence and Machine Learning student at Reva University, with a strong passion for software development. I enjoy building practical AI-powered applications that solve real-world problems. I am always open to learning new technologies and adapting to new challenges.
            </p>
          </div>
          
          <div className="flex flex-col space-y-6 rounded-lg bg-secondary p-8">
            <h3 className="text-xl font-bold tracking-tight mb-2">Quick Facts</h3>
            <div className="flex items-center space-x-4">
              <MapPin className="h-6 w-6 text-foreground" />
              <span className="text-lg text-foreground font-medium">Bengaluru, India</span>
            </div>
            <div className="flex items-center space-x-4">
              <GraduationCap className="h-6 w-6 text-foreground" />
              <span className="text-lg text-foreground font-medium">AI & Machine Learning Student</span>
            </div>
            <div className="flex items-center space-x-4">
              <Code className="h-6 w-6 text-foreground" />
              <span className="text-lg text-foreground font-medium">Software Development Enthusiast</span>
            </div>
            <div className="flex items-center space-x-4">
              <Briefcase className="h-6 w-6 text-foreground" />
              <span className="text-lg text-foreground font-medium">Open to Opportunities</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
