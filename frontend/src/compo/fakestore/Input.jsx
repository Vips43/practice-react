import React, { useEffect, useRef, useState } from "react";

function Input() {
 let timerId = useRef(null)

 const handleChange = (e) => {
  let val = e.target.value;

  clearTimeout(timerId.current);

  timerId.current = setTimeout(() => {
   if (val !== "") {
    console.log("name is:", val);
   }

  }, 1000);
 };

 return (
  <>
   <label>input</label>
   <input type="search" onChange={handleChange} />
  </>
 );
}

export default Input;
