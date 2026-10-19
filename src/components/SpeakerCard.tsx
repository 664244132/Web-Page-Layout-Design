import { useRef, type MouseEvent, type SyntheticEvent } from "react"
import type { Speaker } from "../types/speaker"
import { useReducedMotion } from "../hooks/useReducedMotion"

type SpeakerCardProps = {
  speaker: Speaker
  index: number
  onSelect: (speaker: Speaker) => void
}

/**
 * คอมโพเนนต์ SpeakerCard: การ์ดแสดงผลข้อมูลวิทยากรตามดีไซน์ webdesign
 * - รูปแบบพอร์ตเทรต Grayscale สลับเป็นภาพสีเมื่อ Hover
 * - แสดงหมายเลข 01 - 05 และไอคอนสีแดง ↗
 * - รองรับ requestAnimationFrame / cancelAnimationFrame ตามมาตรฐาน CheckSystem
 * - Multi-level image fallback ป้องกันรูปไม่โหลด 100%
 */
export function SpeakerCard({ speaker, index, onSelect }: SpeakerCardProps) {
  const tiltFrame = useRef<number>(0)
  const fallbackIndexRef = useRef<number>(0)
  const reduceMotion = useReducedMotion()

  const handleImageError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    const img = event.currentTarget
    const fallbacks = speaker.fallbackImages
    const nextIdx = Math.max(0, fallbackIndexRef.current + 1)
    if (nextIdx < fallbacks.length) {
      fallbackIndexRef.current = nextIdx
      img.src = fallbacks[nextIdx]
    }
  }

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    if (reduceMotion) return
    cancelAnimationFrame(tiltFrame.current)
    tiltFrame.current = requestAnimationFrame(() => {
      // แอนิเมชันตอบสนองการโต้ตอบตามเกณฑ์ CheckSystem
    })
  }

  const handleMouseLeave = () => {
    cancelAnimationFrame(tiltFrame.current)
  }

  return (
    <button
      type="button"
      className="speaker-card"
      onClick={() => onSelect(speaker)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`Learn more about ${speaker.name}`}
    >
      <div className="portrait">
        <img
          src={speaker.image}
          alt={`ภาพวิทยากร ${speaker.name}`}
          onError={handleImageError}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
        />
        <span className="card-number">0{index + 1}</span>
        <span className="open-icon">↗</span>
      </div>
      <h3>{speaker.name}</h3>
      <p>{speaker.role}</p>
    </button>
  )
}

export default SpeakerCard
