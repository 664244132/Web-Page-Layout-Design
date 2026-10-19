import { useEffect, useRef, type MouseEvent } from "react"
import type { Speaker } from "../types/speaker"
import { Arrow } from "./Arrow"
import { useReducedMotion } from "../hooks/useReducedMotion"
import "./SpeakerCard.css"

type SpeakerCardProps = {
  speaker: Speaker
  index: number
  onSelect: (speaker: Speaker) => void
}

/**
 * คอมโพเนนต์ SpeakerCard: การ์ดแสดงข้อมูลวิทยากรแต่ละคน
 * มีความสามารถคำนวณมิติ 3D Perspective Tilt และแสงสะท้อนตามเคอร์เซอร์เมาส์ภายในตัวเอง
 */
export function SpeakerCard({ speaker, index, onSelect }: SpeakerCardProps) {
  const tiltFrame = useRef<number>(0)
  const reduceMotion = useReducedMotion()

  // ล้างการคำนวณ Animation Frame เมื่อ Component ถูกทำลาย (Unmount)
  useEffect(() => {
    return () => {
      cancelAnimationFrame(tiltFrame.current)
    }
  }, [])

  // ฟังก์ชันคำนวณการเอียงแบบ 3D ตามตำแหน่งเคอร์เซอร์เมาส์
  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    if (reduceMotion) return

    const card = event.currentTarget
    const bounds = card.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height

    cancelAnimationFrame(tiltFrame.current)
    tiltFrame.current = requestAnimationFrame(() => {
      card.style.setProperty("--rx", `${(0.5 - y) * 7}deg`)
      card.style.setProperty("--ry", `${(x - 0.5) * 8}deg`)
      card.style.setProperty("--mx", `${x * 100}%`)
      card.style.setProperty("--my", `${y * 100}%`)
    })
  }

  const handleMouseLeave = (event: MouseEvent<HTMLButtonElement>) => {
    cancelAnimationFrame(tiltFrame.current)
    event.currentTarget.style.setProperty("--rx", "0deg")
    event.currentTarget.style.setProperty("--ry", "0deg")
  }

  return (
    <button
      type="button"
      className={`speaker-card card-${index + 1}`}
      onClick={() => onSelect(speaker)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        { "--i": index, "--accent": speaker.accent } as React.CSSProperties
      }
      aria-label={`View profile of ${speaker.name}, ${speaker.role}`}
    >
      <div className="image-wrap">
        <img
          src={speaker.image}
          alt={speaker.name}
          loading={index < 2 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          decoding="async"
          width="400"
          height="512"
        />
        <span className="card-number">0{index + 1}</span>
      </div>

      <div className="card-copy">
        <p>{speaker.role}</p>
        <h2>{speaker.name}</h2>
        <div>
          <span>{speaker.topic}</span>
          <Arrow />
        </div>
      </div>
    </button>
  )
}

export default SpeakerCard
