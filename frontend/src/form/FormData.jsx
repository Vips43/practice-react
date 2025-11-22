import React, { useState, useEffect } from "react";
import "../App.css";
import { Outlet } from "react-router";



function Form() {
 const [values, setValues] = useState({
  firstname: "",
  lastname: "",
  email: "",
  gender: "",
  contact: "",
  subject: "",
  resume: "",
  url: "",
  about: "",
 });


 const handleChange = (e) => {
  setValues({ ...values, [e.target.name]: e.target.value });
 };
 const handleSubmit = (e) => {
  e.preventDefault();
  console.log(values);
  ResetFun();
  
 };
 const ResetFun = () => {
  setValues({
   firstname: "",
   lastname: "",
   email: "",
   gender: "",
   contact: "",
   subject: "",
   url: "",
   resume: "",
   about: "",
  });
 };
 
 
 return (
  <>
   <div className="container">
    <h1>Form in React</h1>
    <form onSubmit={handleSubmit}>
     <div className="text-container">
      <input
       className="input"
       type="text"
       name="firstname"
       value={values.firstname}
       onChange={(e) => handleChange(e)}
       required
      />
      <label className="label" htmlFor="firstname">
       First name*
      </label>
     </div>
     <div className="text-container">
      <input
       className="input"
       type="text"
       name="lastname"
       value={values.lastname}
       onChange={(e) => handleChange(e)}
       required
      />
      <label className="label" htmlFor="lastname">
       Last name*
      </label>
     </div>
     <div className="text-container">
      <input
       className="input"
       type="email"
       name="email"
       value={values.email}
       onChange={(e) => handleChange(e)}
       required
      />
      <label className="label" htmlFor="email">
       Email*
      </label>
     </div>
     <div className="text-container">
      <input
       className="input"
       type="contact"
       name="contact"
       value={values.contact}
       onChange={(e) => handleChange(e)}
       required
      />
      <label className="label" htmlFor="contact">
       Phone number
      </label>
     </div>
     <h3 htmlFor="male">Gender</h3>
     <label htmlFor="male">male</label>
     <input
      type="radio"
      name="gender"
      id="male"
      value="Male"
      checked={values.radio}
      onChange={(e) => handleChange(e)}
     />
     {"Male"}

     <input
      type="radio"
      name="gender"
      value="Female"
      checked={values.radio}
      onChange={(e) => handleChange(e)}
     />
     {"Female"}

     <input
      type="radio"
      name="gender"
      value="Other"
      checked={values.radio}
      onChange={(e) => handleChange(e)}
     />
     {"Other"}

     <label htmlFor="subject">Subject</label>
     <select
      name="subject"
      id="subject"
      value={values.subject}
      onChange={(e) => handleChange(e)}
      required
     >
      <option value="select">Select</option>
      <option value="math">Math</option>
      <option value="physics">physics</option>
      <option value="english">english</option>
     </select>
     <label htmlFor="resume">Resume</label>
     <input
      type="file"
      name="resume"
      placeholder="select resume"
      value={values.resume}
      onChange={(e) => handleChange(e)}
     />
     <label htmlFor="url">URL</label>
     <input
      type="text"
      name="url"
      placeholder="Enter Image URL"
      value={values.url}
      onChange={(e) => handleChange(e)}
     />
     <label htmlFor="about">About</label>
     <textarea
      name="about"
      id="about"
      cols="30"
      rows="10"
      value={values.about}
      placeholder="Enter description"
      onChange={(e) => handleChange(e)}
     ></textarea>
     <button type="button" onClick={ResetFun}>
      Reset
     </button>
     <button type="submit">Submit</button>
    </form>
   </div>
   <Outlet />
  </>
 );
}

export default Form;
