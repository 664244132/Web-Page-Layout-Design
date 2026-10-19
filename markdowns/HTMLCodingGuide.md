# 🌐 สรุปหลักการเขียน Semantic HTML ใน React JSX (HTML & Accessibility Standards)

เอกสารนี้รวบรวมหลักการและข้อกำหนดในการเขียน **Semantic HTML / JSX** สำหรับโปรเจกต์ **Speaker Showcase Website (North Assembly)** เพื่อให้โครงสร้างเว็บไซต์มีความถูกต้องตามหลัก Semantic Web, เข้าถึงได้ง่าย (a11y) และเป็นมิตรต่อ SEO

---

## 1. การใช้งานแท็กเชิงความหมาย (Semantic Landmarks)

การจัดวางโครงสร้างหน้าเว็บต้องใช้แท็ก Landmark มาตรฐาน เพื่อให้เทคโนโลยีช่วยเหลือ (เช่น Screen Reader) และ Search Engine เข้าใจโครงสร้างของหน้าเว็บอย่างถูกต้อง:

- **`<main>`:** ครอบเนื้อหาหลักของหน้าเว็บ (ใช้เพียง 1 จุดต่อ 1 หน้า) เช่น ใน [App.tsx](file:///C:/ComSciWork/src/App.tsx) และ [EReportPage.tsx](file:///C:/ComSciWork/src/components/EReportPage.tsx)
- **`<header>`:** ส่วนหัวของหน้าเพจหรือการนำเข้าสู่เนื้อหาสำคัญ
- **`<nav>`:** เมนูนำทางของเว็บไซต์ (`.nav`)
- **`<section>`:** ใช้แบ่งส่วนเนื้อหาที่มีความหมายเฉพาะเจาะจง และควรระบุ `aria-labelledby` กำกับเสมอ
- **`<figure>` และ `<figcaption>`:** ใช้งานคู่กันสำหรับการแสดงภาพถ่ายวิทยากรพร้อมบทบาทหน้าที่
- **`<footer>`:** ส่วนท้ายของหน้าเว็บ

```tsx
// ✅ ตัวอย่างการใช้ Semantic Tag สำหรับภาพและคำบรรยาย
<figure className="hero-image">
  <img src={speaker.image} alt={`${speaker.name} speaking on stage`} />
  <figcaption>{speaker.role}</figcaption>
</figure>
```

---

## 2. มาตรฐานการสร้าง Pop-up Modal ที่เข้าถึงได้ (Accessible Dialog)

เมื่อสร้างกล่องข้อความเตือนหรือ Pop-up Modal ต้องใส่คุณลักษณะ ARIA ให้ครบถ้วน:

```tsx
<div 
  className="modal-shell" 
  role="dialog" 
  aria-modal="true" 
  aria-labelledby="speaker-name"
>
  <button className="modal-backdrop" aria-label="Close speaker profile" onClick={requestClose} />
  <section className="modal-panel">
    <button className="close-button" onClick={requestClose} aria-label="Close">
      <span>Close</span>
      <b aria-hidden="true">×</b>
    </button>
    <h2 id="speaker-name">{speaker.name}</h2>
    {/* เนื้อหา */}
  </section>
</div>
```
- `role="dialog"`: แจ้งให้อุปกรณ์ทราบว่าเป็นหน้าต่างโต้ตอบ
- `aria-modal="true"`: แจ้งให้เทคโนโลยีช่วยเหลือทราบว่าโฟกัสถูกจำกัดอยู่ภายในหน้าต่างนี้
- `aria-labelledby`: เชื่อมโยงชื่อของกล่องโต้ตอบเข้ากับหัวข้อ `<h2>` ภายใน

---

## 3. การใช้งานปุ่มและลิงก์อย่างถูกต้อง (Buttons vs. Links)

- **ใช้ `<button>` เมื่อเป็นการกระทำการ (Action):**
  - เช่น การคลิกเพื่อเปิด Modal, ปิด Modal, สลับสถานะ
  - การ์ดวิทยากรที่สามารถคลิกเพื่อเปิด Pop-up Modal ต้องสร้างด้วยแท็ก `<button>` เสมอ
- **ใช้ `<a>` เมื่อเป็นการเปลี่ยนเส้นทาง (Navigation):**
  - เช่น การข้ามไปยังหน้า `/e-report` หรือการกด Anchor Link ไปยัง `#speakers`

---

## 4. การจัดการไอคอนและองค์ประกอบตกแต่ง (Decorative Elements)

- ไอคอนหรือสัญลักษณ์ที่ทำหน้าที่เพื่อความสวยงามโดยไม่มีผลต่อความหมายของข้อความ (เช่น ลูกศร `↗` หรือจุดคั่น `◆`) ต้องใส่ `aria-hidden="true"` เสมอ เพื่อไม่ให้ Screen Reader อ่านออกเสียงคำที่ไม่จำเป็น:

```tsx
export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
```