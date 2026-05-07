"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import Lenis from "lenis"

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.0,
      easing: (t) => {
        // High-inertia cinematic easing — matches Leclerc-style momentum
        return 1 - Math.pow(1 - t, 5)
      },
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 0.7,
      infinite: false,
    })

    lenisRef.current = lenis
    ;(window as any).__lenis = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
      ;(window as any).__lenis = null
    }
  }, [])

  return <>{children}</>
}
