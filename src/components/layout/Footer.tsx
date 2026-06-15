import * as React from "react"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="container mx-auto flex max-w-5xl flex-col items-center justify-between px-4 sm:px-6 md:flex-row">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Saivatsal B. All rights reserved.
        </p>
        <div className="mt-4 flex space-x-6 md:mt-0">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-foreground transition-colors"
          >
            <span className="sr-only">GitHub</span>
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-foreground transition-colors"
          >
            <span className="sr-only">LinkedIn</span>
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
