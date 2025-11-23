import React, { useEffect, useState } from "react";
import Empty from "./Empty";
import Notes from "./Notes";
import AddNote from "./AddNote";

function NotesApp() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editTarget, setEditTarget] = useState(null);
   const [notes, setNotes] = useState(()=>{
      const storeArray = localStorage.getItem('notes');
      return storeArray ? JSON.parse(storeArray) : []
   });

 const openAdd = () => {
  setEditTarget(null);
  setIsModalOpen(true);
 };
 const openEdit = (note) => {
  setEditTarget(note);
  setIsModalOpen(true);
 };
 const delNote = (id) => {
  setNotes(prev=> prev.filter((_, i)=> i!== id))
   
 };
 useEffect(()=>{
   localStorage.setItem('notes', JSON.stringify(notes));
 },[notes])
 
 const closeModal = () => setIsModalOpen(false);
 return (
    <>
   <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 p-5 bg-gray-50 h-full mx-auto mt-5 max-w-2xl shadow-md">
    <Empty openAdd={openAdd} />
    <Notes notes={notes} openEdit={openEdit} delNote={delNote} />
   </div>
   {isModalOpen && (<AddNote closeModal={closeModal} notes={notes} setNotes={setNotes} note={editTarget} />)}
  </>
 );
}

export default NotesApp;
