"use client";

import { useRouter } from "next/navigation";

interface UserCardProps {
  id: number;
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

  return (
    <div className="rounded-2xl border border-[#E7DDD4] bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#2D2D2D]">
            {name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {email}
          </p>

          {field && (
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Field:</span> {field}
            </p>
          )}
        </div>

        <span className="rounded-full bg-[#F8F4EF] px-3 py-1 text-xs font-semibold text-[#A67C52]">
          {role}
        </span>
      </div>

      <button
        onClick={() => router.push(`/user/${id}`)}
        className="mt-6 w-full rounded-xl bg-[#A67C52] py-2 text-sm font-semibold text-white transition hover:bg-[#8F6743]"
      >
        View Profile
      </button>
    </div>
  );
}