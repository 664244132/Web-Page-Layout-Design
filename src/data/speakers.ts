import type { Speaker } from "../types/speaker"
import {
  image1Base64,
  image2Base64,
  image3Base64,
  image4Base64,
  image5Base64,
  image6Base64,
} from "./speakerImages"

/**
 * แบนเนอร์ภาพรวมขนาดใหญ่ของงานสัมมนา (Section 3)
 * ใช้ภาพ img/1.jpg พร้อม Base64 fallback ที่การันตีการโหลด 100%
 */
export const bannerPhoto: string = image1Base64
export const bannerFallbacks: string[] = [
  image1Base64,
  "/img/1.jpg",
  "img/1.jpg",
  "/src/img/1.jpg",
  "src/img/1.jpg",
  "/1.jpg",
  "1.jpg",
]

/**
 * รายละเอียดของวิทยากรทั้ง 5 ท่าน (Section 2)
 * แมปรูปภาพตาม Requirement:
 * 1. นาย พงศกร บุษษะ -> 5.jpg ("ระบบร้านค้าชุมชนข้างทางด้วยระบบเเผนที่")
 * 2. นาย ภูริเดช ตะโกมา -> 4.jpg ("การพัฒนาระบบจำหน่ายมือถือออนไลน์")
 * 3. นาย กมลภพ อร่ามรักษ์ -> 3.jpg ("ระบบคำนวณค่าเเรงคนงานมะพร้าว")
 * 4. นาย จักรกฤษณ์ นาคสุก -> 2.jpg ("ระบบบริการเช่ารถออนไลน์")
 * 5. นางสาว ณฐกร เจะรัมย์ -> 1.jpg ("ระบบจัดการร้านอาหารสำหรับเจ้าของร้านรายเดี่ยว")
 *
 * * ลบรูปภาพรวม 3 รูปออกจาก Modal แล้ว
 * * ลบ Selected work / recognition (The Humane Machine, MIT Media Lab Fellow, Fast Company Visionary) ออกจากทุกคนแล้ว
 */
export const speakers: Speaker[] = [
  {
    id: 1,
    name: "นาย พงศกร บุษษะ",
    nickname: "เปา",
    role: "วิทยากร",
    topic: "ระบบร้านค้าชุมชนข้างทางด้วยระบบเเผนที่",
    image: image5Base64,
    imageNum: 5,
    fallbackImages: [
      image5Base64,
      "/img/5.jpg",
      "img/5.jpg",
      "/src/img/5.jpg",
      "src/img/5.jpg",
      "/5.jpg",
      "5.jpg",
    ],
    bio: "นักศึกษาสาขาวิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี ผู้วิจัยและพัฒนานวัตกรรม 'ระบบร้านค้าชุมชนข้างทางด้วยระบบแผนที่' (Khang Tang Maps) เพื่อส่งเสริมเศรษฐกิจฐานราก ช่วยให้ผู้บริโภคค้นพบร้านค้าท้องถิ่นริมทางได้อย่างแม่นยำ สะดวกรวดเร็ว ผ่านอินเทอร์เฟซที่เข้าใจง่าย",
    work: [],
    accent: "#38bdf8",
    tags: ["Map System", "Community Tech", "UX Research", "Local Economy"],
  },
  {
    id: 2,
    name: "นาย ภูริเดช ตะโกมา",
    nickname: "ภู",
    role: "วิทยากร",
    topic: "การพัฒนาระบบจำหน่ายมือถือออนไลน์",
    image: image4Base64,
    imageNum: 4,
    fallbackImages: [
      image4Base64,
      "/img/4.jpg",
      "img/4.jpg",
      "/src/img/4.jpg",
      "src/img/4.jpg",
      "/4.jpg",
      "4.jpg",
    ],
    bio: "นักศึกษาสาขาวิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี ผู้เชี่ยวชาญการออกแบบสถาปัตยกรรมระบบพาณิชย์อิเล็กทรอนิกส์ (E-Commerce Platform) สำหรับร้านค้าจำหน่ายมือถือและอุปกรณ์เสริมออนไลน์ มุ่งเน้นประสบการณ์การช้อปปิ้งที่ราบรื่น ปลอดภัย และระบบจัดการสต็อกสินค้าแบบเรียลไทม์",
    work: [],
    accent: "#818cf8",
    tags: ["E-Commerce", "Mobile Store", "Full Stack", "Payment Gateway"],
  },
  {
    id: 3,
    name: "นาย กมลภพ อร่ามรักษ์",
    nickname: "ภพ",
    role: "วิทยากร",
    topic: "ระบบคำนวณค่าเเรงคนงานมะพร้าว",
    image: image3Base64,
    imageNum: 3,
    fallbackImages: [
      image3Base64,
      "/img/3.jpg",
      "img/3.jpg",
      "/src/img/3.jpg",
      "src/img/3.jpg",
      "/3.jpg",
      "3.jpg",
    ],
    bio: "นักศึกษาสาขาวิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี ผู้พัฒนาระบบคำนวณค่าแรงคนงานสวนมะพร้าว (Coconut Labor Wage Calculation System) นวัตกรรมดิจิทัลเพื่อแก้ปัญหาความซับซ้อนในการคำนวณค่าจ้างรายวันและรายชิ้นงาน ช่วยให้เจ้าของสวนและคนงานทำงานร่วมกันอย่างโปร่งใส ตรวจสอบได้",
    work: [],
    accent: "#34d399",
    tags: ["AgriTech", "Payroll System", "Web Application", "Smart Farming"],
  },
  {
    id: 4,
    name: "นาย จักรกฤษณ์ นาคสุก",
    nickname: "เกม",
    role: "วิทยากร",
    topic: "ระบบบริการเช่ารถออนไลน์",
    image: image2Base64,
    imageNum: 2,
    fallbackImages: [
      image2Base64,
      "/img/2.jpg",
      "img/2.jpg",
      "/src/img/2.jpg",
      "src/img/2.jpg",
      "/2.jpg",
      "2.jpg",
    ],
    bio: "นักศึกษาสาขาวิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี ผู้สร้างสรรค์และออกแบบระบบบริการเช่ารถออนไลน์ (Online Car Rental Platform) ที่เน้นความง่ายดายในการจอง การตรวจสอบสถานะยานพาหนะแบบเรียลไทม์ และการยืนยันตัวตนที่ปลอดภัยตามมาตรฐาน User Experience สมัยใหม่",
    work: [],
    accent: "#f472b6",
    tags: ["Rental Service", "Booking Engine", "UX Flow", "Fleet Management"],
  },
  {
    id: 5,
    name: "นางสาว ณฐกร เจะรัมย์",
    nickname: "กิ๊ฟ",
    role: "วิทยากร",
    topic: "ระบบจัดการร้านอาหารสำหรับเจ้าของร้านรายเดี่ยว",
    image: image1Base64,
    imageNum: 1,
    fallbackImages: [
      image1Base64,
      "/img/1.jpg",
      "img/1.jpg",
      "/src/img/1.jpg",
      "src/img/1.jpg",
      "/1.jpg",
      "1.jpg",
    ],
    bio: "นักศึกษาสาขาวิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี ผู้สร้างสรรค์ระบบบริหารจัดการร้านอาหารสำหรับเจ้าของร้านรายเดี่ยว (Solo-Owner Restaurant POS & Management) ที่ลดขั้นตอนที่ยุ่งยากในการรับออร์เดอร์ ออกบิล และวิเคราะห์ยอดขาย ให้ทำงานเสร็จได้ด้วยตัวคนเดียวผ่านสมาร์ตโฟนหรือแท็บเล็ต",
    work: [],
    accent: "#fbbf24",
    tags: [
      "Restaurant POS",
      "Solo Operator",
      "UX Simplification",
      "Business Insights",
    ],
  },
]

export default speakers
