# 🟢 Node.js & Toolchain Guide: สภาพแวดล้อมและเครื่องมือพัฒนาโปรเจกต์ Speaker Showcase

เอกสารนี้รวบรวมแนวทางและข้อกำหนดในการจัดการสภาพแวดล้อม **Node.js, Package Managers, Vite 8, และ Toolchain** สำหรับโปรเจกต์ **Speaker Showcase Website (North Assembly)**

---

## 1. สภาพแวดล้อม Node.js และเครื่องมือพัฒนา (Environment & Versions)

- **Node.js Version:** แนะนำ Node.js เวอร์ชัน **v20 LTS หรือ v22+** (รองรับ ECMAScript Modules แบบ Native)
- **การจัดการแพ็กเกจ (Package Managers):**
  - รองรับทั้ง `npm` และ `pnpm` ตามการตั้งค่าใน `.mise.toml`
  - ไฟล์คอนฟิกหลักคือ [package.json](file:///C:/ComSciWork/package.json)

---

## 2. คำสั่งสคริปต์สำหรับการพัฒนา (Project Scripts)

| คำสั่ง (Command) | การทำงาน (Description) |
|---|---|
| **`npm run dev`** | เริ่มต้น Vite Development Server พร้อม Hot Module Replacement (HMR) สำหรับการพัฒนาแบบ Real-time |
| **`npm run build`** | คอมไพล์ TypeScript และบันเดิลโปรเจกต์ด้วย Vite สำหรับ Production สู่โฟลเดอร์ `dist/` |
| **`npm run preview`** | เปิดเซิร์ฟเวอร์จำลองเพื่อทดสอบไฟล์ Production Bundle ที่เพิ่งบิลด์เสร็จ |
| **`npm run format`** | ตรวจสอบและจัดระเบียบฟอร์แมตโค้ดอย่างรวดเร็วด้วย `oxfmt` |

---

## 3. สถาปัตยกรรมปลั๊กอินของ Vite (Vite Configuration)

การตั้งค่าใน [vite.config.ts](file:///C:/ComSciWork/vite.config.ts) ประกอบด้วยปลั๊กอินสำคัญ:
1. **`@vitejs/plugin-react`:** ทำหน้าที่คอมไพล์ JSX/TSX และรองรับ Fast Refresh
2. **`@tailwindcss/vite`:** ปลั๊กอินอย่างเป็นทางการของ Tailwind CSS v4 สำหรับคอมไพล์ Utility Classes แบบ CSS-First
3. **Path Alias (`@`):** กำหนดเส้นทางย่อ `@` ให้ชี้ไปยังโฟลเดอร์ `src/` เพื่อความสะดวกในการ Import โมดูล

---

## 4. มาตรการความปลอดภัยและ Best Practices ของ Toolchain

- **การแยก Script และ Dependency:**
  - แพ็กเกจที่ใช้เฉพาะช่วงเวลาพัฒนา (เช่น `@types/*`, `typescript`, `vite`, `oxfmt`) ต้องติดตั้งใน `devDependencies` เสมอ
  - ห้าม Commit โฟลเดอร์ `node_modules/` หรือ `dist/` ขึ้น Git (ควบคุมผ่าน `.gitignore` และ `.antigravityignore`)
- **การตรวจสอบช่องโหว่ความปลอดภัย:**
  - รันคำสั่ง `npm audit` เป็นประจำเพื่อตรวจสอบความปลอดภัยของ Third-party Packages