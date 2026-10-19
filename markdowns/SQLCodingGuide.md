# 📘 โครงสร้างโมเดลข้อมูลและชุดข้อมูล (Data Model & Dataset Architecture Guide)

> 📌 **หมายเหตุการปรับปรุงสถาปัตยกรรม (Legacy Database Archived):**  
> สถาปัตยกรรมฐานข้อมูลเดิม (PostgreSQL 18.4 ผ่าน PDO) ได้ถูกยกเลิกและจัดเก็บเข้าสู่สถานะ Archive อย่างสมบูรณ์ เนื่องจากระบบปัจจุบันทำงานในรูปแบบ Pure Frontend ที่จัดการข้อมูลผ่าน **Type-safe Data Model และ Mock Datasets** ภายในเครื่อง  
> เอกสารฉบับนี้จึงได้รับการปรับปรุงเพื่อใช้เป็น **คู่มือโครงสร้างโมเดลข้อมูลวิทยากรและการจัดการ Dataset** ของระบบปัจจุบัน

---

## 1. การนิยามโครงสร้างโมเดลข้อมูล (Speaker Data Model)

โมเดลข้อมูลของวิทยากรถูกประกาศอย่างรัดกุมใน [src/types/speaker.ts](file:///C:/ComSciWork/src/types/speaker.ts):

```typescript
export type Speaker = {
  name: string;      // ชื่อ-นามสกุล เช่น "Maya Chen"
  role: string;      // บทบาทหน้าที่ เช่น "FUTURIST & AUTHOR"
  topic: string;     // หัวข้อบรรยายหลัก เช่น "Designing Tomorrow"
  image: string;     // URL รูปภาพความละเอียดสูงสำหรับ Hero และ Card
  bio: string;       // ชีวประวัติและแนวคิดเชิงลึก
  work: string[];    // รายการผลงานเด่นหรือรางวัลที่ได้รับการยอมรับ (Array 3 ชิ้น)
  accent: string;    // รหัสสี Hex ประจำตัวสำหรับ Modal Theme เช่น "#ff5c35"
};
```

---

## 2. การจัดการชุดข้อมูลใน [src/data/speakers.ts](file:///C:/ComSciWork/src/data/speakers.ts)

### 2.1 คลังรูปภาพความละเอียดสูง (`photos`)
ชุดรูปภาพถูกคัดสรรจาก Unsplash เพื่อให้ได้คุณภาพระดับพรีเมียมและขนาดเหมาะสม (1400px, quality 85, auto format):
- `photos[0]` ถึง `photos[4]`: ภาพบุคคลของวิทยากรแต่ละคน
- `photos[5]`: ภาพแบนเนอร์สำหรับส่วน Vision Banner
- `photos[6]` และ `photos[7]`: ภาพบรรยากาศงานสัมมนาสำหรับแกลเลอรี

### 2.2 อัลกอริทึมเลือกภาพแกลเลอรีแบบไดนามิก (Gallery Mapping Logic)
ใน [SpeakerModal.tsx](file:///C:/ComSciWork/src/components/SpeakerModal.tsx) แกลเลอรี 3 ภาพของวิทยากรแต่ละคนจะถูกจัดเรียงอัตโนมัติด้วยสูตร Modulo (`%`) เพื่อให้วิทยากรแต่ละคนได้ชุดภาพที่ไม่ซ้ำกัน:
```typescript
const speakerIndex = speakers.indexOf(speaker);
const gallery = [
  speaker.image,
  photos[(speakerIndex + 5) % photos.length],
  photos[(speakerIndex + 6) % photos.length],
];
```

---

## 3. ข้อมูลวิทยากรทั้ง 5 คน (Dataset Verification)

```typescript
export const speakers: Speaker[] = [
  {
    name: "Maya Chen",
    role: "FUTURIST & AUTHOR",
    topic: "Designing Tomorrow",
    image: photos[0],
    bio: "Maya maps the human choices behind emerging technology, helping leaders build futures people genuinely want to inhabit.",
    work: ["The Humane Machine", "MIT Media Lab Fellow", "Fast Company Visionary"],
    accent: "#ff5c35",
  },
  {
    name: "Elias North",
    role: "CLIMATE ARCHITECT",
    topic: "Cities That Breathe",
    image: photos[1],
    bio: "Elias works at the intersection of architecture, ecology, and civic life to make dense cities healthier and more resilient.",
    work: ["Oslo Green Loop", "Living Systems Studio", "AIA Innovation Medal"],
    accent: "#c8ff62",
  },
  {
    name: "Amara Okafor",
    role: "CREATIVE DIRECTOR",
    topic: "Culture Is the Brief",
    image: photos[2],
    bio: "Amara creates cultural movements for global brands and champions a more expansive, representative creative industry.",
    work: ["Nike Future Voices", "D&AD Black Pencil", "New Museum Council"],
    accent: "#b69cff",
  },
  {
    name: "Julian Reyes",
    role: "AI RESEARCHER",
    topic: "Beyond Intelligence",
    image: photos[3],
    bio: "Julian translates frontier AI research into clear choices for teams building safe, useful, and accountable products.",
    work: ["Stanford HAI", "Open Systems Project", "Nature 10"],
    accent: "#73cfff",
  },
  {
    name: "Noor Al-Sayed",
    role: "SOCIAL ENTREPRENEUR",
    topic: "The Radical Local",
    image: photos[4],
    bio: "Noor builds community-owned ventures that prove the most scalable ideas often begin with deep local knowledge.",
    work: ["Common Ground Fund", "UN Young Leader", "Ashoka Fellow"],
    accent: "#ffd166",
  },
];
```

---

## 4. กฎเหล็กการจัดการฐานข้อมูลในอนาคต (Rule 10 Compliance)

> 🔒 **[RULE 10] ข้อกำหนดเข้มงวด:**  
> หากในอนาคตมีความต้องการเชื่อมต่อฐานข้อมูลภายนอก (เช่น PostgreSQL, MySQL, หรือ Supabase) **AI Agents และนักพัฒนาห้ามรันคำสั่งแก้ไข Table หรือ Insert Data ลงฐานข้อมูลเองโดยพลการ** จะต้องจัดเตรียมสคริปต์ SQL ที่ปลอดภัย แล้วนำมาให้ผู้ใช้เป็นผู้ตรวจสอบและรันเองเสมอ