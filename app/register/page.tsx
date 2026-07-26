// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import api from "@/services/api";

// export default function RegisterPage() {

//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "LEARNER",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");


//   const roles = [
//     {
//       value: "LEARNER",
//       title: "Learner",
//       description: "Learn new skills from others",
//     },
//     {
//       value: "TEACHER",
//       title: "Teacher",
//       description: "Share your skills with others",
//     },
//     {
//       value: "BOTH",
//       title: "Both",
//       description: "Learn and teach skills",
//     },
//   ];


//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {

//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });

//   };


//   const handleRegister = async (
//     e: React.FormEvent
//   ) => {

//     e.preventDefault();

//     setLoading(true);
//     setError("");


//     try {

//       // Register user
//       const response = await api.post(
//         "/registerUser",
//         formData
//       );


//       console.log(
//         "Register response:",
//         response.data
//       );


//       // Remove previous logged-in user data
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       localStorage.removeItem("userId");


//       // Save new user id
//       localStorage.setItem(
//         "userId",
//         String(response.data.id)
//       );


//       // Create empty profile for new user
//       await api.post(
//         "/api/profile/create",
//         {
//           userId: response.data.id,
//           bio: "",
//           field: "",
//           currentStatus: "",
//           goal: ""
//         }
//       );


//       // Go to login
//       router.push("/login");


//     } catch (err: any) {

//       setError(
//         err.response?.data?.message ||
//         "Registration failed"
//       );

//     } finally {

//       setLoading(false);

//     }

//   };


//   return (
//     <div className="min-h-screen bg-[#F8F4EF] px-5 pt-24 pb-10 flex justify-center items-start md:items-center">

//       <div className="w-full max-w-lg rounded-3xl bg-white border border-[#E7DDD4] px-7 py-8 shadow">


//         <div className="text-center mb-8">

//           <h1 className="text-3xl font-bold text-[#2D2D2D]">
//             Create Account
//           </h1>

//           <p className="mt-2 text-sm text-gray-500">
//             Join SkillExchange and start growing
//           </p>

//         </div>



//         <form onSubmit={handleRegister} className="space-y-5">


//           <div>

//             <label className="block mb-2 text-sm font-medium">
//               Full Name
//             </label>

//             <input
//               name="name"
//               type="text"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter your name"
//               className="w-full rounded-xl border px-4 py-3"
//               required
//             />

//           </div>



//           <div>

//             <label className="block mb-2 text-sm font-medium">
//               Email Address
//             </label>

//             <input
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className="w-full rounded-xl border px-4 py-3"
//               required
//             />

//           </div>



//           <div>

//             <label className="block mb-2 text-sm font-medium">
//               Password
//             </label>

//             <input
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Create password"
//               className="w-full rounded-xl border px-4 py-3"
//               required
//             />

//           </div>



//           <div>

//             <label className="block mb-3 text-sm font-medium">
//               I want to
//             </label>


//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

//               {roles.map((role)=>(

//                 <button
//                   key={role.value}
//                   type="button"
//                   onClick={() =>
//                     setFormData({
//                       ...formData,
//                       role: role.value
//                     })
//                   }
//                   className={`rounded-xl border p-3 text-left ${
//                     formData.role === role.value
//                     ? "border-[#A67C52] bg-[#F8F4EF]"
//                     : "border-[#E7DDD4]"
//                   }`}
//                 >

//                   <p className="font-semibold text-sm">
//                     {role.title}
//                   </p>

//                   <p className="text-xs text-gray-500 mt-1">
//                     {role.description}
//                   </p>

//                 </button>

//               ))}

//             </div>

//           </div>



//           {error && (
//             <p className="text-sm text-red-500">
//               {error}
//             </p>
//           )}



//           <button
//             disabled={loading}
//             className="w-full rounded-xl bg-[#A67C52] py-3 text-white font-semibold disabled:opacity-50"
//           >

//             {loading
//               ? "Creating Account..."
//               : "Register"}

//           </button>


//         </form>



//         <p className="mt-7 text-center text-sm text-gray-500">

//           Already have an account?

//           <button
//             onClick={() => router.push("/login")}
//             className="ml-1 font-semibold text-[#A67C52]"
//           >
//             Login
//           </button>

//         </p>


//       </div>

//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function RegisterPage() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };



  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);
    setError("");


    try {


      // Register user

      const response = await api.post(
        "/registerUser",
        formData
      );


      console.log(
        "Register response:",
        response.data
      );



      // Remove previous logged-in user data

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");



      // Save new user id

      localStorage.setItem(
        "userId",
        String(response.data.id)
      );



      // Create empty profile

      await api.post(
        "/api/profile/create",
        {
          userId: response.data.id,
          bio: "",
          field: "",
          currentStatus: "",
          goal: ""
        }
      );



      // Go to login

      router.push("/login");


    } catch (err: any) {


      setError(
        err.response?.data?.message ||
        "Registration failed"
      );


    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="min-h-screen bg-[#F8F4EF] px-5 pt-24 pb-10 flex justify-center items-start md:items-center">


      <div className="
        w-full 
        max-w-lg 
        rounded-3xl 
        bg-white 
        border 
        border-[#E7DDD4] 
        px-7 
        py-8 
        shadow
      ">



        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-[#2D2D2D]">
            Create Account
          </h1>


          <p className="mt-2 text-sm text-gray-500">
            Join SkillExchange and start growing
          </p>

        </div>




        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >



          {/* Name */}

          <div>

            <label className="block mb-2 text-sm font-medium">
              Full Name
            </label>


            <input

              name="name"

              type="text"

              value={formData.name}

              onChange={handleChange}

              placeholder="Enter your name"

              className="w-full rounded-xl border px-4 py-3"

              required

            />

          </div>




          {/* Email */}

          <div>

            <label className="block mb-2 text-sm font-medium">
              Email Address
            </label>


            <input

              name="email"

              type="email"

              value={formData.email}

              onChange={handleChange}

              placeholder="Enter your email"

              className="w-full rounded-xl border px-4 py-3"

              required

            />

          </div>




          {/* Password */}

          <div>

            <label className="block mb-2 text-sm font-medium">
              Password
            </label>


            <input

              name="password"

              type="password"

              value={formData.password}

              onChange={handleChange}

              placeholder="Create password"

              className="w-full rounded-xl border px-4 py-3"

              required

            />

          </div>





          {error && (

            <p className="text-sm text-red-500">

              {error}

            </p>

          )}






          <button

            disabled={loading}

            className="
              w-full 
              rounded-xl 
              bg-[#A67C52] 
              py-3 
              text-white 
              font-semibold 
              disabled:opacity-50
            "

          >

            {
              loading
              ? "Creating Account..."
              : "Register"
            }


          </button>




        </form>





        <p className="mt-7 text-center text-sm text-gray-500">


          Already have an account?


          <button

            onClick={() => router.push("/login")}

            className="ml-1 font-semibold text-[#A67C52]"

          >

            Login

          </button>


        </p>




      </div>


    </div>

  );

}