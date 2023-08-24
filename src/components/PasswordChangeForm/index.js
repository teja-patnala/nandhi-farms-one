import React, { useState } from "react";
import "./index.css"; // You can create this CSS file to style your password change page
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";


function PasswordChangeForm() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
 
  const {updatePassword} = useAuth()

  const [result, setResult] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(Cookies.get("nandhi-farms-access-token") !==undefined){
      if (formData.newPassword === formData.confirmPassword){
        updatePassword(formData.newPassword)
        .then(() => {
          setResult("password updated succesfully")
        })
        .catch((error) => {
          console.log(error.message)
        });
      }
    }
  };
  

  return (
    <div className="password-change-container">
      <div className="password-change-box">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Change Password</button>
          <p style={{padding:"10px",textAlign:"center"}}>{result}</p>
        </form>
      </div>
    </div>
  );
}

export default PasswordChangeForm;