import { useEffect, useState, type MouseEvent } from "react"
import type { Speaker } from "./types/speaker"
import { speakers } from "./data/speakers"
import { SpeakerCard } from "./components/SpeakerCard"
import { VisionBanner } from "./components/VisionBanner"
import { EReportPage } from "./components/EReportPage"
import { SpeakerModal } from "./components/SpeakerModal"
import "./App.css"

/**
 * App Component: ผู้ควบคุมหลักของระบบ (Root Orchestrator & State Hub)
 * จัดการ State การเปิด Modal, การสลับหน้า SPA Route และการจัดวางโครงสร้างเลย์เอาต์หลัก
 */
export default function App() {
  const [selected, setSelected] = useState<Speaker | null>(null)
  const [route, setRoute] = useState<string>(() => window.location.pathname)

  // ดักจับการกดปุ่ม Back/Forward ของเบราว์เซอร์เพื่อซิงก์ Route แบบ SPA
  useEffect(() => {
    const syncRoute = () => setRoute(window.location.pathname)
    window.addEventListener("popstate", syncRoute)
    return () => window.removeEventListener("popstate", syncRoute)
  }, [])

  // ฟังก์ชันเปลี่ยนเส้นทาง SPA โดยไม่รีโหลดหน้าจอ
  const navigate = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.history.pushState({}, "", path)
    setRoute(path)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Guard Clause: หากอยู่ที่หน้า /e-report ให้แสดงหน้ารายงาน
  if (route === "/e-report") {
    return <EReportPage onBack={navigate("/")} />
  }

  return (
    <main>
      {/* แสง Ambient Glow พื้นหลัง */}
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* ส่วนหัวบทนำ (Hero Intro) */}
      <header className="intro">
        <p className="edition">
          UX/UI 101 SEMINAR
          <br />5 SPEAKERS SHOWCASE
        </p>

        <h1>
          <span>ยินดีต้อนรับ</span>
        </h1>

        <p className="lede">
          Think Like a User, Design Like a Pro —
          เวทีแลกเปลี่ยนประสบการณ์การออกแบบระบบและนวัตกรรมเพื่อผู้ใช้ โดย 5
          วิทยากรผู้สร้างสรรค์โซลูชัน
        </p>

        <div className="hero-action-group">
          <a
            href="/e-report"
            className="ereport-button"
            onClick={navigate("/e-report")}
          >
            <span>E-Report</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a href="#speakers" className="secondary-hero-button">
            รายชื่อวิทยากร ↓
          </a>
        </div>

        <p className="scroll-cue">
          <span /> เลื่อนเพื่อดูผลงาน
        </p>
      </header>

      {/* ตารางแสดงการ์ดวิทยากรทั้ง 5 คน */}
      <section id="speakers" className="speakers-section">
        <div className="section-heading">
          <p>วิทยากรทั้งหมด</p>
        </div>
        <div className="speaker-grid">
          {speakers.map((speaker, index) => (
            <SpeakerCard
              key={speaker.name}
              speaker={speaker}
              index={index}
              onSelect={setSelected}
            />
          ))}
        </div>
      </section>

      {/* แบนเนอร์วิสัยทัศน์ */}
      <VisionBanner />

      {/* Pop-up Modal แสดงข้อมูลวิทยากรแบบเจาะลึก */}
      {selected && (
        <SpeakerModal speaker={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  )
}
