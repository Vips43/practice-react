import React, { useContext } from "react";
import axios from "axios";
import "./login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";

function LogIn() {
  const {setUser} = useContext(AuthContext);
 const [pass, setPass] = useState("");
 const [email, setEmail] = useState("");
 const [success, setSuccess] = useState(false);
 const navigate = useNavigate();

 const handleSubmit = (e) => {
  e.preventDefault();

  console.log("Logging in:", { email, pass }); // debug
  axios
   .post("http://localhost:3000/login", { email, pass })
   .then((result) => {
    if (result.data.status === "Success") {
     setSuccess(true);
     setUser(result.data.user.name)
     setTimeout(() => {
      navigate("/home");
     }, 2000);
    } else {
     alert(result.data);
    }
   })
   .catch((error) => console.log(error));
 };
 return (
  <>
   <form action="" onSubmit={handleSubmit}>
    <div className="main">
     <div className="heading">
      <Link to="/register"> &#8592;</Link>
      <h3>Login</h3>
     </div>
     <div className={`alert ${success ? 'opacity-100' : 'opacity-0'}`}>
      <p>login successfull</p>
     </div>
     <div className="email">
      <input
       type="text"
       placeholder="Username"
       onChange={(e) => setEmail(e.target.value)}
      />
     </div>
     <div className="pass">
      <input
       type="password"
       placeholder="password"
       onChange={(e) => setPass(e.target.value)}
      />
     </div>

     <div className="submit">
      <input type="submit" value="Login" placeholder="Username" />
     </div>
    </div>
   </form>
  </>
 );
}

export default LogIn;
