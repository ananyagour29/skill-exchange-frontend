"use client";

import { useEffect, useState, useMemo, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import {
  FiSearch,
  FiFilter,
  FiUser,
  FiStar,
  FiGrid,
  FiList,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiBookOpen,
} from "react-icons/fi";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ProtectedRoute from "@/components/ProtectedRoute";

import skillService, { Skill, SkillType } from "@/services/skillService";

const CATEGORIES = ["All", "Development", "Design", "Data Science", "Marketing", "Business"];

export default function SearchPage() {
  const router = useRouter();

  // Search & Filter State
  const [skillName, setSkillName] = useState("");
  const [skillType, setSkillType] = useState<SkillType | "">("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Data & Async State
  const [results, setResults] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // Execute API Search
  const executeSearch = async (overrideType?: SkillType | "") => {
    setLoading(true);
    const selectedType = overrideType !== undefined ? overrideType : skillType;

    try {
      const data = await skillService.searchSkills({
        skillName: skillName.trim() || undefined,
        skillType: selectedType || undefined,
      });
      setResults(data || []);
      setCurrentPage(1);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial Fetch on mount
  useEffect(() => {
    executeSearch();
  }, []);

  // Handle Type Change (Triggers instant API fetch)
  const handleTypeChange = (newType: SkillType | "") => {
    setSkillType(newType);
    executeSearch(newType);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeSearch();
    }
  };

  const handleClearFilters = async () => {
    setSkillName("");
    setSkillType("");
    setActiveCategory("All");
    setCurrentPage(1);

    setLoading(true);
    try {
      const data = await skillService.searchSkills({});
      setResults(data || []);
    } catch (error) {
      console.error("Failed to reset search:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Safe Category Filter (Client-Side)
  const filteredSkills = useMemo(() => {
    if (activeCategory === "All") return results;
    return results.filter((skill: any) => {
      if (!skill.category) return false;
      return skill.category.toLowerCase() === activeCategory.toLowerCase();
    });
  }, [results, activeCategory]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);
  const paginatedSkills = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSkills.slice(start, start + itemsPerPage);
  }, [filteredSkills, currentPage]);

  const getBadgeStyle = (type?: string) => {
    switch (type) {
      case "TEACHING":
        return "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800/80";
      case "LEARNING":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/80";
      default:
        return "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/80";
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
        <div className="mx-auto max-w-6xl space-y-8">
          
          {/* Header */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 dark:bg-teal-950/60 px-3.5 py-1 text-sm font-semibold text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60 mb-3">
              <FiBookOpen className="text-teal-600 dark:text-teal-400" /> Skill Marketplace
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Explore Skills & Mentors
            </h1>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Find peers to learn from, collaborate with, or share your knowledge across tech, design, and business.
            </p>
          </div>

          {/* Search Bar & Primary Filters */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm space-y-4">
            <div className="grid gap-4 md:grid-cols-12 items-center">
              
              {/* Text Input */}
              <div className="relative md:col-span-5">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg" />
                <input
                  type="text"
                  placeholder="Search by skill name..."
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 py-3.5 pl-11 pr-10 text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none transition focus:border-teal-500 dark:focus:border-teal-400 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-teal-500/10 dark:focus:ring-teal-400/10"
                />
                {skillName && (
                  <button
                    onClick={() => {
                      setSkillName("");
                      executeSearch();
                    }}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <FiX className="text-lg" />
                  </button>
                )}
              </div>

              {/* Skill Type Dropdown */}
              <div className="relative md:col-span-3">
                <select
                  value={skillType}
                  onChange={(e) => handleTypeChange(e.target.value as SkillType | "")}
                  className="w-full appearance-none rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 py-3.5 px-4 text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 outline-none transition focus:border-teal-500 dark:focus:border-teal-400 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-teal-500/10 dark:focus:ring-teal-400/10"
                >
                  <option value="" className="dark:bg-slate-800">All Skill Types</option>
                  <option value="TEACHING" className="dark:bg-slate-800">Teaching Only</option>
                  <option value="LEARNING" className="dark:bg-slate-800">Learning Only</option>
                  <option value="BOTH" className="dark:bg-slate-800">Both</option>
                </select>
                <FiFilter className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-base" />
              </div>

              {/* Search Button & View Toggle */}
              <div className="md:col-span-4 flex items-center gap-2">
                <button
                  onClick={() => executeSearch()}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-teal-600 dark:bg-teal-500 py-3.5 px-4 text-sm font-bold text-white shadow-sm hover:bg-teal-700 dark:hover:bg-teal-600 transition-all"
                >
                  <FiSearch className="text-base" />
                  <span>Search</span>
                </button>

                <div className="hidden sm:flex items-center gap-1 border-l border-slate-200 dark:border-slate-800 pl-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 rounded-xl border transition-all ${
                      viewMode === "grid"
                        ? "border-teal-500 bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400"
                        : "border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    }`}
                    title="Grid View"
                  >
                    <FiGrid className="text-lg" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 rounded-xl border transition-all ${
                      viewMode === "list"
                        ? "border-teal-500 bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400"
                        : "border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    }`}
                    title="List View"
                  >
                    <FiList className="text-lg" />
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
          </div>

          {/* Dynamic Content Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {filteredSkills.length} Skill{filteredSkills.length !== 1 ? "s" : ""} Found
            </h2>

            {(skillName || skillType || activeCategory !== "All") && (
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
              >
                <FiX /> Clear Filters
              </button>
            )}
          </div>

          {/* Results Grid / List */}
          {loading ? (
            <div className="py-20 flex justify-center">
              <Loader />
            </div>
          ) : filteredSkills.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-white/50 dark:bg-slate-900/50">
              <FiSearch className="mx-auto text-4xl text-slate-400 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No skills match your search</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Try adjusting your search terms, changing categories, or clearing filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-4 rounded-xl bg-teal-600 dark:bg-teal-500 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-teal-700 dark:hover:bg-teal-600 transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid gap-6 grid-cols-1 md:grid-cols-2"
                  : "flex flex-col gap-4"
              }
            >
              {paginatedSkills.map((item: any) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-xl dark:hover:shadow-slate-950/50"
                >
                  <div className="space-y-4">
                    {/* Top Row: Category & Type Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {item.category || "General"}
                      </span>
                      <span
                        className={`rounded-full border px-3 py-0.5 text-xs font-bold uppercase tracking-wide ${getBadgeStyle(
                          item.skillType
                        )}`}
                      >
                        {item.skillType}
                      </span>
                    </div>

                    {/* Skill Title */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {item.skillName}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
                      {item.description || "No description provided."}
                    </p>
                  </div>

                  <div>
                    {/* User Metadata */}
                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-sm text-slate-700 dark:text-slate-200">
                          {(item.name || item.userName || "U").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            {item.name || item.userName || "Unknown User"}
                          </p>
                          <p className="text-xs text-slate-400 truncate max-w-[140px]">
                            {item.email || item.userEmail || ""}
                          </p>
                        </div>
                      </div>

                      {item.rating && (
                        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-200/60 dark:border-amber-800/60">
                          <FiStar className="text-amber-400 fill-amber-400 text-xs" />
                          <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                            {item.rating}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Row */}
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => router.push(`/user/${item.userId}`)}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all"
                      >
                        <FiUser /> View Profile
                      </button>
                      <button
                        onClick={() => router.push(`/ratings?userId=${item.userId}`)}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-teal-600 dark:bg-teal-500 py-2.5 text-xs font-bold text-white hover:bg-teal-700 dark:hover:bg-teal-600 transition-all shadow-xs"
                      >
                        <FiStar className="fill-white/20" /> Rate User
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2 pt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <FiChevronLeft className="text-lg" />
              </button>

              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 px-3">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <FiChevronRight className="text-lg" />
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </ProtectedRoute>
  );
}