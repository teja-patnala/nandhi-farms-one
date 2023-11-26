import React, {useEffect} from "react";import Header from "../Header"
import Footer from "../Footer";
import { useTranslation } from 'react-i18next';
import "./index.css"; // Import your CSS file for styling
import {useAuth} from "../../context/AuthContext";

const AboutUs = () => {
  const {t,i18n} = useTranslation();
  const {currentUserDataOne} = useAuth();

  useEffect(()=>{
    i18n.changeLanguage(currentUserDataOne.multiLanguage)
  });
  
  return (
    <div className="about-us">
      <div className="about-content">
      <Header/>
        <h2>{t('aboutHeading')}</h2>
        <div className="div-one">
          <p>
            {t('aboutParaOne')}
          </p>
          <p>
            {t('aboutParaTwo')}
          </p>
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default AboutUs;