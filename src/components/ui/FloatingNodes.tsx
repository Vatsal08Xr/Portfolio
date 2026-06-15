"use client"

import React, { useEffect, useRef } from "react"

interface Node {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  baseRadius: number
}

function createNodes(count: number, spread: number): Node[] {
  const nodes: Node[] = []
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: (Math.random() - 0.5) * spread,
      y: (Math.random() - 0.5) * spread,
      z: (Math.random() - 0.5) * spread * 0.6,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      vz: (Math.random() - 0.5) * 0.08,
      baseRadius: 3 + Math.random() * 5,
    })
  }
  return nodes
}

export default function FloatingNodes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    const cx = W / 2
    const cy = H / 2
    const connectionDist = 100
    const spread = 200

    const nodes = createNodes(18, spread)
    let angle = 0
    let animId: number

    const render = () => {
      ctx.clearRect(0, 0, W, H)
      angle += 0.002

      const cosA = Math.cos(angle)
      const sinA = Math.sin(angle)

      // Update positions (gentle drift)
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        n.z += n.vz

        // Soft boundary bounce
        const bound = spread * 0.55
        if (Math.abs(n.x) > bound) n.vx *= -1
        if (Math.abs(n.y) > bound) n.vy *= -1
        if (Math.abs(n.z) > bound * 0.6) n.vz *= -1
      }

      // Project nodes (slow Y-axis rotation + perspective)
      const projected = nodes.map((n) => {
        const rx = n.x * cosA + n.z * sinA
        const rz = -n.x * sinA + n.z * cosA

        const perspective = 500 / (500 + rz)
        return {
          sx: cx + rx * perspective,
          sy: cy + n.y * perspective,
          sz: rz,
          perspective,
          baseRadius: n.baseRadius,
        }
      })

      // Sort by z for depth ordering
      const sortedIdx = projected
        .map((_, i) => i)
        .sort((a, b) => projected[a].sz - projected[b].sz)

      // Draw connections
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dz = nodes[i].z - nodes[j].z
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < connectionDist) {
            const p1 = projected[i]
            const p2 = projected[j]
            const avgZ = (p1.sz + p2.sz) / 2
            const depthFade = Math.max(0.04, 0.2 + (avgZ / spread) * 0.15)
            const distFade = 1 - dist / connectionDist

            ctx.strokeStyle = `rgba(0, 0, 0, ${depthFade * distFade})`
            ctx.beginPath()
            ctx.moveTo(p1.sx, p1.sy)
            ctx.lineTo(p2.sx, p2.sy)
            ctx.stroke()
          }
        }
      }

      // Draw nodes (back-to-front)
      for (const idx of sortedIdx) {
        const p = projected[idx]
        const radius = Math.max(1.5, p.baseRadius * p.perspective)
        const depthOpacity = Math.max(0.15, 0.5 + (p.sz / spread) * 0.35)

        // Soft shadow
        ctx.save()
        ctx.shadowColor = "rgba(0, 0, 0, 0.15)"
        ctx.shadowBlur = 8
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 3

        // White fill
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.6, depthOpacity)})`
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Black edge
        ctx.strokeStyle = `rgba(0, 0, 0, ${depthOpacity})`
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, radius, 0, Math.PI * 2)
        ctx.stroke()
      }

      animId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="block w-full h-full"
    />
  )
}
