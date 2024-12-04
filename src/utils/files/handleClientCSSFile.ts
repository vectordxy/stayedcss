import { Json } from "../../types";

export const writeClientCSS = (input: Json[], componentId: string) => {
  if (typeof window === "undefined") {
    console.warn("writeClientCSS can only run in the browser.");
    return;
  }

  // const styleSheetClassName = `styles-${componentId}`;
  // Array.from(document.getElementsByTagName("style")).forEach((el) => {
  //   if (
  //     el.id === styleSheetClassName && // 정확히 해당 id인지 확인
  //     el instanceof HTMLStyleElement
  //   ) {
  //     el.remove(); // 기존 스타일 태그 제거
  //     // console.log(`Removed old style tag with id: ${el.id}`);
  //   }
  // });

  // // 새로운 <style> 태그 생성
  // let styleElement = document.createElement("style");
  // styleElement.id = styleSheetClassName;
  // const head = document.head || document.getElementsByTagName("head")[0];
  // head.appendChild(styleElement);

  // const styleSheet = styleElement.sheet as CSSStyleSheet;

  // // 새 스타일 추가
  // input.forEach((item) => {
  //   if (item.style) {
  //     try {
  //       styleSheet.insertRule(item.style, styleSheet.cssRules.length);
  //     } catch (error) {
  //       console.warn(`Failed to insert CSS rule: ${item.style}`, error);
  //     }
  //   } else {
  //     console.warn("Invalid style format:", item);
  //   }
  // });

  // console.log(
  //   `Dynamic CSS rules added successfully with ID: ${styleSheetClassName}`
  // );
};
