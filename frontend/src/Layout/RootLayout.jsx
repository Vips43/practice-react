import React from "react";
import Navbar from "../form/Navbar";
import { Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

function RootLayout() {
 const location = useLocation();
 return (
  <>
   <div className="min-h-screen flex flex-col bg-gray-100">
    {/* Your navbar here */}
    <Navbar />
    {/* Page transition animation */}
    <AnimatePresence mode="wait">
     <motion.div
      key={location.pathname}
      className="w-full flex-1"
      initial={{ opacity: 0,  }}
      animate={{ opacity: 1,  }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
     >
      <Outlet />
     </motion.div>
    </AnimatePresence>

    {/* Your footer here */}
   </div>
  </>
 );
}

export default RootLayout;
