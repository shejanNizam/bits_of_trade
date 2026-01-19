"use client";

import { mainTheme } from "@/utils/antTheme";
import { ConfigProvider } from "antd";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConfigProvider theme={mainTheme}>{children}</ConfigProvider>;
}
