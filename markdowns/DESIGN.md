# 🎨 ระบบการออกแบบ (Design System & UI Guidelines)

เอกสารนี้ระบุมาตรฐานด้านภาพ (Visual Design), โทนสี (Color Palette), Typography, การจัดเลย์เอาต์ (Layout Strategy), พฤติกรรมการโต้ตอบ (Interactions), และกฎการออกแบบสำหรับโปรเจกต์ **Speaker Showcase Website (North Assembly 2024 — Copenhagen)**

---

## 1. วิสัยทัศน์การออกแบบ (Creative North Star)

**"Modern Editorial & Brutalist Tech Showcase"**

เว็บไซต์ Speaker Showcase ได้รับการออกแบบโดยผสานความเฉียบคมแบบ Editorial Magazine เข้ากับความล้ำสมัยของ Tech Conference:
- **Cinematic Depth over Flat Surfaces:** ใช้พื้นหลังสีมืดสนิท (`#0a0a0a`) แต้มด้วยลูกเล่นแสง Ambient Glow Blur (`#ff603d`, `#7660ff`) เพื่อสร้างความรู้สึกลอยเด่น
- **Typographic Impact:** ใช้การจัดวางตัวอักษรขนาดใหญ่พิเศษ (Oversized Editorial Typography) ผสานลูกเล่นข้อความแบบ Outline ที่มีแสงประกายแวววาว (Text Glint Animation)
- **Fluid & Tactile Micro-Interactions:** การ์ดวิทยากรตอบสนองต่อการเคลื่อนไหวของเมาส์ด้วยมิติ 3 มิติ (3D Perspective Card Tilt) อย่างเป็นธรรมชาติ

---

## 2. ชุดสีและ Color Tokens (Color Palette)

### 🌑 โทนสีหลักของเว็บไซต์ (Global Dark Canvas)
| ชื่อ Token / ตัวแปร | ค่าสี Hex / RGBA | คำอธิบายการใช้งาน |
|---|---|---|
| **Canvas Background** | `#0a0a0a` | สีพื้นหลังหลักของเว็บไซต์ ให้ความสลัว ลึกลับ และช่วยขับรูปภาพให้โดดเด่น |
| **Primary Typography** | `#f4f2eb` | สีตัวอักษรหลัก (Off-white อบอุ่น นุ่มนวลกว่าสีขาวล้วน) |
| **Secondary Typography** | `#aaa8a2` | สีตัวอักษรรอง สำหรับคำอธิบาย สรุปย่อ และ Label ต่างๆ |
| **Subtle Label / Meta** | `#85837e` | สีข้อความระบุวันที่ ข้อมูลประจำการ์ด และหมายเลขลำดับ |
| **Subtle Border** | `rgba(255, 255, 255, 0.16)` | เส้นขอบบางโปร่งแสงสำหรับแบ่งสัดส่วนเลย์เอาต์และ Section |
| **Ambient Glow One** | `#ff603d` | แสงเรืองรองสีส้มอมแดงด้านขวาบน |
| **Ambient Glow Two** | `#7660ff` | แสงเรืองรองสีม่วงด้านซ้ายกลาง |

### ☀️ โทนสีหน้า E-Report Page (Editorial Light Paper)
| ส่วนประกอบ | ค่าสี Hex / RGBA | คำอธิบาย |
|---|---|---|
| **Report Canvas** | `#e8e4da` | พื้นหลังกระดาษหนังสือพิมพ์สไตล์ Retro Editorial Paper |
| **Report Text** | `#111111` | ตัวอักษรสีดำเข้มคมชัด |
| **Report Highlight** | `#ff5c35` | แถบสีไฮไลต์ประจำฉบับ (Cover & Chapter Hover) |

### 🎨 ชุดสีประจำตัววิทยากรทั้ง 5 คน (Individual Speaker Accent Tokens)
วิทยากรแต่ละคนจะมีสี Accent เฉพาะตัว ซึ่งนำไปใช้ในแถบสีบน Modal, ปุ่ม View Profile, แถบสีด้านบน และประกายการ์ด:
| วิทยากร | สี Accent | รหัสสี Hex | คาแรกเตอร์และการสื่อความหมาย |
|---|---|:---:|---|
| **Maya Chen** | Flame Orange | `#ff5c35` | พลัง ความกระตือรือร้น นวัตกรรมแห่งอนาคต (Designing Tomorrow) |
| **Elias North** | Neon Lime | `#c8ff62` | ธรรมชาติ ระบบนิเวศ เมืองสีเขียวที่หายใจได้ (Cities That Breathe) |
| **Amara Okafor** | Lavender Violet | `#b69cff` | ความคิดสร้างสรรค์ มิติทางวัฒนธรรมและความเท่าเทียม (Culture Is the Brief) |
| **Julian Reyes** | Cyan Sky | `#73cfff` | ความเฉลียวฉลาด AI ปัญญาประดิษฐ์และความโปร่งใส (Beyond Intelligence) |
| **Noor Al-Sayed** | Warm Gold | `#ffd166` | พลังขับเคลื่อนชุมชน คุณค่าท้องถิ่นที่ยั่งยืน (The Radical Local) |

---

## 3. ระบบตัวอักษร (Typography System)

โปรเจกต์นี้เลือกใช้ฟอนต์ระดับพรีเมียมจำนวน 2 ตัว (ในรูปแบบ Local Self-hosted WOFF2 พร้อม Google CDN Fallback) เพื่อสร้าง Hierarchy ที่สมดุล:

1. **"Manrope" (Display & Headings):**
   - ใช้งานใน: ชื่อแบรนด์ `NORTH24`, หัวเรื่องใหญ่ `<h1>`, `<h2>`, หมายเลขลำดับ และชื่อวิทยากร
   - น้ำหนัก: `500` (Medium), `600` (Semi-bold), `700` (Bold)
   - ลักษณะ: รูปทรงเรขาคณิต โมเดิร์น คมชัด มีพลัง
2. **"DM Sans" (Body & Reading Copy):**
   - ใช้งานใน: ข้อความเนื้อหาทั่วไป ชีวประวัติ (Bio), ข้อมูลบรรยาย และรายการผลงาน
   - น้ำหนัก: `400` (Regular), `500` (Medium)
   - ลักษณะ: ฟอนต์สไตล์เรียบหรู อ่านง่าย สบายตาแม้ในขนาดตัวอักษรเล็ก

### Fluid Typography Scale:
ใช้ฟังก์ชัน `clamp()` เพื่อให้ขนาดตัวอักษรปรับตามขนาดหน้าจออย่างยืดหยุ่น:
* **Main Title (`.intro h1`):** `font: 500 clamp(4.2rem, 10.5vw, 10rem)/.82 "Manrope"`
* **Speaker Name (`.card-copy h2`):** `font: 500 clamp(1.7rem, 2.5vw, 2.7rem) "Manrope"`
* **Modal Speaker Title (`.modal-copy h2`):** `font: 600 clamp(3.4rem, 7vw, 7rem)/.84 "Manrope"`

---

## 4. ปรัชญาการโต้ตอบและ Micro-Interactions (Interaction Guidelines)

### 🕹️ 4.1 เอฟเฟกต์ 3D Perspective Card Tilt
- เมื่อผู้ใช้เลื่อนเมาส์บนการ์ดวิทยากร ฟังก์ชัน `tiltCard` ใน [App.tsx](file:///C:/ComSciWork/src/App.tsx) จะคำนวณตำแหน่งเมาส์ในพิกัดแกน X และ Y
- ส่งค่าไปยัง CSS Custom Properties: `--rx` (แกน X: -3.5deg ถึง +3.5deg), `--ry` (แกน Y: -4deg ถึง +4deg)
- การ์ดจะเอียงตามมุมมอง Perspective แบบ 3 มิติ และมีแสงสะท้อนเรเดียลตามเคอร์เซอร์ (`--mx`, `--my`)
- ภาพถ่ายขาวดำจะค่อยๆ สลับเป็นภาพสีอย่างนุ่มนวล พร้อมแสดงปุ่มแคปซูล `View profile ↗`

### 🪟 4.2 ระบบ Pop-up Modal (SpeakerModal)
- **การเปิด (Entrance):**
  - ตัวพื้นหลัง Backdrop เกิดแอนิเมชัน Fade-in พร้อมเบลอฉากหลัง 12px (`backdrop-filter: blur(12px)`)
  - หน้าต่างแผงควบคุมเลื่อนเข้าจากขอบขวา (`panel-in`) ด้วย `cubic-bezier(.16, 1, .3, 1)`
  - สั่ง `document.body.classList.add("modal-open")` เพื่อล็อกการเลื่อนหน้าจอพื้นหลัง
- **การปิด (Exit & Dismissal):**
  - มีกลไกหน่วงเวลา 620ms (`closeTimer`) เพื่อให้แอนิเมชัน `panel-out` และ `fade-out` ทำงานจนเสร็จสมบูรณ์ ก่อนที่จะถอด Component ออกจาก DOM
  - ปุ่มปิด (Close Button) มีเอฟเฟกต์หมุน 90 องศา และเปลี่ยนเป็นสี Accent เมื่อ Hover

### 🌊 4.3 Vision Banner Parallax & Marquee Ticker
- ตรวจจับเมื่อผู้ใช้เลื่อนมาถึงส่วนแบนเนอร์ด้วย `IntersectionObserver`
- ปรับตำแหน่งรูปภาพแบบ Parallax ตามอัตราส่วนการเลื่อนหน้าจอผ่าน `requestAnimationFrame`
- แสดงแถบ Ticker ข้อความวิ่งอัตโนมัติแบบวนลูปไร้รอยต่อ

---

## 5. การเข้าถึงและการรองรับอุปกรณ์ (Accessibility & Responsive Rules)

- **Keyboard Focus Management:** ปุ่มและลิงก์มีสถานะ `:focus-visible` ที่ชัดเจนด้วยเส้นขอบสี Accent โทนสว่าง
- **Motion Accessibility (`prefers-reduced-motion`):**
  - มีการดักจับ Media Query หากผู้ใช้ตั้งค่าลดการเคลื่อนไหว ระบบจะปิด Parallax, 3D Tilt และลดความเร็วของแอนิเมชันทั้งหมดลงเหลือ 0.01ms โดยอัตโนมัติ
- **Mobile Responsive Layout:**
  - บนหน้าจอความกว้างน้อยกว่า 760px: การ์ดวิทยากรจะจัดเรียงเป็น 1 คอลัมน์เต็มความกว้าง
  - Pop-up Modal จะปรับขยายเต็มหน้าจอ 100% เพื่อให้อ่านและสัมผัสได้สะดวกที่สุด
