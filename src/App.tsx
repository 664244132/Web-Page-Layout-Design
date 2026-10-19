import { useEffect, useState, type MouseEvent } from "react"
import type { Speaker } from "./types/speaker"
import { speakers } from "./data/speakers"
import { SpeakerCard } from "./components/SpeakerCard"
import { SpeakerModal } from "./components/SpeakerModal"
import { VisionBanner } from "./components/VisionBanner"
import "./App.css"

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
    <path
      d="M5 12h14M14 7l5 5-5 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function App() {
  const [selected, setSelected] = useState<Speaker | null>(null)
  const [route, setRoute] = useState<string>(() => window.location.pathname)

  // ดักจับการกดปุ่ม Back/Forward เพื่อซิงก์ Route แบบ SPA พร้อม Cleanup
  useEffect(() => {
    const syncRoute = () => setRoute(window.location.pathname)
    window.addEventListener("popstate", syncRoute)
    return () => window.removeEventListener("popstate", syncRoute)
  }, [])

  // ฟังก์ชันเปลี่ยนเส้นทาง SPA โดยไม่รีโหลดหน้าจอ
  const navigate = (path: string) => (event?: MouseEvent<HTMLElement>) => {
    if (event) event.preventDefault()
    window.history.pushState({}, "", path)
    setRoute(path)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // หากเปิดหน้า /dashboard หรือ /e-report ให้แสดงหน้า Dashboard ตามดีไซน์ webdesign
  if (route === "/dashboard" || route === "/e-report") {
    return (
      <main className="dashboard">
        <header className="dash-nav">
          <div>
            <span className="live-dot" />
            UX/UI 101 Intelligence / Live Data
          </div>
          <button type="button" onClick={navigate("/")}>
            <span>←</span> Return to stage
          </button>
        </header>

        <section className="dash-intro">
          <div>
            <div className="eyebrow">
              <span /> UX/UI 101 Intelligence
            </div>
            <h1>
              Event pulse<span>.</span>
            </h1>
          </div>
          <p>
            A living view of the ideas, students, and innovation signals shaping
            UX/UI 101 Seminar.
          </p>
        </section>

        <section className="metrics">
          <article>
            <span>Visitor satisfaction</span>
            <strong>
              96.8<small>%</small>
            </strong>
            <p className="positive">↑ 6.2% vs. target</p>
          </article>
          <article>
            <span>Total respondents</span>
            <strong>30</strong>
            <p>100% response rate</p>
          </article>
          <article>
            <span>Average score</span>
            <strong>
              4.84<small>/5</small>
            </strong>
            <p className="positive">↑ Excellent level</p>
          </article>
          <article>
            <span>Featured projects</span>
            <strong>5</strong>
            <p>Innovative portfolios</p>
          </article>
        </section>

        <section className="analytics-grid">
          <article className="chart-panel satisfaction">
            <div className="panel-head">
              <div>
                <span>01</span>
                <h2>Satisfaction over time</h2>
              </div>
              <button type="button">All sessions ⌄</button>
            </div>
            <div className="line-chart">
              <div className="y-labels">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>
              <svg
                viewBox="0 0 700 240"
                preserveAspectRatio="none"
                aria-label="Satisfaction rose from 62 to 96.8 percent"
              >
                <defs>
                  <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#e32227" stopOpacity=".25" />
                    <stop offset="1" stopColor="#e32227" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  className="area"
                  d="M0 190 C90 177 125 143 200 151 S315 101 380 117 S505 54 570 68 S650 32 700 25 V240 H0Z"
                />
                <path
                  className="line"
                  d="M0 190 C90 177 125 143 200 151 S315 101 380 117 S505 54 570 68 S650 32 700 25"
                />
                {[
                  ["0", "190"],
                  ["200", "151"],
                  ["380", "117"],
                  ["570", "68"],
                  ["700", "25"],
                ].map(([cx, cy]) => (
                  <circle key={cx} cx={cx} cy={cy} r="5" />
                ))}
              </svg>
              <div className="x-labels">
                <span>09:00</span>
                <span>11:00</span>
                <span>13:00</span>
                <span>15:00</span>
                <span>17:00</span>
              </div>
            </div>
          </article>

          <article className="chart-panel sentiment">
            <div className="panel-head">
              <div>
                <span>02</span>
                <h2>Sentiment mix</h2>
              </div>
            </div>
            <div className="donut">
              <div>
                <strong>30</strong>
                <span>responses</span>
              </div>
            </div>
            <ul>
              <li>
                <i className="red" />
                ประทับใจมาก <b>68%</b>
              </li>
              <li>
                <i className="coral" />
                มีความรู้เพิ่ม <b>21%</b>
              </li>
              <li>
                <i className="gray" />
                เป็นประโยชน์ <b>8%</b>
              </li>
              <li>
                <i className="dark" />
                อื่นๆ <b>3%</b>
              </li>
            </ul>
          </article>

          <article className="chart-panel portfolio">
            <div className="panel-head">
              <div>
                <span>03</span>
                <h2>Speaker portfolios</h2>
              </div>
              <button type="button" onClick={navigate("/")}>
                View all ↗
              </button>
            </div>
            <div className="portfolio-list">
              {speakers.map((speaker, i) => (
                <div key={speaker.name}>
                  <img src={speaker.image} alt={speaker.name} />
                  <div>
                    <strong>{speaker.name}</strong>
                    <span>{speaker.topic}</span>
                  </div>
                  <b>
                    {[98, 96, 94, 92, 90][i] || 90}
                    <small>/100</small>
                  </b>
                </div>
              ))}
            </div>
          </article>

          <article className="chart-panel topics">
            <div className="panel-head">
              <div>
                <span>04</span>
                <h2>Project domains</h2>
              </div>
            </div>
            {[
              ["Community & Maps", 96],
              ["E-Commerce Systems", 92],
              ["Agriculture & Wage", 88],
              ["Rental Services", 85],
              ["Restaurant POS", 82],
            ].map(([label, value]) => (
              <div className="bar" key={label}>
                <span>{label}</span>
                <i>
                  <b style={{ width: `${value}%` }} />
                </i>
                <strong>{value}</strong>
              </div>
            ))}
          </article>
        </section>
      </main>
    )
  }

  // หน้าหลัก HomePage ตามดีไซน์ webdesign
  return (
    <main>
      {/* แถบนำทางด้านบน Nav */}
      <header className="nav">
        <a href="/" className="logo" onClick={navigate("/")}>
          CONVERGE<span>.</span>
        </a>
        <nav>
          <a href="#speakers">Speakers</a>
          <a href="#featured">Theme</a>
          <a href="#report">Report</a>
          <a href="/dashboard" onClick={navigate("/dashboard")}>
            E-Report ↗
          </a>
        </nav>
      </header>

      {/* Section 1: Intro (แก้ไขข้อความให้เป็น ยินดีต้อนรับ ตาม Requirement) */}
      <section className="intro">
        <div className="eyebrow">
          <span /> UX/UI 101 Seminar
        </div>
        <h1>
          ยินดีต้อนรับ<span>.</span>
        </h1>
        <p>
          Think Like a User, Design Like a Pro —
          เวทีแลกเปลี่ยนประสบการณ์การออกแบบระบบและนวัตกรรมเพื่อผู้ใช้ โดย 5
          วิทยากรผู้สร้างสรรค์โซลูชัน
        </p>
        <a
          href="/dashboard"
          className="text-link"
          onClick={navigate("/dashboard")}
        >
          Open E-Report <Arrow />
        </a>
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
      </section>

      {/* Section 2: รายชื่อและผลงานวิทยากร 5 ท่าน */}
      <section className="speakers" id="speakers">
        <div className="section-head">
          <div>
            <span>01</span>
            <p>Guest speakers</p>
          </div>
          <p className="section-note">
            Tap a portrait to discover
            <br />
            the person behind the idea.
          </p>
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

      {/* Section 3: แบนเนอร์ภาพใหญ่ (6.jpg) พร้อมหัวข้อ UX/UI 101: THINK LIKE A USER, DESIGN LIKE A PRO */}
      <VisionBanner />

      {/* Section 4: E-Report Teaser Section */}
      <section className="report" id="report">
        <div className="eyebrow light">
          <span /> Field notes / Live data
        </div>
        <div className="report-layout">
          <h2>
            E-Report<span>.</span>
          </h2>
          <div>
            <p>
              Go beyond the stage. Explore visitor sentiment, speaker
              portfolios, and the live data shaping this year’s conversation.
            </p>
            <button
              type="button"
              className="cta"
              onClick={navigate("/dashboard")}
            >
              Open analytics <Arrow />
            </button>
          </div>
        </div>
        <p className="report-meta">
          Updated live · 30 responses · Five portfolios
        </p>
      </section>

      {/* ท้ายเว็บ Footer */}
      <footer>
        <p>UX/UI 101 SEMINAR · CONVERGE 2025</p>
        <span>© 2025 ALL RIGHTS RESERVED</span>
      </footer>

      {/* Pop-up Modal แสดงข้อมูลวิทยากรแบบเจาะลึก */}
      {selected && (
        <SpeakerModal speaker={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  )
}
