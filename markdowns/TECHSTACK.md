# 🛠️ เทคโนโลยีที่ใช้ในโปรเจกต์ (Technology Stack & Roles)

เอกสารนี้ระบุรายการเทคโนโลยี เวอร์ชัน บทบาทหน้าที่ และเหตุผลในการเลือกใช้งานเครื่องมือสำหรับโปรเจกต์ **Speaker Showcase Website (North Assembly)**

---

## 1. รายการเทคโนโลยีหลัก (Core Technology Stack)

| ส่วนประกอบ | เทคโนโลยีที่เลือกใช้ | รายละเอียดเวอร์ชัน / บทบาทหน้าที่ |
|---|---|---|
| **UI Library / Framework** | **React** | **React 19.0.0** (React DOM 19) สถาปัตยกรรม Functional Component ร่วมกับ React Hooks (`useState`, `useEffect`, `useRef`, `useCallback`) |
| **Type System** | **TypeScript** | **TypeScript 5.7+** เสริมสร้างความปลอดภัยทางชนิดข้อมูล (Type-Safety) และสัญญาระหว่าง Component |
| **Styling Framework** | **Tailwind CSS v4** | **Tailwind CSS 4.0+** ผ่าน `@tailwindcss/vite` นำเข้าด้วย `@import "tailwindcss";` รวดเร็วและไม่ต้องพึ่งพาไฟล์คอนฟิก PostCSS |
| **Custom Styling & FX** | **Modern CSS3** | 3D Perspectives, Keyframe Animations, Glassmorphism Backdrop Blur, และ CSS Custom Properties |
| **Build & Bundler Tool** | **Vite** | **Vite 8.0+** เครื่องมือคอมไพล์และ Build Pipeline ประสิทธิภาพสูง พร้อม Fast Refresh (HMR) |
| **React Compiler Plugin** | **@vitejs/plugin-react** | ปลั๊กอินอย่างเป็นทางการของ Vite สำหรับแปลง JSX/TSX |
| **Code Formatter** | **oxfmt** | เครื่องมือจัดระเบียบและฟอร์แมตโค้ดความเร็วสูงพิเศษจาก Rust Ecosystem |
| **Web Fonts** | **Local Self-hosted Fonts** | ฟอนต์ระดับพรีเมียม: **"Manrope"** และ **"DM Sans"** โหลดแบบ Local WOFF2 พร้อม Google CDN Fallback |

---

## 2. บทบาทและความรับผิดชอบของแต่ละเทคโนโลยี (Technology Roles)

### ⚛️ 1. React 19 (Functional Components & Hooks)
- **หน้าที่หลัก:**
  - จัดการโครงสร้าง Component แบบแยกส่วน (Modular Components) ได้แก่ `SpeakerModal`, `VisionBanner`, `EReportTeaser`, `EReportPage` และ `Arrow`
  - จัดการสถานะการเปิด/ปิด Pop-up Modal ด้วย `useState`
  - ติดตามและประสานงานเส้นทางแบบ Single Page Application (SPA Routing) ด้วย History API
- **เหตุผลที่เลือกใช้:**
  - React 19 มอบประสิทธิภาพการเรนเดอร์ที่รวดเร็ว โครงสร้างโค้ดแบบ Declarative และคอมโพเนนต์ที่นำกลับมาใช้ใหม่ได้สะดวก เหมาะสำหรับ UI เชิงโต้ตอบสูง

### 🔷 2. TypeScript 5.7 (Strict Typing)
- **หน้าที่หลัก:**
  - กำหนดโครงสร้างข้อมูล `Speaker` Model เพื่อป้องกันการส่งต่อค่าที่ผิดพลาด
  - ตรวจสอบชนิดข้อมูลของ Events เช่น `MouseEvent<HTMLButtonElement>`, `KeyboardEvent`
  - ตรวจสอบไวยากรณ์และป้องกันบั๊กตั้งแต่ขั้นตอนการพัฒนา (Compile-time Safety)
- **เหตุผลที่เลือกใช้:**
  - ช่วยให้โปรเจกต์ดูแลรักษาง่าย (Maintainability) มีเอกสารกำกับชนิดข้อมูลในตัว (Self-documenting types) เหมาะแก่การพัฒนาแบบมืออาชีพ

### 🎨 3. Tailwind CSS v4 & Custom Modern CSS
- **หน้าที่หลัก:**
  - **Tailwind CSS v4:** จัดการเลย์เอาต์พื้นฐาน ความยืดหยุ่นของ Grid และ Responsive Design
  - **Custom CSS (`src/index.css`):** ควบคุมเอฟเฟกต์เฉพาะทางขั้นสูง เช่น 3D Tilt Card (`rotateX`, `rotateY`), แอนิเมชัน Glint บนตัวอักษร Outline, Ambient Glow Blurs, และ Parallax Scroll
- **จุดเด่น:**
  - Tailwind CSS v4 ใช้งานง่ายด้วยการคอมไพล์ผ่าน CSS-First Engine โดยไม่จำเป็นต้องมีไฟล์ `tailwind.config.js` แยกต่างหาก

### ⚡ 4. Vite 8 (Next-Generation Build Tool)
- **หน้าที่หลัก:**
  - ให้บริการเซิร์ฟเวอร์จำลองขณะพัฒนา (Dev Server) พร้อม Hot Module Replacement ที่ตอบสนองในระดับมิลลิวินาที
  - บิลด์ไฟล์ Production Bundle ออกมาเป็น Static Assets ขนาดเล็กที่โหลดเร็วและทำ Browser Caching ได้เต็มที่
- **คำสั่งสำคัญ:**
  ```bash
  npm run dev      # เริ่มต้นเซิร์ฟเวอร์พัฒนา
  npm run build    # บิลด์โปรเจกต์สำหรับ Production
  npm run preview  # ดูตัวอย่างผลลัพธ์ Production Build
  ```

---

## 3. สิ่งที่อยู่นอกขอบเขตของโปรเจกต์ปัจจุบัน (Excluded Legacy Stack)

เนื่องจากระบบปัจจุบันได้รับการพัฒนาขึ้นใหม่ในรูปแบบ Modern React Single-Page Application เทคโนโลยีต่อไปนี้จึง **ไม่มีการใช้งานในโปรเจกต์นี้อีกต่อไป**:
- ❌ **PHP (Procedural / OOP):** ไม่ได้ใช้งาน (ใช้ React Component ฝั่งหน้าบ้านแทน)
- ❌ **PostgreSQL / MySQL / Apache XAMPP:** ไม่ได้ใช้งาน (ข้อมูลวิทยากรถูกจัดเก็บในรูปแบบ Type-safe Dataset)
- ❌ **Gulp Build Pipeline:** ไม่ได้ใช้งาน (แทนที่ด้วย Vite 8)
- ❌ **Vanilla JavaScript (ES5/ES6 ไม่ผ่าน Build):** แทนที่ด้วย TypeScript 5.7
