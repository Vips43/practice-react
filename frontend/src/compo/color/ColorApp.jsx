import React, { useEffect, useState } from "react";
import colorsAPI, { randomColor } from "./API/api";

function ColorApp() {
 const [color, setColor] = useState({ name: "", hex: "" });

 useEffect(() => {
  const getData = async () => {
   const data = await colorsAPI();
   const rand = await randomColor();
   console.log(rand.ranColorHex, rand.ranColorName);
   setColor({ name: rand.ranColorName, hex: rand.ranColorHex });
  };
  getData();
 }, []);
 const copyHex = (e) => {
  const hex = e.target.textContent;
  navigator.clipboard.writeText(hex);
  e.target.textContent = "copied!";
  setTimeout(() => {
   e.target.textContent = hex;
  }, 1000);

  console.log("copied");
 };

 return (
  <>
   <div className="border h-96 mt-10" style={{ background: `${color.hex}` }}>
    <div>
     <h1 style={{ color: `black` }}>{color.name}</h1>
     <h1 style={{ color: `black` }} onClick={copyHex}>
      {color.hex}
     </h1>
     <button
      onClick={async () => {
       const rand = await randomColor();
       setColor({ name: rand.ranColorName, hex: rand.ranColorHex });
       console.log("clicked");
      }}
     >
      Get color
     </button>
    </div>
   </div>
  </>
 );
}

export default ColorApp;
