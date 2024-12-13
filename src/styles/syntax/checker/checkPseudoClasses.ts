const validPseudoClasses = new Set([
  // 사용자 상호작용 관련
  ":hover",
  ":focus",
  ":active",
  ":visited",
  ":link",
  ":focus-visible",
  ":focus-within",

  // 상태 관련
  ":checked",
  ":disabled",
  ":enabled",
  ":required",
  ":optional",
  ":read-only",
  ":read-write",
  ":indeterminate",
  ":invalid",
  ":valid",
  ":in-range",
  ":out-of-range",
  ":placeholder-shown",
  ":fullscreen",
  ":picture-in-picture",

  // 구조적 조건 관련
  ":first-child",
  ":last-child",
  ":only-child",
  ":first-of-type",
  ":last-of-type",
  ":only-of-type",
  ":empty",

  // 기타
  ":not",
  ":root",
  ":target",
  ":is",
  ":where",
  ":has",
  ":scope",
]);

export const isPseudoClasses = (input: string) => {
  if (validPseudoClasses.has(input)) {
    return true;
  }

  return false;
};
