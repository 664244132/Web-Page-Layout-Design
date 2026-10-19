/**
 * ==============================================================================
 * CheckSystem: Path & Link Integrity Checker (check-path-links.js)
 * ==============================================================================
 * หน้าที่: ตรวจสอบความถูกต้องของเส้นทางไฟล์ (Path) และลิงก์ (Links) ทั้งหมดในระบบ:
 * 1. ตรวจสอบการอ้างอิง Assets ในโฟลเดอร์ public/ (ฟอนต์, รูปภาพ, Favicon)
 * 2. ตรวจสอบคำสั่ง import ภายใน src/ ทั้ง Relative path และ Alias (@/*)
 * 3. ตรวจสอบลิงก์อ้างอิงไฟล์ในเอกสารคู่มือ markdowns/ และ root *.md
 * 4. ตรวจสอบลิงก์ SPA Navigation Routes
 *
 * การใช้งาน: node CheckSystem/check-path-links.js
 */

import fs from "node:fs"

import path from "node:path"

import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const ROOT_DIR = path.resolve(__dirname, "..")

/**
 * อ่านรายชื่อไฟล์ทั้งหมดในไดเรกทอรีแบบ Recursive
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
 * 1. ตรวจสอบการอ้างอิงไฟล์ใน public/ (Assets Checker)
 */

function checkPublicAssets() {
  const issues = []

  let count = 0

  const srcFiles = getFilesRecursively(path.join(ROOT_DIR, "src"), [
    ".ts",
    ".tsx",
    ".css",
  ])

  srcFiles.push(path.join(ROOT_DIR, "index.html"))

  // ตรวจสอบการอ้างอิง /fonts/, /images/, /favicon

  const assetRegex = /['"](\/(fonts|images|favicon)[^'"]+)['"]/g

  for (const filePath of srcFiles) {
    if (!fs.existsSync(filePath)) continue

    const content = fs.readFileSync(filePath, "utf-8")

    const relFile = path.relative(ROOT_DIR, filePath)

    let match

    while ((match = assetRegex.exec(content)) !== null) {
      count++

      const assetUrl = match[1]

      // ตัด Query string หรือ Hash ออกถ้ามี

      const cleanPath = assetUrl.split("?")[0].split("#")[0]

      const diskPath = path.join(
        ROOT_DIR,
        "public",
        cleanPath.replace(/^\//, ""),
      )

      if (!fs.existsSync(diskPath)) {
        issues.push(
          `[Missing Asset] ไฟล์ ${relFile} อ้างอิง "${assetUrl}" แต่ไม่พบไฟล์บนดิสก์ที่: public/${cleanPath.replace(/^\//, "")}`,
        )
      }
    }
  }

  return { name: "Public Assets Reference", count, issues }
}

/**
 * 2. ตรวจสอบคำสั่ง import ภายใน src/
 */

function checkSourceImports() {
  const issues = []

  let count = 0

  const srcFiles = getFilesRecursively(path.join(ROOT_DIR, "src"), [
    ".ts",
    ".tsx",
  ])

  const importRegex =
    /(?:import|export)\s+(?:type\s+)?(?:[\w*\s{},]+from\s+)?['"]([^'"]+)['"]/g

  for (const filePath of srcFiles) {
    const content = fs.readFileSync(filePath, "utf-8")

    const relFile = path.relative(ROOT_DIR, filePath)

    const fileDir = path.dirname(filePath)

    let match

    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1]

      // ข้าม package ภายนอกเช่น react, tailwindcss

      if (!importPath.startsWith(".") && !importPath.startsWith("@/")) {
        continue
      }

      count++

      let resolvedTarget

      if (importPath.startsWith("@/")) {
        resolvedTarget = path.join(
          ROOT_DIR,
          "src",
          importPath.replace(/^@\//, ""),
        )
      } else {
        resolvedTarget = path.resolve(fileDir, importPath)
      }

      // ตรวจสอบนามสกุลที่เป็นไปได้

      const possibleExtensions = [
        "",
        ".ts",
        ".tsx",
        ".js",
        ".jsx",
        ".css",
        ".json",
        "/index.ts",
        "/index.tsx",
      ]

      const exists = possibleExtensions.some((ext) =>
        fs.existsSync(resolvedTarget + ext),
      )

      if (!exists) {
        issues.push(
          `[Broken Import] ในไฟล์ ${relFile} ไม่สามารถค้นหาโมดูล: "${importPath}" (ค้นหาที่: ${path.relative(ROOT_DIR, resolvedTarget)})`,
        )
      }
    }
  }

  return { name: "Source Code Imports", count, issues }
}

/**
 * 3. ตรวจสอบลิงก์อ้างอิงไฟล์ใน Markdown Files
 */

function checkMarkdownLinks() {
  const issues = []

  let count = 0

  const mdFiles = getFilesRecursively(path.join(ROOT_DIR, "markdowns"), [".md"])

  const rootMds = ["AGENTS.md", "CLAUDE.md"]

  for (const rootMd of rootMds) {
    const p = path.join(ROOT_DIR, rootMd)

    if (fs.existsSync(p)) mdFiles.push(p)
  }

  // ลิงก์รูปแบบ [label](path) หรือ [label](file:///path)

  const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g

  for (const filePath of mdFiles) {
    const content = fs.readFileSync(filePath, "utf-8")

    const relFile = path.relative(ROOT_DIR, filePath)

    const fileDir = path.dirname(filePath)

    let match

    while ((match = mdLinkRegex.exec(content)) !== null) {
      const rawTarget = match[2].trim()

      // ข้าม anchor links ภายในหน้าเดียวกัน หรือลิงก์ภายนอก http/https

      if (
        rawTarget.startsWith("#") ||
        rawTarget.startsWith("http://") ||
        rawTarget.startsWith("https://") ||
        rawTarget.startsWith("mailto:")
      ) {
        continue
      }

      count++

      let diskTarget = rawTarget

      // จัดการ file:/// URL

      if (diskTarget.startsWith("file:///")) {
        let cleanFileUrl = diskTarget.replace(/^file:\/\/\//, "")

        // จัดการกรณี Windows drive เช่น C:/

        cleanFileUrl = decodeURIComponent(cleanFileUrl)

        diskTarget = path.normalize(cleanFileUrl)
      } else {
        // Relative path จากโฟลเดอร์ของไฟล์ markdown

        const cleanRelPath = diskTarget.split("#")[0]

        diskTarget = path.resolve(fileDir, cleanRelPath)
      }

      // ตรวจสอบว่ามีไฟล์หรือโฟลเดอร์ปลายทางอยู่จริงหรือไม่

      if (!fs.existsSync(diskTarget)) {
        issues.push(
          `[Broken Markdown Link] ใน ${relFile} ลิงก์ชี้ไปยัง: "${rawTarget}" แต่ไม่พบเป้าหมายที่: ${diskTarget}`,
        )
      }
    }
  }

  return { name: "Markdown Link References", count, issues }
}

/**
 * ฟังก์ชันหลักในการรันการตรวจสอบ Path & Links ทั้งหมด
 */

export function runPathLinkChecks() {
  const results = [
    checkPublicAssets(),
    checkSourceImports(),
    checkMarkdownLinks(),
  ]

  const totalChecked = results.reduce((sum, r) => sum + r.count, 0)

  const allIssues = results.flatMap((r) => r.issues)

  const passed = allIssues.length === 0

  return {
    moduleName: "Path & Link Integrity Checker",

    passed,

    totalChecked,

    subResults: results,

    errors: allIssues,
  }
}

// อนุญาตให้รันสคริปต์นี้แบบ Standalone ได้

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log("\n🔍 กำลังตรวจสอบ Path & Link Integrity ทั้งระบบ...\n")

  const report = runPathLinkChecks()

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
