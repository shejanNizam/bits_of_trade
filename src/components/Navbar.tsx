"use client";

import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import main_logo from "../assets/main_logo.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/discipline-system", label: "Discipline System" },
    { href: "/learning-hub", label: "Learning Hub" },
    { href: "/pricing", label: "Pricing" },
    { href: "/faqs", label: "FAQs" },
  ];

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        {/* Left - Logo */}
        <Link href="/">
          <Image
            src={main_logo}
            alt="BitsOfTrade Logo"
            className="w-28 h-auto"
            width={1000}
            height={1000}
            priority
          />
        </Link>

        {/* Middle - Menu (Desktop) */}
        <div className="hidden md:flex space-x-6 font-normal text-black border border-gray-200 p-4 rounded-full">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="font-medium">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right - Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/">
            <Button size="large">Login</Button>
          </Link>
          <Link href="/">
            <Button type="primary" size="large">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleDrawer}>
          <MenuOutlined className="text-2xl text-black" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        placement="left"
        width={"70%"}
        open={isOpen}
        onClose={toggleDrawer}
        closable={false}
        styles={{
          body: { padding: 0, backgroundColor: "#ffffff", color: "#000000" },
          header: { padding: 0 },
        }}
      >
        {/* Drawer Header - Logo left & Close button right */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link href="/" onClick={toggleDrawer}>
            <Image
              src={main_logo}
              alt="BitsOfTrade Logo"
              className="w-28 h-auto"
              width={1000}
              height={1000}
              priority
            />
          </Link>
          <button
            onClick={toggleDrawer}
            className="text-black hover:text-gray-600 focus:outline-none w-8 h-8 flex items-center justify-center"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Drawer Body - Links */}
        <div className="flex flex-col p-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={toggleDrawer}
              className="font-medium text-black"
            >
              {link.label}
            </Link>
          ))}

          {/* Drawer Buttons */}
          <div className="flex flex-col gap-3 mt-6">
            <Link href="/" onClick={toggleDrawer}>
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
