import { useState, type MouseEvent } from "react"
import {
  surveyData,
  executiveInsights,
  ratingDistributionSummary,
} from "../data/surveyData"
import { speakers } from "../data/speakers"
import "./EReportPage.css"

type EReportPageProps = {
  onBack: (event: MouseEvent<HTMLAnchorElement>) => void
}

type TabType = "overview" | "comparison" | "speakers"

/**
 * คอมโพเนนต์ EReportPage: หน้าแสดงรายงานสถิติและผลการประเมินความพึงพอใจ (E-Report Dashboard)
 * นำเสนอข้อมูลสถิติจากแบบประเมินผู้เข้าร่วมสัมมนา UX/UI 101 ในระดับมืออาชีพ
 */
export function EReportPage({ onBack }: EReportPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [selectedSpeaker, setSelectedSpeaker] = useState<number | "all">("all")

  const filteredSpeakers =
    selectedSpeaker === "all"
      ? surveyData.speakerEvaluations
      : surveyData.speakerEvaluations.filter(
          (_, idx) => idx === selectedSpeaker,
        )

  return (
    <main className="report-page">
      {/* ปุ่มกลับสู่หน้าหลักที่ด้านบน */}
      <div className="report-top-bar">
        <a href="/" className="report-back-btn" onClick={onBack}>
          ← กลับสู่หน้าหลัก
        </a>
      </div>

      {/* ส่วนหัวบทนำ (Hero Summary) */}
      <header className="report-hero">
        <p className="report-overline">
          Official Survey Analytics & Evaluation E—Report
        </p>
        <h1>
          <span>รายงานสถิติ</span>
          <span className="outline">ความพึงพอใจ</span>
          <span>สัมมนา UX/UI 101</span>
        </h1>
        <div className="report-meta">
          <p>{surveyData.subtitle}</p>
          <span>หัวข้อ: {surveyData.title}</span>
        </div>

        {/* Floating KPI Badge Cover */}
        <div className="report-cover" aria-hidden="true">
          <span>E-REPORT</span>
          <strong>
            {surveyData.overallMean.toFixed(2)}
            <br />/ 5.00
          </strong>
          <small>
            ความพึงพอใจรวม {surveyData.percentageSatisfaction}%
            <br />
            ผู้ประเมิน {surveyData.totalRespondents} ท่าน
          </small>
        </div>
      </header>

      {/* สรุปตัวชี้วัดสำคัญ (Executive KPI Cards) */}
      <section className="report-kpi-section" aria-label="ตัวชี้วัดสำคัญ">
        <div className="kpi-grid">
          <div className="kpi-card highlight">
            <span className="kpi-label">คะแนนความพึงพอใจรวม</span>
            <div className="kpi-value">
              {surveyData.overallMean.toFixed(2)}
              <small>/ 5.00</small>
            </div>
            <p className="kpi-desc">
              คิดเป็น {surveyData.percentageSatisfaction}% ระดับดีเยี่ยม
            </p>
          </div>

          <div className="kpi-card">
            <span className="kpi-label">จำนวนผู้ร่วมประเมิน</span>
            <div className="kpi-value">{surveyData.totalRespondents}</div>
            <p className="kpi-desc">อัตราการตอบกลับ 100%</p>
          </div>

          <div className="kpi-card">
            <span className="kpi-label">ระดับความพึงพอใจเฉลี่ย</span>
            <div className="kpi-value text-accent">ระดับ 5</div>
            <p className="kpi-desc">สัดส่วนผู้ให้คะแนนเต็ม 92.4%</p>
          </div>

          <div className="kpi-card">
            <span className="kpi-label">ผลงานที่ร่วมนำเสนอ</span>
            <div className="kpi-value">
              {surveyData.speakerEvaluations.length}
            </div>
            <p className="kpi-desc">วิทยากรและผลงาน 5 โปรเจกต์</p>
          </div>
        </div>
      </section>

      {/* แถบสลับมุมมองรายงาน (Interactive Tab Navigation - Q1) */}
      <nav className="report-tab-nav" aria-label="หมวดหมู่รายงาน">
        <div className="tab-container">
          <button
            type="button"
            className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <span className="tab-icon">📊</span>
            <span>ภาพรวมการสัมมนา</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "comparison" ? "active" : ""}`}
            onClick={() => setActiveTab("comparison")}
          >
            <span className="tab-icon">📈</span>
            <span>เปรียบเทียบวิทยากร</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "speakers" ? "active" : ""}`}
            onClick={() => setActiveTab("speakers")}
          >
            <span className="tab-icon">👤</span>
            <span>ผลประเมินรายบุคคล</span>
          </button>
        </div>
      </nav>

      {/* TAB 1: ภาพรวมการสัมมนา (Overview Tab) */}
      {activeTab === "overview" && (
        <div className="tab-content fade-in">
          {/* ส่วนบทวิเคราะห์และไฮไลต์สำคัญ (Executive Insights - Q3) */}
          <section
            className="report-section insights-section"
            aria-labelledby="insights-title"
          >
            <div className="section-header">
              <p className="section-category">ไฮไลต์สำคัญ / Executive Insights</p>
              <h2 id="insights-title">จุดเด่นและข้อค้นพบสำคัญจากแบบประเมิน</h2>
              <p className="section-lead">
                สรุปข้อมูลเชิงคุณภาพและสถิติสำคัญที่สะท้อนถึงความสำเร็จของงานสัมมนาในครั้งนี้
              </p>
            </div>

            <div className="insights-grid">
              {executiveInsights.map((insight) => (
                <article key={insight.title} className="insight-card">
                  <div className="insight-header">
                    <span className="insight-badge">{insight.tag}</span>
                    <strong className="insight-score">{insight.score}</strong>
                  </div>
                  <h3>{insight.title}</h3>
                  <p>{insight.description}</p>
                </article>
              ))}
            </div>
          </section>

          {/* สัดส่วนการกระจายระดับคะแนน (Rating Distribution - Q2) */}
          <section className="report-section" aria-labelledby="dist-title">
            <div className="section-header">
              <p className="section-category">
                การกระจายตัวของคะแนน / Rating Distribution
              </p>
              <h2 id="dist-title">สัดส่วนระดับความพึงพอใจจากผู้ตอบแบบสอบถามทั้งหมด</h2>
              <p className="section-lead">
                รวมการตอบกลับทั้งหมด 900 คะแนน (30 คน × 30 ข้อคำถาม)
              </p>
            </div>

            <div className="dist-card">
              <div className="dist-bar-stacked" aria-hidden="true">
                {ratingDistributionSummary.map((item) => (
                  <div
                    key={item.label}
                    className="dist-segment"
                    style={{
                      width: `${item.percent}%`,
                      backgroundColor: item.color,
                    }}
                    title={`${item.label}: ${item.percent}%`}
                  />
                ))}
              </div>

              <div className="dist-legend">
                {ratingDistributionSummary.map((item) => (
                  <div key={item.label} className="dist-legend-item">
                    <span
                      className="legend-dot"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="legend-label">{item.label}</span>
                    <strong className="legend-value">{item.percent}%</strong>
                    <span className="legend-count">({item.count} ครั้ง)</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* หมวดที่ 1: ผลการประเมินภาพรวมงานสัมมนา */}
          <section
            className="report-section"
            aria-labelledby="seminar-overview-title"
          >
            <div className="section-header">
              <p className="section-category">มิติที่ 1 / ภาพรวมการจัดสัมมนา</p>
              <h2 id="seminar-overview-title">
                ความพึงพอใจต่อการเข้าร่วมสัมมนา UX/UI 101
              </h2>
              <p className="section-lead">
                ผลการประเมินจากผู้เข้าร่วมงานสัมมนาทั้ง 5 เกณฑ์หลัก (คะแนนเต็ม 5.00)
              </p>
            </div>

            <div className="questions-list">
              {surveyData.seminarQuestions.map((q, index) => {
                const percentage = (q.mean / 5) * 100
                return (
                  <div key={q.title} className="question-item">
                    <div className="question-info">
                      <span className="question-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="question-text">
                        <h3>{q.title}</h3>
                        <p className="rating-count">
                          ผู้ให้คะแนนเต็ม 5 ดาว: {q.distribution[5]} จาก {q.count}{" "}
                          คน ({Math.round((q.distribution[5] / q.count) * 100)}
                          %)
                        </p>
                      </div>
                      <div className="question-score">
                        <strong>{q.mean.toFixed(2)}</strong>
                        <span>/ 5.00</span>
                      </div>
                    </div>

                    <div className="progress-track" aria-hidden="true">
                      <div
                        className="progress-fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: เปรียบเทียบวิทยากร (Comparison Tab - Q2) */}
      {activeTab === "comparison" && (
        <div className="tab-content fade-in">
          <section
            className="report-section"
            aria-labelledby="comparison-title"
          >
            <div className="section-header">
              <p className="section-category">
                การเปรียบเทียบเชิงสถิติ / Benchmark Comparison
              </p>
              <h2 id="comparison-title">
                คะแนนเฉลี่ยรวมเปรียบเทียบรายวิทยากร 5 ท่าน
              </h2>
              <p className="section-lead">
                เปรียบเทียบประสิทธิภาพการถ่ายทอดและการนำเสนอในเกณฑ์ 5.00 เต็ม
              </p>
            </div>

            <div className="comparison-chart-card">
              <div className="comparison-list">
                {surveyData.speakerEvaluations.map((item, index) => {
                  const speakerData = speakers[index]
                  const percentage = (item.mean / 5) * 100
                  return (
                    <div key={item.name} className="compare-item">
                      <div className="compare-header">
                        <div className="compare-speaker-info">
                          {speakerData?.image && (
                            <img
                              src={speakerData.image}
                              alt={item.name}
                              className="compare-avatar"
                              width="52"
                              height="52"
                            />
                          )}
                          <div className="compare-text-details">
                            <div className="compare-title-row">
                              <strong className="compare-name">
                                {item.name} ({item.nickname})
                              </strong>
                              <span className="compare-speaker-tag">
                                วิทยากรท่านที่ {index + 1}
                              </span>
                            </div>
                            <p className="compare-project">{item.project}</p>
                          </div>
                        </div>

                        <div className="compare-score-box">
                          <div className="compare-score-value">
                            <strong>{item.mean.toFixed(2)}</strong>
                            <small>/ 5.00</small>
                          </div>
                          <span className="compare-score-pct">
                            {percentage.toFixed(1)}% ความพึงพอใจ
                          </span>
                        </div>
                      </div>

                      {/* หลอดแสดงสถานะคะแนน (Progress Bar) วางแยกด้านล่างอย่างชัดเจน ไม่ทับซ้อนข้อความ */}
                      <div className="compare-bar-track" aria-hidden="true">
                        <div
                          className="compare-bar-fill"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ตารางเมทริกซ์เปรียบเทียบ 5 ด้าน */}
            <div className="matrix-card">
              <h3>ตารางเปรียบเทียบคะแนนแต่ละมิติการประเมิน (รายหัวข้อ)</h3>
              <div className="matrix-table-wrap">
                <table className="matrix-table">
                  <thead>
                    <tr>
                      <th>วิทยากร</th>
                      <th>เนื้อหา</th>
                      <th>การนำเสนอ</th>
                      <th>แนวคิด</th>
                      <th>ประโยชน์</th>
                      <th>การสื่อสาร</th>
                      <th>เฉลี่ยรวม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {surveyData.speakerEvaluations.map((item) => (
                      <tr key={item.name}>
                        <td className="speaker-cell">
                          <strong>{item.name}</strong>
                          <small>({item.nickname})</small>
                        </td>
                        {item.questions.map((q) => (
                          <td key={q.title} className="score-cell">
                            {q.mean.toFixed(2)}
                          </td>
                        ))}
                        <td className="total-cell">
                          <strong>{item.mean.toFixed(2)}</strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB 3: ผลประเมินรายบุคคล (Speakers Deep-dive Tab) */}
      {activeTab === "speakers" && (
        <div className="tab-content fade-in">
          <section
            className="report-section speakers-eval"
            aria-labelledby="speakers-eval-title"
          >
            <div className="section-header">
              <p className="section-category">มิติที่ 2 / ผลงานและวิทยากรรายบุคคล</p>
              <h2 id="speakers-eval-title">
                ผลการประเมินการนำเสนอโปรเจกต์ทั้ง 5 ท่าน
              </h2>
              <p className="section-lead">
                เลือกดูข้อมูลเจาะลึกเฉพาะรายบุคคล หรือดูทั้งหมดแบบละเอียด
              </p>
            </div>

            {/* Filter Chips */}
            <div className="speaker-filter-bar">
              <button
                type="button"
                className={`filter-chip ${
                  selectedSpeaker === "all" ? "active" : ""
                }`}
                onClick={() => setSelectedSpeaker("all")}
              >
                ทั้งหมด (5 ท่าน)
              </button>
              {surveyData.speakerEvaluations.map((item, idx) => (
                <button
                  key={item.name}
                  type="button"
                  className={`filter-chip ${
                    selectedSpeaker === idx ? "active" : ""
                  }`}
                  onClick={() => setSelectedSpeaker(idx)}
                >
                  {item.nickname} (
                  {item.name.replace("นาย ", "").replace("นางสาว ", "")})
                </button>
              ))}
            </div>

            <div className="speakers-eval-grid">
              {filteredSpeakers.map((evalItem) => {
                const originalIndex = surveyData.speakerEvaluations.findIndex(
                  (s) => s.name === evalItem.name,
                )
                const speakerData = speakers[originalIndex]
                return (
                  <article key={evalItem.name} className="speaker-eval-card">
                    <div className="speaker-card-header">
                      {speakerData?.image && (
                        <img
                          src={speakerData.image}
                          alt={evalItem.name}
                          className="speaker-avatar"
                          loading="lazy"
                          width="64"
                          height="64"
                        />
                      )}
                      <div className="speaker-title-info">
                        <span className="speaker-idx">
                          วิทยากรท่านที่ {originalIndex + 1} ({evalItem.nickname})
                        </span>
                        <h3>{evalItem.name}</h3>
                        <p className="project-title">{evalItem.project}</p>
                      </div>
                      <div className="speaker-mean-badge">
                        <strong>{evalItem.mean.toFixed(2)}</strong>
                        <small>/ 5.00</small>
                      </div>
                    </div>

                    <div className="speaker-criteria-list">
                      {evalItem.questions.map((crit) => (
                        <div key={crit.title} className="criteria-item">
                          <div className="criteria-top">
                            <span className="criteria-name">{crit.title}</span>
                            <span className="criteria-score">
                              <strong>{crit.mean.toFixed(2)}</strong>
                              <small>/ 5.00</small>
                            </span>
                          </div>
                          <div className="criteria-bar-wrap" aria-hidden="true">
                            <div
                              className="criteria-bar"
                              style={{ width: `${(crit.mean / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        </div>
      )}

      {/* ปุ่มกลับสู่หน้าหลักที่ส่วนท้าย */}
      <div className="report-bottom-bar">
        <a href="/" className="report-back-btn" onClick={onBack}>
          ← กลับสู่หน้าหลัก
        </a>
      </div>
    </main>
  )
}

export default EReportPage
