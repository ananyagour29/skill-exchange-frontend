"use client";

interface SkillCardProps {
  skillName: string;
  skillType: "TEACHING" | "LEARNING" | "BOTH";
  description: string;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function SkillCard({
  skillName,
  skillType,
  description,
  showActions = false,
  onEdit,
  onDelete,
}: SkillCardProps) {
  return (
    <div className="rounded-2xl border border-[#E7DDD4] bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#2D2D2D]">
          {skillName}
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold
            ${
              skillType === "TEACHING"
                ? "bg-green-100 text-green-700"
                : skillType === "LEARNING"
                ? "bg-blue-100 text-blue-700"
                : "bg-purple-100 text-purple-700"
            }`}
        >
          {skillType}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-gray-600">
        {description}
      </p>

      {showActions && (
        <div className="mt-6 flex gap-3">
          <button
            onClick={onEdit}
            className="rounded-lg bg-[#A67C52] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#8F6743]"
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}