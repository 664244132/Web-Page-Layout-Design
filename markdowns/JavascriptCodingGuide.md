# ⚡ สรุปแนวทางการเขียน JavaScript / ECMAScript สมัยใหม่ (Modern JS Standards)

เอกสารนี้รวบรวมหลักการและข้อกำหนดในการเขียนโค้ด **Modern JavaScript (ES2024+) / TypeScript** สำหรับโปรเจกต์ **Speaker Showcase Website (North Assembly)**

---

## 1. การตรวจสอบความเท่ากันอย่างเข้มงวด (Strict Equality `===`)

- **[MUST]:** ใช้ `===` และ `!==` เสมอ หลีกเลี่ยงการใช้ `==` หรือ `!=` เพื่อป้องกันบั๊กจากการแปลงประเภทข้อมูลอัตโนมัติ (Type Coercion):

```typescript
// ❌ หลีกเลี่ยง
if (route == "/e-report") { ... }

// ✅ ถูกต้อง
if (route === "/e-report") { ... }
```

---

## 2. การใช้งาน Modern Operators: `??` และ `?.`

- **Optional Chaining (`?.`):**
  - ใช้สำหรับเข้าถึงคุณสมบัติของ Object หรือ Ref ที่อาจเป็น `null` หรือ `undefined` ได้อย่างปลอดภัยโดยไม่เกิด Runtime Crash:
    ```typescript
    closeButton.current?.focus();
    ```
- **Nullish Coalescing (`??`):**
  - ใช้กำหนดค่าเริ่มต้นเฉพาะกรณีที่ตัวแปรเป็น `null` หรือ `undefined` (ไม่รวมถึง `0` หรือ `""`):
    ```typescript
    const duration = reduceMotion ? 0 : (customDuration ?? 620);
    ```

---

## 3. หลักการรักษาความไม่เปลี่ยนแปลงของข้อมูล (Immutability in React)

- ในการทำงานกับ React State **ห้ามเปลี่ยนแปลง (Mutate) ข้อมูลเดิมโดยตรง**:
  - การคัดลอก Array: ใช้ Spread Operator `[...originalArray]`
  - การวนลูปเพื่อแสดงผล: ใช้ `.map()`
  - การกรองข้อมูล: ใช้ `.filter()`
  - ห้ามใช้ `.push()`, `.splice()`, หรือการแก้ไขค่าใน Object โดยตรง

---

## 4. การจัดการแอนิเมชันและตัวจับเวลาอย่างมีประสิทธิภาพ

- **`requestAnimationFrame`:** ใช้งานร่วมกับ `cancelAnimationFrame` เพื่อหน่วงและซิงก์รอบการคำนวณเข้ากับ Refresh Rate ของจอภาพ:
  ```typescript
  cancelAnimationFrame(frameId.current);
  frameId.current = requestAnimationFrame(() => {
    // คำนวณพิกัดการ์ด
  });
  ```
- **การล้าง Timer (`clearTimeout`):**
  - ทุกครั้งที่ใช้ `setTimeout` ต้องบันทึก ID ไว้ใน Ref และสั่ง `clearTimeout` เมื่อ Component ถูก Unmount เสมอ

---

## 5. การใช้ Destructuring และ Arrow Functions

- แกะค่า Props และตัวแปรด้วย Object Destructuring เพื่อความกระชับ:
  ```typescript
  export function SpeakerModal({ speaker, onClose }: SpeakerModalProps) { ... }
  ```
- นิยามฟังก์ชัน Callback สั้นๆ ด้วย Arrow Functions:
  ```typescript
  const syncRoute = () => setRoute(window.location.pathname);
  ```