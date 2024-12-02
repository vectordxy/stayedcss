#!/usr/bin/env node

import { promises as fs } from "fs";
import path from "path";

const stayedcssDir = "public/stayedcss";
const cssFilePath = path.join(stayedcssDir, "style.css");
const jsonFilePath = path.join(stayedcssDir, "style.json");

async function initstayedcss() {
  try {
    // stayedcss 디렉토리 생성
    await fs.mkdir(stayedcssDir, { recursive: true });
    console.log(`📂 Directory created: ${stayedcssDir}`);

    // style.css 파일 생성
    await fs.writeFile(cssFilePath, "", "utf-8");
    console.log(`📝 File created: ${cssFilePath}`);

    // buffer.json 파일 생성
    await fs.writeFile(jsonFilePath, JSON.stringify({}, null, 2), "utf-8");
    console.log(`📝 File created: ${jsonFilePath}`);

    console.log("✅ stayedcss initialized successfully!");
  } catch (error) {
    console.error(`❌ Failed to initialize stayedcss: ${error}`);
  }
}

initstayedcss();
