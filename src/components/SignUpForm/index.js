import React, { useState,useEffect} from "react";
import "./index.css"; // You can create this CSS file to style your sign-up page
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {collection,addDoc,serverTimestamp} from "firebase/firestore";
import {db} from "../../firestore";


function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cart:[],
    subscription:false,
    litersOfMilk:0,
    noDaysSuppliesMilk:0,
    otpForMilkCollection: 0
  });

  const {signup} = useAuth()

  const [status,setSignupStatus] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigateToLogin = useNavigate();

  useEffect(() => {
    if (status) {
      navigateToLogin("/login", { replace: true });
    }
  }, [status,navigateToLogin]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(formData.password===formData.confirmPassword){
      const userFormData = {firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      cart:formData.cart,
      subscription:formData.subscription,
      litersOfMilk:formData.litersOfMilk,
      noDaysSuppliesMilk:formData.noDaysSuppliesMilk

    }
      signup(formData.email, formData.password)
      .then(async() => {
        try{
          const docRef = await addDoc(collection(db,"users"),{...userFormData,timeStamp:serverTimestamp()});
          console.log("Document written with ID ",docRef.id)
        }catch(e){
          console.error("Errpr adding document:  ",e)
        }
        setSignupStatus(true)
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage)
      });
    }else{
      alert("passwords does not match")
    }
  };

  

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-heading">Sign Up Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              pattern="[0-9]*" // Only allows digits
              minLength="10" // Minimum length for a valid mobile number
              maxLength="10" // Maximum length for a valid mobile number
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <h3 className="signup-heading">Delivery Address</h3>
          <div className="input-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="zip">ZIP Code</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;