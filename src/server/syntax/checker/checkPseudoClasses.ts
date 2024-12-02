const validPseudoClasses = [
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

  // 구조적 조건 관련
  ":first-child",
  ":last-child",
  ":nth-child(n)",
  ":nth-last-child(n)",
  ":only-child",
  ":first-of-type",
  ":last-of-type",
  ":nth-of-type(n)",
  ":nth-last-of-type(n)",
  ":only-of-type",
  ":empty",

  // 기타
  ":not(selector)",
  ":root",
  ":target",
  ":lang(language)",
  ":is(selector)",
  ":where(selector)",
  ":has(selector)",
  ":dir(direction)",
  ":scope",
];

export const isPseudoClasses = (input: string) => {
  if (validPseudoClasses.includes(input)) {
    return true;
  }

  return false;
};
