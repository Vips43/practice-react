import React, { useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";

function Notes({ notes, openEdit, delNote }) {
 const [menu, setMenu] = useState(false);

 const toggleMenu = () => setMenu(!menu);


 return (
  <>
   {notes.map((note, i) => (
    <div className="bg-white h-72 shadow-md rounded-md select-none" key={i}>
     <div className="flex flex-col justify-between h-full gap-4 p-2">
      <div>
       <h2 className="font-semibold select-none">{note.title}</h2>
      </div>
      <div className="text-gray-600 text-sm ring-1 h-full ring-gray-300 rounded-md p-2 select-none">
       <p>{note.desc}</p>
      </div>
      <div className="relative flex items-end justify-end">
       <div
        className={`border border-gray-300 hover:bg-gray-300 p-1 rounded-full transition-all`}
        onClick={toggleMenu}
       >
        <HiDotsVertical />
       </div>
       <div
        className={`absolute -top-2 right-7 text-xs bg-gray-300 w-fit justify-center gap-0 rounded-md overflow-hidden lg:flex-col ${
         menu ? "flex" : "hidden"
        }`}
       >
        <div
         className="flex items-center gap-2 p-1 w-fit hover:bg-gray-400"
         onClick={() => openEdit(note)}
        >
         <MdEditSquare />
         <span>Edit</span>
        </div>
        <div
         className="flex items-center gap-2 p-1 w-fit hover:bg-gray-400"
         onClick={() => delNote(i)}
        >
         <MdDelete />
         <span>Delete</span>
        </div>
       </div>
      </div>
     </div>
    </div>
   ))}
  </>
 );
}

export default Notes;
