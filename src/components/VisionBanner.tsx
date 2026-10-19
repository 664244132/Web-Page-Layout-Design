import { useEffect, useRef } from "react"
import bannerImg from "../img/6.jpg"
import { useReducedMotion } from "../hooks/useReducedMotion"
import "./VisionBanner.css"

/**
 * คอมโพเนนต์ VisionBanner: แบนเนอร์ภาพใหญ่ของงาน
 * รองรับ Parallax Scroll, ภาพ 6.jpg และหัวข้อ UX/UI 101 ตาม Requirement
 * (ลบ vision-ticker, ข้อความบรรยาย และปุ่ม Discover the lineup ออกเรียบร้อย)
 */
export function VisionBanner() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const parallaxFrame = useRef<number>(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const image = imageRef.current

    // Guard Clause: ออกทันทีหาก Element ยังไม่ถูกเมานต์ลง DOM
    if (!section || !image) return

    // ตรวจจับเมื่อผู้ใช้เลื่อนหน้าจอมาถึงแบนเนอร์อย่างน้อย 28%
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible")
          observer.unobserve(section)
        }
      },
      { threshold: 0.28 },
    )

    const updateParallax = () => {
      cancelAnimationFrame(parallaxFrame.current)
      parallaxFrame.current = requestAnimationFrame(() => {
        const bounds = section.getBoundingClientRect()
        const progress =
          (window.innerHeight - bounds.top) /
          (window.innerHeight + bounds.height)
        image.style.setProperty("--parallax-y", `${(progress - 0.5) * 90}px`)
      })
    }

    observer.observe(section)

    // ทำงาน Parallax เฉพาะเมื่อผู้ใช้ไม่ได้เปิดโหมดลดการเคลื่อนไหว
    if (!reduceMotion) {
      window.addEventListener("scroll", updateParallax, { passive: true })
      updateParallax()
    }

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", updateParallax)
      cancelAnimationFrame(parallaxFrame.current)
    }
  }, [reduceMotion])

  return (
    <section
      ref={sectionRef}
      className="vision-banner"
      aria-labelledby="vision-title"
    >
      <img
        ref={imageRef}
        className="vision-image"
        src={bannerImg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width="1440"
        height="700"
      />
      <div className="vision-shade" />
      <div className="vision-sweep" />

      <div className="vision-content">
        <h2 id="vision-title">
          UX/UI 101:
          <br />
          <em>THINK LIKE A USER, DESIGN LIKE A PRO</em>
        </h2>
      </div>
    </section>
  )
}

export default VisionBanner
