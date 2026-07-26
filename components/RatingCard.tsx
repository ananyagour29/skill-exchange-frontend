"use client";

interface RatingCardProps {
  rating: number;
  comment: string;
  ratedBy: string;
  createdAt?: string;
}

export default function RatingCard({
  rating,
  comment,
  ratedBy,
  createdAt,
}: RatingCardProps) {
  return (
    <div className="rounded-2xl border border-[#E7DDD4] bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#2D2D2D]">
          {ratedBy}
        </h3>

        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
          ⭐ {rating}/5
        </span>
      </div>

      <p className="mt-4 text-gray-600">
        {comment}
      </p>

      {createdAt && (
        <p className="mt-4 text-xs text-gray-400">
          {createdAt}
        </p>
      )}
    </div>
  );
}