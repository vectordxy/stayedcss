export const changeScreenMode = async (mode: "light" | "dark") => {
  document.body.classList.remove("dark", "light");
  document.body.classList.add(mode);

  await fetch("/api/set-mode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode }),
  });
};
