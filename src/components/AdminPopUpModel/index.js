import React from "react";
import Popup from 'reactjs-popup';
import {Link} from "react-router-dom"
import 'reactjs-popup/dist/index.css';
import "./index.css"; 

const ReactPopUp = ({ adminStatus }) => (
  <div className="popup-container">
    {adminStatus && (
      <div className="overlay">
        <Popup
          open={adminStatus} // Open the popup when adminStatus is true
          closeOnDocumentClick={false} // Prevent closing when clicking outside
          position="center center"
        >
        <div className="popup-content animate-text">
            <img className="admin-image animate-image" src="https://res.cloudinary.com/dk1dlxeac/image/upload/v1693292586/admin_2_qioinr.png" alt="Admin" />
            <div className="admin-container">
              <h1 className="slide-in-left">Hello Admin</h1>
              <h3 className="slide-in-left">Your interface is ready</h3>
              <Link className="link animate-link" to="/admin">Click here,<br/> I will take you to your interface</Link>
            </div>
        </div>
        </Popup>
      </div>
    )}
  </div>
);

export default ReactPopUp;
