"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import FloatingBrackets from "@/components/ui/FloatingBrackets"
import FloatingNodes from "@/components/ui/FloatingNodes"
import GeometricStack from "@/components/ui/GeometricStack"

const skillsData = [
  {
    category: "Programming Languages",
    items: ["C", "Python", "Kotlin (Beginner)", "Java (Beginner)"],
    Background: FloatingBrackets,
  },
  {
    category: "Core Skills",
    items: ["Problem Solving", "Communication", "Teamwork", "Adaptability"],
    Background: FloatingNodes,
  },
  {
    category: "Professional Traits",
    items: ["Willingness to Learn", "Commitment to Excellence", "Deadline Management"],
    Background: GeometricStack,
  },
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

export default function Skills() {
  return (
    <section id="skills" className="bg-secondary">
      <div className="container mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <SectionTitle title="Skills" />
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {skillsData.map((skillGroup, idx) => {
              const BgComponent = skillGroup.Background
              return (
                <motion.div key={idx} variants={itemVariants} className="relative">
                  {/* Floating canvas background */}
                  <div className="absolute inset-0 -m-4 opacity-25 pointer-events-none -z-0 overflow-hidden rounded-xl">
                    <BgComponent />
                  </div>

                  <Card className="relative z-10 h-full bg-background/80 backdrop-blur-sm border-border">
                    <CardHeader>
                      <CardTitle className="text-xl">{skillGroup.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="flex flex-col space-y-3">
                        {skillGroup.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-center text-muted">
                            <span className="mr-3 h-1.5 w-1.5 rounded-full bg-foreground" />
                            <span className="text-base">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
