"use client"

import React, { useEffect, useRef } from "react"

interface Bracket {
  x: number
  y: number
  z: number
  size: number
  rotation: number
  rotSpeed: number
  floatOffset: number
  floatSpeed: number
  type: "angle" | "curly" | "square" | "paren"
}

function createBrackets(count: number): Bracket[] {
  const brackets: Bracket[] = []
  const types: Bracket["type"][] = ["angle", "curly", "square", "paren"]
  for (let i = 0; i < count; i++) {
    brackets.push({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      z: (Math.random() - 0.5) * 100,
      size: 10 + Math.random() * 16,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.005,
      floatOffset: Math.random() * Math.PI * 2,
      floatSpeed: 0.004 + Math.random() * 0.007,
      type: types[Math.floor(Math.random() * types.length)],
    })
  }
  return brackets
}

function drawBracketShape(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  rotation: number,
  type: Bracket["type"],
  opacity: number
) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(rotation)

  // Soft shadow
  ctx.shadowColor = "rgba(0, 0, 0, 0.1)"
  ctx.shadowBlur = 6
  ctx.shadowOffsetX = 1
  ctx.shadowOffsetY = 2

  ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`
  ctx.lineWidth = 1.5
  ctx.lineCap = "round"
  ctx.lineJoin = "round"

  const h = size
  const w = size * 0.5

  ctx.beginPath()
  switch (type) {
    case "angle":
      // < >
      ctx.moveTo(w, -h)
      ctx.lineTo(-w, 0)
      ctx.lineTo(w, h)
      break
    case "curly":
      // {
      ctx.moveTo(w * 0.5, -h)
      ctx.quadraticCurveTo(-w * 0.3, -h * 0.5, -w, 0)
      ctx.quadraticCurveTo(-w * 0.3, h * 0.5, w * 0.5, h)
      break
    case "square":
      // [
      ctx.moveTo(w * 0.4, -h)
      ctx.lineTo(-w * 0.4, -h)
      ctx.lineTo(-w * 0.4, h)
      ctx.lineTo(w * 0.4, h)
      break
    case "paren":
      // (
      ctx.moveTo(w * 0.3, -h)
      ctx.quadraticCurveTo(-w * 0.8, 0, w * 0.3, h)
      break
  }
  ctx.stroke()

  ctx.restore()
}

export default function FloatingBrackets() {
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

    const brackets = createBrackets(12)
    let frame = 0
    let animId: number

    const render = () => {
      ctx.clearRect(0, 0, W, H)
      frame++

      const globalAngle = frame * 0.0015

      const cosG = Math.cos(globalAngle)
      const sinG = Math.sin(globalAngle)

      const projected = brackets.map((b) => {
        const floatY = Math.sin(frame * b.floatSpeed + b.floatOffset) * 10

        const rx = b.x * cosG + b.z * sinG
        const rz = -b.x * sinG + b.z * cosG

        const perspective = 400 / (400 + rz)

        return {
          sx: cx + rx * perspective,
          sy: cy + (b.y + floatY) * perspective,
          sz: rz,
          size: b.size * perspective,
          rotation: b.rotation + frame * b.rotSpeed,
          type: b.type,
        }
      })

      projected.sort((a, b) => a.sz - b.sz)

      for (const p of projected) {
        const depthOpacity = Math.max(0.12, 0.35 + (p.sz / 100) * 0.25)
        drawBracketShape(ctx, p.sx, p.sy, p.size, p.rotation, p.type, depthOpacity)
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
