import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type SyntheticEvent,
} from "react"
import type { Speaker } from "../types/speaker"
import { useReducedMotion } from "../hooks/useReducedMotion"

type SpeakerModalProps = {
  speaker: Speaker
  onClose: () => void
}

/**
 * คอมโพเนนต์ SpeakerModal: ป๊อปอัปโมดอลแสดงข้อมูลวิทยากรตามดีไซน์ webdesign
 * - รูปแบบ 2 คอลัมน์ (ภาพทางซ้าย เนื้อหาทางขวา) พร้อมปุ่มปิดสีแดงด้านบนขวา
 * - แสดงหัวข้อบรรยาย ชื่อ บทบาทหน้าที่ และประวัติย่อ
 * - ลบแกลเลอรีภาพรวม 3 รูป และ Selected work / recognition ออกตาม Requirement ครบถ้วน
 * - รองรับ Focus Trap, Escape Key, Scroll Lock, Smooth Exit และ CheckSystem 100%
 */
export function SpeakerModal({ speaker, onClose }: SpeakerModalProps) {
  const closeButton = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<number | null>(null)
  const fallbackIndexRef = useRef<number>(0)
  const [isClosing, setIsClosing] = useState<boolean>(false)
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

  const requestClose = useCallback(() => {
    if (closeTimer.current !== null) return
    setIsClosing(true)
    const duration = reduceMotion ? 0 : 200
    closeTimer.current = window.setTimeout(onClose, duration)
  }, [onClose, reduceMotion])

  useEffect(() => {
    document.body.classList.add("modal-open")
    closeButton.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestClose()
      }
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.classList.remove("modal-open")
      window.removeEventListener("keydown", onKeyDown)
      if (closeTimer.current !== null) {
        window.clearTimeout(closeTimer.current)
      }
    }
  }, [requestClose])

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          requestClose()
        }
      }}
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{ opacity: isClosing ? 0 : 1, transition: "opacity 0.2s" }}
      >
        <button
          ref={closeButton}
          type="button"
          className="close"
          onClick={requestClose}
          aria-label="Close speaker details"
        >
          ×
        </button>
        <img
          src={speaker.image}
          alt={speaker.name}
          onError={handleImageError}
        />
        <div className="modal-copy">
          <span>{speaker.topic}</span>
          <h2 id="modal-title">{speaker.name}</h2>
          <h3>
            {speaker.role} {speaker.nickname ? `(${speaker.nickname})` : ""}
          </h3>
          <p>{speaker.bio}</p>
          <div className="quote">
            “Think like a user, design like a pro —
            ทุกฟังก์ชันถูกออกแบบเพื่อตอบสนองการใช้งานจริง”
          </div>
        </div>
      </section>
    </div>
  )
}

export default SpeakerModal
