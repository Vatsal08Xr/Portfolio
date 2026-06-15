import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string
  subtitle?: string
}

export function SectionTitle({ title, subtitle, className, ...props }: SectionTitleProps) {
  return (
    <div className={cn("mb-12", className)}>
      <h2 
        className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
        {...props}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
