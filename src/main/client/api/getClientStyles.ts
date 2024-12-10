import { MainInput } from "../../../client";
import { transformStyles } from "../../../utils/common/transformStyles";

let isProcessing = false;

const postData = async (input: MainInput) => {
  if (isProcessing) {
    return; // 비동기 작업이 진행 중이면 함수 종료
  }

  isProcessing = true; // 비동기 작업 시작

  try {
    await fetch("/api/client-style", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  } catch (error) {
    console.error("Error applying style:", error);
  } finally {
    isProcessing = false; // 비동기 작업 종료
  }
};

export const stayedClientStyle = (input: MainInput) => {
  if (typeof window !== "undefined") {
    postData(input);
  }

  return transformStyles(input);
};

// export function stayedClientDarkModeStyle(input: MainInput, config?: Config) {
//   return getClientStyles(input, "dark", config);
// }
