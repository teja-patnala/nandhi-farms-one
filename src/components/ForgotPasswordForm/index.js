import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"; // You can create this CSS file to style your "Forgot Password" page
import { useAuth } from "../../context/AuthContext";
import {Link} from "react-router-dom"


function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const {resetPassword} = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await resetPassword(email)
    .then(() => {
        alert("Password reset mail sent sucessfully ")
        window.open(
          "https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ifkv=AXo7B7WGLarcgQpZ0e7vDx6VZOsLiouWDEIfInIPdV8Q7sJibVIZme7lPpoK-VSbXPqrmo8i4ISfbw&rip=1&sacu=1&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S755539670%3A1692606227777372",
          "_blank", // Opens in a new tab
          "noopener noreferrer"
        );
        navigate("/login",{replace:true})

      })
        
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode,errorMessage);
    });
  };



  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2 className="forgot-heading">Forgot Password</h2>
        <p>Enter your email address to receive a password reset link.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Reset Password</button>
          <p style={{textAlign:"center",paddingTop:"10px"}}>go to signin page <Link  className ="link-signin" to = "/">signin</Link></p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;