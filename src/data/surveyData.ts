/**
 * โครงสร้างข้อมูลสถิติแบบประเมินความพึงพอใจ (Survey Analytics Dataset)
 * มาจากไฟล์: sheets/แบบประเมินความพึงพอ UX_UI 101_ Think Like a User Design Like a Pro (การตอบกลับ).xlsx
 */

export type RatingDistribution = {
  1: number
  2: number
  3: number
  4: number
  5: number
}

export type QuestionStat = {
  title: string
  mean: number
  count: number
  distribution: RatingDistribution
}

export type SpeakerEvaluation = {
  name: string
  nickname: string
  project: string
  mean: number
  questions: QuestionStat[]
}

export type SurveyReport = {
  title: string
  subtitle: string
  totalRespondents: number
  overallMean: number
  percentageSatisfaction: number
  seminarQuestions: QuestionStat[]
  speakerEvaluations: SpeakerEvaluation[]
}

export const surveyData: SurveyReport = {
  title: "UX/UI 101: Think Like a User, Design Like a Pro",
  subtitle: "รายงานผลการประเมินความพึงพอใจและสถิติภาพรวมของผู้เข้าร่วมสัมมนา",
  totalRespondents: 30,
  overallMean: 4.87,
  percentageSatisfaction: 97.4,
  seminarQuestions: [
    {
      title: "เนื้อหาการสัมมนามีความน่าสนใจและสอดคล้องกับหัวข้อ",
      mean: 4.9,
      count: 30,
      distribution: { 1: 0, 2: 1, 3: 0, 4: 0, 5: 29 },
    },
    {
      title: "เนื้อหามีความชัดเจนและช่วยให้เข้าใจเกี่ยวกับการออกแบบ UX/UI มากขึ้น",
      mean: 4.87,
      count: 30,
      distribution: { 1: 0, 2: 1, 3: 0, 4: 1, 5: 28 },
    },
    {
      title: "ความรู้และเทคนิคที่ได้รับ สามารถนำไปประยุกต์ใช้ในการเรียนและการทำโปรเจกต์ได้",
      mean: 4.87,
      count: 30,
      distribution: { 1: 0, 2: 1, 3: 0, 4: 1, 5: 28 },
    },
    {
      title: "การสัมมนาช่วยให้เห็นแนวทางในการพัฒนาเว็บแอปพลิเคชัน",
      mean: 4.87,
      count: 30,
      distribution: { 1: 0, 2: 1, 3: 0, 4: 1, 5: 28 },
    },
    {
      title: "โดยภาพรวมมีความพึงพอใจต่อการจัดสัมมนาครั้งนี้",
      mean: 4.87,
      count: 30,
      distribution: { 1: 0, 2: 1, 3: 0, 4: 1, 5: 28 },
    },
  ],
  speakerEvaluations: [
    {
      name: "นาย พงศกร บุษษะ",
      nickname: "เคน",
      project: "ระบบร้านค้าชุมชนข้างทางด้วยระบบแผนที่",
      mean: 4.81,
      questions: [
        {
          title: "เนื้อหามีความน่าสนใจและเข้าใจง่าย",
          mean: 4.8,
          count: 30,
          distribution: { 1: 0, 2: 1, 3: 0, 4: 3, 5: 26 },
        },
        {
          title: "การนำเสนอมีความชัดเจนและเป็นลำดับ",
          mean: 4.8,
          count: 30,
          distribution: { 1: 0, 2: 1, 3: 0, 4: 3, 5: 26 },
        },
        {
          title: "อธิบายโปรเจกต์และแนวคิดได้อย่างเหมาะสม",
          mean: 4.87,
          count: 30,
          distribution: { 1: 0, 2: 1, 3: 0, 4: 1, 5: 28 },
        },
        {
          title: "โปรเจกต์มีประโยชน์และสามารถนำความรู้ไปประยุกต์ใช้ได้",
          mean: 4.77,
          count: 30,
          distribution: { 1: 0, 2: 1, 3: 0, 4: 4, 5: 25 },
        },
        {
          title: "ผู้บรรยายสามารถสื่อสารและตอบคำถามได้อย่างเหมาะสม",
          mean: 4.83,
          count: 30,
          distribution: { 1: 0, 2: 1, 3: 0, 4: 2, 5: 27 },
        },
      ],
    },
    {
      name: "นาย ภูริเดช ตะโกมา",
      nickname: "บลู",
      project: "การพัฒนาระบบจำหน่ายมือถือออนไลน์",
      mean: 4.87,
      questions: [
        {
          title: "เนื้อหามีความน่าสนใจและเข้าใจง่าย",
          mean: 4.87,
          count: 30,
          distribution: { 1: 0, 2: 1, 3: 0, 4: 1, 5: 28 },
        },
        {
          title: "การนำเสนอมีความชัดเจนและเป็นลำดับ",
          mean: 4.8,
          count: 30,
          distribution: { 1: 0, 2: 1, 3: 0, 4: 3, 5: 26 },
        },
        {
          title: "อธิบายโปรเจกต์และแนวคิดได้อย่างเหมาะสม",
          mean: 4.9,
          count: 30,
          distribution: { 1: 0, 2: 0, 3: 1, 4: 1, 5: 28 },
        },
        {
          title: "โปรเจกต์มีประโยชน์และสามารถนำความรู้ไปประยุกต์ใช้ได้",
          mean: 4.87,
          count: 30,
          distribution: { 1: 0, 2: 0, 3: 1, 4: 2, 5: 27 },
        },
        {
          title: "ผู้บรรยายสามารถสื่อสารและตอบคำถามได้อย่างเหมาะสม",
          mean: 4.93,
          count: 30,
          distribution: { 1: 0, 2: 0, 3: 1, 4: 0, 5: 29 },
        },
      ],
    },
    {
      name: "นาย กมลภพ อร่ามรักษ์",
      nickname: "ต้นกล้า",
      project: "ระบบคำนวณค่าเเรงคนงานมะพร้าว",
      mean: 4.87,
      questions: [
        {
          title: "เนื้อหามีความน่าสนใจและเข้าใจง่าย",
          mean: 4.9,
          count: 30,
          distribution: { 1: 0, 2: 0, 3: 1, 4: 1, 5: 28 },
        },
        {
          title: "การนำเสนอมีความชัดเจนและเป็นลำดับ",
          mean: 4.83,
          count: 30,
          distribution: { 1: 0, 2: 1, 3: 0, 4: 2, 5: 27 },
        },
        {
          title: "อธิบายโปรเจกต์และแนวคิดได้อย่างเหมาะสม",
          mean: 4.87,
          count: 30,
          distribution: { 1: 0, 2: 1, 3: 0, 4: 1, 5: 28 },
        },
        {
          title: "โปรเจกต์มีประโยชน์และสามารถนำความรู้ไปประยุกต์ใช้ได้",
          mean: 4.9,
          count: 30,
          distribution: { 1: 0, 2: 0, 3: 1, 4: 1, 5: 28 },
        },
        {
          title: "ผู้บรรยายสามารถสื่อสารและตอบคำถามได้อย่างเหมาะสม",
          mean: 4.87,
          count: 30,
          distribution: { 1: 0, 2: 0, 3: 1, 4: 2, 5: 27 },
        },
      ],
    },
    {
      name: "นาย จักรกฤษณ์ นาคสุก",
      nickname: "บังดิล",
      project: "ระบบบริการเช่ารถออนไลน์",
      mean: 4.85,
      questions: [
        {
          title: "เนื้อหามีความน่าสนใจและเข้าใจง่าย",
          mean: 4.93,
          count: 30,
          distribution: { 1: 0, 2: 0, 3: 1, 4: 0, 5: 29 },
        },
        {
          title: "การนำเสนอมีความชัดเจนและเป็นลำดับ",
          mean: 4.77,
          count: 30,
          distribution: { 1: 0, 2: 1, 3: 0, 4: 4, 5: 25 },
        },
        {
          title: "อธิบายโปรเจกต์และแนวคิดได้อย่างเหมาะสม",
          mean: 4.87,
          count: 30,
          distribution: { 1: 0, 2: 1, 3: 0, 4: 1, 5: 28 },
        },
        {
          title: "โปรเจกต์มีประโยชน์และสามารถนำความรู้ไปประยุกต์ใช้ได้",
          mean: 4.8,
          count: 30,
          distribution: { 1: 0, 2: 1, 3: 0, 4: 3, 5: 26 },
        },
        {
          title: "ผู้บรรยายสามารถสื่อสารและตอบคำถามได้อย่างเหมาะสม",
          mean: 4.87,
          count: 30,
          distribution: { 1: 0, 2: 0, 3: 1, 4: 2, 5: 27 },
        },
      ],
    },
    {
      name: "นางสาว ณฐกร เจะรัมย์",
      nickname: "มายด์",
      project: "ระบบจัดการร้านอาหารสำหรับเจ้าของร้านรายเดี่ยว",
      mean: 4.86,
      questions: [
        {
          title: "เนื้อหามีความน่าสนใจและเข้าใจง่าย",
          mean: 4.9,
          count: 30,
          distribution: { 1: 0, 2: 1, 3: 0, 4: 0, 5: 29 },
        },
        {
          title: "การนำเสนอมีความชัดเจนและเป็นลำดับ",
          mean: 4.83,
          count: 30,
          distribution: { 1: 0, 2: 1, 3: 0, 4: 2, 5: 27 },
        },
        {
          title: "อธิบายโปรเจกต์และแนวคิดได้อย่างเหมาะสม",
          mean: 4.87,
          count: 30,
          distribution: { 1: 0, 2: 1, 3: 0, 4: 1, 5: 28 },
        },
        {
          title: "โปรเจกต์มีประโยชน์และสามารถนำความรู้ไปประยุกต์ใช้ได้",
          mean: 4.8,
          count: 30,
          distribution: { 1: 0, 2: 1, 3: 0, 4: 3, 5: 26 },
        },
        {
          title: "ผู้บรรยายสามารถสื่อสารและตอบคำถามได้อย่างเหมาะสม",
          mean: 4.9,
          count: 30,
          distribution: { 1: 0, 2: 1, 3: 0, 4: 0, 5: 29 },
        },
      ],
    },
  ],
}

export type ExecutiveInsight = {
  tag: string
  title: string
  score: string
  description: string
}

export const executiveInsights: ExecutiveInsight[] = [
  {
    tag: "หัวข้อยอดเยี่ยม",
    title: "เนื้อหาตรงประเด็นและน่าสนใจสูงสุด",
    score: "4.90 / 5.00",
    description:
      "ผู้เข้าร่วมสัมมนา 96.7% ให้คะแนนเต็ม 5 ยืนยันถึงหัวข้อบรรยายที่ทันสมัยและดึงดูดความสนใจได้ดีเยี่ยม",
  },
  {
    tag: "การนำไปใช้จริง",
    title: "ความรู้สามารถต่อยอดสู่โปรเจกต์ได้ทันที",
    score: "4.87 / 5.00",
    description:
      "ผู้ฟังมั่นใจว่าจะนำเทคนิคการคิดแบบ Think Like a User ไปประยุกต์ใช้ในการพัฒนาซอฟต์แวร์จริง",
  },
  {
    tag: "คุณภาพวิทยากร",
    title: "การตอบคำถามและการสื่อสารยอดเยี่ยมสม่ำเสมอ",
    score: "4.87 / 5.00",
    description:
      "วิทยากรทั้ง 5 ท่านทำผลงานได้ในระดับดีเยี่ยมอย่างสม่ำเสมอ โดยมีคะแนนเฉลี่ยรวมระหว่าง 4.81 - 4.87",
  },
]

export const ratingDistributionSummary = [
  {
    star: 5,
    label: "มากที่สุด (5 ดาว)",
    count: 832,
    percent: 92.4,
    color: "#111111",
  },
  { star: 4, label: "มาก (4 ดาว)", count: 58, percent: 6.4, color: "#ff5c35" },
  {
    star: 3,
    label: "ปานกลาง (3 ดาว)",
    count: 6,
    percent: 0.7,
    color: "#7660ff",
  },
  { star: 2, label: "น้อย (2 ดาว)", count: 4, percent: 0.5, color: "#aaa8a2" },
]
