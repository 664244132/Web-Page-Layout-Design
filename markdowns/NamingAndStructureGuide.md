# 🏷️ มาตรฐานการตั้งชื่อและสถาปัตยกรรมโค้ด (Naming & Architecture Specification)

เอกสารฉบับนี้เป็น **"กฎระเบียบมาตรฐาน (Standard Rules)"** ที่บังคับใช้อย่างเคร่งครัดสำหรับการตั้งชื่อไฟล์ โฟลเดอร์ คอมโพเนนต์ ฟังก์ชัน และตัวแปรสำหรับโปรเจกต์ **Speaker Showcase Website (North Assembly)** ภายใต้สถาปัตยกรรม **React 19 + TypeScript 5.7 + Tailwind CSS v4 + Vite 8**

---

## 🧭 1. ขอบเขตและระดับการบังคับใช้ (Scope & RFC 2119 Standards)

* **[MUST / ต้องกระทำ]:** เป็นกฎบังคับเด็ดขาด หากไม่ปฏิบัติตามจะถือว่าโค้ดไม่ผ่านเกณฑ์การตรวจสอบ
* **[MUST NOT / ห้ามเด็ดขาด]:** ข้อห้ามที่ตรวจพบไม่ได้โดยสิ้นเชิง
* **[REQUIRED / บังคับใช้ 100%]:** ทุกไฟล์และทุกบรรทัดโค้ดต้องสอดคล้องกับมาตรฐานนี้

### ปรัชญาพื้นฐาน (Core Philosophies):
1. **โค้ดอธิบายตัวเองได้ (Self-Documenting Code):** ชื่อตัวแปรและฟังก์ชันต้องสื่อความหมายชัดเจนโดยไม่ต้องพึ่งพาคอมเมนต์แปลความหมาย
2. **ภาษาอังกฤษเข้าใจง่าย (Beginner-Friendly Plain English):** ใช้คำศัพท์ภาษาอังกฤษที่ตรงตัว สากล เข้าใจง่าย
3. **ความเป็นเอกภาพสูงสุด (Total Uniformity):** ไม่ผสมผสานรูปแบบการตั้งชื่อ (Casing Conventions) ข้ามหมวดหมู่

---

## 📄 2. กฎการตั้งชื่อไฟล์ตามหมวดหมู่ (File Naming Conventions)

### ⚛️ 2.1 ไฟล์คอมโพเนนต์ React: บังคับใช้ `PascalCase.tsx`
> **[MUST]:** ไฟล์คอมโพเนนต์ React ทั้งหมดต้องตั้งชื่อด้วยตัวพิมพ์ใหญ่ผสมเล็กแบบ **PascalCase** และลงท้ายด้วยนามสกุล `.tsx`

| หมวดหมู่ | ❌ รูปแบบที่ผิด | ✅ รูปแบบที่ถูกต้อง (PascalCase) | คำอธิบาย |
|---|---|---|---|
| **Root Component** | `app.tsx`, `main-app.tsx` | **`App.tsx`** | คอมโพเนนต์หลักของระบบ (Root Orchestrator) |
| **Navigation** | `nav-bar.tsx`, `navbar.tsx` | **`Navbar.tsx`** | แถบนำทางด้านบนส่วนหัวของเว็บไซต์ |
| **Speaker Card** | `speaker-card.tsx`, `speaker_card.tsx` | **`SpeakerCard.tsx`** | การ์ดวิทยากรพร้อมมิติ 3D Tilt |
| **UI Components** | `speaker-modal.tsx`, `speaker_modal.tsx` | **`SpeakerModal.tsx`** | Pop-up Modal แสดงรายละเอียดวิทยากร |
| **Banner & Sections** | `vision_banner.tsx`, `visionBanner.tsx` | **`VisionBanner.tsx`** | แบนเนอร์วิสัยทัศน์ Parallax |
| **Teasers & Pages** | `ereport_teaser.tsx`, `e-report-teaser.tsx` | **`EReportTeaser.tsx`** | ส่วนโปรโมตรายงานดิจิทัล |
| **Sub Pages** | `ereport_page.tsx`, `eReportPage.tsx` | **`EReportPage.tsx`** | หน้ารายงานดิจิทัลฉบับเต็ม |
| **Icons & Elements** | `arrow-icon.tsx`, `arrow.tsx` | **`Arrow.tsx`** | คอมโพเนนต์ไอคอนลูกศรเฉียง (↗) SVG |
| **Icons & Elements** | `close-icon.tsx`, `close.tsx` | **`CloseIcon.tsx`** | คอมโพเนนต์ไอคอนปิด (×) SVG |

### 🔷 2.2 ไฟล์ชนิดข้อมูล (Types), ชุดข้อมูล (Data) และฮุก (Hooks): บังคับใช้ `camelCase.ts`
> **[MUST]:** ไฟล์ที่ทำหน้าที่เก็บการประกาศ Type, Interface, ข้อมูลคงที่ หรือ Custom React Hooks ให้ตั้งชื่อด้วย **camelCase**

| โฟลเดอร์ | ตัวอย่างไฟล์ที่ถูกต้อง | คำอธิบายหน้าที่ |
|---|---|---|
| **`src/types/`** | **`speaker.ts`** | ประกาศ `type Speaker = { ... }` |
| **`src/data/`** | **`speakers.ts`** | ชุดข้อมูลวิทยากรทั้ง 5 คนและ Local Image Assets |
| **`src/hooks/`** | **`useReducedMotion.ts`** | Custom Hook ตรวจสอบสถานะ `prefers-reduced-motion` |

### 🛡️ 2.3 สคริปต์ตรวจสอบระบบใน CheckSystem: บังคับใช้ `kebab-case.js`
> **[MUST]:** สคริปต์และตัวตรวจใน `CheckSystem/` ให้ตั้งชื่อด้วย **kebab-case** และลงท้ายด้วย `.js` เช่น `check-path-links.js`, `check-markdown-rules.js`, `check-state-lifecycle.js`, และ `run-all-checks.js`

---

## 📁 3. สถาปัตยกรรมโครงสร้างโฟลเดอร์ (Folder Architecture)

```text
ComSciWork/
├── .antigravityignore       # การกำหนดค่าข้ามไฟล์ที่ไม่จำเป็นสำหรับ AI Agent
├── CheckSystem/             # ระบบตรวจสอบอัตโนมัติ (Automated Quality & Integrity Suite)
│   ├── run-all-checks.js    # Master Runner รันการตรวจสอบทั้งระบบ (npm run check-system)
│   ├── check-path-links.js  # ตรวจสอบความถูกต้องของ Assets, Imports และ Markdown Links
│   ├── check-markdown-rules.js # ตรวจสอบกฎ Markdown (De Morgan, Naming, Types, a11y, Security)
│   ├── check-state-lifecycle.js # ตรวจสอบ State Colocation, Memory Leaks, และ Event Cleanups
│   └── README.md            # คู่มือการใช้งานและกฎการดูแลรักษา CheckSystem
├── .gitignore               # การกรองไฟล์สำหรับ Git
├── package.json             # การตั้งค่า Dependencies ของโปรเจกต์
├── tsconfig.json            # การตั้งค่า TypeScript
├── vite.config.ts           # การตั้งค่า Vite Build Tool
├── index.html               # เอกสาร HTML หลัก
│
├── markdowns/               # เอกสารคู่มือและการพัฒนาโปรเจกต์ (19 ไฟล์)
│   ├── AboutProject.md
│   ├── PROJECT.md
│   ├── TECHSTACK.md
│   ├── DESIGN.md
│   └── ...
│
├── public/                  # ทรัพยากรคงที่แบบ Public (เข้าถึงได้โดยตรงผ่าน Root URL)
│   ├── favicon.svg          # Favicon ของเว็บไซต์
│   ├── fonts/               # ฟอนต์ท้องถิ่น (Self-hosted Fonts)
│   │   ├── dmsans.woff2
│   │   └── manrope.woff2
│   └── images/              # คลังรูปภาพความละเอียดสูงท้องถิ่น (8 รูป)
│       ├── speaker-maya.jpg
│       ├── speaker-elias.jpg
│       ├── speaker-amara.jpg
│       ├── speaker-julian.jpg
│       ├── speaker-noor.jpg
│       ├── vision-banner.jpg
│       ├── event-atmosphere-1.jpg
│       └── event-atmosphere-2.jpg
│
└── src/                     # ซอร์สโค้ดของแอปพลิเคชัน
    ├── components/          # คอมโพเนนต์ UI และไฟล์ CSS แบบแยกโมดูล (PascalCase)
    │   ├── Arrow.tsx
    │   ├── CloseIcon.tsx
    │   ├── EReportPage.tsx
    │   ├── EReportPage.css
    │   ├── EReportTeaser.tsx
    │   ├── EReportTeaser.css
    │   ├── Navbar.tsx
    │   ├── Navbar.css
    │   ├── SpeakerCard.tsx
    │   ├── SpeakerCard.css
    │   ├── SpeakerModal.tsx
    │   ├── SpeakerModal.css
    │   ├── VisionBanner.tsx
    │   └── VisionBanner.css
    ├── data/                # ข้อมูลคงที่และ Mock Datasets (camelCase.ts)
    │   └── speakers.ts
    ├── hooks/               # Custom React Hooks (camelCase.ts)
    │   └── useReducedMotion.ts
    ├── types/               # การนิยามโครงสร้างข้อมูล Types & Interfaces (camelCase.ts)
    │   └── speaker.ts
    ├── App.tsx              # คอมโพเนนต์ระดับบนสุดและผู้ควบคุมสถานะ (Orchestrator)
    ├── App.css              # สไตล์เฉพาะของส่วน Hero Intro, Glows และ Footer
    ├── index.css            # สไตล์ชีตรวมศูนย์ (Tailwind v4, Local @font-face & Keyframes)
    ├── main.tsx             # Entrypoint นำ React เข้าสู่ DOM
    └── vite-env.d.ts        # การประกาศ Type สำหรับ Vite Client
```

---

## 🏷️ 4. กฎการตั้งชื่อตัวแปร ฟังก์ชัน และ Props (Code Naming Rules)

### 4.1 ตัวแปรและฟังก์ชัน (Variables & Functions)
- **ตัวแปรและฟังก์ชันทั่วไป:** ใช้ `camelCase` เช่น `selected`, `tiltFrame`, `navigate`
- **ฟังก์ชัน Event Handler:** ให้ขึ้นต้นด้วยคำกริยาหรือคำว่า `handle` หรือรูปแบบการกระทำ เช่น `tiltCard`, `resetCard`, `requestClose`
- **ตัวแปรประเภท Boolean:** ต้องขึ้นต้นด้วยคำบ่งชี้สถานะ เช่น `isClosing`, `isVisible`, `hasReducedMotion`

### 4.2 การตั้งชื่อ Component Props
- ตั้งชื่อ Props Type ด้วยรูปแบบ `[ComponentName]Props` เช่น:
  ```typescript
  type SpeakerModalProps = {
    speaker: Speaker;
    onClose: () => void;
  };
  ```
- Props ที่เป็น Callback ฟังก์ชันส่งกลับไปยัง Component แม่ ให้ขึ้นต้นด้วย `on...` เช่น `onClose`, `onOpen`, `onBack`
