/**
 * ข้อมูลโครงสร้างของวิทยากร (Speaker Model)
 * รองรับ Type Safety 100% ปราศจาก any ตามมาตรฐาน TypeScript 5.7+
 */
export type Speaker = {
  id: number
  name: string
  role: string
  topic: string
  image: string
  imageNum: number
  fallbackImages: string[]
  bio: string
  work: string[]
  accent: string
  nickname: string
  tags: string[]
}
