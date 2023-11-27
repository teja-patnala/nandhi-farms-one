import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "./index.css";
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
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
  const items = [t('chicken'), t("mutton"), t("eggs"), t("ghee"), t("Curd"), t("honey")]
  const itemsTitle =[t('chickenP'), t("muttonP"), t("eggsP"), t("gheeP"), t("curdP"), t("honeyP")]
  const links = ["https://res.cloudinary.com/dxx7ni6cl/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1701067701/chicken-whole_ucpiuz.jpg","https://res.cloudinary.com/dxx7ni6cl/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1701067694/6393016ac2daf7947f26723a_lamb-_-cholesterol_ox1bpf.jpg","https://res.cloudinary.com/dxx7ni6cl/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1701067702/Butlers-Eggs-HomeCarousel-1400x800_o1lmfq.jpg","https://res.cloudinary.com/dxx7ni6cl/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1701067699/ghee-1-scaled_hyyktb.webp",
  "https://res.cloudinary.com/dxx7ni6cl/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1701067698/shutterstock_1192618696-1_l8xnor.jpg",
  "https://res.cloudinary.com/dxx7ni6cl/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1701067697/organic-honey_addtkb.jpg"];

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
 
  const ReactSlick = () => {
    const settings = {
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: true,
      speed: 10000, // Set the speed for smooth scrolling
      autoplay: true,

      autoplaySpeed: 0, // Set to zero to customize the autoplay speed
      cssEase: 'linear', // Use linear easing for a consistent speed
      pauseOnHover: true, // Pause on hover to allow interaction
      pauseOnFocus: true, // Pause on focus for accessibility
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    // Function to pause autoplay immediately on hover
  const handleHover = (slider) => {
    slider.pause();
  };

  // Function to resume autoplay when cursor leaves the carousel
  const handleLeave = (slider) => {
    slider.play();
  };
  
    return (
      <div className="slider-container">
        <Slider {...settings}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <div className="sub-info">
            <h1 className="info-font">{t('milkTitle')}</h1>
            <p className="para-font">{t('aboutMilk')}</p>
          </div>
          <div className="sub-info">
            <h1 className="info-font">{t('delightsTitle')}</h1>
            <p className="para-font">{t('aboutDelights')}</p>
          </div>
          <div className="sub-info">
            <h1 className="info-font">{t('nourshingTitle')}</h1>
            <p className="para-font">{t('aboutNourshing')}</p>
          </div>
          <div className="sub-info">
            <h1 className="info-font">{t('bulkOrderTitle')}</h1>
            <p className="para-font">{t('aboutBulkOrders')}</p>
          </div>
        </Slider>
        <div class="subscription-container1">
          <div class="subscription-info1">
            <div class="sub-info1">
              <h1>{t('milkSubs')}</h1>
              <p className="p11">{t('milkSubsPara')}</p>
              <img src="https://res.cloudinary.com/dxx7ni6cl/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1701073084/funny-cow-with-jar-milk-dark-blue-mystery-background-generative-ai_935190-304_kvcmlw.jpg" alt="Milk" />
              <button onClick={()=>
                alert(t('logAlert'))
              } class="subscribe-button1">{t('subsNow')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  
  return (
    <div className="new-login-container">
      {loginContainePopup()}
      <div className="new-header-login">
        <div className="sub-new-header-login">
          <h1 className="new-login-heading animate-charcter">{t('title')}</h1>
          <div className="select-div">
            <select defaultValue = {i18n.language} onChange={changeLanguageFunction} className="select-dropdown">
              {LANGUAGES.map(item=>
                <option value = {item.code}>{item.label}</option>
              )}
            </select>
            <button  className="new-login-button" onClick={()=>setLoadStatus(true)}>{t('loginTitle')}</button>
          </div>
        </div>
      </div>
      <h1 className="h1-one h21">{t('mainTitle')}</h1>
      {ReactSlick()}
      <ul className="food-items">
        {items.map((item,i)=>
        <li class="item-card-container">
          <div class="item-card">
            <div class="item-card-front">
              <img src={links[i]} alt={item} class="item-food-image" />
            </div>
            <div class="item-card-back">
              <h3>{item}</h3>
              <p>{itemsTitle[i]}</p>
              <button onClick={e=>alert(t('logAlert'))} class="item-buy-button">{t('buyNow')}</button>
            </div>
          </div>
        </li>
      )}
      </ul>
    </div>
  );
};

export default LoginForm;