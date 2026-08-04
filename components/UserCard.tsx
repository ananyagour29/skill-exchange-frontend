"use client";

import { useRouter } from "next/navigation";
import { FiUser, FiArrowRight } from "react-icons/fi";

interface UserCardProps {
  id: number | string;
  name: string;
  email: string;
  role: "LEARNER" | "TEACHER" | "BOTH";
  field?: string;
}

export default function UserCard({
  id,
  name,
  email,
  role,
  field,
}: UserCardProps) {
  const router = useRouter();

  const getRoleBadgeStyle = (userRole: string) => {
    switch (userRole) {
      case "TEACHER":
        return "bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-800/60";
      case "LEARNER":
        return "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/60";
      default:
        return "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/60";
    }
  };

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 shadow-xs hover:shadow-md transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700">
      <div className="space-y-4">
        {/* Header: Name, Avatar & Role Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
              {name ? name.charAt(0).toUpperCase() : <FiUser />}
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[180px] sm:max-w-[200px]">
                {email}
              </p>
            </div>
          </div>

          <span
            className={`shrink-0 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getRoleBadgeStyle(
              role
            )}`}
          >
            {role}
          </span>
        </div>

        {/* Field Details */}
        {field ? (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-500 dark:text-slate-400">
                Field:
              </span>{" "}
              {field}
            </p>
          </div>
        ) : (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60">
            <p className="text-xs text-slate-400 dark:text-slate-500 italic">
              No field specified
            </p>
          </div>
        )}
      </div>

      {/* Action Button */}
      <button
        onClick={() => router.push(`/user/${id}`)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-600 dark:hover:text-white hover:border-teal-600 transition-all active:scale-[0.99]"
      >
        <span>View Profile</span>
        <FiArrowRight className="text-sm transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}