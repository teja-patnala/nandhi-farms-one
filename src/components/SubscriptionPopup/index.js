import React from "react";
import { useTranslation } from 'react-i18next';
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
  const {t} = useTranslation();

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
            <h1>{t('subscHeading')}</h1>
            <p style={{fontSize:"17px"}}>{t('from')} : {userData.milkSupliesStartsFrom}</p>
            <p style={{fontSize:"17px"}}>{t('end')} : {userData.milkSupliesEnd}</p>
            <h3>{t('remainDays')}: {userData.noDaysSuppliesMilk}</h3>
            <h3>{userData.noDaysSuppliesMilk===1 && `${t('subsEndHeading')} ${formattedTomorrowDate}`}</h3>
            <button onClick={goToHome} className="home-button">{t('homeBtn')}</button>
          </div>
        </div>
        </Popup>
      </div>
    )}
  </div>
);
} 
export default SubscriptionPopup;
