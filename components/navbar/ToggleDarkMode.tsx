"use client";

import { useTheme } from "next-themes";

const ToggleDarkMode = () => {
  const { theme, setTheme } = useTheme();

  console.log(theme);

  return <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Change</button>
}

export default ToggleDarkMode;