import React, { useState } from "react";
import { RiStarSLine, RiStarSFill } from "react-icons/ri";
import { StarsStore } from "./StarsStore";

function RateReview() {
 const rating = StarsStore((s) => s.rating);
 const hover = StarsStore((s) => s.hover);
 const setRating = StarsStore((s) => s.setRating);
 const setHover = StarsStore((s) => s.setHover);
 

 return (
  <>
   <div className="text-2xl flex">
    {[1, 2, 3, 4, 5].map((num) => (
     <span
      key={num}
      onMouseEnter={() => setHover(num)}
      onMouseLeave={() => setHover(0)}
      onClick={() => setRating(num)}
     >
      {(hover || rating) >= num ? (
       <RiStarSFill className="text-yellow-500 text-3xl cursor-pointer" />
      ) : (
       <RiStarSLine className="text-yellow-500 text-3xl cursor-pointer" />
      )}
     </span>
    ))}
   </div>
   {rating > 0 && (
    <div className="flex justify-center flex-col items-center mt-4">
     <p>You rated: {rating} </p>
     <p>
      {rating >= 3
       ? "Wow! you Loved it 😍 please share your experience!"
       : "Thanks for your feedback! Help us improve 💛"}
     </p>
    </div>
   )}
   
  </>
 );
}

export default RateReview;
