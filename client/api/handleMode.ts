const toggleMode = (isDarkMode: boolean) => {
  const existingLink = document.getElementById("dynamic-stylesheet");
  if (existingLink) {
    existingLink.remove();
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.id = "dynamic-stylesheet";
  link.href = isDarkMode ? "stylecache/darkmode.css" : "stylecache/style.css";

  document.head.appendChild(link);
};

export const handleMode = async (mode: "light" | "dark") => {
  // 현재 적용된 스타일 URL 가져오기
  const currentMode = document
    .getElementById("dynamic-stylesheet")
    ?.getAttribute("href");

  // 동일한 모드일 경우 아무 작업도 하지 않음
  if (
    (mode === "dark" && currentMode === "stylecache/darkmode.css") ||
    (mode === "light" && currentMode === "stylecache/style.css")
  ) {
    return;
  }

  // 쿠키 업데이트
  await fetch("/api/set-mode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode }),
  });

  // 스타일 업데이트
  toggleMode(mode === "dark");
};
