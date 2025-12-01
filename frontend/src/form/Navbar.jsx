import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { AuthContext } from "./AuthContext";

function Navbar() {
 const [toggle, setToggle] = useState(false);
 const { user } = useContext(AuthContext);

 const toggleMenu = () => {
  setToggle(!toggle);
 };
 return (
  <>
   <div className="w-full bg-gray-700 flex justify-center p-3">
    <nav className="w-full max-w-6xl flex flex-wrap items-center justify-between bg-white p-3 px-5 rounded-3xl shadow-sm transition-all">
     {/* Brand / Logo */}
     <div className="text-2xl font-semibold capitalize text-gray-800 select-none">
      Rand
     </div>

     {/* Navigation Links */}
     <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
      <ul className="hidden sm:flex items-center text-sm font-semibold border shadow-sm rounded-3xl p-0.5 overflow-hidden bg-white transition-all">
       {[
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/cuisine", label: "Cuisine" },
        { to: "/navigation", label: "Navigation" },
       ].map(({ to, label }, index, arr) => (
        <li key={to}>
         <NavLink
          to={to}
          className={({ isActive }) =>
           `block px-4 py-2 transition-all duration-200 
          ${
           index === 0
            ? "rounded-l-3xl" // first item
            : index === arr.length - 1
            ? "rounded-r-3xl" // last item
            : "rounded-none" // middle items
          } 
          ${
           isActive
            ? "bg-blue-200 text-blue-600 font-bold shadow-sm"
            : "text-gray-700 hover:text-blue-500 hover:bg-blue-50"
          }`
          }
         >
          {label}
         </NavLink>
        </li>
       ))}
      </ul>
     </motion.div>

     {/* Auth Links */}
     <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
      {user ? (
       <div>
        <span>Welcome, <span className="font-semibold capitalize">{user}</span></span>
       </div>
      ) : (
       <div className="items-center gap-2 p-2 w-fit hidden sm:flex">
        <NavLink
         to="/register"
         className={({ isActive }) =>
          `font-bold rounded-2xl px-3 py-1 transition-all duration-200 ${
           isActive
            ? "text-blue-600 bg-blue-200 shadow-sm"
            : "text-gray-800 hover:text-blue-500"
          }`
         }
        >
         Signup
        </NavLink>

        <span className="text-gray-400">/</span>

        <NavLink
         to="/login"
         className={({ isActive }) =>
          `font-bold rounded-2xl px-3 py-1 transition-all duration-200 ${
           isActive
            ? "text-blue-600 bg-blue-200 shadow-sm"
            : "text-gray-800 hover:text-blue-500"
          }`
         }
        >
         Login
        </NavLink>
       </div>
      )}
     </motion.div>
     <div className="relative lg:hidden sm:hidden text-xl">
      <div
       className="border border-gray-300 hover:border-gray-500 rounded-full p-1.5 "
       onClick={toggleMenu}
      >
       <GiHamburgerMenu />
      </div>

      <div
       className={`absolute h-[calc(100vh-80px)] top-11 -right-8 z-50 bg-gray-200 transition-all overflow-hidden ${
        toggle ? "w-60" : "w-0"
       }`}
      >
       <ul className="flex flex-col gap-2 py-5 px-2 text-lg">
        <NavLink to={"/"}>
         <li
          className={`px-2 py-1  bg-gray-500 text-gray-800 hover:bg-gray-200`}
         >
          Home
         </li>
        </NavLink>
        <NavLink to={"/about"}>
         <li
          className={`px-2 py-1  bg-gray-500 text-gray-800 hover:bg-gray-200`}
         >
          About
         </li>
        </NavLink>
        <NavLink to={"/cuisine"}>
         <li
          className={`px-2 py-1  bg-gray-500 text-gray-800 hover:bg-gray-200`}
         >
          Cuisine
         </li>
        </NavLink>
        <NavLink to={"/navigation"}>
         <li
          className={`px-2 py-1  bg-gray-500 text-gray-800 hover:bg-gray-200`}
         >
          Navigation
         </li>
        </NavLink>
       </ul>
      </div>
     </div>
    </nav>
   </div>
  </>
 );
}

export default Navbar;
