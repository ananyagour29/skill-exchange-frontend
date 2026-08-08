
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import ProfileCard from "@/components/ProfileCard";
import ProtectedRoute from "@/components/ProtectedRoute";

import useAuth from "@/hooks/useAuth";
import profileService, { UserProfile } from "@/services/profileService";
import { exchangeService } from "@/services/exchangeService";
import { 
  FiUser, 
  FiRepeat, 
  FiCheckCircle, 
  FiClock, 
  FiZap,
  FiArrowUpRight,
  FiArrowDownLeft,
  FiBookOpen,
  FiAward,
  FiCpu,
  FiBookmark,
  FiXCircle,
  FiInbox,
  FiSend,
  FiRefreshCw,
  FiMail,
  FiEdit3,
  FiPlus
} from "react-icons/fi";

interface SkillExchange {
  id: number;
  partnerName: string;
  partnerEmail: string;
  offeredSkill: string;
  requestedSkill: string;
  notes?: string;
  status: string;
  isIncoming: boolean;
  date?: string;
}

export default function ProfilePage() {
  const { user } = useAuth();

  const [profile, setProfile] = useState<UserProfile | any>(null);

  interface Skill {
    id: number;
    skillName: string;
    skillType: "TEACHING" | "LEARNING";
    description: string;
  }
  
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [exchangesList, setExchangesList] = useState<SkillExchange[]>([]);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [stats, setStats] = useState({
    totalExchanges: 0,
    completedExchanges: 0,
    pendingExchanges: 0,
  });

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  const fetchProfileAndExchanges = async () => {
    const storedUserId = 
      user?.id ?? 
      (typeof window !== "undefined" ? localStorage.getItem("userId") : null);

    if (!storedUserId) {
      setLoading(false);
      return;
    }

    try {
      const id = Number(storedUserId);

      // 1. Profile Data
      const data = await profileService.getProfileByUserId(id);
      setProfile(data);

      // 2. Fetch User Skills
      const skillsRes = await fetch(`${API_BASE_URL}/api/skills/user/${id}`);
      if (skillsRes.ok) {
        const skillsData = await skillsRes.json();
        setSkills(skillsData);
      }

      // 3. Fetch Exchange History & Requests
      const exchangeRes = await exchangeService.getUserExchanges(id).catch(() => []);

      if (Array.isArray(exchangeRes)) {
        const completed = exchangeRes.filter(
          (e: any) => e.status?.toUpperCase() === "COMPLETED" || e.status?.toUpperCase() === "ACCEPTED"
        ).length;
        const pending = exchangeRes.filter(
          (e: any) => e.status?.toUpperCase() === "PENDING"
        ).length;

        setStats({
          totalExchanges: exchangeRes.length,
          completedExchanges: completed,
          pendingExchanges: pending,
        });

        const formatted: SkillExchange[] = exchangeRes.map((item: any) => {
          const providerIdNum = Number(item.providerId);
          const currentUserIdNum = Number(id);
          const isIncoming = providerIdNum === currentUserIdNum; 
          
          const partner = isIncoming
            ? (item.requesterName || `User #${item.requesterId}`)
            : (item.providerName || `User #${item.providerId}`);

          const partnerEmail = isIncoming ? item.requesterEmail : item.providerEmail;

          return {
            id: item.id,
            partnerName: partner,
            partnerEmail: partnerEmail || "",
            offeredSkill: item.offeredSkill || "N/A",
            requestedSkill: item.requestedSkill || "Skill Exchange",
            notes: item.notes,
            status: item.status || "PENDING",
            isIncoming,
            date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent",
          };
        });

        setExchangesList(formatted);
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileAndExchanges();
  }, [user]);

  const handleStatusUpdate = async (exchangeId: number, status: "ACCEPTED" | "REJECTED") => {
    setUpdatingId(exchangeId);
    try {
      await exchangeService.updateStatus(exchangeId, status);
      await fetchProfileAndExchanges();
    } catch (error) {
      console.error("Error updating exchange status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const displayName = user?.name || profile?.name || profile?.fullName || profile?.user?.name || "Community Member";
  const displayEmail = user?.email || profile?.email || profile?.user?.email || "No email available";
  const displayRole = user?.role || profile?.role || profile?.user?.role || "Member";

  const offeredSkills = skills.filter((s) => s.skillType === "TEACHING");
  const requestedSkills = skills.filter((s) => s.skillType === "LEARNING");

  // Robust check to see if valid profile details exist
  // const hasValidProfile = profile && (profile.id || profile.field || profile.bio || profile.currentStatus);
  const hasValidProfile =
  !!(
    profile &&
    (
      profile.currentStatus?.trim() ||
      profile.goal?.trim() ||
      profile.bio?.trim() ||
      profile.field?.trim()
    )
  );

  const getStatusBadgeClass = (status: string) => {
    switch (status?.toUpperCase()) {
      case "ACCEPTED":
      case "COMPLETED":
        return "bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30";
      case "REJECTED":
      case "DECLINED":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30";
      default:
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30";
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="min-h-screen bg-slate-50 dark:bg-[#0B1315] pt-28 pb-16 px-4 sm:px-6 lg:px-10 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <div className="mx-auto max-w-5xl space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-700 dark:text-teal-400 text-xs font-semibold tracking-wide mb-2">
                <FiUser /> Account Dashboard
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                My Profile
              </h1>
            </div>

            {/* Dynamic Add/Edit Profile Button Area */}
            {!loading && (
              <div className="flex items-center gap-2.5">
                {hasValidProfile ? (
                  <Link
                    href="/edit-profile"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-teal-500/50 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-xs transition"
                  >
                    <FiEdit3 className="text-teal-600 dark:text-teal-400" /> Edit Profile
                  </Link>
                ) : (
                  <Link
                    href="/edit-profile"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md shadow-teal-500/20 transition"
                  >
                    <FiPlus /> Add Profile
                  </Link>
                )}
              </div>
            )}
          </div>

          {loading ? (
            <div className="py-20 flex justify-center">
              <Loader />
            </div>
          ) : hasValidProfile ? (
            <div className="space-y-8">
              
              {/* Profile Card */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-sm transition-colors">
                <ProfileCard
                  name={displayName}
                  email={displayEmail}
                  role={displayRole}
                  currentStatus={profile.currentStatus}
                  field={profile.field}
                  goal={profile.goal}
                  bio={profile.bio}
                />
              </div>

              {/* Skills Portfolio */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <FiCpu className="text-teal-600 dark:text-teal-400 text-xl" /> Complete Skills Portfolio
                  </h2>
                </div>

                <div className="space-y-8">
                  {/* Skills I Can Teach */}
                  <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-800/20 p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
                      <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                        <FiArrowUpRight className="text-base" /> Skills I Can Teach
                      </h3>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                        {offeredSkills.length} {offeredSkills.length === 1 ? "Skill" : "Skills"}
                      </span>
                    </div>

                    {offeredSkills.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {offeredSkills.map((skill) => (
                          <div 
                            key={skill.id}
                            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/60 shadow-xs space-y-1.5 transition-all hover:border-teal-500/40 flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                                <FiCheckCircle className="text-teal-600 text-sm shrink-0" /> {skill.skillName}
                              </span>
                            </div>

                            {skill.description ? (
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1 pl-6">
                                {skill.description}
                              </p>
                            ) : (
                              <p className="text-xs text-slate-400 dark:text-slate-500 italic pl-6">
                                No additional details provided.
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-lg border border-dashed border-slate-200 dark:border-slate-700/60 p-6 text-center bg-white/50 dark:bg-slate-900/40 space-y-2">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          You haven't listed any teaching skills yet.
                        </p>
                        <Link
                          href="/edit-profile"
                          className="inline-block text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                        >
                          + Update your profile to add skills
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Skills I Want to Learn */}
                  <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-800/20 p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
                      <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                        <FiBookmark className="text-base" /> Skills I Want to Learn
                      </h3>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                        {requestedSkills.length} {requestedSkills.length === 1 ? "Goal" : "Goals"}
                      </span>
                    </div>

                    {requestedSkills.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {requestedSkills.map((skill) => (
                          <div 
                            key={skill.id}
                            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/60 shadow-xs space-y-1.5 transition-all hover:border-teal-500/40 flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                                <FiArrowDownLeft className="text-teal-500 text-sm shrink-0" /> {skill.skillName}
                              </span>
                            </div>

                            {skill.description ? (
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1 pl-6">
                                {skill.description}
                              </p>
                            ) : (
                              <p className="text-xs text-slate-400 dark:text-slate-500 italic pl-6">
                                No learning goals specified.
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-lg border border-dashed border-slate-200 dark:border-slate-700/60 p-6 text-center bg-white/50 dark:bg-slate-900/40 space-y-2">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          You haven't added any learning goals yet.
                        </p>
                        <Link
                          href="/edit-profile"
                          className="inline-block text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                        >
                          + Update your profile to add learning goals
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                  <FiZap className="text-teal-600 dark:text-teal-400" /> Exchange Performance
                </h2>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 shadow-sm flex items-center gap-4 transition-colors">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400 border border-slate-200 dark:border-slate-700/50 shrink-0">
                      <FiRepeat className="text-xl" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Total Requests
                      </p>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                        {stats.totalExchanges}
                      </h3>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 shadow-sm flex items-center gap-4 transition-colors">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 shrink-0">
                      <FiCheckCircle className="text-xl" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Accepted
                      </p>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                        {stats.completedExchanges}
                      </h3>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 shadow-sm flex items-center gap-4 transition-colors">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0">
                      <FiClock className="text-xl" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Pending
                      </p>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                        {stats.pendingExchanges}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Centralized Exchange Requests & History */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <FiBookOpen className="text-teal-600 dark:text-teal-400" /> Exchange Requests & Requests History
                  </h2>
                  <button
                    onClick={fetchProfileAndExchanges}
                    className="p-2 text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition"
                    title="Refresh status"
                  >
                    <FiRefreshCw />
                  </button>
                </div>

                {exchangesList.length > 0 ? (
                  <div className="space-y-3">
                    {exchangesList.map((item) => {
                      const isPending = item.status?.trim().toUpperCase() === "PENDING";
                      const isAccepted = item.status?.trim().toUpperCase() === "ACCEPTED" || item.status?.trim().toUpperCase() === "COMPLETED";

                      return (
                        <div 
                          key={item.id}
                          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 shadow-sm space-y-3 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold shrink-0">
                                {item.partnerName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                                    {item.partnerName}
                                  </h4>
                                  
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1 ${
                                    item.isIncoming 
                                      ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20"
                                      : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                                  }`}>
                                    {item.isIncoming ? <><FiInbox /> Incoming</> : <><FiSend /> Sent</>}
                                  </span>

                                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md uppercase tracking-wide ${getStatusBadgeClass(item.status)}`}>
                                    {item.status}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                  Requested Skill: <strong className="text-teal-600 dark:text-teal-400">{item.requestedSkill}</strong>
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-center">
                              {item.isIncoming && isPending && (
                                <>
                                  <button
                                    onClick={() => handleStatusUpdate(item.id, "REJECTED")}
                                    disabled={updatingId === item.id}
                                    className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                                  >
                                    <FiXCircle /> Reject
                                  </button>

                                  <button
                                    onClick={() => handleStatusUpdate(item.id, "ACCEPTED")}
                                    disabled={updatingId === item.id}
                                    className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md shadow-teal-500/20 transition flex items-center gap-1 cursor-pointer"
                                  >
                                    {updatingId === item.id ? (
                                      <FiRefreshCw className="animate-spin" />
                                    ) : (
                                      <FiCheckCircle />
                                    )}
                                    Accept
                                  </button>
                                </>
                              )}

                              {isAccepted && item.partnerEmail && (
                                <a
                                  href={`mailto:${item.partnerEmail}?subject=Skill Connection: ${item.requestedSkill}&body=Hi ${item.partnerName},%0D%0A%0D%0AI saw that our request to connect for "${item.requestedSkill}" was accepted! Let's connect to coordinate our teaching and learning sessions.%0D%0A%0D%0ABest regards`}
                                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md shadow-teal-500/20 transition flex items-center gap-1.5 cursor-pointer"
                                >
                                  <FiMail className="text-sm" /> Connect via Email
                                </a>
                              )}
                            </div>
                          </div>

                          {item.notes && (
                            <p className="text-xs text-slate-600 dark:text-slate-300 italic bg-slate-50 dark:bg-slate-950/80 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                              "{item.notes}"
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 p-8 text-center text-slate-500 dark:text-slate-400">
                    <FiAward className="mx-auto text-3xl mb-2 text-slate-400 dark:text-slate-600" />
                    <p className="text-sm">No exchange requests yet. Connect with members on the exchange page to get started!</p>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="py-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-8 text-center space-y-4">
              <EmptyState
                title="Profile Not Found"
                description="Please create your profile details to start exchanging skills."
              />
              <div className="pt-2">
                <Link
                  href="/edit-profile"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md shadow-teal-500/20 transition"
                >
                  <FiPlus /> Add Profile
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </ProtectedRoute>
  );
}