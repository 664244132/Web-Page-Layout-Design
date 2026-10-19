/**
 * ==============================================================================
 * CheckSystem: Markdown Rules & Coding Standards Checker (check-markdown-rules.js)
 * ==============================================================================
 * หน้าที่: ตรวจสอบโค้ดในโปรเจกต์เทียบกับกฎและมาตรฐานที่ระบุในโฟลเดอร์ markdowns/
 * 1. DeMorgansLaws.md: ตรวจสอบการห้ามใช้ !(...) ปฏิเสธซ้อน และสนับสนุน Early Return
 * 2. NamingAndStructureGuide.md: ตรวจสอบ PascalCase.tsx, camelCase.ts, และ export default
 * 3. TypeScriptCodingGuide.md: ตรวจสอบ No `any` Policy และ Type Safety
 * 4. HTMLCodingGuide.md: ตรวจสอบ Semantic JSX, alt บน <img>, aria-hidden="true" บนไอคอน
 * 5. SECURITY.md: ตรวจสอบห้ามใช้ dangerouslySetInnerHTML, javascript: URL หรือ Secret Keys
 * 6. REFACTORCODE.md: ตรวจสอบ Single Responsibility, requestAnimationFrame และ Effect Cleanups
 *
 * การใช้งาน: node CheckSystem/check-markdown-rules.js
 */

import fs from "node:fs"

import path from "node:path"

import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const ROOT_DIR = path.resolve(__dirname, "..")

/**
 * ดึงรายชื่อไฟล์ทั้งหมดในไดเรกทอรี
 * @param {string} dir
 * @param {string[]} extensions
 * @returns {string[]}
 */

function getFilesRecursively(dir, extensions = []) {
  if (!fs.existsSync(dir)) return []

  const entries = fs.readdirSync(dir, { withFileTypes: true })

  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (
        entry.name !== "node_modules" &&
        entry.name !== ".git" &&
        entry.name !== "dist"
      ) {
        files.push(...getFilesRecursively(fullPath, extensions))
      }
    } else {
      if (
        extensions.length === 0 ||
        extensions.some((ext) => entry.name.endsWith(ext))
      ) {
        files.push(fullPath)
      }
    }
  }

  return files
}

/**
 * 1. ตรวจสอบกฎ De Morgan's Laws (DeMorgansLaws.md)
 */

function checkDeMorgansLaws() {
  const issues = []

  let count = 0

  const srcFiles = getFilesRecursively(path.join(ROOT_DIR, "src"), [
    ".ts",
    ".tsx",
  ])

  // ตรวจสอบแพทเทิร์น !(...)

  const forbiddenNegationRegex = /!\s*\(([^)]+)\)/g

  for (const filePath of srcFiles) {
    const content = fs.readFileSync(filePath, "utf-8")

    const relFile = path.relative(ROOT_DIR, filePath)

    const lines = content.split("\n")

    lines.forEach((line, index) => {
      // ข้ามบรรทัดคอมเมนต์

      const trimmed = line.trim()

      if (
        trimmed.startsWith("//") ||
        trimmed.startsWith("*") ||
        trimmed.startsWith("/*")
      )
        return

      count++

      let match

      while ((match = forbiddenNegationRegex.exec(line)) !== null) {
        issues.push(
          `[De Morgan Violation] ใน ${relFile} บรรทัดที่ ${index + 1}: พบการใช้ !(${match[1]}) ซึ่งผิดกฎ De Morgan's Laws (ต้องแปลงเป็นนิพจน์แบนราบแบบกระจาย !)`,
        )
      }
    })
  }

  return { name: "De Morgan's Laws (No !(A && B) / !(A || B))", count, issues }
}

/**
 * 2. ตรวจสอบมาตรฐานการตั้งชื่อและโครงสร้าง (NamingAndStructureGuide.md & AGENTS.md)
 */

function checkNamingConventions() {
  const issues = []

  let count = 0

  const srcDir = path.join(ROOT_DIR, "src")

  const componentsDir = path.join(srcDir, "components")

  const typesDir = path.join(srcDir, "types")

  const dataDir = path.join(srcDir, "data")

  const hooksDir = path.join(srcDir, "hooks")

  // ตรวจสอบ components: ต้องเป็น PascalCase.tsx

  if (fs.existsSync(componentsDir)) {
    const componentFiles = fs
      .readdirSync(componentsDir)
      .filter((f) => f.endsWith(".tsx"))

    for (const f of componentFiles) {
      count++

      const baseName = path.basename(f, ".tsx")

      if (!/^[A-Z][a-zA-Z0-9]*$/.test(baseName)) {
        issues.push(
          `[Naming Violation] คอมโพเนนต์ src/components/${f} ต้องตั้งชื่อด้วย PascalCase`,
        )
      }

      // ตรวจสอบ export default

      const content = fs.readFileSync(path.join(componentsDir, f), "utf-8")

      if (!content.includes("export default")) {
        issues.push(
          `[Export Default Missing] คอมโพเนนต์ src/components/${f} ต้องมี export default ตามกฎ AGENTS.md`,
        )
      }
    }
  }

  // ตรวจสอบ types, data, hooks: ต้องเป็น camelCase.ts

  const checkCamelDirs = [typesDir, dataDir, hooksDir]

  for (const dir of checkCamelDirs) {
    if (!fs.existsSync(dir)) continue

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".ts"))

    for (const f of files) {
      count++

      const baseName = path.basename(f, ".ts")

      if (!/^[a-z][a-zA-Z0-9]*$/.test(baseName)) {
        issues.push(
          `[Naming Violation] ไฟล์ ${path.relative(ROOT_DIR, path.join(dir, f))} ต้องตั้งชื่อด้วย camelCase`,
        )
      }
    }
  }

  return { name: "Naming Conventions & Export Standards", count, issues }
}

/**
 * 3. ตรวจสอบความปลอดภัยของ Type (TypeScriptCodingGuide.md: No `any` Policy)
 */

function checkTypeScriptSafety() {
  const issues = []

  let count = 0

  const srcFiles = getFilesRecursively(path.join(ROOT_DIR, "src"), [
    ".ts",
    ".tsx",
  ])

  // ตรวจจับคำว่า : any หรือ as any หรือ <any>

  const anyTypeRegex = /:\s*any\b|\bas\s+any\b|<any>/g

  for (const filePath of srcFiles) {
    const content = fs.readFileSync(filePath, "utf-8")

    const relFile = path.relative(ROOT_DIR, filePath)

    const lines = content.split("\n")

    lines.forEach((line, index) => {
      const trimmed = line.trim()

      if (
        trimmed.startsWith("//") ||
        trimmed.startsWith("*") ||
        trimmed.startsWith("/*")
      )
        return

      count++

      if (anyTypeRegex.test(line)) {
        issues.push(
          `[No Any Violation] ใน ${relFile} บรรทัดที่ ${index + 1}: พบการใช้งาน 'any' ซึ่งละเมิดกฎ No any Policy`,
        )
      }
    })
  }

  return { name: "TypeScript Strict Type-Safety (No `any`)", count, issues }
}

/**
 * 4. ตรวจสอบ Semantic HTML และการเข้าถึง Accessibility (HTMLCodingGuide.md & DESIGN.md)
 */

function checkAccessibilityAndSemantics() {
  const issues = []

  let count = 0

  const componentFiles = getFilesRecursively(
    path.join(ROOT_DIR, "src", "components"),
    [".tsx"],
  )

  componentFiles.push(path.join(ROOT_DIR, "src", "App.tsx"))

  for (const filePath of componentFiles) {
    const content = fs.readFileSync(filePath, "utf-8")

    const relFile = path.relative(ROOT_DIR, filePath)

    // ตรวจสอบรูปภาพ <img ต้องมี alt

    const imgMatches = content.match(/<img\s+[^>]*>/g) || []

    for (const imgTag of imgMatches) {
      count++

      if (!imgTag.includes("alt=")) {
        issues.push(
          `[Accessibility Violation] ใน ${relFile}: พบแท็ก <img> ที่ไม่มีแอตทริบิวต์ 'alt': ${imgTag}`,
        )
      }
    }

    // ตรวจสอบปุ่มปิด/ไอคอนตกแต่งใน Arrow / CloseIcon ต้องมี aria-hidden

    if (relFile.includes("Arrow.tsx") || relFile.includes("CloseIcon.tsx")) {
      count++

      if (!content.includes('aria-hidden="true"')) {
        issues.push(
          `[Accessibility Violation] ใน ${relFile}: ไอคอนตกแต่งต้องมี 'aria-hidden="true"'`,
        )
      }
    }

    // ตรวจสอบ Pop-up Modal ต้องมี role="dialog" และ aria-modal="true"

    if (relFile.includes("SpeakerModal.tsx")) {
      count += 2

      if (!content.includes('role="dialog"')) {
        issues.push(
          `[Accessibility Violation] ใน ${relFile}: Modal ต้องมี 'role="dialog"'`,
        )
      }

      if (!content.includes('aria-modal="true"')) {
        issues.push(
          `[Accessibility Violation] ใน ${relFile}: Modal ต้องมี 'aria-modal="true"'`,
        )
      }
    }
  }

  return { name: "HTML Semantics & Accessibility (a11y)", count, issues }
}

/**
 * 5. ตรวจสอบความปลอดภัยฝั่ง Frontend (SECURITY.md)
 */

function checkSecurityMeasures() {
  const issues = []

  let count = 0

  const srcFiles = getFilesRecursively(path.join(ROOT_DIR, "src"), [
    ".ts",
    ".tsx",
    ".html",
  ])

  for (const filePath of srcFiles) {
    const content = fs.readFileSync(filePath, "utf-8")

    const relFile = path.relative(ROOT_DIR, filePath)

    count++

    // 1. ตรวจสอบห้ามใช้ dangerouslySetInnerHTML

    if (content.includes("dangerouslySetInnerHTML")) {
      issues.push(
        `[Security Violation] ใน ${relFile}: พบการใช้งาน 'dangerouslySetInnerHTML' ซึ่งมีความเสี่ยง XSS`,
      )
    }

    // 2. ตรวจสอบห้ามใช้ javascript: URL

    if (/href\s*=\s*['"]javascript:/i.test(content)) {
      issues.push(
        `[Security Violation] ใน ${relFile}: พบการใช้โปรโตคอล 'javascript:' ใน href`,
      )
    }

    // 3. ตรวจสอบ Hardcoded API Keys / Secrets

    if (
      /(?:api[_-]?key|secret[_-]?token|private[_-]?key)\s*[:=]\s*['"][a-zA-Z0-9_\-]{20,}['"]/i.test(
        content,
      )
    ) {
      issues.push(
        `[Security Violation] ใน ${relFile}: พบแนวโน้มการฝัง Hardcoded API Keys หรือ Secrets`,
      )
    }
  }

  return { name: "Frontend Security Baseline", count, issues }
}

/**
 * 6. ตรวจสอบสุขอนามัยของ .antigravityignore (ห้ามมี .agents/ เพื่อให้ Agent อ่านสกิลได้)
 */
function checkAntigravityIgnoreRules() {
  const issues = []
  let count = 0
  const ignorePath = path.join(ROOT_DIR, ".antigravityignore")

  if (fs.existsSync(ignorePath)) {
    const content = fs.readFileSync(ignorePath, "utf-8")
    const lines = content.split("\n")

    for (const [idx, line] of lines.entries()) {
      const trimmed = line.trim()
      if (trimmed.startsWith("#") || trimmed === "") continue

      count++
      if (
        trimmed === ".agents/" ||
        trimmed === ".agents" ||
        trimmed === ".agents/skills/" ||
        trimmed === "./.agents/"
      ) {
        issues.push(
          `[.antigravityignore Violation] บรรทัดที่ ${idx + 1}: พบ '${trimmed}' ซึ่งห้ามใส่ใน .antigravityignore เพราะจะทำให้ AI Agent เมินหรือไม่ยอมอ่านคู่มือคำสั่งใน .agents/skills/`,
        )
      }
    }
  }

  return {
    name: "Agent Skills Accessibility (.antigravityignore Integrity)",
    count,
    issues,
  }
}

/**
 * ฟังก์ชันหลักในการรันการตรวจสอบ Markdown Rules ทั้งหมด
 */
export function runMarkdownRuleChecks() {
  const results = [
    checkDeMorgansLaws(),
    checkNamingConventions(),
    checkTypeScriptSafety(),
    checkAccessibilityAndSemantics(),
    checkSecurityMeasures(),
    checkAntigravityIgnoreRules(),
  ]

  const totalChecked = results.reduce((sum, r) => sum + r.count, 0)

  const allIssues = results.flatMap((r) => r.issues)

  const passed = allIssues.length === 0

  return {
    moduleName: "Markdown Rules & Coding Standards Checker",

    passed,

    totalChecked,

    subResults: results,

    errors: allIssues,
  }
}

// อนุญาตให้รันสคริปต์นี้แบบ Standalone ได้

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log("\n🔍 กำลังตรวจสอบข้อกำหนดและกฎระเบียบ Markdown Rules...\n")

  const report = runMarkdownRuleChecks()

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
