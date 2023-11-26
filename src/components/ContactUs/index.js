import React, {useState,useEffect} from 'react';
import Header from "../Header";
import { useTranslation } from 'react-i18next';
import {useAuth} from "../../context/AuthContext";

import './index.css'; // Make sure to link your CSS file correctly

const ContactForm = () => {
  const [name, setName] = useState()
  const [email,setEmail] = useState()
  const [textArea,setText] = useState()
  const {t,i18n} = useTranslation()
  const {currentUserDataOne} = useAuth()

  const SubmitTheMessage = (e) =>{
    e.preventDefault();
    console.log(name,email,textArea)
  }

  useEffect(()=>{
    i18n.changeLanguage(currentUserDataOne.multiLanguage)
  })

  return (
    <div className="contact-container">
      <Header/>
      <div className="contact-container-one">
        <form className="contact-form" onSubmit={SubmitTheMessage}>
          <h2 style = {{textAlign:"center"}}>{t('contactUs')}</h2>
          <div className="form-group">
            <label htmlFor="name">{t('name')}:</label>
            <input onChange={(e)=>setName(e.target.value)} type="text" id="name" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">{t('email')}:</label>
            <input onChange={(e)=>setEmail(e.target.value)} type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">{t('message')}:</label>
            <textarea onChange={(e)=>setText(e.target.value)} id="message" name="message" rows="4" cols="30"></textarea>
          </div>
          <button type="submit">{t('submit')}</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;