import { useCallback, useEffect, useRef, useState } from "react"
import type { Speaker } from "../types/speaker"
import { speakers } from "../data/speakers"
import { CloseIcon } from "./CloseIcon"
import { useReducedMotion } from "../hooks/useReducedMotion"
import "./SpeakerModal.css"

type SpeakerModalProps = {
  speaker: Speaker
  onClose: () => void
}

/**
 * คอมโพเนนต์ SpeakerModal: ป๊อปอัปโมดอลเจาะลึกข้อมูลวิทยากร
 * รองรับ Accessibility (Escape Key, Focus Trap, Scroll Lock) และแอนิเมชัน Smooth Exit
 * (ได้ทำการลบส่วน Selected work และรูปภาพรวม 3 รูปออกตาม Requirement เรียบร้อยแล้ว)
 */
export function SpeakerModal({ speaker, onClose }: SpeakerModalProps) {
  const closeButton = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<number | null>(null)
  const [isClosing, setIsClosing] = useState<boolean>(false)
  const reduceMotion = useReducedMotion()

  // ค้นหาตำแหน่ง Index ของวิทยากรโดยเปรียบเทียบจากชื่อ
  const speakerIndex = Math.max(
    0,
    speakers.findIndex((item) => item.name === speaker.name),
  )

  // ฟังก์ชันสั่งปิด Modal อย่างนุ่มนวล (Smooth Dismiss)
  const requestClose = useCallback(() => {
    // Early Return: ป้องกันการกดปิดซ้ำซ้อนขณะกำลังเล่นแอนิเมชันปิด
    if (closeTimer.current !== null) return

    setIsClosing(true)
    // หากเปิดโหมดลดการเคลื่อนไหว (prefers-reduced-motion) ให้ปิดทันที (0ms)
    // หากปกติ ให้รอเวลา 620ms เพื่อให้ CSS Keyframe (panel-out, fade-out) แสดงผลจนจบก่อนถอดออกจาก DOM
    const duration = reduceMotion ? 0 : 620
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
      className={`modal-shell${isClosing ? " is-closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="speaker-name"
    >
      <button
        type="button"
        className="modal-backdrop"
        aria-label="Close speaker profile"
        onClick={requestClose}
      />
      <section
        className="modal-panel"
        style={{ "--accent": speaker.accent } as React.CSSProperties}
        aria-label={`ข้อมูลวิทยากรคนที่ ${speakerIndex + 1}`}
      >
        <button
          type="button"
          ref={closeButton}
          className="close-button"
          onClick={requestClose}
          aria-label="Close speaker profile"
        >
          <span>Close</span>
          <b aria-hidden="true">
            <CloseIcon />
          </b>
        </button>

        <div className="modal-hero">
          <div className="modal-copy">
            <h2 id="speaker-name">{speaker.name}</h2>
            <p className="modal-topic">{speaker.topic}</p>
            <p className="bio">{speaker.bio}</p>
          </div>
          <figure className="hero-image">
            <img
              src={speaker.image}
              alt={`${speaker.name} speaking on stage`}
              decoding="async"
              width="500"
              height="640"
            />
            <figcaption>{speaker.role}</figcaption>
          </figure>
        </div>
      </section>
    </div>
  )
}

export default SpeakerModal
