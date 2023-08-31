import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "./index.css";

const SubscriptionPopup = ({ userData }) => (
  <div className="popup-container">
    {userData.subscription && (
      <div className="overlay">
        <Popup
          open={userData.subscription} // Open the popup when adminStatus is true
          closeOnDocumentClick={false} // Prevent closing when clicking outside
          position="center center"
        >
        <div className="popup-content animate-text">
            
        </div>
        </Popup>
      </div>
    )}
  </div>
);

export default SubscriptionPopup;
