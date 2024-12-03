#!/usr/bin/env node

import { promises as fs } from "fs";
import path from "path";

const stayedcssDir = "stayedcss";
const cssFilePath = path.join(stayedcssDir, "index.css");

async function initStayedcss() {
  try {
    await fs.mkdir(stayedcssDir, { recursive: true });
    console.log(`📂 Directory created: ${stayedcssDir}`);

    await fs.writeFile(cssFilePath, "", "utf-8");
    console.log(`📝 File created: ${cssFilePath}`);

    console.log("✅ stayedcss initialized successfully!");
  } catch (error) {
    console.error(`❌ Failed to initialize stayedcss: ${error}`);
  }
}

initStayedcss();
