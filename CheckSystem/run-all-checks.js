/**
 * ==============================================================================
 * CheckSystem: Master System Integrity Runner (run-all-checks.js)
 * ==============================================================================
 * สคริปต์หลักรวมศูนย์สำหรับตรวจสอบคุณภาพ สุขอนามัยโค้ด กฎระเบียบ และความถูกต้องของโปรเจกต์
 *
 * โมดูลที่ทำงาน:
 * 1. check-path-links.js      -> ตรวจสอบ Path, Assets, Imports, และ Markdown Links
 * 2. check-markdown-rules.js  -> ตรวจสอบกฎระเบียบ De Morgan, Naming, Types, a11y, Security
 * 3. check-state-lifecycle.js -> ตรวจสอบ State Colocation, Memory Leaks, Effect Cleanups
 *
 * คำสั่งรัน: npm run check-system  (หรือ node CheckSystem/run-all-checks.js)
 */

import { runPathLinkChecks } from "./check-path-links.js"

import { runMarkdownRuleChecks } from "./check-markdown-rules.js"

import { runStateLifecycleChecks } from "./check-state-lifecycle.js"

// ANSI Color Codes สำหรับตกแต่งผลลัพธ์ใน Terminal

const colors = {
  reset: "\x1b[0m",

  bold: "\x1b[1m",

  dim: "\x1b[2m",

  green: "\x1b[32m",

  red: "\x1b[31m",

  yellow: "\x1b[33m",

  cyan: "\x1b[36m",

  bgBlue: "\x1b[44m\x1b[37m",
}

function printHeader() {
  console.log("\n" + "=".repeat(78))

  console.log(
    ` ${colors.bold}${colors.cyan}🛡️  CheckSystem: Automated Project Integrity & Bug Detection Suite${colors.reset}`,
  )

  console.log(
    ` ${colors.dim}Speaker Showcase Website (North Assembly 2024 — Copenhagen)${colors.reset}`,
  )

  console.log("=".repeat(78) + "\n")
}

export function runAllSystemChecks() {
  printHeader()

  const startTime = Date.now()

  const modules = [
    runPathLinkChecks(),

    runMarkdownRuleChecks(),

    runStateLifecycleChecks(),
  ]

  let grandTotalChecked = 0

  let grandTotalErrors = 0

  let allModulesPassed = true

  modules.forEach((module, idx) => {
    grandTotalChecked += module.totalChecked

    grandTotalErrors += module.errors.length

    if (!module.passed) allModulesPassed = false

    const statusBadge = module.passed
      ? `${colors.green}${colors.bold}✔ ผ่าน (PASS)${colors.reset}`
      : `${colors.red}${colors.bold}✖ พบข้อผิดพลาด (FAIL)${colors.reset}`

    console.log(
      `${colors.bold}[โมดูลที่ ${idx + 1}/3] ${module.moduleName}${colors.reset}`,
    )

    console.log(
      `สถานะ: ${statusBadge} | ตรวจสอบทั้งหมด ${module.totalChecked} รายการ`,
    )

    // แสดงรายละเอียดของแต่ละหมวดย่อย

    if (module.subResults) {
      for (const sub of module.subResults) {
        const subStatus =
          sub.issues.length === 0
            ? `${colors.green}✔ ปกติ${colors.reset}`
            : `${colors.red}✖ มี ${sub.issues.length} ปัญหา${colors.reset}`

        console.log(`  ├─ ${sub.name}: ${sub.count} รายการ [${subStatus}]`)

        for (const issue of sub.issues) {
          console.log(`  │   ${colors.red}└─ ⚠️  ${issue}${colors.reset}`)
        }
      }
    }

    console.log("─".repeat(78))
  })

  const duration = Date.now() - startTime

  console.log(
    `\n${colors.bold}📊 สรุปผลการตรวจสอบระบบ CheckSystem ทั้งหมด:${colors.reset}`,
  )

  console.log(
    `- จำนวนรายการที่ตรวจสอบทั้งหมด: ${colors.bold}${grandTotalChecked}${colors.reset} จุด`,
  )

  console.log(`- เวลาที่ใช้ในการประมวลผล: ${duration}ms`)

  if (allModulesPassed) {
    console.log(
      `\n${colors.green}${colors.bold}🎉 ผลลัพธ์: ระบบผ่านการตรวจสอบความถูกต้อง 100% ไม่มีข้อผิดพลาดใดๆ หลงเหลือ!${colors.reset}\n`,
    )

    return true
  } else {
    console.log(
      `\n${colors.red}${colors.bold}🚨 ผลลัพธ์: พบข้อผิดพลาดทั้งหมด ${grandTotalErrors} จุด กรุณาแก้ไขตามรายการข้างต้น${colors.reset}\n`,
    )

    return false
  }
}

// ตรวจสอบเมื่อถูกรันโดยตรงผ่าน CLI

const isDirectRun = process.argv[1]?.endsWith("run-all-checks.js")

if (isDirectRun) {
  const success = runAllSystemChecks()

  process.exit(success ? 0 : 1)
}
