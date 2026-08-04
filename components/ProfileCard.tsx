
"use client";

import { FiUser, FiBriefcase, FiTarget, FiInfo, FiActivity } from "react-icons/fi";

interface ProfileCardProps {
  name: string;
  email: string;
  role: string;
  currentStatus: string;
  field: string;
  goal: string;
  bio: string;
}

export default function ProfileCard({
  name,
  email,
  role,
  currentStatus,
  field,
  goal,
  bio,
}: ProfileCardProps) {
  const avatarInitial = name ? name.charAt(0).toUpperCase() : "U";

  return (
    <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-sm transition-colors duration-300">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-2xl font-bold shrink-0">
          {avatarInitial}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {name || "User Profile"}
            </h2>
            <span className="rounded-full bg-teal-500/10 border border-teal-500/20 px-3 py-0.5 text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wide">
              {role || "Member"}
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {email || "No email provided"}
          </p>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {/* Status */}
        <div className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 p-4">
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            <FiActivity className="text-sm" /> Current Status
          </h3>
          <p className="mt-1.5 text-sm font-medium text-slate-800 dark:text-slate-200">
            {currentStatus || "Not specified"}
          </p>
        </div>

        {/* Field */}
        <div className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 p-4">
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            <FiBriefcase className="text-sm" /> Field of Expertise
          </h3>
          <p className="mt-1.5 text-sm font-medium text-slate-800 dark:text-slate-200">
            {field || "Not specified"}
          </p>
        </div>

        {/* Goal */}
        <div className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 p-4 sm:col-span-2">
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            <FiTarget className="text-sm" /> Learning / Teaching Goal
          </h3>
          <p className="mt-1.5 text-sm font-medium text-slate-800 dark:text-slate-200">
            {goal || "No specific goal added yet."}
          </p>
        </div>

        {/* Bio */}
        <div className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 p-4 sm:col-span-2">
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            <FiInfo className="text-sm" /> About / Bio
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {bio || "No biography provided."}
          </p>
        </div>
      </div>

    </div>
  );
}