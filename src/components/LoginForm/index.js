import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "./index.css"
import { Link ,useNavigate} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LoginLoader from "../LoginLoader";
import { useAuth } from "../../context/AuthContext";
import {LANGUAGES} from "../../constants"
import {db} from "../../firestore"
import {collection,query,where,getDocs, updateDoc,} from 'firebase/firestore';


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLogin] = useState(false);
  const [loginLoaderStatus, setLoginLoaderStatus] = useState(false);
  const [loadStatus,setLoadStatus] = useState(false);
  const [language,setLanguage] = useState("en");
  const {login} = useAuth();
  const navigate = useNavigate();
  const {i18n, t} = useTranslation();

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


  const setLanguageMethod = async () => {
    const q = query(collection(db, "users"), where("email", "==", email));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        try {
          const docRef = doc.ref;
          await updateDoc(docRef, { multiLanguage: language });
          await i18n.changeLanguage(language); // Change the language immediately after update // Logging the updated language
        } catch (error) {
          alert("Error: Language not updated");
        }
      });
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  
  const handleLogin = (event) => {
    event.preventDefault();
    setLoginLoaderStatus(true)
    login(email, password)
      .then((userCredential) => {
        setLogin(true);
        setLanguageMethod();
        setLoginLoaderStatus(false);
      })
      .catch((error) => {
        setLoginLoaderStatus(false);
        alert("Wrong credentials");
      });
  };

  const changeLanguageFunction = (e) =>{
    i18n.changeLanguage(e.target.value);
    setLanguage(e.target.value);
  }


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
              <h2 className="login-heading">{t('loginTitle')}</h2>
              <p style={{textAlign:"center",margin:"10px"}}>{t('title')}</p>
              <form onSubmit={handleLogin}>
                <div className="input-group">
                  <label htmlFor="username">{t('email')}</label>
                  <input
                    onChange={handleEmail}
                    required
                    type="email"
                    id="username"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="password">{t('password')}</label>
                  <input
                    onChange={handlePassword}
                    required
                    type="password"
                    id="password"
                  />
                </div>
                <button className="button" type="submit">{t('loginTitle')}</button>
                <p className="para" style={{ textAlign: "center" }}>
                  {t('loginBoxPara')}<br></br>
                  <Link className="para-link" to="/signup">{t('signup')}</Link>
                </p>
                <p className="para" style={{ textAlign: "center" }}>
                  <Link className="para-link" to="/forgot-password">{t('forgotPswd')}</Link>
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
          <h1 className="new-login-heading">{t('title')}</h1>
          <div className="select-div">
            <select defaultValue = {i18n.language} onChange={changeLanguageFunction} className="select-dropdown">
              {LANGUAGES.map(item=>
                <option value = {item.code}>{item.label}</option>
              )}
            </select>
            <button className="new-login-button" onClick={()=>setLoadStatus(true)}>{t('loginTitle')}</button>
          </div>
        </div>
      </div>
      <h1 className="h1-one">{t('mainTitle')}</h1>
      <div className="subscription-info">
        <div className="sub-subscription-info">
          <div className="sub-info">
            <h1 className="info-font">{t('milkTitle')}</h1>
            <p className="para-font">{t('aboutMilk')}</p>
          </div>
          <div className="sub-info">
            <h1 className="info-font">{t('delightsTitle')}</h1>
            <p className="para-font">{t('aboutDelights')}</p>
          </div>
        </div>
        <div className="sub-subscription-info">
          <div className="sub-info">
            <h1 className="info-font">{t('nourshingTitle')}</h1>
            <p className="para-font">{t('aboutNourshing')}</p>
          </div>
          <div className="sub-info">
            <h1 className="info-font">{t('bulkOrderTitle')}</h1>
            <p className="para-font">{t('aboutBulkOrders')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;