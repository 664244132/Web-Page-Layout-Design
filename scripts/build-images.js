import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootDir = path.resolve(__dirname, "..")
const imgDir = path.join(rootDir, "img")
const outDir = path.join(rootDir, "src", "data")
const outFile = path.join(outDir, "speakerImages.ts")

if (!fs.existsSync(imgDir)) {
  console.error('Directory "img" does not exist at:', imgDir)
  process.exit(1)
}

let code = `/**
 * speakerImages.ts
 * คลังทรัพยากรรูปภาพความละเอียดสูง พร้อม Base64 Embedded Fallback
 * การันตีว่าภาพจากโฟลเดอร์ img (1.jpg - 6.jpg) จะโหลดได้ 100% ในทุกสภาพแวดล้อม
 * (Local Vite dev, Production Build, Figma Make Preview iframe, file://)
 */

`

for (let i = 1; i <= 6; i++) {
  const filePath = path.join(imgDir, `${i}.jpg`)
  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath)
    const base64Data = fileBuffer.toString("base64")
    code += `export const image${i}Base64: string = "data:image/jpeg;base64,${base64Data}";\n`
  }
}

code += `\nexport const imageFallbackList: Record<number, string[]> = {\n`
for (let i = 1; i <= 6; i++) {
  code += `  ${i}: [\n`
  code += `    "/img/${i}.jpg",\n`
  code += `    "img/${i}.jpg",\n`
  code += `    "/src/img/${i}.jpg",\n`
  code += `    "src/img/${i}.jpg",\n`
  code += `    "/${i}.jpg",\n`
  code += `    "${i}.jpg",\n`
  code += `  ],\n`
}
code += `};\n`

fs.writeFileSync(outFile, code, "utf-8")
console.log(
  "Generated speakerImages.ts successfully. Size:",
  fs.statSync(outFile).size,
)
