import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { FaPlus, FaX } from "react-icons/fa6";
import AddNote from "./AddNote";

function Empty({ openAdd }) {
 return (
  <>
   <div className="">
    <div className="flex justify-center items-center border border-gray-400 rounded-md bg-white h-72">
     <div
      className="w-20 h-20 rounded-full border-2 border-dashed border-gray-400 flex justify-center items-center hover:border-gray-700 cursor-pointer transition-all"
      onClick={openAdd}
     >
      <FaPlus className="text-gray-500 text-xl" />
     </div>
    </div>
   </div>
  </>
 );
}

export default Empty;
