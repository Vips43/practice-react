import React, { useEffect } from "react";
import { useUserStore } from "./StarsStore";

function UserForm() {
 const { user, comment, comments, setUser, setComment, addComment } =
  useUserStore();

 const handleSubmit = (e) => {
  e.preventDefault();
  if (!user || !comment) return;
  addComment();
 };
 useEffect(()=>{
    localStorage.setItem('comments', JSON.stringify(comments))
 },[comments])

 return (
  <>
   <form onSubmit={handleSubmit}>
    <div className="flex flex-col gap-2 shadow-md py-5 px-10">
     <div className="flex flex-col">
      <label htmlFor="name">User</label>
      <input
       type="text"
       id="name"
       value={user}
       onChange={(e) => setUser(e.target.value)}
       className="bg-gray-200! focus:outline-gray-400 focus:outline-1 p-2"
      />
     </div>
     <div className="flex flex-col">
      <label htmlFor="cmnt">Comment</label>
      <textarea
       name=""
       id="cmnt"
       value={comment}
       onChange={(e) => setComment(e.target.value)}
       className="bg-gray-200! rounded-md focus:outline-gray-400 focus:outline-1 p-2"
      ></textarea>
     </div>
     <div className="w-fit px-2">
      <input type="submit" value="submit" />
     </div>
    </div>
   </form>
   
  </>
 );
}

export default UserForm;
