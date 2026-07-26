"use client";

interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[250px] flex-col items-center justify-center rounded-xl border border-dashed border-[#D6C5B4] bg-[#F8F4EF] p-8">
      <h2 className="text-xl font-semibold text-[#2D2D2D]">
        {title}
      </h2>

      <p className="mt-2 text-center text-gray-500">
        {description}
      </p>
    </div>
  );
}