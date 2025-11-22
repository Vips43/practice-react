import React, { useEffect, useRef } from "react";
import usePassGenStore from "../store/store";

function PasswordGen() {
 const {
  input,
  range,
  num,
  sym,
  setInput,
  setRange,
  setNum,
  setSym,
  resetForm,
 } = usePassGenStore();
 const inputRef = useRef(null);

 let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
 if (num) str += "12345676890";
 if (sym) str += "<@%^&|~>";

 function genPass() {
  let pass = "";
  for (let i = 0; i < range; i++) {
   let rand = Math.floor(Math.random() * str.length);
   let char = str.charAt(rand);
   pass += char;
  }
  console.log(pass);
  setInput(pass);
 }

 useEffect(() => {
  genPass();
 }, [range, num, sym]);

 function copyClipboard() {
  if (!input) return;
  navigator.clipboard
   .writeText(input)
   .then(() => console.log("password successfully copied"))
   .catch((err) => console.log("therre is an error", err));
  inputRef.current.select();
  inputRef.current.focus();
 }

 return (
  <>
   <div className="border m-2">
    <div>
     <h1>Pass gen</h1>
    </div>
    <div className="border-t">
     <div className="m-10">
      <input
       ref={inputRef}
       type="text"
       value={input}
       onChange={(e) => setInput(e.target.value)}
       className="border px-2 py-1 rounded focus:border-blue-400  outline-none select-none cursor-default" readOnly
      />
      <input
       type="range"
       max={20}
       min={1}
       value={range}
       onChange={(e) => setRange(Number(e.target.value))}
      />
      <label className="w-fit flex items-center gap-3 select-none">
       <input
        className="w-fit! "
        checked={num}
        type="checkbox"
        onChange={(e) => setNum(e.target.checked)}
       />
       Num
      </label>
      <label className="w-fit flex items-center gap-3 select-none">
       <input
        className="w-fit!  "
        type="checkbox"
        checked={sym}
        onChange={(e) => setSym(e.target.checked)}
       />
       Sym
      </label>
      <div>
       <button onClick={copyClipboard}>Copy Pass</button>
       <button onClick={resetForm}>Reset pass</button>
       {/* <button >Generate Pass</button> */}
      </div>

      <div>
       <p>Password is:- {input} </p>
      </div>
     </div>
    </div>
   </div>
  </>
 );
}

export default PasswordGen;
