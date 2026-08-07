
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { userService } from "@/services/userService";
import skillService from "@/services/skillService";

import {
  LuGraduationCap,
  LuBookMarked,
  LuArrowLeft,
  LuRefreshCw,
  LuRepeat,
  LuSend,
  LuLayers,
  LuCircleCheck,
  LuTag,
  LuSparkles,
  LuArrowUpRight,
} from "react-icons/lu";

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params?.id as string;

  const [userData, setUserData] = useState<any>(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [exchangeCount, setExchangeCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    let isMounted = true;

    const fetchAllUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [profileResult, allSkillsResult, exchangeResult] = await Promise.allSettled([
          userService.getUserProfile(userId),
          skillService.searchSkills({}),
          userService.getUserExchanges(userId),
        ]);

        if (!isMounted) return;

        // 1. Profile Data
        if (profileResult.status === "fulfilled" && profileResult.value) {
          setUserData(profileResult.value);
        } else {
          setError("User profile not found.");
        }

        // 2. Skills Data
        if (allSkillsResult.status === "fulfilled" && Array.isArray(allSkillsResult.value)) {
          const userSkills = allSkillsResult.value.filter(
            (s: any) =>
              String(s.user?.id ?? s.userId ?? s.user_id) === String(userId)
          );
          setSkills(userSkills);
        }

        // 3. Exchange History Count
        if (exchangeResult.status === "fulfilled") {
          const val = exchangeResult.value;
          if (Array.isArray(val)) {
            setExchangeCount(val.length);
          } else if (typeof val === "number") {
            setExchangeCount(val);
          }
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
        if (isMounted) setError("Failed to load profile details.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAllUserData();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const displayName =
    userData?.name || userData?.fullName || userData?.user?.name || "Community Member";
  const bio = userData?.bio || userData?.about || "No bio description provided yet.";

  const teachingCount = skills.filter(
    (s) =>
      (s.skillType || s.type || "").toUpperCase() === "TEACHING" ||
      (s.skillType || s.type || "").toUpperCase() === "BOTH"
  ).length;

  const learningCount = skills.filter(
    (s) =>
      (s.skillType || s.type || "").toUpperCase() === "LEARNING" ||
      (s.skillType || s.type || "").toUpperCase() === "BOTH"
  ).length;

  // Direct Exchange Navigation
  const handleInitiateExchange = (skill: any) => {
    const query = new URLSearchParams();

    // User who will receive the request
    query.set("providerId", userId);

    // Optional skill details
    query.set("skillId", String(skill.id));
    query.set("skillName", skill.skillName || skill.name);

    router.push(`/exchanges?${query.toString()}`);
  };

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="relative min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pt-28 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500/20 selection:text-indigo-600">
        
        {/* Aesthetic Ambient Glowing Orbs */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
          <div className="absolute -top-10 left-1/4 w-[500px] h-[500px] bg-indigo-300/30 dark:bg-indigo-900/20 blur-[120px] rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-teal-300/30 dark:bg-teal-900/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-rose-200/30 dark:bg-rose-900/15 blur-[120px] rounded-full" />
        </div>

        <div className="relative mx-auto max-w-4xl space-y-8">
          
          {/* Top Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="group inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 cursor-pointer"
            >
              <div className="p-2 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm group-hover:-translate-x-1 transition-transform backdrop-blur-md">
                <LuArrowLeft className="text-sm" />
              </div>
              <span>Back to Search</span>
            </button>
          </div>

          {loading ? (
            <div className="py-28 text-center flex flex-col items-center justify-center gap-4 text-slate-400 dark:text-slate-500">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-indigo-400/30 blur-xl animate-pulse" />
                <LuRefreshCw className="animate-spin text-3xl text-indigo-500 relative z-10" />
              </div>
              <span className="font-medium text-xs tracking-widest uppercase text-slate-400 dark:text-slate-500">
                Crafting profile view...
              </span>
            </div>
          ) : error || !userData ? (
            <div className="rounded-3xl border border-rose-200/70 dark:border-rose-900/40 bg-white/70 dark:bg-slate-900/70 p-12 text-center text-rose-600 dark:text-rose-400 shadow-xl shadow-rose-950/5 backdrop-blur-xl">
              <p className="font-semibold text-lg">{error || "User profile unavailable."}</p>
              <Link
                href="/search"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Return to Search <LuArrowUpRight />
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              
              {/* Profile Card Header */}
              <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-8 sm:p-10 border border-white/60 dark:border-slate-800/80 shadow-2xl shadow-indigo-950/5 space-y-8">
                
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left">
                  
                  {/* Avatar Container with Soft Gradient */}
                  <div className="relative group shrink-0">
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-indigo-400 via-teal-300 to-rose-300 blur-md opacity-60 group-hover:opacity-80 transition duration-300" />
                    <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-teal-500 text-white font-extrabold text-4xl sm:text-5xl shadow-lg border border-white/40">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  <div className="space-y-3 flex-1">
                    <div>
                      <div className="flex items-center justify-center sm:justify-start gap-2.5">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                          {displayName}
                        </h1>
                        <span className="inline-flex items-center p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" title="Verified Member">
                          <LuCircleCheck className="text-base" />
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-normal pt-1">
                      {bio}
                    </p>
                  </div>
                </div>

                {/* Performance Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200/60 dark:border-slate-800/60 pt-8">
                  
                  <div className="group rounded-2xl bg-white/50 dark:bg-slate-950/40 p-4 border border-slate-200/50 dark:border-slate-800/50 hover:border-indigo-400/40 transition-all duration-200 backdrop-blur-xs">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                      <LuRepeat className="text-indigo-500 text-sm group-hover:rotate-180 transition-transform duration-500" /> Exchanges
                    </div>
                    <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                      {exchangeCount}
                    </p>
                  </div>

                  <div className="group rounded-2xl bg-white/50 dark:bg-slate-950/40 p-4 border border-slate-200/50 dark:border-slate-800/50 hover:border-teal-400/40 transition-all duration-200 backdrop-blur-xs">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                      <LuLayers className="text-teal-500 text-sm group-hover:scale-110 transition-transform" /> Total Skills
                    </div>
                    <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                      {skills.length}
                    </p>
                  </div>

                  <div className="group rounded-2xl bg-white/50 dark:bg-slate-950/40 p-4 border border-slate-200/50 dark:border-slate-800/50 hover:border-emerald-400/40 transition-all duration-200 backdrop-blur-xs">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                      <LuGraduationCap className="text-emerald-500 text-sm group-hover:scale-110 transition-transform" /> Teaching
                    </div>
                    <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                      {teachingCount}
                    </p>
                  </div>

                  <div className="group rounded-2xl bg-white/50 dark:bg-slate-950/40 p-4 border border-slate-200/50 dark:border-slate-800/50 hover:border-amber-400/40 transition-all duration-200 backdrop-blur-xs">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                      <LuBookMarked className="text-amber-500 text-sm group-hover:scale-110 transition-transform" /> Learning
                    </div>
                    <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                      {learningCount}
                    </p>
                  </div>

                </div>
              </div>

              {/* User Skills Section Header */}
              <div className="flex items-center justify-between border-b border-slate-200/70 dark:border-slate-800/70 pb-4 pt-2">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2.5">
                  <span className="p-1.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    <LuSparkles className="text-base" />
                  </span>
                  Published Skills
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    {skills.length}
                  </span>
                </h2>
              </div>

              {/* Skills Cards Grid */}
              {skills.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-12 text-center text-slate-400 font-medium">
                  No skills published by this user yet.
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {skills.map((s, i) => {
                    const rawType = (s.skillType || s.type || "TEACHING").toUpperCase();
                    const isTeaching = rawType === "TEACHING" || rawType === "BOTH";

                    return (
                      <div
                        key={s.id || i}
                        className="group relative rounded-3xl border border-white/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-7 shadow-xl shadow-slate-900/[0.03] hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 flex flex-col justify-between space-y-6"
                      >
                        <div className="space-y-4">
                          
                          {/* Tags row */}
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span
                              className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                                isTeaching
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                  : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
                              }`}
                            >
                              {isTeaching ? (
                                <LuGraduationCap className="text-xs" />
                              ) : (
                                <LuBookMarked className="text-xs" />
                              )}
                              {rawType}
                            </span>

                            {s.category && (
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
                                <LuTag className="text-[10px] text-teal-500" /> {s.category}
                              </span>
                            )}
                          </div>

                          {/* Skill Name */}
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {s.skillName || s.name}
                          </h3>

                          {/* Skill Description */}
                          {s.description && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 font-normal">
                              {s.description}
                            </p>
                          )}
                        </div>

                        {/* Card Footer with Aesthetic Gradient Button */}
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end">
                          <button
                            onClick={() => handleInitiateExchange(s)}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-teal-500 hover:from-indigo-600 hover:to-teal-600 text-white px-4 py-2.5 text-xs font-bold shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 active:scale-95 shrink-0 cursor-pointer"
                          >
                            <LuSend className="text-xs" /> Send Request
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

        </div>
      </main>

      <Footer />
    </ProtectedRoute>
  );
}