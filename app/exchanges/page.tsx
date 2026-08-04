
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { exchangeService, SkillExchangeDTO } from "@/services/exchangeService";
import {
  LuSend,
  LuUser,
  LuSparkles,
  LuRefreshCw,
  LuBookOpen,
  LuCircleCheck,
  LuArrowRight,
} from "react-icons/lu";

function ExchangesContent() {
  const searchParams = useSearchParams();

  const [userId, setUserId] = useState<number | null>(null);

  // Form State
  const [providerId, setProviderId] = useState<string>("");
  const [targetUserName, setTargetUserName] = useState<string>("");
  const [requestedSkill, setRequestedSkill] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // 1. Auth & Logged-in User Check
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(Number(storedId));
    }
  }, []);

  // 2. Read URL Parameters & Pre-fill inputs
  useEffect(() => {
    const targetId =
      searchParams.get("targetUserId") ||
      searchParams.get("providerId") ||
      searchParams.get("userId");

    const skillParam =
      searchParams.get("skillName") ||
      searchParams.get("skill") ||
      searchParams.get("teachingSkill") ||
      searchParams.get("learningSkill") ||
      ("");

    const nameParam =
      searchParams.get("userName") ||
      searchParams.get("name") ||
      searchParams.get("teacherName");

    if (targetId) setProviderId(targetId);
    if (nameParam) setTargetUserName(nameParam);
    if (skillParam) setRequestedSkill(skillParam);

    const displayName = nameParam || "there";
    const targetSkill = skillParam || "your skill";
    
    // Pulls the logged-in user details from localStorage
    let currentSenderName = "User";
    let currentSenderEmail = "";

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed && typeof parsed === "object") {
          if (parsed.name) currentSenderName = parsed.name;
          if (parsed.email) currentSenderEmail = parsed.email;
        }
      } catch {
        currentSenderName = storedUser;
      }
    } else {
      currentSenderName = localStorage.getItem("name") || localStorage.getItem("userName") || "User";
      currentSenderEmail = localStorage.getItem("email") || localStorage.getItem("userEmail") || "";
    }

    setNotes(
      `Hi ${displayName}! I saw you are teaching ${targetSkill}. I would love to learn from you!\n\nBest regards,\n${currentSenderName}\n${currentSenderEmail}`
    );
  }, [searchParams]);

  const handleCreateExchange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setMessage({ text: "Please login to send connection requests.", isError: true });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const dto: SkillExchangeDTO = {
        requesterId: userId,
        providerId: Number(providerId),
        offeredSkill: "Skill Connection Request",
        requestedSkill: requestedSkill || "General Skill",
        notes,
        status: "PENDING",
      };

      const res = await exchangeService.createExchange(dto);
      setMessage({ 
        text: res?.message || "Request sent successfully! You can track it on your profile.", 
        isError: false 
      });

      // Reset Form
      setProviderId("");
      setTargetUserName("");
      setNotes("");
      setRequestedSkill("");
    } catch {
      setMessage({ text: "Failed to send request. Please check server connection.", isError: true });
    } finally {
      setSubmitting(false);
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-4 bg-slate-50/60 dark:bg-slate-950 flex items-center justify-center">
        <div className="max-w-md w-full p-8 rounded-3xl border border-teal-100 dark:border-teal-900/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xl">
            <LuUser />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Authentication Required</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
            Please log in or register to send proposals and manage your active skill connections.
          </p>
          <a
            href="/register"
            className="inline-block w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-teal-500/20 hover:opacity-95 transition"
          >
            Go to Register
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50/60 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex items-center justify-center">
      
      {/* Background Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-teal-300/20 dark:bg-teal-950/30 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-xl w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider border border-teal-500/20">
            <LuSparkles /> Direct Connect
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Send Skill Proposal
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Send a request to connect with another member for teaching and learning.
          </p>
        </div>

        {/* Send Proposal Form */}
        <div className="rounded-3xl border border-teal-100/80 dark:border-teal-900/40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-5">
          
          {message && (
            <div
              className={`p-4 text-xs rounded-2xl border font-medium flex items-center justify-between gap-3 ${
                message.isError
                  ? "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400"
                  : "bg-teal-500/10 border-teal-500/20 text-teal-700 dark:text-teal-300"
              }`}
            >
              <div className="flex items-center gap-2">
                {!message.isError && <LuCircleCheck className="text-base text-teal-600 shrink-0" />}
                <span>{message.text}</span>
              </div>
              {!message.isError && (
                <Link
                  href="/profile"
                  className="inline-flex items-center gap-1 font-bold underline hover:no-underline shrink-0 text-teal-700 dark:text-teal-400"
                >
                  View Profile <LuArrowRight />
                </Link>
              )}
            </div>
          )}

          <form onSubmit={handleCreateExchange} className="space-y-4 text-xs">
            
            {/* Target Teacher */}
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider mb-1.5 text-[10px]">
                Target Member / Teacher ID
              </label>
              <div className="relative flex items-center">
                <LuUser className="absolute left-3.5 text-slate-400 text-sm" />
                <input
                  type="text"
                  required
                  readOnly={Boolean(targetUserName)}
                  placeholder="Enter User ID"
                  value={targetUserName ? `${targetUserName} (ID: #${providerId})` : providerId}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setProviderId(val);
                  }}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all font-semibold"
                />
              </div>
            </div>

            {/* Requested Skill */}
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider mb-1.5 text-[10px]">
                Skill You Want to Learn
              </label>
              <div className="relative flex items-center">
                <LuBookOpen className="absolute left-3.5 text-teal-600 dark:text-teal-400 text-sm" />
                <input
                  type="text"
                  required
                  placeholder="e.g. React, English, UI Design"
                  value={requestedSkill}
                  onChange={(e) => setRequestedSkill(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-teal-700 dark:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all font-semibold"
                />
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider mb-1.5 text-[10px]">
                Message / Notes
              </label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Introduce yourself and offer what time works..."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || !providerId}
              className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-teal-500/20 transition flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {submitting ? <LuRefreshCw className="animate-spin text-base" /> : <LuSend className="text-base" />}
              Send Request
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default function ExchangesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-xs">Loading...</div>}>
      <ExchangesContent />
    </Suspense>
  );
}