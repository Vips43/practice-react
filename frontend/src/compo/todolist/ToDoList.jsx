import React, { useState, useEffect } from "react";
import Input from "./Input";
import Btn from "./Btn";
import List from "./List";
import { useStoreLocal } from "../../store/store";

function ToDoList() {
 document.title = "ToDoList | my App";

 const tasks = useStoreLocal((state) => state.tasks);
 const addTasks = useStoreLocal((state) => state.addTasks);

 const [inputVal, setInputVal] = useState("");

 const handleClick = () => {
  if (!inputVal.trim()) return;
  addTasks(inputVal);
  setInputVal("");
 };

 useEffect(() => {
  console.log("Updated tasks:", tasks);
 }, [tasks]);

 return (
  <main className="max-w-xl mx-auto space-y-2 mt-4 h-fit bg-neutral-400 p-4 rounded">
   <h2 className="text-2xl font-semibold text-center">ToDoList</h2>

   <div className="flex gap-3 items-center justify-center">
    <Input value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
    <Btn text="Add" cls="text-sm!" onClick={handleClick} />
   </div>

   <div className="bg-neutral-500 h-full p-2 rounded">
    <List />
   </div>
  </main>
 );
}

export default ToDoList;
