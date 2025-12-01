import React, { useState } from "react";
import { Link, Outlet } from "react-router";

function Navig() {
 const [text, setText] = useState("");
 const [output, setOutput] = useState([]);

 function onChangeFun(e) {
  setText(e.target.value);
 }
 function onBtnClick() {
  if (text.trim() === "") return;
  setOutput([...output, text]);
  setText("");
 }
 function onBtnUpp() {
  setOutput(output.map((item) => item.toUpperCase()));
 }
 function onBtnClear() {
  setOutput([]);
 }
 return (
  <>
   <div className="border m-3 grid grid-cols-2 justify-stretch">
    
    <Link to={"/navigation/passgenapp"}>
     <button>Password Generator App</button>
    </Link>
    <Link to={"/navigation/notepadapp"}>
     <button>Notepad App</button>
    </Link>
    <Link to={"/navigation/colorapp"}>
     <button>Color App</button>
    </Link>
    <Link to={"/navigation/tmdbapp"}>
     <button>TMDB App</button>
    </Link>
   </div>
   <div>
    {output.map((item, i) => (
     <p key={i}>{item}</p>
    ))}
   </div>
   <Outlet />
  </>
 );
}

export default Navig;
