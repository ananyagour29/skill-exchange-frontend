// "use client";

// import Link from "next/link";
// import ProtectedRoute from "@/components/ProtectedRoute";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import useAuth from "@/hooks/useAuth";

// export default function DashboardPage() {
//   const { user } = useAuth();

//   return (
//     <ProtectedRoute>
//       <Navbar />

//       <main className="min-h-screen bg-[#F8F4EF] pt-24 pb-10 px-5">
//         <div className="mx-auto max-w-7xl">

//           {/* Welcome Section */}
//           <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm border border-[#E7DDD4]">
//             <h1 className="text-3xl font-bold text-[#2D2D2D]">
//               Welcome, {user?.name || "User"} 👋
//             </h1>

//             <p className="mt-3 text-gray-600">
//               Manage your profile, skills, ratings and discover people to
//               learn from or teach.
//             </p>

//             <span className="mt-4 inline-block rounded-full bg-[#F8F4EF] px-4 py-2 text-sm font-semibold text-[#A67C52]">
//               {user?.role || "LEARNER"}
//             </span>
//           </div>

//           {/* Dashboard Cards */}
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">

//             <Link href="/profile">
//               <div className="cursor-pointer rounded-2xl border border-[#E7DDD4] bg-white p-6 shadow-sm transition hover:shadow-lg">
//                 <h2 className="text-xl font-semibold text-[#2D2D2D]">
//                   My Profile
//                 </h2>
//                 <p className="mt-3 text-sm text-gray-500">
//                   View and manage your profile.
//                 </p>
//               </div>
//             </Link>

//             <Link href="/skills">
//               <div className="cursor-pointer rounded-2xl border border-[#E7DDD4] bg-white p-6 shadow-sm transition hover:shadow-lg">
//                 <h2 className="text-xl font-semibold text-[#2D2D2D]">
//                   My Skills
//                 </h2>
//                 <p className="mt-3 text-sm text-gray-500">
//                   Add, edit or delete your skills.
//                 </p>
//               </div>
//             </Link>

//             <Link href="/search">
//               <div className="cursor-pointer rounded-2xl border border-[#E7DDD4] bg-white p-6 shadow-sm transition hover:shadow-lg">
//                 <h2 className="text-xl font-semibold text-[#2D2D2D]">
//                   Search Skills
//                 </h2>
//                 <p className="mt-3 text-sm text-gray-500">
//                   Find teachers and learners.
//                 </p>
//               </div>
//             </Link>

//             {/* <Link href="/ratings">
//               <div className="cursor-pointer rounded-2xl border border-[#E7DDD4] bg-white p-6 shadow-sm transition hover:shadow-lg">
//                 <h2 className="text-xl font-semibold text-[#2D2D2D]">
//                   Ratings
//                 </h2>
//                 <p className="mt-3 text-sm text-gray-500">
//                   Check your received ratings. */}
//                 {/* </p>
//               </div>
//             </Link> */}

//           </div>
//         </div>
//       </main>

//       <Footer />
//     </ProtectedRoute>
//   );
// }
"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import useAuth from "@/hooks/useAuth";
import AIChat from "@/components/AIChat";   // ✅ add this
import { PiHandshakeFill } from "react-icons/pi";
import { LuBot } from "react-icons/lu";
export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <Navbar />

      <main className="min-h-screen bg-[#F8F4EF] pt-24 pb-10 px-5">
        <div className="mx-auto max-w-7xl">

          {/* Welcome Section */}
          <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm border border-[#E7DDD4]">
            <h1 className="text-3xl font-bold text-[#2D2D2D]">
              Welcome, {user?.name || "User"} 👋
            </h1>

            <p className="mt-3 text-gray-600">
              Manage your profile, skills, ratings and discover people to
              learn from or teach.
            </p>

            <span className="mt-4 inline-block rounded-full bg-[#F8F4EF] px-4 py-2 text-sm font-semibold text-[#A67C52]">
              {user?.role || "LEARNER"}
            </span>
          </div>


          {/* Dashboard Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">

            <Link href="/profile">
              <div className="cursor-pointer rounded-2xl border border-[#E7DDD4] bg-white p-6 shadow-sm transition hover:shadow-lg">
                <h2 className="text-xl font-semibold text-[#2D2D2D]">
                  My Profile
                </h2>
                <p className="mt-3 text-sm text-gray-500">
                  View and manage your profile.
                </p>
              </div>
            </Link>


            <Link href="/skills">
              <div className="cursor-pointer rounded-2xl border border-[#E7DDD4] bg-white p-6 shadow-sm transition hover:shadow-lg">
                <h2 className="text-xl font-semibold text-[#2D2D2D]">
                  My Skills
                </h2>
                <p className="mt-3 text-sm text-gray-500">
                  Add, edit or delete your skills.
                </p>
              </div>
            </Link>


            <Link href="/search">
              <div className="cursor-pointer rounded-2xl border border-[#E7DDD4] bg-white p-6 shadow-sm transition hover:shadow-lg">
                <h2 className="text-xl font-semibold text-[#2D2D2D">
                  Search Skills
                </h2>
                <p className="mt-3 text-sm text-gray-500">
                  Find teachers and learners.
                </p>
              </div>
            </Link>

          </div>

{/* AI Chat Assistant */}
<div className="mt-10 rounded-3xl border border-[#E5DDD4] bg-white shadow-sm overflow-hidden">

  {/* Chat Header */}
  <div className="flex items-center gap-3 bg-[#A67C52] px-6 py-4">

    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
     <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
    <LuBot className="text-2xl text-[#A67C52]" />
</div>
    </div>

    <div>
      <h2 className="text-lg font-semibold text-white">
        SkillExchange AI
      </h2>

      <p className="text-sm text-[#F8F4EF]">
        Ask about users, skills and platform
      </p>
    </div>

  </div>


  {/* Chat Body */}
  <div className="p-6">

    <AIChat />

  </div>


</div>


        </div>
      </main>

      <Footer />
    </ProtectedRoute>
  );
}