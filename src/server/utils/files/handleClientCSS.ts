import { JsonType } from "../../../types";

export const writeClientCSS = (input: JsonType[], componentId: string) => {
  if (typeof window === "undefined") {
    console.warn("writeClientCSS can only run in the browser.");
    return;
  }

  // 중복 방지: 같은 클래스 이름을 가진 <style> 태그 확인
  const styleSheetClassName = `styles-${componentId}`;
  let styleElement = Array.from(
    document.getElementsByClassName(styleSheetClassName)
  ).find((el) => el instanceof HTMLStyleElement) as HTMLStyleElement | null;

  // <style> 태그가 없으면 새로 생성
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = styleSheetClassName;
    const head = document.head || document.getElementsByTagName("head")[0];
    head.appendChild(styleElement);
  }

  const styleSheet = styleElement.sheet as CSSStyleSheet;

  // 기존 스타일 삭제
  while (styleSheet.cssRules.length > 0) {
    styleSheet.deleteRule(0);
  }

  // 새 스타일 추가
  input.forEach((item) => {
    if (item.style) {
      try {
        styleSheet.insertRule(item.style, styleSheet.cssRules.length);
      } catch (error) {
        console.warn(`Failed to insert CSS rule: ${item.style}`, error);
      }
    } else {
      console.warn("Invalid style format:", item);
    }
  });
};
