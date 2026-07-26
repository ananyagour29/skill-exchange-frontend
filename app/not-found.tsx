import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-[#F8F4EF] flex items-center justify-center px-6">
      <div className="text-center">

        {/* 404 */}
        <h1 className="text-[120px] md:text-[170px] font-extrabold leading-none text-[#A67C52]">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-2 text-3xl md:text-5xl font-bold text-[#2D2D2D]">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-6 max-w-lg mx-auto text-gray-600 text-lg leading-8">
          Sorry, the page you are looking for doesn't exist or may have
          been moved to another location.
        </p>

        {/* Button */}
      <Link href="/">
  <button className="mt-10 inline-flex min-w-[220px] items-center justify-center gap-3 rounded-2xl bg-[#A67C52] px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#8C6542]">
    <HiArrowLeft className="text-2xl" />
    Go Home
  </button>
</Link>
      </div>
    </main>
  );
}