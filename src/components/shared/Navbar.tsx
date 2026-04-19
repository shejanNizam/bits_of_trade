/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RootState } from "@/redux/store";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { useSelector } from "react-redux";
import default_img from "../../assets/user_img_default.png";
import CustomPrimaryButton from "./CustomPrimaryButton";
import CustomSecondaryButton from "./CustomSecondaryButton";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  const { user } = useSelector((state: RootState) => state.auth);

  // Get profile image URL with fallback
  const getProfileImageUrl = () => {
    if (
      !user ||
      !("profile_picture" in user) ||
      !(user as any).profile_picture ||
      imageError
    ) {
      return default_img;
    }
    return (
      process.env.NEXT_PUBLIC_IMAGE_URL + "/" + (user as any).profile_picture
    );
  };

  const profileImageUrl = getProfileImageUrl();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/discipline-system", label: "Discipline System" },
    { href: "/learning-hub", label: "Learning Hub" },
    { href: "/pricing", label: "Pricing" },
    { href: "/faqs", label: "FAQs" },
  ];

  const toggleDrawer = () => setIsOpen(!isOpen);

  const isActive = (href: string) => pathname === href;

  // Drawer colors based on theme
  const isDark = mounted && theme === "dark";
  const drawerBg = isDark ? "#0f172a" : "#ffffff";
  const drawerText = isDark ? "#f1f5f9" : "#000000";
  const drawerBorder = isDark ? "#374151" : "#e5e7eb";

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 transition-colors">
      <div className="container mx-auto px-4 flex items-center justify-between h-24">
        {/* Left - Logo */}
        <Link href="/" className="flex flex-col">
          <h1 className="text-2xl font-bold leading-tight">
            <span className="text-gray-900 dark:text-white">BitsOf</span>
            <span className="text-blue-500">Trade</span>
          </h1>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 tracking-wide">
            Discipline • Journal • Learning
          </p>
        </Link>

        {/* Middle - Menu (Desktop) */}
        <div className="hidden md:flex space-x-8 font-medium border border-gray-200 dark:border-gray-700 p-4 rounded-full bg-gray-50 dark:bg-slate-800">
          {navLinks.map((link) => (
            <Link
              className={`font-semibold transition-all duration-200 rounded-lg px-2 ${
                isActive(link.href)
                  ? "text-blue-500 font-bold border-b-4 border-blue-500"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500"
              }`}
              key={link.href}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right - Theme Toggle & Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <Link
              className="flex justify-start items-center gap-2 cursor-pointer group"
              href="/user-dashboard"
            >
              <div className="relative w-10 h-10">
                <Image
                  src={profileImageUrl ? profileImageUrl : default_img}
                  alt="profile_image"
                  fill
                  className="rounded-full border-2 border-blue-500 object-cover"
                  onError={() => setImageError(true)}
                />
              </div>
              <TiArrowSortedDown className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors" />
            </Link>
          ) : (
            <>
              <Link href="/signup">
                <CustomPrimaryButton>Get Started</CustomPrimaryButton>
              </Link>
              <Link href="/login">
                <CustomSecondaryButton>Login</CustomSecondaryButton>
              </Link>
            </>
          )}
        </div>

        {/* Mobile - Theme Toggle & Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button onClick={toggleDrawer}>
            <MenuOutlined className="text-2xl text-gray-900 dark:text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        placement="left"
        open={isOpen}
        onClose={toggleDrawer}
        closable={false}
        styles={{
          wrapper: { width: "70%", height: "100%" },
          body: {
            padding: 0,
            backgroundColor: drawerBg,
            color: drawerText,
          },
          header: {
            padding: 0,
            backgroundColor: drawerBg,
            borderBottom: `1px solid ${drawerBorder}`,
          },
          mask: {
            backgroundColor: "rgba(0, 0, 0, 0.45)",
          },
        }}
      >
        {/* Drawer Header */}
        <div
          className="flex items-center justify-between p-4 border-b"
          style={{
            backgroundColor: drawerBg,
            borderBottomColor: drawerBorder,
          }}
        >
          <Link href="/" onClick={toggleDrawer} className="flex flex-col">
            <h1 className="text-2xl font-bold leading-tight">
              <span style={{ color: isDark ? "#ffffff" : "#111827" }}>
                BitsOf
              </span>
              <span className="text-blue-500">Trade</span>
            </h1>
            <p
              className="text-[10px] tracking-wide"
              style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
            >
              Discipline • Journal • Learning
            </p>
          </Link>
          <button
            onClick={toggleDrawer}
            className="text-blue-500 hover:opacity-70 focus:outline-none w-8 h-8 flex items-center justify-center transition-opacity"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div
          className="flex flex-col p-4 space-y-2 h-full"
          style={{ backgroundColor: drawerBg }}
        >
          {navLinks?.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={toggleDrawer}
              className="font-semibold transition-all duration-200 px-2 py-2 rounded-full"
              style={{
                color: isActive(link.href)
                  ? "#3b82f6"
                  : isDark
                    ? "#d1d5db"
                    : "#374151",
                backgroundColor: isActive(link.href)
                  ? isDark
                    ? "rgba(59, 130, 246, 0.1)"
                    : "#eff6ff"
                  : "transparent",
                borderLeft: isActive(link.href)
                  ? "4px solid #3b82f6"
                  : "4px solid transparent",
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Drawer Buttons */}
          <div className="flex flex-col gap-3 mt-6">
            {user ? (
              <Link
                href="/user-dashboard"
                onClick={toggleDrawer}
                className="flex justify-start items-center gap-3 cursor-pointer w-full px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors group"
              >
                <div className="relative w-10 h-10">
                  <Image
                    src={profileImageUrl}
                    alt="profile_image"
                    fill
                    className="rounded-full border-2 border-blue-500 object-cover"
                    onError={() => setImageError(true)}
                  />
                </div>
                <div className="flex-1">
                  <p
                    className="font-semibold text-sm"
                    style={{ color: isDark ? "#f1f5f9" : "#111827" }}
                  >
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
                  >
                    {user?.email}
                  </p>
                </div>
                <TiArrowSortedDown
                  style={{ color: isDark ? "#f1f5f9" : "#111827" }}
                  className="group-hover:text-blue-500 transition-colors"
                />
              </Link>
            ) : (
              // When user is NOT logged in - show Login button
              <>
                <Link href="/signup" onClick={toggleDrawer}>
                  <CustomPrimaryButton className="w-full">
                    Get Started
                  </CustomPrimaryButton>
                </Link>
                <Link href="/login" onClick={toggleDrawer}>
                  <CustomSecondaryButton className="w-full">
                    Login
                  </CustomSecondaryButton>
                </Link>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </nav>
  );
}
