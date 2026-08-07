
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FiSearch, 
  FiArrowRight, 
  FiRepeat, 
  FiCheckCircle, 
  FiClock,
  FiBookOpen,
  FiAward,
  FiStar,
  FiCheck,
  FiX
} from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { HiOutlineCode, HiOutlineCamera, HiOutlineMusicNote } from "react-icons/hi";

interface UserSkillDTO {
  id?: number;
  userId?: number;
  providerName?: string;
  userName?: string;
  name?: string;
  skillName: string;
  skillType?: string;
  proficiencyLevel?: string;
}

interface SkillExchangeDTO {
  id?: number;
  providerId?: number;
  providerName?: string;
  providerEmail?: string;
  requesterId?: number;
  requesterName?: string;
  requesterEmail?: string;
  offeredSkill: string;
  requestedSkill: string;
  status: string;
  notes?: string;
}

const API_BASE_URL = "http://localhost:8080";

export default function Hero() {
  const router = useRouter();
  
  // States for general listing/directory
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [skillsList, setSkillsList] = useState<UserSkillDTO[]>([]);
  const [exchangesList, setExchangesList] = useState<SkillExchangeDTO[]>([]);
  const [loadingSkills, setLoadingSkills] = useState<boolean>(false);
  const [loadingExchanges, setLoadingExchanges] = useState<boolean>(false);

  // States for platform statistics
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number>(4.9);

  // States for pre-login instant skill availability checker
  const [checkerQuery, setCheckerQuery] = useState<string>("");
  const [checkerResults, setCheckerResults] = useState<UserSkillDTO[]>([]);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  useEffect(() => {
    fetchRealSkills();
    fetchPublicExchanges();
    fetchPlatformStats();
  }, []);

  const fetchRealSkills = async () => {
    setLoadingSkills(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/skills/all`);
      if (response.ok) {
        const data: UserSkillDTO[] = await response.json();
        setSkillsList(data);
      }
    } catch (error) {
      console.error("Error fetching skills from backend:", error);
    } finally {
      setLoadingSkills(false);
    }
  };

  const fetchPublicExchanges = async () => {
    setLoadingExchanges(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/exchanges/getAll`);
      if (response.ok) {
        const data: SkillExchangeDTO[] = await response.json();
        setExchangesList(data);
      }
    } catch (error) {
      console.error("Error fetching public exchanges from backend:", error);
    } finally {
      setLoadingExchanges(false);
    }
  };

  const fetchPlatformStats = async () => {
    // Fetch total registered users count
    try {
      const usersRes = await fetch(`${API_BASE_URL}/count`);
      if (usersRes.ok) {
        const userCount = await usersRes.json();
        setTotalUsers(typeof userCount === "number" ? userCount : 0);
      }
    } catch (error) {
      console.error("Error fetching user count:", error);
    }

    // Fetch average rating
    try {
      const ratingRes = await fetch(`${API_BASE_URL}/api/ratings/average`);
      if (ratingRes.ok) {
        const avg = await ratingRes.json();
        if (typeof avg === "number") {
          setAverageRating(avg);
        } else if (typeof avg === "string" && !isNaN(parseFloat(avg))) {
          setAverageRating(parseFloat(avg));
        }
      }
    } catch (error) {
      console.error("Error fetching average rating:", error);
    }
  };

  // Instant pre-login skill checker handler
  const handleCheckSkillAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkerQuery.trim()) return;

    setIsChecking(true);
    setHasSearched(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/skills/search?skillName=${encodeURIComponent(checkerQuery.trim())}`
      );
      if (response.ok) {
        const data: UserSkillDTO[] = await response.json();
        setCheckerResults(data);
      } else {
        setCheckerResults([]);
      }
    } catch (error) {
      console.error("Error checking skill availability:", error);
      setCheckerResults([]);
    } finally {
      setIsChecking(false);
    }
  };

  const filteredExchanges = exchangesList.filter((exchange) => {
    const q = searchQuery.toLowerCase();
    return (
      exchange.offeredSkill?.toLowerCase().includes(q) ||
      exchange.requestedSkill?.toLowerCase().includes(q) ||
      exchange.providerName?.toLowerCase().includes(q) ||
      exchange.requesterName?.toLowerCase().includes(q)
    );
  });

  const limitedExchanges = filteredExchanges.slice(0, 5);

  return (
    <div className="bg-white dark:bg-[#030712] text-slate-800 dark:text-slate-100 font-sans scroll-smooth transition-colors duration-300">
      
      {/* SECTION 1: HERO / HOME */}
      <section id="home" className="relative pt-28 sm:pt-36 pb-12 sm:pb-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[200px] sm:h-[350px] bg-teal-500/25 dark:bg-teal-500/15 blur-[100px] sm:blur-[130px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 dark:bg-teal-500/20 px-3.5 py-1.5 text-xs text-teal-600 dark:text-teal-300 font-semibold shadow-sm">
                <span className="text-amber-500">★</span> Learn. Teach. Grow Together.
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.2] sm:leading-[1.15] text-slate-900 dark:text-slate-50">
                Exchange Skills. <br className="hidden sm:inline" />
                Build Connections. <br />
                <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-amber-500 dark:from-teal-300 dark:via-emerald-300 dark:to-amber-300 bg-clip-text text-transparent">
                  Grow Together.
                </span>
              </h1>

              <p className="text-slate-600 dark:text-slate-300 max-w-lg mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed">
                Skill Exchange is a community-driven platform connecting people to learn, teach, and grow together without money.
              </p>

<div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link
                  href="/register"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-500 dark:bg-teal-600 dark:hover:bg-teal-500 px-6 py-3.5 font-semibold text-white shadow-md shadow-teal-600/20 transition hover:shadow-teal-600/30 text-sm sm:text-base"
                >
                  Register Now <FiArrowRight />
                </Link>

                <Link 
                  href="/login" 
                  className="w-full sm:w-auto flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3.5 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition shadow-sm text-sm sm:text-base"
                >
                  Login
                </Link>
              </div>

              {/* Platform Statistics Section */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 max-w-lg mx-auto lg:mx-0">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                  {/* Registered Users */}
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                      <FaUsers />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                        {totalUsers}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                        Registered Users
                      </p>
                    </div>
                  </div>

                  {/* Average Rating */}
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400">
                      <FiStar />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                        {averageRating.toFixed(1)}/5
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                        Average Rating
                      </p>
                    </div>
                  </div>

                  {/* Total Skills */}
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <FiRepeat />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                        {skillsList.length}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                        Total Skills
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-3xl border border-teal-200 dark:border-teal-900/50 bg-white dark:bg-slate-900 p-6 sm:p-8 flex flex-col items-center justify-center shadow-xl">
                <div className="absolute top-4 sm:top-6 left-6 sm:left-8 p-2.5 sm:p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-900/50 text-teal-600 dark:text-teal-400">
                  <HiOutlineCode className="text-xl sm:text-2xl" />
                </div>
                <div className="absolute top-4 sm:top-6 right-6 sm:right-8 p-2.5 sm:p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400">
                  <HiOutlineCamera className="text-xl sm:text-2xl" />
                </div>
                <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 p-2.5 sm:p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-900/50 text-amber-600 dark:text-amber-400">
                  <HiOutlineMusicNote className="text-xl sm:text-2xl" />
                </div>

                <div className="flex items-center gap-4 sm:gap-6 my-auto">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-xl sm:text-2xl shadow-sm">
                    👨‍💻
                    <span className="text-[9px] sm:text-[10px] text-teal-600 dark:text-teal-400 font-semibold mt-1">Teaching</span>
                  </div>
                  <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 text-teal-600 dark:text-teal-400 animate-pulse">
                    <FiRepeat className="text-xl sm:text-2xl" />
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-xl sm:text-2xl shadow-sm">
                    👩‍🎨
                    <span className="text-[9px] sm:text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Learning</span>
                  </div>
                </div>

                <p className="text-[11px] sm:text-xs font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">
                  Peer-to-Peer Knowledge Swap
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: INSTANT SKILL AVAILABILITY CHECKER (PRE-LOGIN) */}
      <section id="skill-checker" className="py-14 sm:py-20 border-t border-slate-200 dark:border-slate-800 bg-teal-50/40 dark:bg-slate-900/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1.5 text-xs text-teal-600 dark:text-teal-300 font-semibold mb-3">
            🔍 Instant Platform Lookup
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Is Your Skill Registered Here?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-lg mx-auto mb-8">
            Type any skill name below to check if members on our platform are currently offering or looking for it—no account required.
          </p>

          <form onSubmit={handleCheckSkillAvailability} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-8">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <FiSearch />
              </div>
              <input
                type="text"
                value={checkerQuery}
                onChange={(e) => setCheckerQuery(e.target.value)}
                placeholder="Enter skill (e.g. React, Python, UI/UX)..."
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isChecking}
              className="rounded-xl bg-teal-600 hover:bg-teal-500 dark:bg-teal-600 dark:hover:bg-teal-500 px-6 py-3.5 font-semibold text-white text-xs sm:text-sm shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
            >
              {isChecking ? "Checking..." : "Check Skill"}
            </button>
          </form>

          {/* Checker Results Box */}
          {hasSearched && (
            <div className="max-w-xl mx-auto text-left">
              {isChecking ? (
                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center text-teal-600 text-xs">
                  Searching database...
                </div>
              ) : checkerResults.length > 0 ? (
                <div className="p-5 rounded-2xl border border-emerald-500/50 bg-white dark:bg-slate-900 shadow-lg space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-sm">
                      <FiCheck className="text-base" /> Found! Skill is registered on the platform
                    </div>
                    <span className="text-[11px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-semibold">
                      {checkerResults.length} Match{checkerResults.length > 1 ? "es" : ""}
                    </span>
                  </div>

                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {checkerResults.map((item, idx) => (
                      <div key={item.id || idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{item.skillName}</span>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            Type: <strong className="text-teal-600 dark:text-teal-400">{item.skillType || "General"}</strong> • User: <strong className="text-slate-700 dark:text-slate-300">{item.name || item.providerName || item.userName || (item.userId ? `User #${item.userId}` : "Member")}</strong>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-1 rounded bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 border border-teal-100 dark:border-teal-900">
                          Available
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-center">
                    <Link
                      href="/register"
                      className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center justify-center gap-1"
                    >
                      Want to trade this skill? Register to connect <FiArrowRight />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl border border-amber-500/40 bg-white dark:bg-slate-900 text-center shadow-md space-y-3">
                  <div className="inline-flex p-2 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-500">
                    <FiX className="text-lg" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">No exact matches found for "{checkerQuery}"</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    This skill isn't listed yet. Register an account now to be the first member to offer or request it!
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/register"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 text-white font-semibold text-xs shadow hover:bg-teal-500 transition"
                    >
                      Register & Add Skill <FiArrowRight />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section id="how-it-works" className="py-14 sm:py-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2 sm:mb-3">How Skill Exchange Works</h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-lg mx-auto mb-8 sm:mb-12">
            Start trading knowledge in 3 simple steps.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-left space-y-3 shadow-md hover:border-teal-500 transition">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-900/50 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm sm:text-base">
                1
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Create Your Profile</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                List the skills you can teach and the new skills you want to learn.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-left space-y-3 shadow-md hover:border-emerald-500 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm sm:text-base">
                2
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Find Your Match</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Search or get AI-recommended peer matches tailored to your goals.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-left space-y-3 shadow-md hover:border-amber-500 transition">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm sm:text-base">
                3
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Exchange & Grow</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Connect, schedule 1-on-1 sessions, and rate each other's experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: LIVE SKILL EXCHANGES */}
      <section id="exchanges" className="py-14 sm:py-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1 sm:mb-2">Live Skill Exchanges</h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">Recent public peer-to-peer swap highlights.</p>
          </div>

          {loadingExchanges ? (
            <div className="text-center py-10 text-teal-600 dark:text-teal-400 font-medium text-sm">Loading active exchanges...</div>
          ) : limitedExchanges.length > 0 ? (
            <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
              {limitedExchanges.map((exchange) => {
                const isCompleted = exchange.status?.toUpperCase() === "COMPLETED";
                const isAccepted = exchange.status?.toUpperCase() === "ACCEPTED" || exchange.status?.toUpperCase() === "SCHEDULED";

                return (
                  <div 
                    key={exchange.id} 
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md hover:border-teal-400 transition"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <div className={`p-2.5 sm:p-3 rounded-xl shrink-0 ${
                        isCompleted ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400" : "bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400"
                      }`}>
                        {isCompleted ? <FiCheckCircle className="text-base sm:text-lg" /> : <FiClock className="text-base sm:text-lg" />}
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                            {exchange.offeredSkill} <span className="text-teal-600 dark:text-teal-400 font-normal">↔</span> {exchange.requestedSkill}
                          </h4>
                        </div>

                        <div className="flex items-center gap-3 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <FiAward className="text-amber-500" /> Teacher: <strong className="text-slate-700 dark:text-slate-300">{exchange.providerName || "Member"}</strong>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <FiBookOpen className="text-teal-500" /> Learner: <strong className="text-slate-700 dark:text-slate-300">{exchange.requesterName || "Member"}</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className={`text-[11px] sm:text-xs font-medium px-3 py-1 rounded-full self-start sm:self-auto border ${
                      isCompleted 
                        ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-100 dark:border-emerald-900/50" 
                        : isAccepted 
                        ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 border-teal-100 dark:border-teal-900/50"
                        : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-100 dark:border-amber-900/50"
                    }`}>
                      {exchange.status || "Pending"}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
              No public exchanges available right now.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}