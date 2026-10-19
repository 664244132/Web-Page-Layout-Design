import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import type { Speaker } from "../types/speaker";
import { CloseIcon } from "./CloseIcon";
import { useReducedMotion } from "../hooks/useReducedMotion";
import "./SpeakerModal.css";

type SpeakerModalProps = {
  speaker: Speaker;
  onClose: () => void;
};

/**
 * คอมโพเนนต์ SpeakerModal: ป๊อปอัปโมดอลแสดงข้อมูลวิทยากรในสไตล์ Modern Dialog
 * - แสดงภาพสีธรรมชาติ สัดส่วนคมชัด ไม่ถูกครอบตัด
 * - มีระบบ Multi-path fallback ป้องกันรูปไม่โหลด 100%
 * - ลบส่วน Selected work และแกลเลอรีภาพรวม 3 รูปออกตาม Requirement ครบถ้วน
 */
export function SpeakerModal({ speaker, onClose }: SpeakerModalProps) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const reduceMotion = useReducedMotion();

  // จัดการ Error รูปภาพด้วยการวนหา Fallback Path อัตโนมัติ
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

  // ปิด Modal แบบนุ่มนวล
  const requestClose = useCallback(() => {
    if (closeTimer.current !== null) return;
    setIsClosing(true);
    const duration = reduceMotion ? 0 : 300;
    closeTimer.current = window.setTimeout(onClose, duration);
  }, [onClose, reduceMotion]);

  useEffect(() => {
    document.body.classList.add("modal-open");
    closeButton.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
      if (closeTimer.current !== null) {
        window.clearTimeout(closeTimer.current);
      }
    };
  }, [requestClose]);

  return (
    <div
      className={`modern-modal-overlay${isClosing ? " is-closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-speaker-name"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          requestClose();
        }
      }}
    >
      <div
        className="modern-modal-container"
        style={{ "--modal-accent": speaker.accent } as React.CSSProperties}
      >
        {/* แถบส่วนหัวของ Modal */}
        <div className="modal-header-bar">
          <div className="modal-header-meta">
            <span className="modal-role-badge">{speaker.role}</span>
            <span className="modal-order-tag">วิทยากรคนที่ 0{speaker.id}</span>
          </div>

          <button
            ref={closeButton}
            type="button"
            className="modal-close-icon-btn"
            onClick={requestClose}
            aria-label="ปิดหน้าต่างโปรไฟล์"
          >
            <CloseIcon />
          </button>
        </div>

        {/* เนื้อหาหลักของ Modal: แบ่ง 2 คอลัมน์บนจอใหญ่ */}
        <div className="modal-body-layout">
          {/* ฝั่งภาพถ่ายวิทยากร */}
          <div className="modal-photo-column">
            <div className="modal-image-frame">
              <img
                src={speaker.image}
                alt={`ภาพวิทยากร ${speaker.name} กำลังบรรยาย`}
                onError={handleImageError}
                decoding="async"
                width="640"
                height="480"
              />
            </div>
            <p className="modal-caption-text">
              ภาพบรรยายในงานสัมมนา UX/UI 101: Think Like a User, Design Like a Pro
            </p>
          </div>

          {/* ฝั่งรายละเอียดวิทยากร */}
          <div className="modal-details-column">
            <h2 id="modal-speaker-name" className="modal-speaker-title">
              {speaker.name}
              <span className="modal-speaker-nick">({speaker.nickname})</span>
            </h2>

            <div className="modal-topic-highlight-card">
              <span className="modal-topic-caption">หัวข้อการบรรยาย / โครงงาน</span>
              <p className="modal-topic-heading">"{speaker.topic}"</p>
            </div>

            <div className="modal-affiliation-box">
              <span className="affiliation-label">หน่วยงาน / ภาควิชา:</span>
              <p className="affiliation-value">
                สาขาวิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี
              </p>
            </div>

            <div className="modal-bio-content">
              <h4>เกี่ยวกับโครงงานและวิทยากร</h4>
              <p>{speaker.bio}</p>
            </div>

            <div className="modal-tags-container">
              {speaker.tags.map((tag) => (
                <span key={tag} className="modal-tag-pill">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="modal-footer-note">
              <span>💡 โครงงานนี้ให้ความสำคัญกับการออกแบบ UX/UI ที่ตรงใจและแก้ปัญหาผู้ใช้จริง</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpeakerModal;
