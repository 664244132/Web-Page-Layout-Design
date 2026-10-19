# 🎨 คู่มือการใช้งาน Tailwind CSS v4: มาตรฐานสำหรับโปรเจกต์ Speaker Showcase

เอกสารนี้รวบรวมหลักการ ข้อกำหนด และแนวทางปฏิบัติในการใช้งาน **Tailwind CSS v4** ร่วมกับ Vite และ Custom CSS สำหรับโปรเจกต์ **Speaker Showcase Website (North Assembly)**

---

## 1. สถาปัตยกรรม Tailwind CSS v4 (CSS-First Architecture)

- **การติดตั้งและนำเข้า:**
  - ติดตั้งผ่านแพ็กเกจ `tailwindcss` และ `@tailwindcss/vite` ใน [package.json](file:///C:/ComSciWork/package.json)
  - นำเข้าใน [src/index.css](file:///C:/ComSciWork/src/index.css) ด้วยคำสั่งบรรทัดเดียว:
    ```css
    @import "tailwindcss";
    ```
- **จุดเด่นของเวอร์ชัน 4:**
  - **No Config File Needed:** ไม่ต้องมีไฟล์ `tailwind.config.js` หรือ `postcss.config.js` การตั้งค่าตัวแปร ธีม และการปรับแต่งทำผ่าน CSS ดั้งเดิมได้ทันที
  - คอมไพล์ได้รวดเร็วระดับ High-performance ผ่าน Oxide Engine

---

## 2. การทำงานร่วมกันระหว่าง Tailwind Utility Classes และ Custom CSS

ในโปรเจกต์นี้ มีการผสมผสาน 2 รูปแบบอย่างมีประสิทธิภาพ:
1. **Tailwind Utility Classes ใน JSX:**
   - ใช้สำหรับงานจัด Layout, Spacing, Padding, Margin, การจัด Flexbox/Grid และการซ่อน/แสดงผลทั่วไป
2. **Custom CSS ใน `src/index.css`:**
   - ใช้สำหรับงานที่มีความซับซ้อนสูงด้านมิติและการเคลื่อนไหว เช่น:
     - 3D Card Tilt (`perspective`, `rotateX`, `rotateY`, `transform-style: preserve-3d`)
     - Keyframe Animations (`title-in`, `text-glint`, `drift`, `ticker`, `panel-in`, `panel-out`)
     - การคำนวณ Parallax ผ่าน CSS Custom Properties (`--parallax-y`)
     - เอฟเฟกต์ Glassmorphism (`backdrop-filter: blur(...)`)

---

## 3. แนวทางปฏิบัติการใช้งาน Responsive และ Breakpoints

- ยึดหลัก **Mobile-First Design** เสมอ:
  - กำหนดสไตล์พื้นฐานสำหรับหน้าจอมือถือเป็นหลัก
  - ใช้ Breakpoints สำหรับหน้าจอขนาดใหญ่ขึ้น เช่น แท็บเล็ต (`md:`) และเดสก์ท็อป (`lg:`, `xl:`)
- **ตัวอย่างการปรับคอลัมน์การ์ดวิทยากร:**
  - บนมือถือ: แสดงผลแบบ 1 คอลัมน์เต็มความกว้าง (Full Width)
  - บนเดสก์ท็อป: แสดงผลแบบ 12-column Grid Layout (Span 4 ต่อการ์ด)

---

## 4. ความคงเส้นคงวาของ Accessibility (a11y) และ Focus States

- ทุกปุ่มที่เป็นการคลิกต้องมี Focus Ring ที่คมชัด เพื่อให้ผู้ใช้คีย์บอร์ดมองเห็นตำแหน่งโฟกัส:
  - ใช้คลาสหรือสไตล์ `:focus-visible` กำกับเสมอ
  - ป้ายกำกับสำหรับ Screen Reader: หากปุ่มมีเพียงไอคอน เช่น ลูกศร `↗` ต้องแนบ `aria-label` หรือ `aria-hidden="true"` ให้เหมาะสม