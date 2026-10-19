# 🎨 คู่มือมาตรฐานการเขียน Custom CSS สำหรับโปรเจกต์ Speaker Showcase (Modern CSS Standards)

เอกสารนี้รวบรวมหลักการและข้อกำหนดในการเขียน **Modern Custom CSS** ใน [src/index.css](file:///C:/ComSciWork/src/index.css) สำหรับโปรเจกต์ **Speaker Showcase Website (North Assembly)**

---

## 1. การใช้งานตัวแปร CSS (CSS Custom Properties & Dynamic Tokens)

- **ตัวแปรส่วนกลางใน `:root`:**
  - กำหนดค่าตัวแปรระดับ Global เช่น สีพื้นหลัง, สีตัวอักษร, และ Font Family
- **ตัวแปรไดนามิกเฉพาะ Component (Scoped Custom Properties):**
  - ตัวแปรที่เปลี่ยนไปตามการโต้ตอบของผู้ใช้ เช่น:
    - `--accent`: รหัสสีประจำตัวของวิทยากรแต่ละคน
    - `--rx`, `--ry`: องศาการเอียงของการ์ดในแนวแกน X และ Y
    - `--mx`, `--my`: พิกัดตำแหน่งแสงสะท้อนตามเมาส์
    - `--parallax-y`: ระยะการเลื่อน Parallax ของรูปภาพ
    - `--delay`: ระยะเวลาหน่วงของแอนิเมชันใน Gallery

```css
/* การใช้งานตัวแปรไดนามิกในสไตล์ */
.modal-panel {
  --accent: #ff5c35;
  border-top: 5px solid var(--accent);
}
```

---

## 2. การกำหนดขนาดตัวอักษรแบบยืดหยุ่น (Fluid Typography with `clamp()`)

- **[MUST]:** หลีกเลี่ยงการกำหนดขนาดฟอนต์แบบคงที่ (`px`) สำหรับหัวเรื่องขนาดใหญ่ ให้ใช้ฟังก์ชัน `clamp(min, preferred, max)` เสมอ เพื่อให้ขนาดตัวอักษรย่อ-ขยายตามขนาดหน้าจออย่างลื่นไหลโดยไม่ต้องพึ่งพาหลาย Media Queries:

```css
/* ตัวอย่าง Fluid Heading */
.intro h1 {
  font: 500 clamp(4.2rem, 10.5vw, 10rem)/.82 "Manrope";
  letter-spacing: -.085em;
}
```

---

## 3. มิติ 3 มิติและการเคลื่อนไหวที่มีประสิทธิภาพ (Hardware-Accelerated Transforms)

- **การเคลื่อนไหวที่มีประสิทธิภาพ:**
  - ใช้คุณสมบัติ `transform` (เช่น `translate3d`, `scale`, `rotateX`, `rotateY`) และ `opacity` ในการทำแอนิเมชันเป็นหลัก เนื่องจากเบราว์เซอร์สามารถประมวลผลผ่าน GPU ได้โดยตรง โดยไม่ทำให้เกิด Layout Reflow
- **การตั้งค่ามิติ 3 มิติ (3D Perspective):**
  - กำหนด `perspective: 1100px;` บนคอนเทนเนอร์แม่
  - กำหนด `transform-style: preserve-3d;` บน Element ที่ต้องการให้เอียงตามมิติ 3 มิติ

---

## 4. มาตรฐานแอนิเมชันและการลดการเคลื่อนไหว (Motion Accessibility)

- **Timing Function ระดับพรีเมียม:**
  - ใช้ลูกเล่นการเคลื่อนไหวแบบ Smooth Easing: `cubic-bezier(.16, 1, .3, 1)` เพื่อให้การเปิด Modal และการขยายภาพมีความนุ่มนวลและเป็นธรรมชาติ
- **[MUST] กฎ `prefers-reduced-motion`:**
  - ต้องมี Media Query รองรับผู้ใช้ที่เปิดการตั้งค่าลดการเคลื่อนไหว โดยปิดการเอียง 3D, ปิด Parallax และลดเวลาแอนิเมชันให้เสร็จในทันที:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-delay: 0ms !important;
    transition-duration: .01ms !important;
  }
  .vision-image { transform: none !important; }
  .speaker-card .image-wrap { transform: none !important; }
}
```
