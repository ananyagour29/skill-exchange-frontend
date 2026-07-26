"use client";

import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-16 bg-[#F8F4EF]">
      <div className="flex min-h-[240px] items-center justify-center px-6 py-10">
        <div className="text-center">

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#2D2D2D]">
            Keep Learning,
            <br className="block md:hidden" />
            <span className="text-[#A67C52]">
              {" "}Keep Growing.
            </span>
          </h2>

          {/* Quote */}
          <div className="mx-auto mt-5 max-w-lg rounded-2xl border border-[#E7DDD4] bg-white px-7 py-5 shadow-sm">
            <p className="text-base leading-7 text-gray-600">
              Every skill you learn today becomes an opportunity tomorrow.
            </p>
          </div>

          {/* Bottom */}
          <div className="mt-7">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-[#A67C52]">
              <FaHeart className="text-xs" />
              <span>Made for passionate learners</span>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              © {year} SkillExchange. All Rights Reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}