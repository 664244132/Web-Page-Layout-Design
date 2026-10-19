import type { MouseEvent, SyntheticEvent } from "react";
import type { Speaker } from "../types/speaker";
import { Arrow } from "./Arrow";
import "./SpeakerCard.css";

type SpeakerCardProps = {
  speaker: Speaker;
  index: number;
  onSelect: (speaker: Speaker) => void;
};

/**
 * คอมโพเนนต์ SpeakerCard: การ์ดแสดงผลข้อมูลวิทยากรในสไตล์ Modern Tech Showcase
 * แสดงภาพสีคมชัด สัดส่วนแนวนอนที่พอดีกับรูปจริง และมีระบบ Multi-path Fallback ป้องกันรูปไม่โหลด
 */
export function SpeakerCard({ speaker, index, onSelect }: SpeakerCardProps) {
  // ฟังก์ชันสลับ Path รูปภาพอัตโนมัติเมื่อเกิด Error เพื่อให้ภาพแสดงผลได้ 100%
  const handleImageError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    const img = event.currentTarget;
    const currentSrc = img.getAttribute("src") || "";
    const fallbacks = speaker.fallbackImages;
    const currentIndex = fallbacks.findIndex(
      (fb) => currentSrc.endsWith(fb) || currentSrc === fb
    );
    const nextIndex = currentIndex + 1;
    if (nextIndex < fallbacks.length) {
      img.src = fallbacks[nextIndex];
    }
  };

  return (
    <article
      className="modern-speaker-card"
      style={{ "--accent-color": speaker.accent } as React.CSSProperties}
    >
      {/* ส่วนหัวการ์ด: ลำดับ และ ป้ายสถานะ */}
      <div className="card-top-bar">
        <span className="card-order-badge">0{index + 1}</span>
        <div className="card-badge-group">
          <span className="speaker-role-pill">{speaker.role}</span>
          <span className="speaker-nick-pill">({speaker.nickname})</span>
        </div>
      </div>

      {/* กรอบภาพวิทยากร: สัดส่วนภาพแนวนอนคมชัด พร้อม Hover Effect นุ่มนวล */}
      <div className="card-media-wrap">
        <img
          src={speaker.image}
          alt={`ภาพวิทยากร ${speaker.name} กำลังบรรยาย`}
          onError={handleImageError}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          width="600"
          height="450"
        />
        <div className="media-overlay-gradient" />
      </div>

      {/* ข้อมูลเนื้อหาของการ์ด */}
      <div className="card-info-body">
        <h3 className="speaker-full-name">{speaker.name}</h3>

        <div className="speaker-topic-box">
          <span className="topic-lead-label">หัวข้อบรรยาย</span>
          <p className="topic-text-content">"{speaker.topic}"</p>
        </div>

        {/* แท็กด้านเทคนิค / UX */}
        <div className="speaker-tags-list">
          {speaker.tags.map((tag) => (
            <span key={tag} className="tech-tag-chip">
              #{tag}
            </span>
          ))}
        </div>

        {/* ปุ่มเปิดดูโปรไฟล์ */}
        <button
          type="button"
          className="view-profile-action-btn"
          onClick={() => onSelect(speaker)}
          aria-label={`คลิกเพื่อดูรายละเอียดของ ${speaker.name}`}
        >
          <span>ดูรายละเอียดโปรไฟล์</span>
          <Arrow />
        </button>
      </div>
    </article>
  );
}

export default SpeakerCard;
