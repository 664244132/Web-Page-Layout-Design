# 🔷 คู่มือการเขียน TypeScript: มาตรฐานสำหรับโปรเจกต์ Speaker Showcase (TypeScript 5.7+ Standards)

เอกสารนี้รวบรวมหลักการ ข้อกำหนด และแนวทางปฏิบัติในการเขียนโค้ด **TypeScript 5.7** สำหรับโปรเจกต์ **Speaker Showcase Website (North Assembly)** เพื่อสร้างความปลอดภัยทางชนิดข้อมูล (Type-Safety) สูงสุด และป้องกันข้อผิดพลาดตอนรันไทม์

---

## 1. กฎเหล็ก: ห้ามใช้ `any` เด็ดขาด (No `any` Policy)

- **[MUST]:** ทุกตัวแปร ฟังก์ชัน พารามิเตอร์ และ Props ต้องมีชนิดข้อมูลที่ชัดเจน ห้ามใช้ `any` โดยเด็ดขาด
- หากเป็นข้อมูลที่มีหลายสถานะ ให้ใช้ Union Type หรือกำหนดโครงสร้าง Interface ที่ชัดเจน:

```typescript
// ❌ ไม่ถูกต้อง (ห้ามใช้ any)
const [selected, setSelected] = useState<any>(null);

// ✅ ถูกต้อง: ประกาศชนิดข้อมูลชัดเจน
import type { Speaker } from "./types/speaker";
const [selected, setSelected] = useState<Speaker | null>(null);
```

---

## 2. การแยกโมดูล Types และการใช้ Type-Only Imports

- **การแยกประเภทข้อมูล:** โครงสร้างข้อมูลที่ใช้ร่วมกันในหลายคอมโพเนนต์ต้องเก็บไว้ในโฟลเดอร์ [src/types/](file:///C:/ComSciWork/src/types/)
- **การนำเข้าด้วย `import type`:** เมื่อนำเข้าเฉพาะชนิดข้อมูล (Types/Interfaces) ให้ใช้คำสั่ง `import type` เพื่อช่วยให้ Build Tool ถอด Types ออกอย่างสมบูรณ์ ไม่หลงเหลือในโค้ด JavaScript ที่ส่งไปยังเบราว์เซอร์:

```typescript
// ✅ นำเข้าเฉพาะ Type อย่างถูกต้อง
import type { Speaker } from "../types/speaker";
import type { MouseEvent } from "react";
```

---

## 3. การกำหนดชนิดข้อมูลของ React Events (Event Typing)

เมื่อรับ Event ในฟังก์ชัน Handler ต้องระบุชนิดของ Element ให้ถูกต้องเสมอ:

| ชนิดของ Event | ตัวอย่างการใช้งาน | โค้ด Type ที่ถูกต้อง |
|---|---|---|
| คลิกปุ่ม Button | ปิด Modal, ปุ่มเลือกวิทยากร | `(event: MouseEvent<HTMLButtonElement>) => void` |
| คลิกปุ่ม Link | ลิงก์อ่านรายงาน E-Report | `(event: MouseEvent<HTMLAnchorElement>) => void` |
| การกดปุ่มคีย์บอร์ด | ดักจับปุ่ม Escape เพื่อปิด Modal | `(event: KeyboardEvent) => void` |

---

## 4. การจัดการ CSS Custom Properties ใน React Inline Styles

React Style Object ปกติไม่อนุญาตให้ใส่ชื่อคุณสมบัติที่มีขีดนำหน้า เช่น `--accent` หรือ `--rx` หากไม่ทำ Type-Casting:
- **แนวทางที่ถูกต้อง:** ให้ทำ Type-Casting ด้วย `as React.CSSProperties` อย่างปลอดภัย:

```tsx
// ✅ ถูกต้องและผ่านการตรวจสอบของ TypeScript Compiler
<section 
  className="modal-panel" 
  style={{ "--accent": speaker.accent } as React.CSSProperties}
>
```

---

## 5. การกำหนด Props Interface สำหรับคอมโพเนนต์

- คอมโพเนนต์ทุกตัวต้องมี Type กำกับ Props อย่างชัดเจน และจัดวางไว้ด้านบนของฟังก์ชันคอมโพเนนต์นั้นๆ:

```typescript
type SpeakerModalProps = {
  speaker: Speaker;
  onClose: () => void;
};

export function SpeakerModal({ speaker, onClose }: SpeakerModalProps) {
  // Logic
}
```