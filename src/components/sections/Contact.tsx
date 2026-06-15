"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Button } from "@/components/ui/button"
import { Mail, MapPin } from "lucide-react"

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submit behavior
    alert("This is a minimalist visual shell. You can connect it to a form service like Formspree later!")
  }

  return (
    <section id="contact" className="bg-secondary">
      <div className="container mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle 
            title="Contact" 
            subtitle="Feel free to reach out if you're looking for a developer, have a question, or just want to connect." 
          />
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="flex flex-col space-y-8">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-foreground mr-4 shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-foreground">Email</h4>
                  <a href="mailto:saivatsalb@gmail.com" className="text-muted hover:text-foreground transition-colors mt-1 inline-block">
                    saivatsalb@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-foreground mr-4 shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-foreground">Location</h4>
                  <p className="text-muted mt-1">Bengaluru, India</p>
                </div>
              </div>
            </div>
            
            <div className="bg-background rounded-lg border border-border p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="h-10 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="h-10 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="min-h-[120px] rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow resize-y"
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
