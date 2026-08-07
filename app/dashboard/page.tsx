
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import useAuth from "@/hooks/useAuth";
import AIChat from "@/components/AIChat";
import { 
  LuBot, 
  LuUser, 
  LuSearch, 
  LuBookOpen, 
  LuArrowRight, 
  LuSparkles, 
  LuRefreshCw,
  LuGraduationCap,
  LuBookMarked,
  LuUsers
} from "react-icons/lu";

interface Skill {
  id?: number | string;
  skillName?: string;
  skillType?: "TEACHING" | "LEARNING" | string;
  description?: string;
  userId?: number | string;
  user?: {
    id?: number | string;
  };
}

interface MemberUser {
  id?: number | string;
  userId?: number | string;
  name?: string;
  fullName?: string;
  email?: string;
  skills?: Skill[];
  user?: {
    id?: number | string;
    name?: string;
    email?: string;
  };
}

interface UserProfileData {
  id?: number | string;
  userId?: number | string;
  name?: string;
  fullName?: string;
  email?: string;
  user?: {
    id?: number | string;
    name?: string;
    email?: string;
  };
}

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<MemberUser[]>([]);
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const storedUserId = 
        user?.id ?? 
        (typeof window !== "undefined" ? localStorage.getItem("userId") : null);

      // 1. Fetch current logged-in user profile
      const profilePromise = storedUserId 
        ? fetch(`${API_BASE_URL}/api/profile/${storedUserId}`, { headers })
        : Promise.resolve(null);

      // 2. Fetch logged-in user skills
      const userSkillsPromise = storedUserId 
        ? fetch(`${API_BASE_URL}/api/skills/user/${storedUserId}`, { headers })
        : Promise.resolve(null);

      // 3. Fetch all user profiles across system
      const allProfilesPromise = fetch(`${API_BASE_URL}/api/profile/all`, { headers });

      // 4. Fetch all skills across system to attach to users
      const allSkillsPromise = fetch(`${API_BASE_URL}/api/skills/getAll`, { headers })
        .catch(() => fetch(`${API_BASE_URL}/api/skills/all`, { headers }));

      const [profileRes, mySkillsRes, allProfilesRes, allSkillsRes] = 
        await Promise.allSettled([
          profilePromise,
          userSkillsPromise,
          allProfilesPromise,
          allSkillsPromise
        ]);

      if (profileRes.status === "fulfilled" && profileRes.value?.ok) {
        const profileData = await profileRes.value.json();
        setProfile(profileData);
      }

      if (mySkillsRes.status === "fulfilled" && mySkillsRes.value?.ok) {
        const skillsData = await mySkillsRes.value.json();
        setUserSkills(Array.isArray(skillsData) ? skillsData : []);
      }

      let fetchedProfiles: MemberUser[] = [];
      if (allProfilesRes.status === "fulfilled" && allProfilesRes.value?.ok) {
        const profileData = await allProfilesRes.value.json();
        fetchedProfiles = Array.isArray(profileData) ? profileData : [];
      }

      let fetchedSkills: Skill[] = [];
      if (allSkillsRes.status === "fulfilled" && allSkillsRes.value?.ok) {
        const skillData = await allSkillsRes.value.json();
        fetchedSkills = Array.isArray(skillData) ? skillData : [];
      }

      // Map global skills to their respective community members
      const combinedMembers = fetchedProfiles.map((member) => {
        const memberId = member.userId ?? member.id ?? member.user?.id;
        
        const memberSkills = fetchedSkills.filter((s) => {
          const skillOwnerId = s.user?.id ?? s.userId;
          return String(skillOwnerId) === String(memberId);
        });

        return {
          ...member,
          skills: memberSkills.length > 0 ? memberSkills : (member.skills || []),
        };
      });

      setUsers(combinedMembers);
    } catch (err: any) {
      console.error("Dashboard synchronization error:", err?.message || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const currentUserId = user?.id ?? profile?.user?.id ?? profile?.id ?? profile?.userId;

  const filteredUsers = users.filter((u) => {
    const memberId = u.user?.id ?? u.userId ?? u.id;

    // Filter out current logged-in user from peer community grid
    if (currentUserId !== undefined && memberId !== undefined && String(currentUserId) === String(memberId)) {
      return false;
    }

    const search = searchTerm.toLowerCase().trim();
    if (!search) return true;

    const userName = u.name || u.fullName || u.user?.name || "";
    const nameMatch = userName.toLowerCase().includes(search);

    const skillMatch = u.skills
      ? u.skills.some((s) => 
          (s.skillName || "").toLowerCase().includes(search) || 
          (s.description || "").toLowerCase().includes(search)
        )
      : false;

    return nameMatch || skillMatch;
  });

  // Limit display to 5 cards on dashboard
  const displayedUsers = filteredUsers.slice(0, 5);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="min-h-screen bg-slate-50 dark:bg-[#0B1315] pt-28 pb-16 px-4 sm:px-6 lg:px-10 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <div className="mx-auto max-w-7xl space-y-10">
          
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900/60 p-10 sm:p-14 border border-slate-200 dark:border-emerald-950/60 shadow-sm backdrop-blur-md">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 py-4">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-bold tracking-wide uppercase mb-4">
                  <LuSparkles /> Dashboard & Marketplace
                </div>
                {/* <h1 className="text-4xl sm:text-4xl font-extrabold tracking-tight">
                  Welcome back, <span className="text-teal-700 dark:text-teal-400">{profile?.name || profile?.fullName || user?.name || "Member"}</span>
                </h1> */}
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] py-2">
    Welcome back, <span className="font-normal text-teal-700 dark:text-teal-400">{profile?.name || profile?.fullName || user?.name || "Member"}</span>
  </h1>
                <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
                  Connect with peer mentors, explore offered skills, or manage your learning profile.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/profile"
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/60 px-6 py-3.5 text-base font-semibold hover:border-teal-500/40 hover:text-teal-500 transition"
                >
                  My Profile
                </Link>
                <Link
                  href="/skills"
                  className="rounded-xl bg-teal-600 hover:bg-teal-500 text-white px-7 py-3.5 text-base font-semibold shadow-lg shadow-teal-600/20 transition"
                >
                  Manage Skills
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Metrics Section */}
          <div className="grid gap-6 sm:grid-cols-3">
            {/* 1. My Profile Card */}
            <Link href="/profile" className="flex">
              <div className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-emerald-950/60 bg-white dark:bg-slate-900/50 p-6 shadow-sm transition duration-300 hover:border-teal-500/40 hover:shadow-md flex flex-col justify-between w-full h-[200px]">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
                    <LuUser className="text-2xl" />
                  </div>
                  <LuArrowRight className="text-slate-400 group-hover:text-teal-500 text-xl transition duration-300 group-hover:translate-x-1 shrink-0" />
                </div>
                <div className="flex flex-col justify-end flex-1 mt-4">
                  <div className="flex items-center justify-between h-7">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">My Profile</h2>
                  </div>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    Update your profile settings and information.
                  </p>
                </div>
              </div>
            </Link>

            {/* 2. My Skills Card */}
            <Link href="/skills" className="flex">
              <div className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-emerald-950/60 bg-white dark:bg-slate-900/50 p-6 shadow-sm transition duration-300 hover:border-teal-500/40 hover:shadow-md flex flex-col justify-between w-full h-[200px]">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
                    <LuBookOpen className="text-2xl" />
                  </div>
                  <LuArrowRight className="text-slate-400 group-hover:text-teal-500 text-xl transition duration-300 group-hover:translate-x-1 shrink-0" />
                </div>
                <div className="flex flex-col justify-end flex-1 mt-4">
                  <div className="flex items-center justify-between h-7">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">My Skills</h2>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 shrink-0">
                      {userSkills.length} Active
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    Add or modify your teaching & learning skills.
                  </p>
                </div>
              </div>
            </Link>

            {/* 3. Search Skills Card */}
            <Link href="/search" className="flex">
              <div className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-emerald-950/60 bg-white dark:bg-slate-900/50 p-6 shadow-sm transition duration-300 hover:border-teal-500/40 hover:shadow-md flex flex-col justify-between w-full h-[200px]">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
                    <LuSearch className="text-2xl" />
                  </div>
                  <LuArrowRight className="text-slate-400 group-hover:text-teal-500 text-xl transition duration-300 group-hover:translate-x-1 shrink-0" />
                </div>
                <div className="flex flex-col justify-end flex-1 mt-4">
                  <div className="flex items-center justify-between h-7">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Search Skills</h2>
                  </div>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    Browse and discover skills shared by community members.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Community Section */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Explore Peer Community</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Featured community members offering or seeking skills.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <form onSubmit={handleSearchSubmit} className="relative min-w-[240px]">
                  <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search name or skill..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 pl-10 pr-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
                  />
                </form>

                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 rounded-xl bg-teal-500/10 border border-teal-500/20 px-4 py-2.5 text-sm font-bold text-teal-600 dark:text-teal-400 hover:bg-teal-500/20 transition shrink-0"
                >
                  <span>View All Members</span>
                  <LuArrowRight />
                </Link>
              </div>
            </div>

            {loading ? (
              <div className="py-12 text-center text-slate-500 flex flex-col items-center justify-center gap-2">
                <LuRefreshCw className="animate-spin text-2xl text-teal-500" />
                <span>Loading community members...</span>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-10 text-center text-slate-500">
                No registered members match your search criteria.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {displayedUsers.map((member, index) => {
                  const memberId = member.userId ?? member.id ?? member.user?.id ?? `user-${index}`;
                  const displayName = member.name || member.fullName || member.user?.name || "Community Member";

                  // Separate skills into Teaching vs Learning
                  const teachingSkills = (member.skills || []).filter(
                    (s) => (s.skillType || "").toUpperCase() === "TEACHING"
                  );
                  const learningSkills = (member.skills || []).filter(
                    (s) => (s.skillType || "").toUpperCase() === "LEARNING" || (s.skillType || "").toUpperCase() !== "TEACHING"
                  );

                  return (
                    <div
                      key={memberId}
                      className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-emerald-950/60 bg-white dark:bg-slate-900/50 p-6 shadow-sm transition hover:border-teal-500/40 hover:shadow-lg space-y-5"
                    >
                      <div className="space-y-4">
                        {/* Member Name Header */}
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600/10 text-teal-600 dark:text-teal-400 font-bold text-xl border border-teal-500/20">
                            {displayName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg leading-tight text-slate-900 dark:text-slate-100">
                              {displayName}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {member.skills?.length || 0} Total Skills
                            </p>
                          </div>
                        </div>

                        {/* Categorized Skills Section */}
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                          {/* Teaching Skills */}
                          <div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1.5">
                              <LuGraduationCap className="text-sm" />
                              <span>Teaching ({teachingSkills.length})</span>
                            </div>
                            {teachingSkills.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5">
                                {teachingSkills.slice(0, 3).map((s, idx) => (
                                  <span
                                    key={s.id || `teach-${idx}`}
                                    className="inline-block text-xs px-2.5 py-1 rounded-md font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                                  >
                                    {s.skillName}
                                  </span>
                                ))}
                                {teachingSkills.length > 3 && (
                                  <span className="inline-block text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border border-slate-200 dark:border-slate-700">
                                    +{teachingSkills.length - 3}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <p className="text-xs text-slate-400 italic">None listed</p>
                            )}
                          </div>

                          {/* Learning Skills */}
                          <div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1.5">
                              <LuBookMarked className="text-sm" />
                              <span>Learning ({learningSkills.length})</span>
                            </div>
                            {learningSkills.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5">
                                {learningSkills.slice(0, 3).map((s, idx) => (
                                  <span
                                    key={s.id || `learn-${idx}`}
                                    className="inline-block text-xs px-2.5 py-1 rounded-md font-medium bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-400"
                                  >
                                    {s.skillName}
                                  </span>
                                ))}
                                {learningSkills.length > 3 && (
                                  <span className="inline-block text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border border-slate-200 dark:border-slate-700">
                                    +{learningSkills.length - 3}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <p className="text-xs text-slate-400 italic">None listed</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* View Profile Action Button */}
                      <Link
                        href={`/user/${memberId}`}
                        className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:border-teal-500/40 hover:text-teal-500 transition duration-200 group"
                      >
                        <span>View Profile</span>
                        <LuArrowRight className="text-slate-400 group-hover:text-teal-500 group-hover:translate-x-1 transition duration-200" />
                      </Link>
                    </div>
                  );
                })}

                {/* View All Members Tile (Completes 6-Grid Layout) */}
                <Link
                  href="/search"
                  className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-teal-500/30 bg-teal-500/5 p-8 text-center hover:bg-teal-500/10 transition group space-y-3 min-h-[300px]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition duration-200">
                    <LuUsers className="text-3xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                      Looking for more mentors?
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Explore all community profiles & filter by skill.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition duration-200">
                    View All Members <LuArrowRight />
                  </span>
                </Link>
              </div>
            )}
          </section>

          {/* AI Assistant */}
          <div className="rounded-3xl border border-slate-200 dark:border-emerald-950/60 bg-white dark:bg-slate-900/60 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 bg-teal-600 dark:bg-teal-700 px-6 py-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md">
                <LuBot className="text-2xl" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">SkillExchange AI</h2>
                <p className="text-xs text-teal-100">
                  Ask questions about skills, recommendations, or platform usage
                </p>
              </div>
            </div>

            <div className="p-6">
              <AIChat />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </ProtectedRoute>
  );
}