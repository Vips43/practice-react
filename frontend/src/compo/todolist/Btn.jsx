import React from "react";

function Btn({ text, onClick, cls }) {
 return (
  <>
   <button className={`w-fit! bg-neutral-700! p-2! m-1! ${cls}`} onClick={onClick}>{text}</button>
 
  </>
 );
}

export default Btn;
