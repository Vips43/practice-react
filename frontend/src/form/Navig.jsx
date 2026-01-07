import React, { useState } from "react";
import { Link, Outlet } from "react-router";

function Navig() {

 return (
  <>
   <div className="border m-3 p-3 gap-2 grid grid-cols-2 justify-stretch">
    
    <Link to={"/navigation/passgenapp"}>
     <button className="m-0!">Password Generator App</button>
    </Link>
    <Link to={"/navigation/notepadapp"}>
     <button className="m-0!">Notepad App</button>
    </Link>
    <Link to={"/navigation/colorapp"}>
     <button className="m-0!">Color App</button>
    </Link>
    <Link to={"/navigation/tmdbapp"}>
     <button className="m-0!">TMDB App</button>
    </Link>
    <Link to={"/navigation/review"}>
     <button className="m-0!">Rate Review App</button>
    </Link>
    <Link to={"/navigation/ToDoList"}>
     <button className="m-0!">Todo List App</button>
    </Link>
    <Link to={"/navigation/fakestore"}>
     <button className="m-0!">Fake Store App</button>
    </Link>
    <Link to={"/navigation/usermgmt"}>
     <button className="m-0!">User Management App</button>
    </Link>
   </div>
 
   <Outlet />
  </>
 );
}

export default Navig;
