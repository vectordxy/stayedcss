#!/usr/bin/env node

import { promises as fs } from "fs";
import path from "path";

const stayedcssDir = "stayedcss";
const cssFilePath = path.join(stayedcssDir, "index.css");
const darkmodeCssFilePath = path.join(stayedcssDir, "darkmode.css");

const initialCSSContent = `@import "./darkmode.css";
`;

async function initStayedcss() {
  try {
    await fs.mkdir(stayedcssDir, { recursive: true });
    console.log(`📂 Directory created: ${stayedcssDir}`);

    await fs.writeFile(cssFilePath, initialCSSContent, "utf-8");
    console.log(`📝 File created: ${cssFilePath}`);

    await fs.writeFile(darkmodeCssFilePath, "", "utf-8");
    console.log(`📝 File created: ${darkmodeCssFilePath}`);

    console.log("✅ stayedcss initialized successfully!");
  } catch (error) {
    console.error(`❌ Failed to initialize stayedcss: ${error}`);
  }
}

initStayedcss();
