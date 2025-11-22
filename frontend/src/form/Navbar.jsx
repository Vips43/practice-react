import React from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";

function Navbar() {
 return (
  <>
   <div className="w-full bg-gray-700 flex justify-center p-3">
    <nav className="w-full max-w-6xl flex flex-wrap items-center justify-between bg-white p-3 px-5 rounded-3xl shadow-sm transition-all">
     {/* Brand / Logo */}
     <div className="text-2xl font-semibold capitalize text-gray-800 select-none">
      Hello
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
      <div className="flex items-center gap-2 p-2 w-fit">
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
     </motion.div>
    </nav>
   </div>
  </>
 );
}

export default Navbar;
