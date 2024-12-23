import { MainInput } from "../../../../client";

let isProcessing = false;

export const postData = async (data: MainInput) => {
  if (isProcessing) {
    return; // 비동기 작업이 진행 중이면 함수 종료
  }

  isProcessing = true; // 비동기 작업 시작

  try {
    await fetch("/api/client-style", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
  } catch (error) {
    console.error("Error applying style:", error);
  } finally {
    isProcessing = false; // 비동기 작업 종료
  }
};
