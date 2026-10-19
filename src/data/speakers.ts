import type { Speaker } from "../types/speaker"
import speakerImg1 from "../img/5.jpg"
import speakerImg2 from "../img/4.jpg"
import speakerImg3 from "../img/3.jpg"
import speakerImg4 from "../img/2.jpg"
import speakerImg5 from "../img/1.jpg"
import bannerImg from "../img/6.jpg"

export const photos: string[] = [
  speakerImg1,
  speakerImg2,
  speakerImg3,
  speakerImg4,
  speakerImg5,
  bannerImg,
]

export const speakers: Speaker[] = [
  {
    name: "นาย พงศกร บุษษะ",
    role: "วิทยากร",
    topic: "ระบบร้านค้าชุมชนข้างทางด้วยระบบเเผนที่",
    image: speakerImg1,
    bio: "นักศึกษาวิทยาการคอมพิวเตอร์ชั้นปีที่ 4 ผู้พัฒนาและออกแบบระบบร้านค้าชุมชนข้างทางด้วยระบบแผนที่ เพื่อยกระดับเศรษฐกิจชุมชนและการค้นหาร้านค้าท้องถิ่น",
    work: [],
    accent: "#ff5c35",
  },
  {
    name: "นาย ภูริเดช ตะโกมา",
    role: "วิทยากร",
    topic: "การพัฒนาระบบจำหน่ายมือถือออนไลน์",
    image: speakerImg2,
    bio: "นักศึกษาวิทยาการคอมพิวเตอร์ชั้นปีที่ 4 ผู้เชี่ยวชาญการออกแบบและพัฒนาระบบพาณิชย์อิเล็กทรอนิกส์สำหรับจำหน่ายมือถือออนไลน์",
    work: [],
    accent: "#c8ff62",
  },
  {
    name: "นาย กมลภพ อร่ามรักษ์",
    role: "วิทยากร",
    topic: "ระบบคำนวณค่าเเรงคนงานมะพร้าว",
    image: speakerImg3,
    bio: "นักศึกษาวิทยาการคอมพิวเตอร์ชั้นปีที่ 4 ผู้พัฒนานวัตกรรมระบบคำนวณค่าแรงคนงานสวนมะพร้าว ช่วยเพิ่มความแม่นยำและโปร่งใสในการบริหารจัดการการเกษตร",
    work: [],
    accent: "#b69cff",
  },
  {
    name: "นาย จักรกฤษณ์ นาคสุก",
    role: "วิทยากร",
    topic: "ระบบบริการเช่ารถออนไลน์",
    image: speakerImg4,
    bio: "นักศึกษาวิทยาการคอมพิวเตอร์ชั้นปีที่ 4 ผู้สร้างสรรค์แพลตฟอร์มระบบบริการเช่ารถออนไลน์ เพื่อประสบการณ์การเดินทางที่สะดวก ปลอดภัย และไร้รอยต่อ",
    work: [],
    accent: "#73cfff",
  },
  {
    name: "นางสาว ณฐกร เจะรัมย์",
    role: "วิทยากร",
    topic: "ระบบจัดการร้านอาหารสำหรับเจ้าของร้านรายเดี่ยว",
    image: speakerImg5,
    bio: "นักศึกษาวิทยาการคอมพิวเตอร์ชั้นปีที่ 4 ผู้วิจัยและพัฒนาระบบจัดการร้านอาหารที่ตอบโจทย์เจ้าของร้านรายเดี่ยวได้อย่างคล่องตัวและมีประสิทธิภาพสูงสุด",
    work: [],
    accent: "#ffd166",
  },
]
