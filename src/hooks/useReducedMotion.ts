import { useEffect, useState } from "react"

/**
 * Custom Hook สำหรับตรวจสอบว่าผู้ใช้เปิดการตั้งค่าลดความเคลื่อนไหว (prefers-reduced-motion) หรือไม่
 * ช่วยป้องกันอาการวิงเวียนและมอบ Accessibility (a11y) ที่ดีตามมาตรฐานเว็บสากล
 */
export function useReducedMotion(): boolean {
  const [reduceMotion, setReduceMotion] = useState<boolean>(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleChange = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches)
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    } else {
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  return reduceMotion
}

export default useReducedMotion
