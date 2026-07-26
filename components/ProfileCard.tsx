"use client";

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
  return (
    <div className="w-full rounded-2xl border border-[#E7DDD4] bg-white p-6 shadow-sm">
      <div className="mb-6 border-b border-[#E7DDD4] pb-4">
        <h2 className="text-2xl font-bold text-[#2D2D2D]">
          {name}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {email}
        </p>

        <span className="mt-3 inline-block rounded-full bg-[#F8F4EF] px-3 py-1 text-sm font-medium text-[#A67C52]">
          {role}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-[#A67C52]">
            Current Status
          </h3>

          <p className="mt-1 text-gray-700">
            {currentStatus}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#A67C52]">
            Field
          </h3>

          <p className="mt-1 text-gray-700">
            {field}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#A67C52]">
            Goal
          </h3>

          <p className="mt-1 text-gray-700">
            {goal}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#A67C52]">
            Bio
          </h3>

          <p className="mt-1 text-gray-700">
            {bio}
          </p>
        </div>
      </div>
    </div>
  );
}