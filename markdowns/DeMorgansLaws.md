# 🚨 Project Rules: De Morgan's Laws & Early Return

**สถานะ:** บังคับใช้ (Mandatory)  
**เป้าหมาย:** บังคับให้ AI Agents และนักพัฒนาทุกคนในโปรเจกต์นี้ เขียนโค้ดที่คลีน อ่านง่าย โครงสร้างแบนราบ (Flat) และไม่มีการปฏิเสธซ้อนกัน ภายใต้สถาปัตยกรรม **React 19 + TypeScript 5.7**

---

## 📜 กฎข้อบังคับที่ 1: De Morgan's Laws (การจัดการเงื่อนไข)

**ห้าม**เขียนเงื่อนไขที่มีการใช้ NOT (`!`) ครอบวงเล็บของนิพจน์ทางตรรกศาสตร์ (เช่น `!(A && B)` หรือ `!(A || B)`) หากพบโครงสร้างแบบนี้ในโค้ด **คุณต้องทำการ Refactor โดยใช้กฎของ De Morgan ทันที**

### กฎย่อย 1.1: ห้ามใช้ `!(A && B)`
เมื่อพบเงื่อนไขรูปแบบ `!(A && B)` **ต้องแปลงเป็น** `!A || !B` เสมอ

### กฎย่อย 1.2: ห้ามใช้ `!(A || B)`
เมื่อพบเงื่อนไขรูปแบบ `!(A || B)` **ต้องแปลงเป็น** `!A && !B` เสมอ

> [!IMPORTANT]
> **คำสั่งสำหรับ AI Agents**: ก่อนทำการ Submit โค้ด, เสนอแนวทางแก้ไข, หรือ Refactor โค้ด ให้สแกนเงื่อนไข `if-else` ทุกครั้ง หากพบการละเมิดกฎนี้ ให้จัดการแปลง (Distribute) เครื่องหมาย `!` เข้าไปข้างในวงเล็บโดยอัตโนมัติ

### 🛠 กฎการกลับเครื่องหมาย (Operator Inversion)
เวลาที่กระจาย `!` เข้าไปหาตัวแปรหรือนิพจน์ **คุณต้องกลับด้านเครื่องหมายเปรียบเทียบ** ตามกฎตายตัวด้านล่างนี้:

| เมื่อเจอเครื่องหมายนี้... | ...ต้องถูกเปลี่ยนเป็นสิ่งนี้ |
|---|---|
| `===` (เท่ากับ) | `!==` (ไม่เท่ากับ) |
| `!==` (ไม่เท่ากับ) | `===` (เท่ากับ) |
| `>` (มากกว่า) | `<=` (น้อยกว่าหรือเท่ากับ) |
| `<` (น้อยกว่า) | `>=` (มากกว่าหรือเท่ากับ) |
| `>=` (มากกว่าหรือเท่ากับ) | `<` (น้อยกว่า) |
| `<=` (น้อยกว่าหรือเท่ากับ) | `>` (มากกว่า) |

---

## 🚀 กฎข้อบังคับที่ 2: Early Return Pattern (การจัดการ Flow)

**Early Return** (บางครั้งใช้ร่วมกับแนวคิด Guard Clause) คือเทคนิคการสั่ง `return` เพื่อออกจากฟังก์ชันทันทีเมื่อเข้าเงื่อนไขข้อผิดพลาดหรือไม่ตรงเงื่อนไข 

**ห้าม** ใช้ `if-else` ซ้อนทับกันลึกๆ (Nested If / Arrow Code) หากสามารถดักจับเงื่อนไขที่ไม่ตรงเป้าหมายแล้วออกจากฟังก์ชันก่อนได้ **ต้องทำทันที**

### 💻 ตัวอย่างการบังคับใช้ใน TypeScript / React (Enforced Examples)

#### ❌ ก่อนใช้ Early Return (ห้ามเขียนแบบนี้ — ซ้อนลึก อ่านยาก):
```typescript
function handleSpeakerSelect(speaker: Speaker | null) {
  if (speaker !== null) {
    if (!isClosing) {
      if (speaker.name.length > 0) {
        setSelected(speaker);
        openModal();
      }
    }
  }
}
```

#### ✅ หลังใช้ Early Return และ Guard Clauses (แบนราบ อ่านง่าย สบายตา):
```typescript
function handleSpeakerSelect(speaker: Speaker | null) {
  // ดักจับเงื่อนไขที่ไม่ถูกต้องแล้ว Return ออกทันที
  if (!speaker || isClosing) return;
  if (speaker.name.length === 0) return;

  // Happy Path การทำงานหลัก
  setSelected(speaker);
  openModal();
}
```

### 💻 ตัวอย่างจริงในโปรเจกต์ Speaker Showcase:
ในคอมโพเนนต์ [VisionBanner.tsx](file:///C:/ComSciWork/src/components/VisionBanner.tsx):
```typescript
useEffect(() => {
  const section = sectionRef.current;
  const image = imageRef.current;
  
  // Guard Clause: หากไม่มี Element ให้ Return ออกทันที
  if (!section || !image) return;

  // ทำงานกับ IntersectionObserver ต่อไป...
}, []);
```