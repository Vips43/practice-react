import React, { useState } from "react";
import Btn from "./Btn";
import { useMyStore, useStoreLocal } from "../../store/store";

function List() {
 const clamp = useMyStore((state) => state.clamp);
 const setClamp = useMyStore((state) => state.setClamp);
 const tasks = useStoreLocal((state) => state.tasks);
 const removeTask = useStoreLocal((state) => state.removeTask);
 const setChecked = useStoreLocal((state) => state.setChecked);

 return (
  <main className="h-96">
   <div className="flex justify-center">
    <ul className="w-md p-2">
     {tasks.map((task, index) => (
      <li key={index} className="flex gap-2 items-center">
       <div>
        <input
         type="checkbox"
         className="accent-neutral-500"
         checked={task.completed}
         onChange={() => setChecked(index)}
        />
       </div>
       <div
        className={`text-sm max-w-2xl leading-4 ${clamp}`}
        onClick={() => setClamp()}
       >
        <span className={`${task.completed ? "line-through" : "no-underline"}`}>
         {task.text}
        </span>
       </div>
       <div className="ml-auto" onClick={() => removeTask(index)}>
        <Btn text={"X"} cls={`bg-red-400! py-1! text-xs!`} />
       </div>
      </li>
     ))}
    </ul>
   </div>
  </main>
 );
}

export default List;
