"use client"

import React, { useEffect, useRef } from "react"

// Generate random points on a sphere
function generateSpherePoints(numPoints: number): { x: number; y: number; z: number }[] {
  const points = []
  for (let i = 0; i < numPoints; i++) {
    // Math.random() is 0 to 1
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    
    const x = Math.sin(phi) * Math.cos(theta)
    const y = Math.sin(phi) * Math.sin(theta)
    const z = Math.cos(phi)
    points.push({ x, y, z })
  }
  return points
}

export default function WireframeOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Config
    const numPoints = 80
    const points = generateSpherePoints(numPoints)
    const connectionDistance = 0.45
    const orbRadius = 200 // pixel radius

    // Edges
    const edges: [number, number][] = []
    for (let i = 0; i < numPoints; i++) {
      for (let j = i + 1; j < numPoints; j++) {
        const dx = points[i].x - points[j].x
        const dy = points[i].y - points[j].y
        const dz = points[i].z - points[j].z
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < connectionDistance) {
          edges.push([i, j])
        }
      }
    }

    let animationFrameId: number
    let angleX = 0
    let angleY = 0

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const width = canvas.width
      const height = canvas.height
      const centerX = width / 2
      const centerY = height / 2

      // Rotation matrix applications
      const cosX = Math.cos(angleX)
      const sinX = Math.sin(angleX)
      const cosY = Math.cos(angleY)
      const sinY = Math.sin(angleY)

      const projectedPoints = points.map((p) => {
        // Rotate around X
        const y1 = p.y * cosX - p.z * sinX
        const z1 = p.y * sinX + p.z * cosX

        // Rotate around Y
        const x2 = p.x * cosY + z1 * sinY
        const z2 = -p.x * sinY + z1 * cosY
        const y2 = y1

        // 3D to 2D projection (orthographic is fine for abstract orb)
        // Add perspective scale
        const perspective = 300 / (300 + z2 * orbRadius)
        
        return {
          x: centerX + x2 * orbRadius * perspective,
          y: centerY + y2 * orbRadius * perspective,
          z: z2,
          perspective
        }
      })

      // Draw edges
      ctx.lineWidth = 1
      for (const [i, j] of edges) {
        const p1 = projectedPoints[i]
        const p2 = projectedPoints[j]
        
        // Average Z for opacity depth cueing
        const avgZ = (p1.z + p2.z) / 2
        // Make back lines more transparent
        const opacity = Math.max(0.05, 0.4 + avgZ * 0.4)
        
        ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }

      // Draw nodes
      for (const p of projectedPoints) {
        const opacity = Math.max(0.1, 0.6 + p.z * 0.4)
        const radius = Math.max(0.5, 2.5 * p.perspective)
        
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Increment angles for next frame (slow rotation)
      angleX += 0.001
      angleY += 0.002

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={600}
      className="block w-full h-full"
    />
  )
}
