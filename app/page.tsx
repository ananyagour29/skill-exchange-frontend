"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  // 1. On initial mount, restore saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme !== null) {
      const isDark = savedTheme === "dark";
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // If no preference saved, check system theme
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    setMounted(true);
  }, []);

  // 2. Sync changes whenever isDarkMode changes (after initial mount)
  const handleThemeChange = (newMode: boolean | ((prev: boolean) => boolean)) => {
    setIsDarkMode((prev) => {
      const updatedMode = typeof newMode === "function" ? newMode(prev) : newMode;
      
      if (updatedMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }

      return updatedMode;
    });
  };

  // Prevent UI flash before theme is restored from localStorage
  if (!mounted) {
    return <main className="min-h-screen bg-white dark:bg-[#030712]" />;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#030712] transition-colors duration-300 flex flex-col justify-between">
      <div>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={handleThemeChange} />
        <Hero />
      </div>
      <Footer />
    </main>
  );
}