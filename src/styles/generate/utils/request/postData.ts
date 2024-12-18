import { MainInput } from "../../../../client";

let isProcessing = false;
let isDarkProcessing = false;

export const postData = async (data: MainInput, mode: string) => {
  if (isProcessing) {
    return; // 비동기 작업이 진행 중이면 함수 종료
  }

  isProcessing = true; // 비동기 작업 시작

  try {
    await fetch("/api/client-style", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, mode }),
    });
  } catch (error) {
    console.error("Error applying style:", error);
  } finally {
    isProcessing = false; // 비동기 작업 종료
  }
};

export const postDarkData = async (data: MainInput, mode: string) => {
  if (isDarkProcessing) {
    return; // 비동기 작업이 진행 중이면 함수 종료
  }

  isDarkProcessing = true; // 비동기 작업 시작
  try {
    await fetch("/api/client-style", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, mode }),
    });
  } catch (error) {
    console.error("Error applying style:", error);
  } finally {
    isDarkProcessing = false; // 비동기 작업 종료
  }
};
