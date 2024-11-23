export const getFilePath = () => {
  const module = new URL(import.meta.url);
  const rootPath = module.pathname.split("/app")[1];
  return rootPath;
};
