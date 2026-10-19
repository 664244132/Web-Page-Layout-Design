# 🔄 กฎและแนวทางการ Refactor โค้ด (Code Refactoring & Clean Architecture)

เอกสารนี้ระบุข้อกำหนด กฎระเบียบ และแนวทางปฏิบัติในการปรับปรุงโครงสร้างโค้ด (Refactoring) สำหรับโปรเจกต์ **Speaker Showcase Website (North Assembly)** ภายใต้สถาปัตยกรรม **React 19 + TypeScript 5.7**

---

## 1. หลักการสกัดโค้ดแบบแยกส่วน (Single Responsibility & Modularization)

### 🚨 ปัญหาเดิมที่ต้องหลีกเลี่ยง (Anti-Pattern):
- การรวมคอมโพเนนต์หลายตัว, Type Definitions, ข้อมูลดิบ, และสไตล์ไว้ในไฟล์เดียว เช่น ไฟล์ `App.tsx` เดิมที่มีความยาวกว่า 400 บรรทัด ทำให้ยากต่อการอ่านและการบำรุงรักษา

### ✅ แนวทางที่ถูกต้อง (Refactored Pattern):
1. **แยกคอมโพเนนต์ย่อย:** แต่ละคอมโพเนนต์ที่มีการทำงานเฉพาะตัว ต้องแยกเป็นไฟล์เดี่ยวใน [src/components/](file:///C:/ComSciWork/src/components/) (เช่น `SpeakerModal.tsx`, `VisionBanner.tsx`, `EReportTeaser.tsx`)
2. **แยกประเภทข้อมูล:** โครงสร้างข้อมูลที่ใช้ร่วมกันให้ดึงไปไว้ใน [src/types/speaker.ts](file:///C:/ComSciWork/src/types/speaker.ts)
3. **แยกชุดข้อมูลตั้งต้น:** ชุดข้อมูลภาพและวิทยากรให้ดึงไปไว้ใน [src/data/speakers.ts](file:///C:/ComSciWork/src/data/speakers.ts)
4. **ไฟล์ `App.tsx` เป็นเพียงผู้ประสานงาน (Orchestrator):** ควบคุมเฉพาะ Global State (`selected`, `route`) และจัดวาง Component หลัก

---

## 2. การจัดการตำแหน่งของ State (State Colocation Principle)

- **วาง State ให้อยู่ใกล้กับจุดที่ใช้งานมากที่สุด:**
  - ตัวอย่าง: สถานะ `isClosing` ของ Modal ไม่จำเป็นต้องอยู่ใน `App.tsx` เพราะเป็นสถานะเฉพาะตัวระหว่างที่ Pop-up กำลังเล่นแอนิเมชันปิด ให้ประกาศไว้ภายใน `SpeakerModal.tsx` โดยตรง
  - สถานะ `selected` (วิทยากรที่ถูกเลือก) ยังคงอยู่ที่ `App.tsx` เนื่องจากต้องใช้เปิด/ปิด และส่งค่าไปยัง `SpeakerModal`

---

## 3. การจัดการ Performance และ Memory Leaks ใน React 19

เมื่อทำการ Refactor โค้ดที่มีการคำนวณหรือผูก Event:
1. **ใช้ `requestAnimationFrame` สำหรับงานคำนวณความถี่สูง:**
   - การคำนวณตำแหน่งเมาส์สำหรับการเอียง 3D Card Tilt (`tiltCard`) ต้องผ่าน `requestAnimationFrame` เสมอ เพื่อไม่ให้รบกวน Main Thread และคงความลื่นไหลที่ 60fps
2. **มี Cleanup Function เสมอ:**
   - เมื่อผูก Event Listener ใน `useEffect` (`popstate`, `keydown`, `scroll`, `IntersectionObserver`) หรือใช้ Timer (`setTimeout`) ต้องมีฟังก์ชันล้าง (Cleanup) ทุกครั้ง

---

## 4. มาตรฐานความเป็นมิตรต่อผู้เริ่มต้น (Beginner-Friendly Standards - Rule 6)

- **หลีกเลี่ยงตรรกะที่ซับซ้อนเกินจำเป็น (Keep It Simple):**
  - หลีกเลี่ยง Nested Ternary Operators (`a ? b : c ? d : e`) ซ้อนกันหลายชั้น
  - ใส่คอมเมนต์อธิบายการทำงานในจุดที่มีการคำนวณทางคณิตศาสตร์ เช่น การคำนวณพิกัดแกน X, Y สำหรับ 3D Tilt
- **การใช้ De Morgan's Laws และ Early Return:**
  - นำเงื่อนไขที่ไม่ผ่านเกณฑ์มาทำ Early Return ก่อนเสมอ เพื่อให้ Happy Path ของฟังก์ชันอ่านง่ายและไม่ต้องซ้อนบล็อกเงื่อนไขลึกๆ

---

## 5. การดูแลรักษาและรันระบบตรวจสอบ CheckSystem อย่างสม่ำเสมอ (CheckSystem Maintenance Rule)

> [!IMPORTANT]
> **กฎเหล็กข้อบังคับ:** ทุกครั้งที่มีการ Refactor โค้ด เพิ่มฟังก์ชันใหม่ หรือสร้างไฟล์ใหม่ในระบบ:
> 1. **ต้องรันคำสั่ง `npm run check-system` เสมอ:** เพื่อให้ระบบตรวจสอบ Path Links, กฎข้อบังคับ Markdown Rules (De Morgan, Naming, Types, a11y, Security) และ React State Lifecycle อัตโนมัติ
> 2. **ต้องอัปเดตไฟล์ใน `CheckSystem/` อยู่เสมอ:**
>    - หากสร้าง Component หรือ Route ใหม่ ให้เพิ่มการตรวจสอบ Path ใน [`CheckSystem/check-path-links.js`](file:///C:/ComSciWork/CheckSystem/check-path-links.js)
>    - หากมีการใช้งาน State หรือ Event Listener ใหม่ ให้เพิ่มการตรวจสอบ Cleanup ใน [`CheckSystem/check-state-lifecycle.js`](file:///C:/ComSciWork/CheckSystem/check-state-lifecycle.js)
>    - หากมีกฎหรือเกณฑ์ใหม่ใน Markdown ให้เพิ่มตัวตรวจใน [`CheckSystem/check-markdown-rules.js`](file:///C:/ComSciWork/CheckSystem/check-markdown-rules.js)

---

## 6. รายการตรวจสอบก่อนเสร็จสิ้นการ Refactor (Refactoring Checklist)

ก่อนยืนยันว่าการ Refactor เสร็จสมบูรณ์ ต้องตรวจสอบตามเกณฑ์ต่อไปนี้:
- [x] โครงสร้างโฟลเดอร์ตรงตาม [NamingAndStructureGuide.md](file:///C:/ComSciWork/markdowns/NamingAndStructureGuide.md)
- [x] ไม่มีคำสั่ง `any` ใน TypeScript
- [x] คอมโพเนนต์ปิด Tag JSX ครบถ้วนและไม่มี Unused Imports
- [x] ผ่านการทดสอบบิลด์ด้วยคำสั่ง `npm run build` โดยได้ Exit Code 0
- [x] ผ่านการตรวจสอบความถูกต้องทั้งระบบด้วยคำสั่ง `npm run check-system` โดยได้ Exit Code 0
- [x] มีการอัปเดตไฟล์ใน `CheckSystem/` หากมีการเพิ่มฟังก์ชัน คอมโพเนนต์ หรือไฟล์ใหม่เข้ามา
- [x] ตรวจสอบ `.antigravityignore` ต้องไม่มี `.agents/` หรือโฟลเดอร์สกิลสำคัญ เพื่อให้ Agent อ่านไฟล์ `SKILL.md` ได้
- [x] ไม่มีการสร้างหรือแก้ไขโค้ดเดิมโดยไม่จำเป็น (Rule 8)
- [x] ไม่มีการรัน `git commit` หรือ `git push` โดยพลการ (Rule 11)