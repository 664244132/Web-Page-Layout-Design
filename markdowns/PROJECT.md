# 🏗️ โครงสร้างระบบและสเปกการทำงาน (Project Architecture & Specification)

เอกสารนี้ระบุรายละเอียดสถาปัตยกรรมระบบ โครงสร้าง Component, แผนผังเส้นทาง (Routing), สเปกการทำงานของแต่ละส่วน, โครงสร้างข้อมูล และ Interface Contracts สำหรับโปรเจกต์ **Speaker Showcase Website (North Assembly)**

---

## 1. แผนผังเส้นทางและโครงสร้างมุมมอง (Sitemap & View Hierarchy)

ระบบทำงานในรูปแบบ Single Page Application (SPA) พร้อมการจัดการเส้นทางเบราว์เซอร์ผ่าน History API (`window.history.pushState` และ `popstate`):

```text
Speaker Showcase Web Platform
│
├── 🌐 หน้าหลัก (Main Assembly Showcase — "/") ── src/App.tsx
│   ├── 1. Ambient Glow Backgrounds (.ambient-one, .ambient-two)
│   ├── 2. Top Navigation Bar (Brand "NORTH24" & Anchor Links)
│   ├── 3. Hero Section (Intro Heading with Outline Glint & Scroll Cue)
│   ├── 4. Featured Voices Grid (01 / Featured voices)
│   │   └── 5 Speaker Cards with Interactive 3D Perspective Tilt
│   ├── 5. Vision Banner (02 / The gathering) ── src/components/VisionBanner.tsx
│   │   ├── Marquee Ticker ("Ideas in motion ◆ Copenhagen...")
│   │   ├── Parallax Background Image with IntersectionObserver
│   │   └── Gathering Summary & Call-to-Action
│   ├── 6. E-Report Teaser (03 / Field notes) ── src/components/EReportTeaser.tsx
│   │   └── Interactive Orbit Badge & Direct Link to Report
│   └── 7. Footer (Copyright & Assembly Motto)
│
├── 🪟 ป๊อปอัปโมดอลเจาะลึกวิทยากร (Speaker Detail Modal) ── src/components/SpeakerModal.tsx
│   ├── Accessible Backdrop with Blur (Click to Dismiss)
│   ├── Close Button (Keyboard Esc Support & Rotate on Hover)
│   ├── Speaker Hero Info (Name, Role, Topic, Bio & Accent Color Indicator)
│   ├── Speaker Large Photo
│   ├── Selected Work / Recognition (Ordered List with Accent Hover)
│   └── Event Gallery (3 Multi-layout Photos with Hover Scale)
│
└── 📄 หน้าอ่านรายงานดิจิทัล (Full E-Report Page — "/e-report") ── src/components/EReportPage.tsx
    ├── Report Navigation (Back to Assembly Link)
    ├── Report Hero Header with Floating Cover Graphic
    ├── 5 Report Chapters List (Ordered by Speaker Perspectives)
    └── Concluding Quotation & Return Link
```

---

## 2. ข้อมูลสเปกโครงสร้างข้อมูล (Data Model Specification)

ข้อมูลของวิทยากรถูกจัดเก็บในรูปแบบ Type-safe Object ตามสัญญาของ `Speaker` Model ใน [src/types/speaker.ts](file:///C:/ComSciWork/src/types/speaker.ts):

```typescript
export type Speaker = {
  name: string;      // ชื่อ-นามสกุลของวิทยากร เช่น "Maya Chen"
  role: string;      // ตำแหน่งหรือบทบาทสำคัญ เช่น "FUTURIST & AUTHOR"
  topic: string;     // หัวข้อหลักในการบรรยาย เช่น "Designing Tomorrow"
  image: string;     // URL รูปภาพความละเอียดสูงสำหรับ Hero และ Card
  bio: string;       // ชีวประวัติและแนวคิดสำคัญ
  work: string[];    // รายการผลงานเด่นหรือรางวัล 3 รายการ
  accent: string;    // รหัสสีประจำตัว (Hex Color) เช่น "#ff5c35"
};
```

### รายละเอียดข้อมูลวิทยากรทั้ง 5 คนใน [src/data/speakers.ts](file:///C:/ComSciWork/src/data/speakers.ts):

| วิทยากร | หัวข้อ (Topic) | ตัวอย่างผลงาน / รางวัลที่ได้รับ (Selected Work) | รหัสสี (Accent) |
|---|---|---|:---:|
| **Maya Chen** | Designing Tomorrow | 1. The Humane Machine<br>2. MIT Media Lab Fellow<br>3. Fast Company Visionary | `#ff5c35` |
| **Elias North** | Cities That Breathe | 1. Oslo Green Loop<br>2. Living Systems Studio<br>3. AIA Innovation Medal | `#c8ff62` |
| **Amara Okafor** | Culture Is the Brief | 1. Nike Future Voices<br>2. D&AD Black Pencil<br>3. New Museum Council | `#b69cff` |
| **Julian Reyes** | Beyond Intelligence | 1. Stanford HAI<br>2. Open Systems Project<br>3. Nature 10 | `#73cfff` |
| **Noor Al-Sayed** | The Radical Local | 1. Common Ground Fund<br>2. UN Young Leader<br>3. Ashoka Fellow | `#ffd166` |

---

## 3. สเปกการทำงานของ Component แต่ละส่วน (Component Contracts)

### 3.1 `App.tsx` (Root Orchestrator)
- **การจัดการ State:**
  - `selected`: เก็บ Object ของ `Speaker` ที่ถูกคลิก (หรือ `null` หากไม่มีการเปิด Modal)
  - `route`: ติดตาม Path ปัจจุบัน (`window.location.pathname`) เพื่อสลับมุมมองระหว่างหน้าหลักและ `/e-report`
- **การจัดการ 3D Card Tilt:**
  - ฟังก์ชัน `tiltCard`: คำนวณตำแหน่งเมาส์สัมพันธ์กับขนาดการ์ด และอัปเดตตัวแปร CSS `--rx`, `--ry`, `--mx`, `--my` ผ่าน `requestAnimationFrame` เพื่อความลื่นไหลระดับ 60fps
  - ฟังก์ชัน `resetCard`: รีเซ็ตองศาการเอียงกลับเป็น `0deg` เมื่อเมาส์เลื่อนออก (`onMouseLeave`)

### 3.2 `SpeakerModal.tsx` (Detail Pop-up Modal)
- **การเปิดและการปิด (Lifecycle & Smooth Dismiss):**
  - เมื่อเปิด: เพิ่มคลาส `modal-open` ให้กับ `document.body` เพื่อล็อกไม่ให้หน้าเว็บพื้นหลังเลื่อนได้ และสั่ง `focus()` ไปยังปุ่ม Close
  - เมื่อปิด: ตั้งสถานะ `isClosing = true` เพื่อให้ CSS Keyframe Animation (`fade-out`, `panel-out`) ทำงานอย่างนุ่มนวลเป็นเวลา 620ms ก่อนที่จะปลด Component ออกจาก State
- **Accessibility (a11y):**
  - มีคุณสมบัติ `role="dialog"`, `aria-modal="true"`, และ `aria-labelledby="speaker-name"`
  - รองรับการกดปุ่ม `Escape` บนคีย์บอร์ดเพื่อสั่งปิดได้ทันที
  - ดักจับการตั้งค่า `prefers-reduced-motion` เพื่อปิดระยะเวลาหน่วงของ Animation โดยอัตโนมัติ

### 3.3 `VisionBanner.tsx` (Parallax & Intersection Observer)
- ใช้ `IntersectionObserver` คอยตรวจจับเมื่อส่วนแบนเนอร์เลื่อนเข้ามาในหน้าจอ 28% แล้วจึงเปิดใช้งานแอนิเมชันเปิดตัว (`.is-visible`)
- คอยคำนวณระยะการเลื่อนหน้าจอเพื่อขยับรูปภาพพื้นหลังแบบ Parallax (`--parallax-y`) ผ่าน `requestAnimationFrame`

---

## 4. ข้อตกลงมาตรฐานของโค้ด (Coding & Architecture Contracts)

1. **Type-Safety Contract:** ห้ามใช้ `any` ทุกส่วนของข้อมูลต้องมีการประกาศ Type Interface อย่างชัดเจน
2. **Single Responsibility Principle (SRP):** ทุกคอมโพเนนต์ต้องแยกเก็บไว้ในไฟล์ของตนเองใน `src/components/` โดยไม่มีการประกาศหลายคอมโพเนนต์ปะปนในไฟล์เดียว
3. **No Database Modification (Rule 10):** ระบบทำงานในรูปแบบ Client-Side Frontend ไม่มีการสร้าง Table หรือ Insert Data ใน Database เองโดยพลการ
4. **No Git Push / Commit (Rule 11):** การบันทึกและพุชขึ้น Repository จะกระทำโดยผู้ใช้เท่านั้น
