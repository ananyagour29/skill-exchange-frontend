
"use client";

import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { LuSparkles } from "react-icons/lu";

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative overflow-hidden bg-slate-50 dark:bg-[#0B1315] border-t border-slate-200 dark:border-slate-800">
      
      {/* Smooth Fading Teal Gradient Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-teal-800 to-transparent opacity-90 shadow-[0_0_12px_rgba(20,184,166,0.6)]" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">

          {/* Left */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              <LuSparkles className="text-sm" />
              Empowering Growth
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Keep Learning,
              <br />
              <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Keep Growing.
              </span>
            </h2>
          </div>

          {/* Center */}
          <div className="max-w-md rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-7 py-6 shadow-lg">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Every skill you learn today opens new opportunities tomorrow.
            </p>
          </div>

          {/* Right */}
          <div className="space-y-3 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400">
              <FaHeart className="text-rose-500 animate-pulse" />
              <span>Made for passionate learners</span>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {year}{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                SkillExchange
              </span>
              . All Rights Reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}