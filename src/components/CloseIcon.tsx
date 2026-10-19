/**
 * คอมโพเนนต์ CloseIcon: ไอคอนกากบาทปิด (Close ×) สำหรับปุ่มหรือโมดอล
 * แสดงผลด้วย SVG ที่สมมาตรและคมชัดทุกความละเอียด พร้อม aria-hidden="true"
 */
export function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`inline-block w-3.5 h-3.5 ${className}`.trim()}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="3" y1="3" x2="11" y2="11" />
      <line x1="11" y1="3" x2="3" y2="11" />
    </svg>
  )
}

export default CloseIcon
