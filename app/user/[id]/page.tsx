// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Footer from "@/components/Footer";
// import Loader from "@/components/Loader";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
// }

// interface Profile {
//   currentStatus: string;
//   goal: string;
//   bio: string;
//   field: string;
// }

// interface Skill {
//   id: number;
//   skillName: string;
//   skillType: string;
//   description: string;
// }

// interface Rating {
//   id: number;
//   rating: number;
//   comment: string;
// }


// export default function UserProfilePage() {

//   const params = useParams();
//   const userId = params.id;


//   const [user, setUser] = useState<User | null>(null);
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [skills, setSkills] = useState<Skill[]>([]);
//   const [ratings, setRatings] = useState<Rating[]>([]);

//   const [loading, setLoading] = useState(true);


//   useEffect(() => {

//     if (!userId) return;


//     const fetchData = async () => {

//       try {

//         const [
//           userResponse,
//           profileResponse,
//           skillsResponse,
//           ratingsResponse
//         ] = await Promise.all([

//           fetch(
//             `http://localhost:8080/getUserById/${userId}`
//           ),

//           fetch(
//             `http://localhost:8080/api/profile/${userId}`
//           ),

//           fetch(
//             `http://localhost:8080/api/skills/user/${userId}`
//           ),

//           fetch(
//             `http://localhost:8080/api/ratings/user/${userId}`
//           )

//         ]);



//         const userData = await userResponse.json();

//         setUser(userData);



//         if(profileResponse.ok){

//           const profileData = await profileResponse.json();

//           setProfile(profileData);

//         }



//         if(skillsResponse.ok){

//           const skillsData = await skillsResponse.json();

//           setSkills(skillsData);

//         }



//         if(ratingsResponse.ok){

//           const ratingsData = await ratingsResponse.json();

//           setRatings(ratingsData);

//         }


//       }
//       catch(error){

//         console.log(
//           "Profile loading error:",
//           error
//         );

//       }
//       finally{

//         setLoading(false);

//       }

//     };


//     fetchData();


//   },[userId]);




//   if(loading){

//     return <Loader />;

//   }



//   if(!user){

//     return (

//       <div className="min-h-screen flex items-center justify-center">

//         User not found

//       </div>

//     );

//   }





//   return (

//     <div className="min-h-screen bg-[#FAF7F2]">


//       <main className="px-6 py-10">


//         <div className="max-w-4xl mx-auto">



//           {/* USER DETAILS */}

        
// <div className="bg-white rounded-2xl border border-[#E7DDD4] p-8 shadow-sm">

//   <h1 className="text-3xl font-bold text-[#2D2D2D]">
//     {user.name}
//   </h1>

//   <div className="mt-4 flex items-center justify-between">
//     {/* Email */}
//     <div className="flex items-center">
//       <span className="text-lg">📧</span>
//       <a
//         href={`mailto:${user.email}`}
//         className="ml-2 text-[#A67C52] font-medium hover:underline"
//       >
//         {user.email}
//       </a>
//     </div>

//     {/* Connect Button */}
//     <a
//       href={`mailto:${user.email}?subject=Skill Exchange Request&body=Hi ${user.name}, I found your profile on Skill Exchange and would like to connect with you.`}
//       className="inline-flex items-center justify-center rounded-lg bg-[#A67C52] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8C6744]"
//     >
//       Connect
//     </a>
//   </div>

//   {profile && (
//     <div className="mt-5 space-y-2">
//       <p><b>Field:</b> {profile.field}</p>
//       <p><b>Status:</b> {profile.currentStatus}</p>
//       <p><b>Goal:</b> {profile.goal}</p>
//       <p className="text-gray-600">{profile.bio}</p>
//     </div>
//   )}

// </div>





//           {/* SKILLS */}

//           <section className="mt-8">


//             <h2 className="text-2xl font-semibold mb-4">

//               Skills

//             </h2>



//             <div className="grid md:grid-cols-2 gap-5">


//               {
//                 skills.length === 0 ? (

//                   <p className="text-gray-500">

//                     No skills added

//                   </p>

//                 ) : (


//                   skills.map((skill)=>(


//                     <div

//                       key={skill.id}

//                       className="bg-white rounded-xl border border-[#E7DDD4] p-5"

//                     >


//                       <h3 className="text-xl font-semibold">

//                         {skill.skillName}

//                       </h3>



//                       <span className="inline-block mt-2 bg-[#F8F4EF] text-[#A67C52] px-3 py-1 rounded-full text-sm">

//                         {skill.skillType}

//                       </span>



//                       <p className="mt-3 text-gray-600">

//                         {skill.description}

//                       </p>



//                     </div>


//                   ))

//                 )
//               }


//             </div>


//           </section>






//           {/* RATINGS */}


//           <section className="mt-8">


//             <h2 className="text-2xl font-semibold mb-4">

//               Ratings

//             </h2>



//             {
//               ratings.length===0 ? (

//                 <p className="text-gray-500">

//                   No ratings yet

//                 </p>

//               ) : (


//                 ratings.map((rating)=>(


//                   <div

//                     key={rating.id}

//                     className="bg-white border border-[#E7DDD4] rounded-xl p-5 mb-4"

//                   >

//                     <p className="font-semibold">

//                       ⭐ {rating.rating}/5

//                     </p>


//                     <p className="mt-2 text-gray-600">

//                       {rating.comment}

//                     </p>


//                   </div>


//                 ))

//               )
//             }


//           </section>



//         </div>


//       </main>


//       <Footer />


//     </div>

//   );

// }
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

interface Profile {
  currentStatus: string;
  goal: string;
  bio: string;
  field: string;
}

interface Skill {
  id: number;
  skillName: string;
  skillType: string;
  description: string;
}

interface Rating {
  id: number;
  rating: number;
  comment: string;
}

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id;

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const [
          userResponse,
          profileResponse,
          skillsResponse,
          ratingsResponse,
        ] = await Promise.all([
          fetch(`http://localhost:8080/getUserById/${userId}`),
          fetch(`http://localhost:8080/api/profile/${userId}`),
          fetch(`http://localhost:8080/api/skills/user/${userId}`),
          fetch(`http://localhost:8080/api/ratings/user/${userId}`),
        ]);

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        }

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setProfile(profileData);
        }

        if (skillsResponse.ok) {
          const skillsData = await skillsResponse.json();
          setSkills(skillsData);
        }

        if (ratingsResponse.ok) {
          const ratingsData = await ratingsResponse.json();
          setRatings(ratingsData);
        }
      } catch (error) {
        console.error("Profile loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        User not found
      </div>
    );
  }

  // Calculate Average Rating & Total Reviews
  const totalReviews = ratings.length;
  const averageRating =
    totalReviews > 0
      ? (
          ratings.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews
        ).toFixed(1)
      : "N/A";

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-between">
      {/* <main className="px-6 py-10"> */}
       <main className="pt-24 pb-10 px-6">
        <button
  onClick={() => router.back()}
  className="mb-5 inline-flex items-center rounded-lg border border-[#E7DDD4] bg-white px-4 py-2 text-[#A67C52] shadow-sm transition hover:bg-[#F8F4EF]"
>
  ← Back
</button>       
        <div className="max-w-4xl mx-auto">
          {/* USER DETAILS CARD */}
          <div className="bg-white rounded-2xl border border-[#E7DDD4] p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-[#2D2D2D]">
                    {user.name}
                  </h1>
                  {user.role && (
                    <span className="bg-[#A67C52] text-white text-xs font-bold uppercase px-3 py-1 rounded-md">
                      {user.role}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>⭐ {averageRating}</span>
                  <span>({totalReviews} reviews)</span>
                </div>

                <div className="flex items-center text-[#A67C52] font-medium pt-1">
                  <span className="mr-2">📧</span>
                  <a href={`mailto:${user.email}`} className="hover:underline">
                    {user.email}
                  </a>
                </div>
              </div>

              {/* Connect Button */}
              <div>
                <a
                  href={`mailto:${user.email}?subject=Skill Exchange Request&body=Hi ${user.name}, I found your profile on Skill Exchange and would like to connect with you.`}
                  className="inline-flex items-center justify-center rounded-lg bg-[#A67C52] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8C6744]"
                >
                  Connect
                </a>
              </div>
            </div>

            {profile && (
              <div className="mt-6 pt-6 border-t border-[#E7DDD4] space-y-2 text-gray-700">
                <p>
                  <b>Field:</b> {profile.field}
                </p>
                <p>
                  <b>Status:</b> {profile.currentStatus}
                </p>
                <p>
                  <b>Goal:</b> {profile.goal}
                </p>
                <p className="text-gray-600 italic mt-2">{profile.bio}</p>
              </div>
            )}
          </div>

          {/* SKILLS SECTION */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#2D2D2D]">
              Skills
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {skills.length === 0 ? (
                <p className="text-gray-500">No skills added</p>
              ) : (
                skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-white rounded-xl border border-[#E7DDD4] p-5 shadow-sm"
                  >
                    <h3 className="text-xl font-semibold text-[#2D2D2D]">
                      {skill.skillName}
                    </h3>
                    <span className="inline-block mt-2 bg-[#F8F4EF] text-[#A67C52] px-3 py-1 rounded-full text-sm font-medium">
                      {skill.skillType}
                    </span>
                    <p className="mt-3 text-gray-600">{skill.description}</p>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* RATINGS SECTION */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#2D2D2D]">
              Ratings & Reviews
            </h2>
            {ratings.length === 0 ? (
              <p className="text-gray-500">No ratings yet</p>
            ) : (
              ratings.map((rating) => (
                <div
                  key={rating.id}
                  className="bg-white border border-[#E7DDD4] rounded-xl p-5 mb-4 shadow-sm"
                >
                  <p className="font-semibold text-amber-500">
                    ⭐ {rating.rating} / 5
                  </p>
                  <p className="mt-2 text-gray-600">{rating.comment}</p>
                </div>
              ))
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}