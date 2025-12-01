import axios from "axios";
import "./login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "./AuthStore";

function LogIn() {
 const [pass, setPass] = useState("");
 const [email, setEmail] = useState("");
 const [success, setSuccess] = useState(false);
 const navigate = useNavigate();
 const setUser = useAuthStore((state) => state.setUser);

 const handleSubmit = (e) => {
  e.preventDefault();

  axios
   .post("http://localhost:3000/login", { email, pass })
   .then((result) => {
    // if (result.data.status === "success") {
     setUser(result.data.user.name);
     setSuccess(true);
     setTimeout(() => {
      navigate("/");
     }, 2000);
    // } else {
    //   alert(result.data.msg);
    // }
   })
   .catch((error) => alert("invalid credentials"));
 };

 return (
  <>
   <form action="" onSubmit={handleSubmit}>
    <div className="main">
     <div className="heading">
      <Link to="/register"> &#8592;</Link>
      <h3>Login</h3>
     </div>
     <div className={`alert ${success ? "opacity-100" : "opacity-0"}`}>
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
