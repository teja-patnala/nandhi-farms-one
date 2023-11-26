import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LANGUAGES } from "../../constants";
import "./index.css";
import {db} from "../../firestore"
import {collection,query,where,getDocs, updateDoc,} from 'firebase/firestore';

function Header() {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  const { t, i18n } = useTranslation();

  useEffect(()=>{
    i18n.changeLanguage(currentUser.multiLanguage)
  })

  async function handleLogout() {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      alert("Failed to log out");
    }
  }

  async function changeLanguageMethodFunc(e){
    const q = query(collection(db, "users"), where("email", "==", currentUser.email));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        try {
          const docRef = doc.ref;
          await i18n.changeLanguage(e.target.value); 
          await updateDoc(docRef, { multiLanguage: e.target.value });
          // Change the language immediately after update // Logging the updated language
        } catch (error) {
          alert("Error: Language not updated");
        }
      });
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  }

  return (
    <header className="header">
      <div className="logo">{t('title')}</div>
      <div className="nav-logout-container">
        <nav className="nav">
          <a href="/">{t('home')}</a>
          <a href="/orders">{t('orders')}</a>
          <a href="/about">{t('about')}</a>
          <a href="/contact">{t('contact')}</a>
        </nav>
        <button onClick={handleLogout} className="logout-button">
          {t('logout')}
        </button>
        <div className="select-container">
          <select
            defaultValue={i18n.language}
            onChange={changeLanguageMethodFunc}
            className="select-dropdown select-dropdown-home"
          >
            {LANGUAGES.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;
