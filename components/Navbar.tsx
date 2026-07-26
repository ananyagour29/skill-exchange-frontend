"use client";

import Link from "next/link";
import { PiHandshakeFill } from "react-icons/pi";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-[#E5DDD4] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A67C52] shadow-md">
            <PiHandshakeFill className="text-2xl text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#A67C52]">
              SkillExchange
            </h1>

            <p className="text-xs text-gray-500">
              Learn • Teach • Grow
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}