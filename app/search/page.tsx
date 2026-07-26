"use client";

// import { useState } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import ProtectedRoute from "@/components/ProtectedRoute";

import skillService, {
  Skill,
  SkillType,
} from "@/services/skillService";

export default function SearchPage() {

  const router = useRouter();
  const [skillName, setSkillName] = useState("");
  const [skillType, setSkillType] =
    useState<SkillType | "">("");

  const [results, setResults] =
    useState<Skill[]>([]);

  const [loading, setLoading] =
    useState(false);
    const [currentPage, setCurrentPage] = useState(1);

const skillsPerPage = 4;

const indexOfLastSkill = currentPage * skillsPerPage;
const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;

const currentSkills = results.slice(
  indexOfFirstSkill,
  indexOfLastSkill
);

const totalPages = Math.ceil(results.length / skillsPerPage);
const getPageNumbers = () => {
  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);
  }

  return pages;
};
useEffect(() => {

  const loadAllSkills = async () => {

    setLoading(true);

    try {

      const data = await skillService.searchSkills({});

      // setResults(data);
      setResults(data);
setCurrentPage(1);

    } catch (error) {

      console.error(error);

      setResults([]);

    } finally {

      setLoading(false);

    }

  };

  loadAllSkills();

}, []);
const handleSearch = async () => {
  setLoading(true);

  try {
    console.log("Searching:", {
      skillName,
      skillType,
    });

    const data = await skillService.searchSkills({
      skillName: skillName || undefined,
      skillType: skillType || undefined,
    });

    console.log("Response:", data);

    // setResults(data);
    setResults(data);
setCurrentPage(1);
  } catch (error: any) {
    console.log(error.response?.status);
    console.log(error.response?.data);

    setResults([]);
  } finally {
    setLoading(false);
  }
};


return (
  <ProtectedRoute>
    <Navbar />

    <main className="min-h-screen bg-[#F8F4EF] pt-24 pb-12 px-5">
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <h1 className="mb-2 text-3xl font-bold text-[#2D2D2D]">
          Search Skills
        </h1>

        <p className="mb-8 text-gray-500">
          Browse all available skills or search for a specific one.
        </p>


        {/* Search Box */}
        <div className="mb-8 rounded-2xl border border-[#E7DDD4] bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">

            <input
              type="text"
              placeholder="Enter Skill Name"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="rounded-xl border border-[#E7DDD4] p-3 outline-none transition focus:border-[#A67C52] focus:ring-1 focus:ring-[#A67C52]"
            />

            <select
              value={skillType}
              onChange={(e) =>
                setSkillType(e.target.value as SkillType | "")
              }
              className="rounded-xl border border-[#E7DDD4] p-3 outline-none transition focus:border-[#A67C52] focus:ring-1 focus:ring-[#A67C52]"
            >
              <option value="">All Types</option>
              <option value="TEACHING">Teaching</option>
              <option value="LEARNING">Learning</option>
              <option value="BOTH">Both</option>
            </select>


            <button
              onClick={handleSearch}
              className="rounded-xl bg-[#A67C52] font-semibold text-white transition hover:bg-[#8F6743] active:scale-[0.99]"
            >
              Search
            </button>

          </div>
        </div>


        {/* Content */}
        {loading ? (
          <Loader />

        ) : results.length === 0 ? (

          <EmptyState
            title="No Skills Available"
            description="There are no skills available at the moment matching your criteria."
          />

        ) : (

          <>

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-xl font-semibold text-[#2D2D2D]">
                Available Skills
              </h2>


              <span className="rounded-full bg-[#E7DDD4]/50 px-4 py-1.5 text-sm font-medium text-[#8F6743]">
                {results.length} Result{results.length !== 1 ? "s" : ""}
              </span>

            </div>



            {/* Cards */}
            <div
              className={`
                grid gap-6 justify-center
                ${
                  currentSkills.length === 1
                    ? "grid-cols-1 max-w-xl mx-auto"
                    : "grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto"
                }
              `}
            >

              {currentSkills.map((skill) => (

                <div
                  key={skill.id}
                  className="flex flex-col justify-between rounded-2xl border border-[#E7DDD4] bg-white p-6 shadow-sm transition hover:shadow-md"
                >


                  <div>

                    <div className="flex items-start justify-between gap-3">

                      <h3 className="text-2xl font-bold text-[#2D2D2D]">
                        {skill.skillName}
                      </h3>


                      <span className="shrink-0 rounded-full bg-[#F8F4EF] px-3 py-1 text-xs font-semibold text-[#A67C52]">
                        {skill.skillType}
                      </span>

                    </div>


                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      {skill.description}
                    </p>

                  </div>



                  <div>


                    <div className="mt-5 border-t border-[#E7DDD4]/60 pt-4">

                      <p className="font-semibold text-[#2D2D2D]">
                        {skill.name ?? "Unknown User"}
                      </p>


                      <p className="text-sm text-gray-500">
                        {skill.email ?? ""}
                      </p>

                    </div>



                    <div className="mt-6 flex gap-3">

                      <button
                        onClick={() =>
                          router.push(`/user/${skill.userId}`)
                        }
                        className="flex-1 rounded-xl border border-[#A67C52] py-2.5 font-semibold text-[#A67C52] transition hover:bg-[#F8F4EF]"
                      >
                        View Profile
                      </button>


                      <button
                        onClick={() =>
                          router.push(`/ratings?userId=${skill.userId}`)
                        }
                        className="flex-1 rounded-xl bg-[#A67C52] py-2.5 font-semibold text-white transition hover:bg-[#8F6743]"
                      >
                        Give Rating
                      </button>

                    </div>


                  </div>


                </div>

              ))}

            </div>



            {/* Professional Pagination */}
            {totalPages > 1 && (

              // <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              <div className="mt-10 flex items-center justify-center gap-1 overflow-x-auto px-2">


                {/* Previous */}
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => prev - 1)
                  }
                  // className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold ${
                    currentPage === 1
                      ? "cursor-not-allowed bg-gray-200 text-gray-400"
                      : "bg-[#A67C52] text-white hover:bg-[#8F6743]"
                  }`}
                >
                  Previous
                </button>



                {/* Pages */}
                {getPageNumbers().map((page, index) => (

                  page === "..." ? (

                    <span
                      key={index}
                      className="px-2 text-lg font-bold text-gray-500"
                    >
                      ...
                    </span>

                  ) : (

                    <button
                      key={index}
                      onClick={() =>
                        setCurrentPage(page as number)
                      }
                      // className={`h-10 w-10 rounded-xl text-sm font-semibold ${
                      className={`h-8 w-8 sm:h-10 sm:w-10 rounded-lg text-xs sm:text-sm font-semibold ${
                        currentPage === page
                          ? "bg-[#A67C52] text-white shadow-md"
                          : "border border-[#E7DDD4] bg-white text-[#2D2D2D] hover:bg-[#F8F4EF]"
                      }`}
                    >
                      {page}
                    </button>

                  )

                ))}



                {/* Next */}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => prev + 1)
                  }
                  // className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold ${
                    currentPage === totalPages
                      ? "cursor-not-allowed bg-gray-200 text-gray-400"
                      : "bg-[#A67C52] text-white hover:bg-[#8F6743]"
                  }`}
                >
                  Next
                </button>


              </div>

            )}


          </>

        )}

      </div>
    </main>


    <Footer />

  </ProtectedRoute>
)
};