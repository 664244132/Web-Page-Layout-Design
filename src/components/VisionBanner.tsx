import { bannerPhoto } from "../data/speakers"

/**
 * คอมโพเนนต์ VisionBanner: ส่วนแสดงภาพใหญ่และวิสัยทัศน์หลัก (Section 3) ตามดีไซน์ webdesign
 * - ใช้ภาพ src/img/1.jpg (bannerPhoto) เป็นภาพพื้นหลังขนาดใหญ่
 * - แสดงหัวข้อ: "UX/UI 101: THINK LIKE A USER, DESIGN LIKE A PRO"
 * - ลบข้อความบรรยาย, ปุ่ม Discover the lineup และ vision-ticker ออกตาม Requirement ครบถ้วน
 */
export function VisionBanner() {
  return (
    <section className="featured" id="featured">
      <div
        className="feature-image"
        role="img"
        aria-label="UX/UI 101 Seminar Conference"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(15,0,0,.45), transparent), url("${bannerPhoto}")`,
        }}
      >
        <div className="image-label">
          Collective intelligence
          <br />
          in action
        </div>
      </div>
      <div className="feature-copy">
        <span className="feature-index">02 / The central theme</span>
        <div>
          <h2>
            UX/UI 101:
            <br />
            <em>THINK LIKE A USER, DESIGN LIKE A PRO</em>
          </h2>
        </div>
      </div>
    </section>
  )
}

export default VisionBanner
