import React, { useState } from "react";
import Empty from "./Empty";
import Notes from "./Notes";
import AddNote from "./AddNote";

function NotesApp() {
 const [notes, setNotes] = useState([]);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [editTarget, setEditTarget] = useState(null);

 const openAdd = () => {
  setEditTarget(null);
  setIsModalOpen(true);
 };
 const openEdit = (note) => {
  setEditTarget(note);
  setIsModalOpen(true);
 };
 console.log(notes);
 
 
 const closeModal = () => setIsModalOpen(false);
 return (
    <>
   <div className="grid grid-cols-3 gap-2 p-5 bg-gray-50 h-full">
    <Empty openAdd={openAdd} />
    <Notes notes={notes} openEdit={openEdit} />
   </div>
   {isModalOpen && (<AddNote closeModal={closeModal} setNotes={setNotes} note={editTarget} />)}
  </>
 );
}

export default NotesApp;
