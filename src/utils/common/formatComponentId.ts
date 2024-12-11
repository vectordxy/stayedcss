export const formatComponentId = (input: string) => {
  const result = input.toLowerCase().replaceAll("/", "-");
  return result;
};
