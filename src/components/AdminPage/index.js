import React, { useState } from 'react';
import { collection,query,doc,setDoc, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firestore';
import useOTPGenerator  from "../../OtpGenerationFolder";
import MilkOrders from '../MilkOrders';
import speakeasy from 'speakeasy';
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { useNavigate } from 'react-router-dom';
import './index.css';

const AdminPage = () => {
  const [message, setMessage] = useState('');
  const [orders, setOrders] = useState([]);
  const [title,setTitle] = useState("Milk Orders");
  const navigate = useNavigate();
  const { logout } = useAuth(); // Corrected this line
  const otp = useOTPGenerator()

  const handleSendMessage = () => {
    setOrders("ji");
    console.log(orders)
  };

  async function handleLogout() {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      alert("Failed to log out");
    }
  }

  function generateOTP(secret){
    const totpToken = speakeasy.totp({
      secret: secret,
      encoding: 'base32',
      step: 30,
      digits: 6
    });
    return totpToken
  }

  async function sendOtp() {
    try {
      const q = query(collection(db, "users"), where("subscription", "==", true));
      const querySnapshot = await getDocs(q);
      
      const updatedData = [];
      
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        const userId = doc.id; // Get the user's ID
        
        if (userData.noDaysSuppliesMilk === 0) {
          updatedData.push({
            userId: userId, // Include the user's ID in the updated data
            userData: {
              ...userData,
              noDaysSuppliesMilk: 0,
              litersOfMilk: 0,
              otpForMilkCollection: 0,
              subscription: false,
            },
          });
        } else {
          // Generate the OTP here (you need to define 'otp')
          // For example: const otp = generateOTP(); 
          updatedData.push({
            userId: userId, // Include the user's ID in the updated data
            userData: {
              ...userData,
              noDaysSuppliesMilk: userData.noDaysSuppliesMilk - 1,
              otpForMilkCollection: generateOTP(userData.email),
            },
          });
        }
      });
      
      for (const updatedItem of updatedData) {
        const { userId, userData } = updatedItem;
        const itemDocRef = doc(db, "users", userId);
        await setDoc(itemDocRef, userData);
      }
      
      console.log("Successfully updated");
    } catch (error) {
      console.error("Error updating Firestore:", error);
    }
  }
  

  return (
    <div className="admin-page">
      <div className="sidebar">
        <h1 className='main-heading'>Nandhi Farms Admin</h1>
        <ul>
          <li><button onClick={(e=>setTitle("Meat Orders"))} className='button' type="button">Meat Orders</button></li>
          <li><button onClick={(e=>setTitle("Milk Product Orders"))}  className='button' type="button">Milk Products Orders</button></li>
          <li><button onClick={(e=>setTitle("Meat Orders"))}  className='button'>Milk Orders</button></li>
          <li>
            <div className="popup-container">
              <Popup
              modal
              trigger={
              <button type="button" className="trigger-button">
                Notify
              </button>
              }>
                {close => (
                <div className="message-box">
                  <h2>Send Message to Clients</h2>
                  <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  />
                  <button className="send-button" onClick={handleSendMessage}>
                    Send
                  </button>
                  <button type="button" className="close-button" onClick={close}>
                    Close
                  </button>
                </div>
              )}
              </Popup>
              </div>
            </li>
          <li><button className='button' type="button" onClick={handleLogout}>Logout</button></li>
          <li><button className='button' type="button" onClick={sendOtp}>Send OTP</button></li>
        </ul>
      </div>
      <div className='main-container'>
        <h1 className='sub-heading'>{title}</h1>
        <div className='sub-main-container'>
          <MilkOrders/>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
