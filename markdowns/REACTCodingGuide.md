# ⚛️ แนวทางการเขียนโค้ด React: มาตรฐานสำหรับโปรเจกต์ Speaker Showcase (React 19 Best Practices)

เอกสารนี้รวบรวมหลักการ ข้อกำหนด และแนวทางปฏิบัติในการเขียนโค้ด **React 19** สำหรับโปรเจกต์ **Speaker Showcase Website (North Assembly)** เพื่อรักษาความสะอาด ความเป็นระเบียบ เป็นมิตรต่อผู้เริ่มต้น (Beginner-Friendly) และมีประสิทธิภาพสูงสุด

---

## 1. สถาปัตยกรรมคอมโพเนนต์แบบแยกส่วน (Single Responsibility Component Structure)

- **กฎ 1 ไฟล์ต่อ 1 คอมโพเนนต์:** ทุกคอมโพเนนต์หลักต้องแยกเก็บในไฟล์ของตัวเองในโฟลเดอร์ [src/components/](file:///C:/ComSciWork/src/components/)
  - ตัวอย่าง: `SpeakerModal.tsx`, `VisionBanner.tsx`, `EReportTeaser.tsx`, `EReportPage.tsx`, `Arrow.tsx`
- **การแยกประเภทข้อมูลและชุดข้อมูล:**
  - ชนิดข้อมูล (Interfaces & Types) แยกเก็บไว้ใน [src/types/](file:///C:/ComSciWork/src/types/) เช่น `speaker.ts`
  - ข้อมูลคงที่ (Static Datasets) แยกเก็บไว้ใน [src/data/](file:///C:/ComSciWork/src/data/) เช่น `speakers.ts`
- **ข้อดี:** ช่วยให้ `App.tsx` มีขนาดกะทัดรัด ทำหน้าที่เป็นตัวควบคุมหลัก (Orchestrator) และทำให้ผู้เริ่มต้นศึกษาทำความเข้าใจแต่ละส่วนได้ง่าย

---

## 2. การใช้งาน React Hooks อย่างถูกต้องและปลอดภัย

### 🪝 2.1 `useState` — การจัดการสถานะเท่าที่จำเป็น
- ใช้สำหรับสถานะที่ส่งผลต่อการเรนเดอร์ UI โดยตรง เช่น การเปิด Modal (`selected: Speaker | null`) หรือการเปลี่ยนหน้า (`route: string`)
- หลีกเลี่ยงการสร้าง State ที่สามารถคำนวณได้ทันทีจากการเรนเดอร์ (Derived State)

### 🪝 2.2 `useRef` — การจัดการ DOM, Animation Frames และ Timers
- ใช้ `useRef` ในการอ้างอิงองค์ประกอบ DOM เพื่อวัดขนาดพิกัด (`getBoundingClientRect()`) หรือสั่ง `focus()`
- ใช้เก็บค่าที่ไม่ต้องการให้เกิดการ Re-render เมื่อเปลี่ยนแปลง เช่น `tiltFrame` (ID ของ `requestAnimationFrame`) หรือ `closeTimer` (ID ของ `setTimeout`)

```typescript
// ✅ ตัวอย่างการใช้ useRef จัดการแอนิเมชันโดยไม่กระตุ้นการ Re-render ซ้ำซ้อน
const tiltFrame = useRef(0);

const tiltCard = (event: MouseEvent<HTMLButtonElement>) => {
  cancelAnimationFrame(tiltFrame.current);
  tiltFrame.current = requestAnimationFrame(() => {
    // อัปเดต CSS Variables บน Element โดยตรง
  });
};
```

### 🪝 2.3 `useEffect` — การจัดการ Side Effects และ Cleanup
- ทุกครั้งที่ผูก Event Listener ภายนอก (`window.addEventListener`), ตั้ง Timer หรือสร้าง Observer **ต้องคืนค่าฟังก์ชัน Cleanup เสมอ** เพื่อป้องกัน Memory Leaks

```typescript
// ✅ ตัวอย่างการดักจับปุ่ม Escape พร้อม Cleanup Function
useEffect(() => {
  const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && requestClose();
  window.addEventListener("keydown", onKeyDown);
  return () => {
    window.removeEventListener("keydown", onKeyDown);
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
  };
}, [requestClose]);
```

### 🪝 2.4 `useCallback` — การรักษาเสถียรภาพของฟังก์ชัน
- ห่อหุ้มฟังก์ชันที่ถูกส่งเข้าไปใน Dependency Array ของ `useEffect` ด้วย `useCallback` เพื่อป้องกัน Infinite Loops หรือ Re-subscription ที่ไม่จำเป็น

---

## 3. มาตรฐานการพัฒนา Pop-up Modal (Accessible Modal Pattern)

เมื่อสร้างหรือปรับปรุง Pop-up Modal (เช่น `SpeakerModal.tsx`) ต้องยึดหลักปฏิบัติดังนี้:

1. **การล็อกการเลื่อนหน้าเว็บพื้นหลัง (Body Scroll Locking):**
   ```typescript
   document.body.classList.add("modal-open");
   // และถอดออกเมื่อ Modal ถูกทำลาย (Unmount)
   return () => document.body.classList.remove("modal-open");
   ```
2. **Keyboard Focus & Escape Key Support:**
   - เมื่อเปิด Modal ให้ย้ายโฟกัสไปยังปุ่มปิดทันที (`closeButton.current?.focus()`)
   - รองรับการกดปุ่ม `Escape` เพื่อปิด Modal เสมอ
3. **Smooth Exit Animation Timing:**
   - เมื่อผู้ใช้กดปิด อย่าเพิ่งถอด Component ออกทันที ให้ตั้งค่า State `isClosing = true` เพื่อให้ CSS แอนิเมชันเล่นจนจบ แล้วจึงเรียก Callback `onClose()`

---

## 4. การเรนเดอร์รายการด้วยคีย์ที่เสถียร (Stable Keys in Lists)

- ในการวนลูปเรนเดอร์ (`map()`) ห้ามใช้ Index ของ Array เป็น `key` เพียงอย่างเดียวหากข้อมูลมี Unique Identifier ให้ใช้ค่าที่เป็นเอกลักษณ์ เช่น ชื่อวิทยากร (`speaker.name`) หรือหัวข้อ

```tsx
// ✅ ถูกต้อง: ใช้ค่าที่มีเอกลักษณ์เฉพาะตัวเป็น Key
{speakers.map((speaker, index) => (
  <button key={speaker.name} className={`speaker-card card-${index + 1}`}>
    {/* เนื้อหาการ์ด */}
  </button>
))}
```

---

## 5. การกำหนด Props Interface ชัดเจน 100%

- ทุกคอมโพเนนต์ที่รับ Props ต้องมี Type หรือ Interface กำกับเสมอ เพื่อความปลอดภัยและการตรวจสอบข้อผิดพลาดตั้งแต่ขั้นตอนเขียนโค้ด

```typescript
type SpeakerModalProps = {
  speaker: Speaker;
  onClose: () => void;
};

export function SpeakerModal({ speaker, onClose }: SpeakerModalProps) { ... }
```