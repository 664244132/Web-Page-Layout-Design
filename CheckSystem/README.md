# 🛡️ คู่มือระบบตรวจสอบอัตโนมัติ (CheckSystem Suite)

**CheckSystem** คือชุดเครื่องมือตรวจสอบความถูกต้อง คุณภาพโค้ด สุขอนามัยของระบบ และการปฏิบัติตามกฎระเบียบของโปรเจกต์ **Speaker Showcase Website (North Assembly)** โดยออกแบบมาเพื่อช่วยให้นักพัฒนาและ **AI Agents** สามารถตรวจจับบั๊ก ข้อผิดพลาดของเส้นทาง (Path Links) และการละเมิดกฎในโฟลเดอร์ `markdowns/` ได้อย่างอัตโนมัติและรวดเร็ว

---

## 🚀 คำสั่งรันระบบตรวจสอบ (How to Run)

สามารถรันการตรวจสอบทั้งระบบได้ง่ายๆ ด้วยคำสั่งเดียวผ่าน `npm`:

```bash
# รันการตรวจสอบทั้ง 3 โมดูลพร้อมกัน
npm run check-system
```

หรือสามารถเลือกรันทีละโมดูลแบบแยกอิสระได้:

```bash
# 1. ตรวจสอบเฉพาะเส้นทางไฟล์ Assets, Imports, และ Markdown Links
node CheckSystem/check-path-links.js

# 2. ตรวจสอบกฎข้อบังคับโค้ด (De Morgan, Naming, Types, a11y, Security)
node CheckSystem/check-markdown-rules.js

# 3. ตรวจสอบ State Colocation, Memory Leaks, และ Event Cleanups
node CheckSystem/check-state-lifecycle.js
```

---

## 🧩 องค์ประกอบของโมดูลใน CheckSystem

```text
CheckSystem/
├── run-all-checks.js          # Master Runner รันทุกโมดูลและแสดงผลสรุปบน Terminal Dashboard
├── check-path-links.js        # โมดูลที่ 1: ตรวจสอบเส้นทาง Assets, Imports และ Markdown Links
├── check-markdown-rules.js    # โมดูลที่ 2: ตรวจสอบกฎระเบียบ De Morgan, Naming, Types, a11y, Security
├── check-state-lifecycle.js   # โมดูลที่ 3: ตรวจสอบความถูกต้องของ State, Cleanups, และ Memory Leaks
└── README.md                  # เอกสารคู่มือฉบับนี้
```

### 1. `check-path-links.js` (Path & Link Integrity Checker)
- **Public Assets:** สแกนหาการเรียกใช้ `/fonts/*`, `/images/*`, `/favicon.svg` ใน `src/` และ `index.html` แล้วเทียบกับไฟล์จริงใน `public/`
- **Source Imports:** ตรวจสอบคำสั่ง `import` ภายใน `src/` ทั้งแบบ Relative (`./`, `../`) และ Path Alias (`@/*`) ว่าไฟล์ปลายทางมีอยู่จริงหรือไม่
- **Markdown Links:** สแกนทุกลิงก์ในไฟล์เอกสาร `markdowns/*.md` (รวมทั้ง `file:///...` และ Relative links) ป้องกันปัญหาลิงก์เสีย

### 2. `check-markdown-rules.js` (Markdown Rules & Coding Standards)
- **De Morgan's Laws:** สแกนหาเงื่อนไขต้องห้าม `!(A && B)` หรือ `!(A || B)` ตามข้อกำหนดใน [`markdowns/DeMorgansLaws.md`](file:///C:/ComSciWork/markdowns/DeMorgansLaws.md)
- **Naming Conventions:** ตรวจสอบว่าคอมโพเนนต์ทั้งหมดเป็น `PascalCase.tsx`, มี `export default` ตาม [`AGENTS.md`](file:///C:/ComSciWork/AGENTS.md), และไฟล์ utility เป็น `camelCase.ts`
- **Type Safety:** ตรวจสอบการห้ามใช้ `any` ตาม [`markdowns/TypeScriptCodingGuide.md`](file:///C:/ComSciWork/markdowns/TypeScriptCodingGuide.md)
- **Accessibility (a11y):** ตรวจสอบว่ารูปภาพทุกรูปมี `alt`, ไอคอนตกแต่งมี `aria-hidden="true"`, และ Modal มี `role="dialog"` ครบถ้วน
- **Security:** ตรวจสอบห้ามใช้ `dangerouslySetInnerHTML`, `javascript:` protocol หรือการเผลอใส่ Secret Keys
- **Agent Skills Accessibility:** ตรวจสอบว่าใน `.antigravityignore` ต้องไม่มี `.agents/` เพื่อให้ AI Agent สามารถเข้าถึงคู่มือคำสั่งใน `SKILL.md` ได้เสมอ

### 3. `check-state-lifecycle.js` (React State & Lifecycle Integrity)
- **State Colocation:** ตรวจสอบว่าสถานะถูกประกาศไว้ใกล้จุดใช้งานมากที่สุด (เช่น `isClosing` อยู่ใน Modal ไม่หลุดไปที่ `App.tsx`)
- **Memory Leak Cleanups:** ตรวจสอบฟังก์ชัน Cleanup ใน `useEffect` ทุกจุด:
  - การถอดคลาส `modal-open` ออกจาก `document.body`
  - การลบ Event Listeners (`popstate`, `keydown`, `scroll`)
  - การยกเลิก Animation Frame (`cancelAnimationFrame`)
  - การล้างตัวจับเวลา (`clearTimeout`)
- **Defensive Indexing:** ตรวจสอบการใช้ `Math.max(0, ...)` เพื่อป้องกันบั๊ก Index ไม่ถูกต้อง

---

## 📜 กฎข้อบังคับสำหรับนักพัฒนาและ AI Agents (Mandatory Maintenance Rules)

> [!IMPORTANT]
> **ข้อกำหนดการอัปเดตและดูแลรักษา CheckSystem เสมอ (Enforced Rule):**
> 1. **ก่อนส่งมอบงานหรือสรุปผลทุกครั้ง:** นักพัฒนาและ AI Agent จะต้องรันคำสั่ง `npm run check-system` ควบคู่กับ `npm run build` เพื่อยืนยันว่าไม่มีจุดใดในระบบที่ผิดกฎ
> 2. **เมื่อมีการเพิ่มคอมโพเนนต์หรือฟังก์ชันใหม่:**
>    - หากมีการเพิ่มไฟล์หรือ State ใหม่ ให้เข้ามาอัปเดตข้อกำหนดการตรวจสอบใน `check-state-lifecycle.js` หรือ `check-markdown-rules.js` ตามความเหมาะสม
>    - หากมีการเพิ่ม Assets ใหม่ ให้ยืนยันว่าไฟล์นั้นผ่านการตรวจสอบของ `check-path-links.js`
> 3. **รักษามาตรฐาน Zero Errors:** ห้ามให้มีข้อผิดพลาดหรือ Warning ใดๆ ค้างอยู่ในผลการรัน CheckSystem
