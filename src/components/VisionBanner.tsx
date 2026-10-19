import { useState, type SyntheticEvent } from "react";
import { bannerPhoto, bannerFallbacks } from "../data/speakers";
import "./VisionBanner.css";

/**
 * คอมโพเนนต์ VisionBanner: แบนเนอร์ภาพใหญ่ของงานสัมมนา
 * - ใช้ภาพ src/img/6.jpg ซึ่งเป็นภาพถ่ายบนเวทีสัมมนาจริงของทีมงาน
 * - แสดงหัวข้อ "UX/UI 101: THINK LIKE A USER, DESIGN LIKE A PRO"
 * - ลบ vision-ticker, ข้อความบรรยาย และปุ่ม Discover the lineup ออกเรียบร้อยตาม Requirement
 */
export function VisionBanner() {
  const [imgSrc, setImgSrc] = useState<string>(bannerPhoto);

  const handleImageError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    const currentSrc = event.currentTarget.getAttribute("src") || "";
    const currentIndex = bannerFallbacks.findIndex(
      (fb) => currentSrc.endsWith(fb) || currentSrc === fb
    );
    const nextIndex = currentIndex + 1;
    if (nextIndex < bannerFallbacks.length) {
      setImgSrc(bannerFallbacks[nextIndex]);
    }
  };

  return (
    <section className="modern-vision-section" aria-labelledby="vision-section-title">
      <div className="vision-banner-frame">
        {/* รูปภาพใหญ่ของงานสัมมนา (6.jpg) */}
        <img
          className="vision-banner-bg"
          src={imgSrc}
          alt="บรรยากาศงานสัมมนา UX/UI 101: Think Like a User, Design Like a Pro"
          onError={handleImageError}
          loading="lazy"
          decoding="async"
          width="1600"
          height="900"
        />

        {/* เลเยอร์ Gradient Overlay ให้ตัวอักษรคมชัดและมีมิติ */}
        <div className="vision-gradient-overlay" />

        {/* เนื้อหาข้อความบนแบนเนอร์ */}
        <div className="vision-text-container">
          <div className="vision-pill-badge">
            <span>SEMINAR VISION & PHILOSOPHY</span>
          </div>

          <h2 id="vision-section-title" className="vision-main-heading">
            UX/UI 101:
            <span className="vision-sub-accent">THINK LIKE A USER, DESIGN LIKE A PRO</span>
          </h2>

          <p className="vision-quote-summary">
            "การออกแบบประสบการณ์และหน้าจอที่ดี ไม่ได้เริ่มต้นจากความสวยงามเพียงอย่างเดียว
            แต่เริ่มต้นจากการเข้าใจความต้องการและพฤติกรรมที่แท้จริงของผู้ใช้งาน"
          </p>
        </div>
      </div>
    </section>
  );
}

export default VisionBanner;
