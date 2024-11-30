export const toggleDarkMode = (isDarkMode: boolean) => {
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
