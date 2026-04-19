"use client";

import { useGetUserDataQuery } from "@/redux/api/userApi/userApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { darkTheme, lightTheme } from "@/utils/antTheme";
import { ConfigProvider, theme } from "antd";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function AntdConfigProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  const { data } = useGetUserDataQuery(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    setMounted(true);
    dispatch(
      setCredentials({
        user: data,
        token: "",
      }),
    );
  }, [data, dispatch]);

  // Update theme when resolvedTheme changes
  useEffect(() => {
    if (resolvedTheme === "dark") {
      setCurrentTheme(darkTheme);
    } else {
      setCurrentTheme(lightTheme);
    }
  }, [resolvedTheme]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ConfigProvider
      theme={{
        ...currentTheme,
        algorithm:
          resolvedTheme === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="bits-of-trade-theme"
    >
      <AntdConfigProvider>{children}</AntdConfigProvider>
    </NextThemesProvider>
  );
}
