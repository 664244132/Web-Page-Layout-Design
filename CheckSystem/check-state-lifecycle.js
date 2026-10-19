/**
 * ==============================================================================
 * CheckSystem: React State & Lifecycle Integrity Checker (check-state-lifecycle.js)
 * ==============================================================================
 * หน้าที่: ตรวจสอบความสมบูรณ์ของการจัดการ State, Hooks, และ Component Lifecycle:
 * 1. State Colocation: ตรวจสอบตำแหน่ง State ให้อยู่ใกล้จุดใช้งานที่สุด
 * 2. Effect Cleanups: ตรวจสอบการล้าง Event Listeners (popstate, keydown, scroll)
 * 3. Animation Frames & Timers: ตรวจสอบ cancelAnimationFrame และ clearTimeout
 * 4. DOM Cleanups: ตรวจสอบการถอดคลาส modal-open ออกจาก document.body เสมอ
 * 5. Defensive State Handling: ตรวจสอบการป้องกันข้อผิดพลาดกรณีไม่พบข้อมูล Index
 *
 * การใช้งาน: node CheckSystem/check-state-lifecycle.js
 */

import fs from "node:fs"

import path from "node:path"

import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const ROOT_DIR = path.resolve(__dirname, "..")

/**
 * 1. ตรวจสอบการจัดการ State ใน App.tsx (Root State Hub)
 */

function checkAppState() {
  const issues = []

  let count = 0

  const appPath = path.join(ROOT_DIR, "src", "App.tsx")

  if (!fs.existsSync(appPath)) {
    return {
      name: "App.tsx State Architecture",
      count: 0,
      issues: ["ไม่พบไฟล์ src/App.tsx"],
    }
  }

  const content = fs.readFileSync(appPath, "utf-8")

  // ตรวจสอบ selected state

  count++

  if (!content.includes("useState<Speaker | null>(null)")) {
    issues.push(
      "[State Definition] App.tsx: ควรประกาศ 'useState<Speaker | null>(null)' เพื่อจัดการวิทยากรที่ถูกเลือก",
    )
  }

  // ตรวจสอบ route state

  count++

  if (!content.includes("useState<string>(")) {
    issues.push(
      "[State Definition] App.tsx: ควรประกาศ 'useState<string>' เพื่อจัดการ SPA Route",
    )
  }

  // ตรวจสอบ popstate listener & cleanup

  count += 2

  const hasPopstateAdd = content.includes('addEventListener("popstate"')

  const hasPopstateRemove = content.includes('removeEventListener("popstate"')

  if (!hasPopstateAdd) {
    issues.push(
      "[Lifecycle Error] App.tsx: ขาดการผูก Event 'popstate' เพื่อซิงก์ประวัติการนำทางของเบราว์เซอร์",
    )
  }

  if (hasPopstateAdd && !hasPopstateRemove) {
    issues.push(
      "[Memory Leak] App.tsx: ขาดฟังก์ชัน Cleanup สำหรับ 'removeEventListener(\"popstate\")'",
    )
  }

  // ตรวจสอบการไม่หลุดรั่วของ isClosing สู่ App.tsx (State Colocation Rule)

  count++

  if (content.includes("isClosing")) {
    issues.push(
      "[State Colocation Violation] App.tsx: สถานะ 'isClosing' ต้องอยู่ภายใน SpeakerModal.tsx เท่านั้น (ห้ามยกขึ้นมาไว้ที่ App.tsx)",
    )
  }

  return { name: "App Root State & Navigation Lifecycle", count, issues }
}

/**
 * 2. ตรวจสอบ State และ Lifecycle ใน SpeakerModal.tsx
 */

function checkModalLifecycle() {
  const issues = []

  let count = 0

  const modalPath = path.join(ROOT_DIR, "src", "components", "SpeakerModal.tsx")

  if (!fs.existsSync(modalPath)) {
    return {
      name: "SpeakerModal Lifecycle",
      count: 0,
      issues: ["ไม่พบไฟล์ src/components/SpeakerModal.tsx"],
    }
  }

  const content = fs.readFileSync(modalPath, "utf-8")

  // 1. ตรวจสอบ isClosing state

  count++

  if (!content.includes("useState<boolean>(false)")) {
    issues.push(
      "[State Missing] SpeakerModal.tsx: ต้องมีสถานะ 'isClosing' สำหรับควบคุมแอนิเมชันปิดแบบ Smooth Exit",
    )
  }

  // 2. ตรวจสอบ body.classList add & remove (Scroll Lock Cleanup)

  count += 2

  const hasAddModalOpen = content.includes(
    'document.body.classList.add("modal-open")',
  )

  const hasRemoveModalOpen = content.includes(
    'document.body.classList.remove("modal-open")',
  )

  if (!hasAddModalOpen) {
    issues.push(
      "[Scroll Lock Missing] SpeakerModal.tsx: ควรมี 'classList.add(\"modal-open\")' เพื่อล็อกการเลื่อนหน้าจอ",
    )
  }

  if (!hasRemoveModalOpen) {
    issues.push(
      "[Bug/Leak Risk] SpeakerModal.tsx: ขาด 'classList.remove(\"modal-open\")' ใน Cleanup Function ทำให้หน้าจอค้างหลังปิด Modal",
    )
  }

  // 3. ตรวจสอบ keydown Escape listener & cleanup

  count += 2

  const hasKeydownAdd = content.includes('addEventListener("keydown"')

  const hasKeydownRemove = content.includes('removeEventListener("keydown"')

  if (!hasKeydownAdd) {
    issues.push(
      "[Accessibility Missing] SpeakerModal.tsx: ขาดการดักจับปุ่ม 'Escape' บนคีย์บอร์ด",
    )
  }

  if (hasKeydownAdd && !hasKeydownRemove) {
    issues.push(
      "[Memory Leak] SpeakerModal.tsx: ขาด Cleanup สำหรับ 'removeEventListener(\"keydown\")'",
    )
  }

  // 4. ตรวจสอบ Timer Cleanup

  count += 2

  const hasSetTimeout = content.includes("window.setTimeout")

  const hasClearTimeout = content.includes("window.clearTimeout")

  if (hasSetTimeout && !hasClearTimeout) {
    issues.push(
      "[Memory Leak] SpeakerModal.tsx: มีการใช้ setTimeout แต่ขาด 'clearTimeout' ในฟังก์ชัน Cleanup",
    )
  }

  // 5. ตรวจสอบ Defensive Indexing (Math.max)

  count++

  if (!/Math\.max\s*\(\s*0\s*,/.test(content)) {
    issues.push(
      "[Defensive Programming] SpeakerModal.tsx: ควรใช้ 'Math.max(0, ...)' ในการหา Index เพื่อป้องกันค่า -1 เมื่อไม่พบข้อมูล",
    )
  }

  return {
    name: "SpeakerModal State, Focus & Dismiss Lifecycle",
    count,
    issues,
  }
}

/**
 * 3. ตรวจสอบ Frame Cleanup ใน SpeakerCard.tsx และ VisionBanner.tsx
 */

function checkAnimationFramesAndObservers() {
  const issues = []

  let count = 0

  // 3.1 SpeakerCard.tsx

  const cardPath = path.join(ROOT_DIR, "src", "components", "SpeakerCard.tsx")

  if (fs.existsSync(cardPath)) {
    const content = fs.readFileSync(cardPath, "utf-8")

    count += 2

    if (!content.includes("requestAnimationFrame")) {
      issues.push(
        "[Performance Warning] SpeakerCard.tsx: ควรคำนวณการเอียง 3D Tilt ผ่าน 'requestAnimationFrame'",
      )
    }

    if (!content.includes("cancelAnimationFrame")) {
      issues.push(
        "[Memory Leak] SpeakerCard.tsx: ขาด 'cancelAnimationFrame' สำหรับล้างรอบการคำนวณ",
      )
    }
  }

  // 3.2 VisionBanner.tsx

  const bannerPath = path.join(
    ROOT_DIR,
    "src",
    "components",
    "VisionBanner.tsx",
  )

  if (fs.existsSync(bannerPath)) {
    const content = fs.readFileSync(bannerPath, "utf-8")

    count += 3

    // ตรวจสอบ Observer Disconnect

    if (
      content.includes("new IntersectionObserver") &&
      !content.includes("observer.disconnect()")
    ) {
      issues.push(
        "[Memory Leak] VisionBanner.tsx: ขาด 'observer.disconnect()' ใน Cleanup Function",
      )
    }

    // ตรวจสอบ Scroll Listener Cleanup

    const hasScrollAdd = content.includes('addEventListener("scroll"')

    const hasScrollRemove = content.includes('removeEventListener("scroll"')

    if (hasScrollAdd && !hasScrollRemove) {
      issues.push(
        "[Memory Leak] VisionBanner.tsx: ขาด 'removeEventListener(\"scroll\")' ใน Cleanup Function",
      )
    }

    // ตรวจสอบ Parallax Frame Cleanup

    if (
      content.includes("requestAnimationFrame") &&
      !content.includes("cancelAnimationFrame")
    ) {
      issues.push(
        "[Memory Leak] VisionBanner.tsx: ขาด 'cancelAnimationFrame' สำหรับ Parallax Frame",
      )
    }
  }

  return { name: "Animation Frames & Observer Cleanups", count, issues }
}

/**
 * 4. ตรวจสอบ Custom Hook useReducedMotion.ts
 */

function checkReducedMotionHook() {
  const issues = []

  let count = 0

  const hookPath = path.join(ROOT_DIR, "src", "hooks", "useReducedMotion.ts")

  if (!fs.existsSync(hookPath)) {
    return {
      name: "useReducedMotion Hook Integrity",
      count: 0,
      issues: ["ไม่พบไฟล์ src/hooks/useReducedMotion.ts"],
    }
  }

  const content = fs.readFileSync(hookPath, "utf-8")

  count += 3

  if (!content.includes("matchMedia")) {
    issues.push(
      "[Hook Logic Error] useReducedMotion: ต้องใช้ 'window.matchMedia' ในการตรวจสอบการตั้งค่าผู้ใช้",
    )
  }

  if (
    !content.includes("addEventListener") &&
    !content.includes("addListener")
  ) {
    issues.push(
      "[Hook Missing Listener] useReducedMotion: ขาดการผูก Event ตรวจจับการเปลี่ยนแปลง Media Query",
    )
  }

  if (
    !content.includes("removeEventListener") &&
    !content.includes("removeListener")
  ) {
    issues.push(
      "[Memory Leak] useReducedMotion: ขาดการ Cleanup Event Listener ของ Media Query",
    )
  }

  return { name: "Reduced Motion Hook Lifecycle", count, issues }
}

/**
 * ฟังก์ชันหลักในการรันการตรวจสอบ State & Lifecycle ทั้งหมด
 */

export function runStateLifecycleChecks() {
  const results = [
    checkAppState(),

    checkModalLifecycle(),

    checkAnimationFramesAndObservers(),

    checkReducedMotionHook(),
  ]

  const totalChecked = results.reduce((sum, r) => sum + r.count, 0)

  const allIssues = results.flatMap((r) => r.issues)

  const passed = allIssues.length === 0

  return {
    moduleName: "React State & Lifecycle Integrity Checker",

    passed,

    totalChecked,

    subResults: results,

    errors: allIssues,
  }
}

// อนุญาตให้รันสคริปต์นี้แบบ Standalone ได้

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log("\n🔍 กำลังตรวจสอบ React State & Lifecycle Integrity ทั้งระบบ...\n")

  const report = runStateLifecycleChecks()

  for (const sub of report.subResults) {
    const status = sub.issues.length === 0 ? "✅ ผ่าน" : "❌ พบปัญหา"

    console.log(`- ${sub.name}: ตรวจสอบ ${sub.count} จุด [${status}]`)

    for (const issue of sub.issues) {
      console.log(`  └─ ${issue}`)
    }
  }

  console.log(
    `\nสรุปผล: ตรวจสอบทั้งหมด ${report.totalChecked} รายการ | ${
      report.passed
        ? "✅ ผ่านทั้งหมด 100%"
        : `❌ พบ ${report.errors.length} ข้อผิดพลาด`
    }\n`,
  )

  process.exit(report.passed ? 0 : 1)
}
