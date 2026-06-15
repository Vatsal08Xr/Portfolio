"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/button"
import { GitBranch, ExternalLink, CheckCircle } from "lucide-react"

const projectsData = [
  {
    title: "Music Bridge",
    description: "A platform that converts song links between Spotify, YouTube Music, and Apple Music, making sharing music easier across different platforms.",
    features: [
      "Cross-platform music sharing",
      "Fast link conversion",
      "User-friendly workflow"
    ],
    githubLink: "https://github.com/Vatsal08Xr/spotify-proxy"
  },
  {
    title: "Legal Document Analyzer",
    description: "An AI-powered prototype that analyzes legal documents, identifies key clauses, extracts important points, and highlights high-risk and low-risk sections.",
    features: [
      "Clause extraction",
      "Risk analysis",
      "Key point summarization",
      "AI-powered insights"
    ],
    githubLink: "https://github.com/Vatsal08Xr/SafeDocs"
  },
  {
    title: "Legal Clinic",
    description: "A comprehensive platform offering legal consultation and resources, connecting users with legal professionals efficiently.",
    features: [
      "Legal consultation",
      "Resource access",
      "User-friendly interface"
    ],
    websiteLink: "https://legalclinic.onrender.com/"
  }
]

export default function Projects() {
  return (
    <section id="projects" className="container mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle title="Projects" />
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projectsData.map((project, idx) => (
            <Card key={idx} className="flex flex-col h-full bg-background group hover:border-foreground/40 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                <CardDescription className="text-base text-muted leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">Features</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start">
                      <CheckCircle className="mr-3 h-5 w-5 text-foreground shrink-0" />
                      <span className="text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex space-x-4 pt-6 border-t border-border mt-auto">
                {project.githubLink && (
                  <Button variant="default" asChild className="flex-1 group-hover:bg-foreground/90">
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <GitBranch className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                )}
                {project.websiteLink && (
                  <Button variant="outline" asChild className="flex-1">
                    <a href={project.websiteLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Site
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
