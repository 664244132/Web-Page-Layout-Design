/**
 * คอมโพเนนต์ Arrow: ไอคอนลูกศรเฉียง (↗) แสดงผลด้วย SVG คมชัดทุกความละเอียดหน้าจอ
 * ครอบด้วยแท็ก <span> พร้อม aria-hidden="true" เพื่อรองรับความปลอดภัยด้าน a11y
 */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <span className={`arrow-icon ${className}`.trim()} aria-hidden="true">
      <svg
        className="inline-block w-[0.85em] h-[0.85em] align-baseline"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="2" y1="10" x2="10" y2="2" />
        <polyline points="4 2 10 2 10 8" />
      </svg>
    </span>
  )
}

export default Arrow
