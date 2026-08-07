"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import { PiHandshakeFill } from "react-icons/pi";
import useAuth from "@/hooks/useAuth";

interface NavbarProps {
  isDarkMode?: boolean;
  setIsDarkMode?: (val: boolean) => void;
}

export default function Navbar({
  isDarkMode,
  setIsDarkMode,
}: NavbarProps) {
  const { user } = useAuth();
  const router = useRouter();
  
  const [localDark, setLocalDark] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasStoredUser, setHasStoredUser] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || !savedTheme) {
      setLocalDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setLocalDark(false);
      document.documentElement.classList.remove("dark");
    }

    const storedId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");
    if (user || storedId || storedToken) {
      setHasStoredUser(true);
    } else {
      setHasStoredUser(false);
    }
  }, [user]);

  const activeDark = isDarkMode !== undefined ? isDarkMode : localDark;

  const toggleTheme = () => {
    const nextDark = !activeDark;
    if (setIsDarkMode) {
      setIsDarkMode(nextDark);
    }
    setLocalDark(nextDark);

    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const isUserLoggedIn = user || hasStoredUser;

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Matches", href: "#matches" },
    { name: "Exchanges", href: "#exchanges" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-300 ${
        activeDark
          ? "border-emerald-950/60 bg-[#0B1315]/90 text-slate-100"
          : "border-slate-200/80 bg-white/90 text-slate-900"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-lg shadow-teal-600/20 group-hover:bg-teal-500 transition duration-300">
            <PiHandshakeFill className="text-2xl" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            Skill <span className="text-teal-500 dark:text-teal-400">Exchange</span>
          </span>
        </a>

        {/* Navigation Tabs - Hero Anchor Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 ${
                activeDark
                  ? "text-slate-300 hover:text-teal-400"
                  : "text-slate-600 hover:text-teal-600"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={toggleTheme}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 shadow-sm ${
              activeDark
                ? "border-slate-800 bg-slate-900/50 text-teal-400 hover:bg-slate-800"
                : "border-slate-200 bg-slate-100/80 text-teal-600 hover:bg-slate-200"
            }`}
            aria-label="Toggle Theme"
          >
            {activeDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
          </button>

          {!isUserLoggedIn && (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/login"
                className={`rounded-xl border px-4 sm:px-5 py-2 text-sm font-semibold transition shadow-sm ${
                  activeDark
                    ? "border-slate-800 bg-slate-900/50 text-slate-200 hover:bg-slate-800"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-teal-600 hover:bg-teal-500 px-4 sm:px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition"
              >
                Get Started
              </Link>
            </div>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden flex h-10 w-10 items-center justify-center rounded-xl border transition ${
              activeDark
                ? "border-slate-800 bg-slate-900/50 text-slate-200"
                : "border-slate-200 bg-slate-100/80 text-slate-700"
            }`}
          >
            {mobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </div>
    </header>
  );
}
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { FiMoon, FiSun, FiLogOut, FiMenu, FiX } from "react-icons/fi";
// import { PiHandshakeFill } from "react-icons/pi";
// import useAuth from "@/hooks/useAuth";

// interface NavbarProps {
//   isDarkMode?: boolean;
//   setIsDarkMode?: (val: boolean) => void;
// }

// export default function Navbar({
//   isDarkMode,
//   setIsDarkMode,
// }: NavbarProps) {
//   const { user, logout } = useAuth();
//   const router = useRouter();
  
//   const [localDark, setLocalDark] = useState<boolean>(true);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [hasStoredUser, setHasStoredUser] = useState<boolean>(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark" || !savedTheme) {
//       setLocalDark(true);
//       document.documentElement.classList.add("dark");
//     } else {
//       setLocalDark(false);
//       document.documentElement.classList.remove("dark");
//     }

//     const storedId = localStorage.getItem("userId");
//     const storedToken = localStorage.getItem("token");
//     if (user || storedId || storedToken) {
//       setHasStoredUser(true);
//     } else {
//       setHasStoredUser(false);
//     }
//   }, [user]);

//   const activeDark = isDarkMode !== undefined ? isDarkMode : localDark;

//   const toggleTheme = () => {
//     const nextDark = !activeDark;
//     if (setIsDarkMode) {
//       setIsDarkMode(nextDark);
//     }
//     setLocalDark(nextDark);

//     if (nextDark) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   const handleLogout = () => {
//     if (logout) {
//       logout();
//     } else {
//       localStorage.removeItem("token");
//       localStorage.removeItem("userId");
//       localStorage.clear();
//     }
//     setHasStoredUser(false);
//     router.push("/login");
//   };

//   const isUserLoggedIn = user || hasStoredUser;

//   const navLinks = [
//     { name: "Home", href: "#home" },
//     { name: "How It Works", href: "#how-it-works" },
//     { name: "Matches", href: "#matches" },
//     { name: "Exchanges", href: "#exchanges" },
//   ];

//   return (
//     <header
//       className={`fixed top-0 left-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-300 ${
//         activeDark
//           ? "border-emerald-950/60 bg-[#0B1315]/90 text-slate-100"
//           : "border-slate-200/80 bg-white/90 text-slate-900"
//       }`}
//     >
//       <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
//         {/* Logo */}
//         <a href="#home" className="flex items-center gap-3 group">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-lg shadow-teal-600/20 group-hover:bg-teal-500 transition duration-300">
//             <PiHandshakeFill className="text-2xl" />
//           </div>
//           <span className="text-xl font-extrabold tracking-tight">
//             Skill <span className="text-teal-500 dark:text-teal-400">Exchange</span>
//           </span>
//         </a>

//         {/* Navigation Tabs - Hero Anchor Links */}
//         <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
//           {navLinks.map((link) => (
//             <a
//               key={link.href}
//               href={link.href}
//               className={`transition-colors duration-200 ${
//                 activeDark
//                   ? "text-slate-300 hover:text-teal-400"
//                   : "text-slate-600 hover:text-teal-600"
//               }`}
//             >
//               {link.name}
//             </a>
//           ))}
//         </nav>

//         {/* Action Buttons */}
//         <div className="flex items-center gap-3 sm:gap-4">
//           <button
//             onClick={toggleTheme}
//             className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 shadow-sm ${
//               activeDark
//                 ? "border-slate-800 bg-slate-900/50 text-teal-400 hover:bg-slate-800"
//                 : "border-slate-200 bg-slate-100/80 text-teal-600 hover:bg-slate-200"
//             }`}
//             aria-label="Toggle Theme"
//           >
//             {activeDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
//           </button>

//           {isUserLoggedIn ? (
//             <div className="hidden sm:flex items-center gap-3">
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 rounded-xl border border-rose-200 dark:border-rose-950/60 bg-rose-50/50 dark:bg-rose-950/20 px-4 py-2 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/40 transition cursor-pointer shadow-sm"
//                 title="Logout"
//               >
//                 <FiLogOut /> Logout
//               </button>
//             </div>
//           ) : (
//             <div className="hidden sm:flex items-center gap-3">
//               <Link
//                 href="/login"
//                 className={`rounded-xl border px-4 sm:px-5 py-2 text-sm font-semibold transition shadow-sm ${
//                   activeDark
//                     ? "border-slate-800 bg-slate-900/50 text-slate-200 hover:bg-slate-800"
//                     : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
//                 }`}
//               >
//                 Login
//               </Link>

//               <Link
//                 href="/register"
//                 className="rounded-xl bg-teal-600 hover:bg-teal-500 px-4 sm:px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition"
//               >
//                 Get Started
//               </Link>
//             </div>
//           )}

//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className={`md:hidden flex h-10 w-10 items-center justify-center rounded-xl border transition ${
//               activeDark
//                 ? "border-slate-800 bg-slate-900/50 text-slate-200"
//                 : "border-slate-200 bg-slate-100/80 text-slate-700"
//             }`}
//           >
//             {mobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }