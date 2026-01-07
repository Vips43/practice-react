import React from "react";
import { useUserStore } from "./StarsStore";

function Comments() {
 const { comments} = useUserStore();

 

 return (
  <>
   <div className="mt-4 mx-auto shadow-md w-xl p-2 space-y-4">
    <h3 className="font-bold text-2xl ">All Comments:</h3>
    <ul className="flex flex-col gap-1">
     {comments.map((c, i) => (
      <li key={i} className="bg-gray-50 p-2">
       <div className="flex gap-3">
        <div className="">
         <img src={c.userprofile} alt="image" className="h-10 rounded-full" />
        </div>
        <div>
         <p className="flex flex-col">
          <strong className="text-sm">{c.username}: <span>{c.time}</span></strong>
          <span className="text-xs text-gray-500">{c.usercomment}</span>
         </p>
        </div>
       </div>
      </li>
     ))}
    </ul>
   </div>
  </>
 );
}

export default Comments;
