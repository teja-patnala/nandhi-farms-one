import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "./index.css"
import { Link ,useNavigate} from "react-router-dom";
import LoginLoader from "../LoginLoader"
import { useAuth } from "../../context/AuthContext";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLogin] = useState(false);
  const [loginLoaderStatus, setLoginLoaderStatus] = useState(false);
  const [loadStatus,setLoadStatus] = useState(false);
  const {login} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginStatus) {
      navigate('/', { replace: true });
    }
  }, [loginStatus,navigate]);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  

  const handleLogin = (event) => {
    event.preventDefault();
    setLoginLoaderStatus(true)
    login(email, password)
      .then((userCredential) => {
        setLogin(true);
        setLoginLoaderStatus(false);
      })
      .catch((error) => {
        setLoginLoaderStatus(false);
        alert("Wrong credentials");
      });
  };


  const loginContainePopup = () =>
    { return loadStatus && (
      
      <div className="overlay">
        <Popup
          open={loadStatus} // Open the popup when adminStatus is true
          closeOnDocumentClick={false} // Prevent closing when clicking outside
          position="center center"
        >  <div className="login-container parallel-login-container">
            <LoginLoader loadStatus = {loginLoaderStatus}/>
            <div className="login-box">
              <h2 className="login-heading">Login</h2>
              <p style={{textAlign:"center",margin:"10px"}}>Nandhi Farms</p>
              <form onSubmit={handleLogin}>
                <div className="input-group">
                  <label htmlFor="username">Email</label>
                  <input
                    onChange={handleEmail}
                    required
                    type="email"
                    id="username"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={handlePassword}
                    required
                    type="password"
                    id="password"
                  />
                </div>
                <button className="button" type="submit">Login</button>
                <p className="para" style={{ textAlign: "center" }}>
                  If you are not a user please click here to<br></br>
                  <Link className="para-link" to="/signup">sign up</Link>
                </p>
                <p className="para" style={{ textAlign: "center" }}>
                  <Link className="para-link" to="/forgot-password">forgot password</Link>
                </p>
              </form>
            </div>
          </div>
        </Popup>
      </div>
    )}

  return (
    <div className="new-login-container">
      {loginContainePopup()}
      <div className="new-header-login">
        <div className="sub-new-header-login">
          <h1 className="new-login-heading">Nandhi Farms</h1>
          <div>
            <button className="new-login-button" onClick={()=>setLoadStatus(true)}>Login</button>
          </div>
        </div>
      </div>
      <h1 className="h1-one">We enjoy to share our Oraganic products with you</h1>
      <div className="subscription-info">
        <div className="sub-subscription-info">
          <div className="sub-info">
            <h1 className="info-font">Milk Subscription</h1>
            <p className="para-font">Organic milk supplied to our valued subscribers and subscrition avaliable in days that is 1,7 or 30 days. Subscriber will get a regular otp to collect the milk</p>
          </div>
          <div className="sub-info">
            <h1 className="info-font">Dairy Delights</h1>
            <p className="para-font">Dairy products that are obtained from orgain milk products besides naturally harvested only are served to our coustomers home with 24 hours.</p>
          </div>
        </div>
        <div className="sub-subscription-info">
          <div className="sub-info">
            <h1 className="info-font">Nourshing Delights</h1>
            <p className="para-font">Experince the Organic meat and eggs. we will provide Goat,sheep meat and Chicken and eggs. need a day pre-order for today's need  </p>
          </div>
          <div className="sub-info">
            <h1 className="info-font">Bulk Orders for Events</h1>
            <p className="para-font">On your need please inform us a week before for the event, we always ready orders on avaliable Quantity.Your guest will experince natural flavours of our products.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;