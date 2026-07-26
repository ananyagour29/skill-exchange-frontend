// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Loader from "@/components/Loader";
// import EmptyState from "@/components/EmptyState";
// import ProfileCard from "@/components/ProfileCard";
// import ProtectedRoute from "@/components/ProtectedRoute";

// import useAuth from "@/hooks/useAuth";
// import profileService, {
//   UserProfile,
// } from "@/services/profileService";

// export default function ProfilePage() {
//   const { user } = useAuth();

//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!user?.id) return;

//       try {
//         const data = await profileService.getProfileByUserId(user.id);
//         setProfile(data);
//       } catch (error) {
//         console.error(error);
//         setProfile(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [user]);

//   return (
//     <ProtectedRoute>
//       <Navbar />

//       <main className="min-h-screen bg-[#F8F4EF] pt-24 pb-10 px-5">
//         <div className="mx-auto max-w-4xl">

//           <div className="mb-6 flex items-center justify-between">
//             <h1 className="text-3xl font-bold text-[#2D2D2D]">
//               My Profile
//             </h1>

//             <Link
//               href="/edit-profile"
//               className="rounded-xl bg-[#A67C52] px-5 py-2 text-white hover:bg-[#8F6743]"
//             >
//               Edit Profile
//             </Link>
//           </div>

//           {loading ? (
//             <Loader />
//           ) : profile ? (
//             <ProfileCard
//               name={user?.name ?? ""}
//               email={user?.email ?? ""}
//               role={user?.role ?? ""}
//               currentStatus={profile.currentStatus}
//               field={profile.field}
//               goal={profile.goal}
//               bio={profile.bio}
//             />
//           ) : (
//             <EmptyState
//               title="Profile Not Found"
//               description="Create your profile to continue."
//             />
//           )}
//         </div>
//       </main>

//       <Footer />
//     </ProtectedRoute>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import ProfileCard from "@/components/ProfileCard";
import ProtectedRoute from "@/components/ProtectedRoute";

import useAuth from "@/hooks/useAuth";
import profileService, {
  UserProfile,
} from "@/services/profileService";

export default function ProfilePage() {
  const { user } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!user?.id) return;

//       try {
//         const data = await profileService.getProfileByUserId(user.id);
//         setProfile(data);
//       } catch (error) {
//         console.error(error);
//         setProfile(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [user]);

useEffect(() => {
  const fetchProfile = async () => {

    const userId = localStorage.getItem("userId");

    console.log("User ID:", userId);

    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const id = Number(userId);

      // Get profile data
      const data = await profileService.getProfileByUserId(id);

      console.log("Profile data:", data);

      setProfile(data);

    } catch (error) {

      console.error("Profile error:", error);

      setProfile(null);

    } finally {

      setLoading(false);

    }
  };


  fetchProfile();

}, []);
  return (
    // <ProtectedRoute>
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8F4EF] pt-24 pb-10 px-5">
        <div className="mx-auto max-w-4xl">

          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-[#2D2D2D]">
              My Profile
            </h1>

            <Link
              href="/edit-profile"
              className="rounded-xl bg-[#A67C52] px-5 py-2 text-white hover:bg-[#8F6743]"
            >
              Edit Profile
            </Link>
          </div>

          {loading ? (
            <Loader />
          ) : profile ? (
            <ProfileCard
              name={user?.name ?? ""}
              email={user?.email ?? ""}
              role={user?.role ?? ""}
              currentStatus={profile.currentStatus}
              field={profile.field}
              goal={profile.goal}
              bio={profile.bio}
            />
          ) : (
            <EmptyState
              title="Profile Not Found"
              description="Create your profile to continue."
            />
          )}
        </div>
      </main>

      <Footer />
    {/* </ProtectedRoute> */}
    </>
  );
}