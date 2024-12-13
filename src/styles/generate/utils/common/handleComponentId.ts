export const formatComponentId = (input: string) => {
  const result = input.toLowerCase().replaceAll("/", "-");
  return result;
};

export const toLowerCaseComponentId = (input: string) => {
  const result = input.toLowerCase();
  return result;
};
