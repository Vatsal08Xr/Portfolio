"use client"

import React, { useEffect, useRef } from "react"

interface GeoShape {
  x: number
  y: number
  z: number
  size: number
  rotation: number
  rotSpeed: number
  floatOffset: number
  floatSpeed: number
  sides: number
}

function createShapes(count: number): GeoShape[] {
  const shapes: GeoShape[] = []
  const sidesOptions = [3, 4, 5, 6] // triangle, square, pentagon, hexagon
  for (let i = 0; i < count; i++) {
    shapes.push({
      x: (Math.random() - 0.5) * 200,
      y: -100 + (i / count) * 200, // vertically distributed like a stack
      z: (Math.random() - 0.5) * 120,
      size: 14 + Math.random() * 20,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      floatOffset: Math.random() * Math.PI * 2,
      floatSpeed: 0.005 + Math.random() * 0.008,
      sides: sidesOptions[Math.floor(Math.random() * sidesOptions.length)],
    })
  }
  return shapes
}

function drawPolygon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  sides: number,
  rotation: number,
  opacity: number
) {
  ctx.beginPath()
  for (let i = 0; i <= sides; i++) {
    const angle = rotation + (i * 2 * Math.PI) / sides
    const x = cx + radius * Math.cos(angle)
    const y = cy + radius * Math.sin(angle)
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()

  // Soft shadow
  ctx.save()
  ctx.shadowColor = "rgba(0, 0, 0, 0.12)"
  ctx.shadowBlur = 10
  ctx.shadowOffsetX = 1
  ctx.shadowOffsetY = 3

  // White material fill
  ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.5, opacity * 0.85)})`
  ctx.fill()
  ctx.restore()

  // Black edges
  ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`
  ctx.lineWidth = 1.2
  ctx.stroke()
}

export default function GeometricStack() {
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

    const shapes = createShapes(10)
    let frame = 0
    let animId: number

    const render = () => {
      ctx.clearRect(0, 0, W, H)
      frame++

      const globalAngle = frame * 0.001

      // Sort by z (back-to-front)
      const cosG = Math.cos(globalAngle)
      const sinG = Math.sin(globalAngle)

      const projected = shapes.map((s, i) => {
        // Float up/down
        const floatY = Math.sin(frame * s.floatSpeed + s.floatOffset) * 12

        // Gentle global Y-axis rotation
        const rx = s.x * cosG + s.z * sinG
        const rz = -s.x * sinG + s.z * cosG

        const perspective = 400 / (400 + rz)

        return {
          sx: cx + rx * perspective,
          sy: cy + (s.y + floatY) * perspective,
          sz: rz,
          radius: s.size * perspective,
          rotation: s.rotation + frame * s.rotSpeed,
          sides: s.sides,
          perspective,
          idx: i,
        }
      })

      // Sort back-to-front
      projected.sort((a, b) => a.sz - b.sz)

      // Draw thin connecting lines between nearby shapes
      ctx.lineWidth = 0.5
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].sx - projected[j].sx
          const dy = projected[i].sy - projected[j].sy
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            const fade = 1 - dist / 120
            ctx.strokeStyle = `rgba(0, 0, 0, ${fade * 0.08})`
            ctx.beginPath()
            ctx.moveTo(projected[i].sx, projected[i].sy)
            ctx.lineTo(projected[j].sx, projected[j].sy)
            ctx.stroke()
          }
        }
      }

      // Draw shapes
      for (const p of projected) {
        const depthOpacity = Math.max(0.15, 0.4 + (p.sz / 120) * 0.3)
        drawPolygon(ctx, p.sx, p.sy, p.radius, p.sides, p.rotation, depthOpacity)
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
