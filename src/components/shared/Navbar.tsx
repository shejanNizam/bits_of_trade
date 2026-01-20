"use client";

import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  // const showLoading = () => {
  //   setIsOpen(true);
  //   setLoading(true);

  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // };

  const navLinks = [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/discipline-system", label: "Discipline System" },
    { href: "/learning-hub", label: "Learning Hub" },
    { href: "/pricing", label: "Pricing" },
    { href: "/faqs", label: "FAQs" },
  ];

  const toggleDrawer = () => setIsOpen(!isOpen);

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        {/* Left - Logo */}
        <Link href="/" className="flex flex-col">
          <h1 className="text-2xl font-bold leading-tight">
            <span className="text-gray-900">BitsOf</span>
            <span className="text-blue-500">Trade</span>
          </h1>
          <p className="text-[10px] text-gray-500 tracking-wide">
            Discipline • Journal • Learning
          </p>
        </Link>

        {/* Middle - Menu (Desktop) */}
        <div className="hidden md:flex space-x-4 font-medium text-black border border-gray-300 p-4 rounded-full">
          {navLinks.map((link) => (
            <Link
              className={`rounded-full transition-colors ${
                isActive(link.href)
                  ? "text-primary font-semibold"
                  : "hover:text-secondary"
              }`}
              key={link.href}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right - Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button size="large">Login</Button>
          </Link>
          <Link href="/">
            <Button type="primary" size="large">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          // onClick={showLoading}
          onClick={toggleDrawer}
        >
          <MenuOutlined className="text-2xl" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        placement="left"
        open={isOpen}
        onClose={toggleDrawer}
        closable={false}
        // loading={loading}
        styles={{
          wrapper: { width: "70%", height: "100%" },
          body: { padding: 0, backgroundColor: "#ffffff", color: "#2083d4" },
          header: { padding: 0 },
        }}
      >
        {/* Drawer Header - Logo left & Close button right */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link href="/" onClick={toggleDrawer} className="flex flex-col">
            <h1 className="text-2xl font-bold leading-tight">
              <span className="text-gray-900">BitsOf</span>
              <span className="text-blue-500">Trade</span>
            </h1>
            <p className="text-[10px] text-gray-500 tracking-wide">
              Discipline • Journal • Learning
            </p>
          </Link>
          <button
            onClick={toggleDrawer}
            className="text-secondary hover:text-gray-600 focus:outline-none w-8 h-8 flex items-center justify-center"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Drawer Body - Links */}
        <div className="flex flex-col p-6 space-y-4">
          {navLinks?.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={toggleDrawer}
              className={`font-medium transition-colors ${
                isActive(link.href)
                  ? "text-primary font-semibold"
                  : "text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Drawer Buttons */}
          <div className="flex flex-col gap-3 mt-6">
            <Link href="/login" onClick={toggleDrawer}>
              <Button className="w-full">Login</Button>
            </Link>
            <Link href="/" onClick={toggleDrawer}>
              <Button type="primary" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </Drawer>
    </nav>
  );
}
