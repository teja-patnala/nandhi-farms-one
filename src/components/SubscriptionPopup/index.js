import React from "react";
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router-dom";
import 'reactjs-popup/dist/index.css';
import { useAuth } from '../../context/AuthContext';
import "./index.css";

const SubscriptionPopup = ({ userData }) =>{
  const navigate = useNavigate();
  const currentDate = new Date();
  const {currentUserDataOne} = useAuth()
  const tomorrowDate = new Date(currentDate);
  tomorrowDate.setDate(currentDate.getDate() + 1);
  const formattedTomorrowDate = tomorrowDate.toDateString();

  function goToHome(){
    return navigate("/")
  }

  return(
  <div className="popup-container">
    {userData.subscription && (
      <div className="overlay">
        <Popup
          open={currentUserDataOne.subscription && currentUserDataOne.noDaysSuppliesMilk!==1} // Open the popup when adminStatus is true
          closeOnDocumentClick={false} // Prevent closing when clicking outside
          position="center center"
        >
        <div className="popup-content animate-text">
          <div className="content-border">
            <h1>Your subscription is ongoing</h1>
            <p style={{fontSize:"17px"}}>From : {userData.milkSupliesStartsFrom}</p>
            <p style={{fontSize:"17px"}}>End : {userData.milkSupliesEnd}</p>
            <h3>Remaining days: {userData.noDaysSuppliesMilk}</h3>
            <h3>{userData.noDaysSuppliesMilk===1 && `It's going to end ${formattedTomorrowDate}`}</h3>
            <button onClick={goToHome} className="home-button">Go to home</button>
          </div>
        </div>
        </Popup>
      </div>
    )}
  </div>
);
} 
export default SubscriptionPopup;
