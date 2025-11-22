import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";

function AddNote({ closeModal, note, setNotes }) {
 const mode = note ? "edit" : "add";
 const [title, setTitle] = useState(note?.title ?? "");
 const [desc, setDesc] = useState(note?.desc ?? "");

 useEffect(() => {
  if (note) {
   setTitle(note.title);
   setDesc(note.desc);
   console.log(note.title);
  }
 }, [note]);

 const addNote=()=>{
    setNotes(prev=> [
        ...prev, {title, desc}
    ])
 }

 return (
  <>
   <AnimatePresence>
    <motion.div
     className="fixed top-0 left-0 z-50 w-screen h-screen bg-gray-950/80 flex justify-center items-center select-none"
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     exit={{ opacity: 0 }}
    >
     <motion.div
      className="bg-white p-5 relative"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ duration: 0.25 }}
     >
      <div
       className="absolute top-1 right-1 cursor-pointer z-20"
       onClick={closeModal}
      >
       <FaX className="text-red-500 text-xl" />
      </div>

      <div className="border border-gray-300 flex flex-col gap-2 p-3 rounded">
       <h2 className="text-center">
        {mode === "add" ? "Add Note" : "Edit Note"}
       </h2>

       <div className="border-t border-gray-400 flex flex-col gap-2 pt-2">
        <label>
         Title
         <input
          type="text"
          className="w-full"
          value={title}
          onChange={e => setTitle(e.target.value)}
         />
        </label>

        <label>
         Description
         <textarea
          className="bg-gray-300 w-full"
          value={desc}
          onChange={e => setDesc(e.target.value)}
         />
        </label>

        <button className="text-sm! whitespace-nowrap px-2! py-1! m-0! w-fit!" onClick={addNote} >
         {mode === "add" ? "Add" : "Edit"}
        </button>
       </div>
      </div>
     </motion.div>
    </motion.div>
   </AnimatePresence>
  </>
 );
}

export default AddNote;
