#!/usr/bin/env node

import { promises as fs } from "fs";
import path from "path";

const stillpaintDir = "public/stillpaint";
const cssFilePath = path.join(stillpaintDir, "style.css");
const jsonFilePath = path.join(stillpaintDir, "style.json");

async function initstillpaint() {
  try {
    // stillpaint 디렉토리 생성
    await fs.mkdir(stillpaintDir, { recursive: true });
    console.log(`📂 Directory created: ${stillpaintDir}`);

    // style.css 파일 생성
    await fs.writeFile(cssFilePath, "", "utf-8");
    console.log(`📝 File created: ${cssFilePath}`);

    // buffer.json 파일 생성
    await fs.writeFile(jsonFilePath, JSON.stringify({}, null, 2), "utf-8");
    console.log(`📝 File created: ${jsonFilePath}`);

    console.log("✅ stillpaint initialized successfully!");
  } catch (error) {
    console.error(`❌ Failed to initialize stillpaint: ${error}`);
  }
}

initstillpaint();
