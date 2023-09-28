"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider><Provider store={store}>{children}</Provider></ThemeProvider>;
}