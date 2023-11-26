import React,{useState,useEffect} from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate,Link } from "react-router-dom";
import {collection,query,where,getDocs,} from 'firebase/firestore';
import {useAuth} from "../../context/AuthContext";
import LoaderPopup from "../LoaderPopup";
import { db } from '../../firestore';
import "./index.css"; // You can create a CSS file for styling
import Header from "../Header";
import ReactPopUp from '../AdminPopUpModel';

function Home() {
  const [load,setLoading] = useState(true)
  const [currentUserData, setCurrentUserData] = useState({})
  const {currentUser,setMyValue} = useAuth();
  const navigate = useNavigate();
  const {t,i18n} = useTranslation();
  
  useEffect(() => {
    async function gettingUserData() {
      const q = query(collection(db, "users"), where("email", "==", currentUser.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        setCurrentUserData(userData);
        setLoading(false);
        setMyValue(currentUserData);
      });
    }
    i18n.changeLanguage(currentUserData.multiLanguage);
    gettingUserData()
  }, [currentUser.email,i18n,currentUserData.multiLanguage,currentUserData,setMyValue]);

  return (
    <div className="homepage">
      <Header/>
      <LoaderPopup loadStatus = {load}/>
      <ReactPopUp adminStatus={currentUserData.isAdmin}/>
      <section className="hero">
        <h1>{t('homeheading')}</h1>
        <p>{t('homepara')}</p>
        <button onClick={()=>navigate("/subscribe")}>{currentUserData.subscription ? t('subscriberTrue'):t('subscriberFalse') }</button><br/>
        {currentUserData.subscription && <p>{t('milkOtp')}</p>}
        {currentUserData.subscription && <button className="button-one" type = "button">{currentUserData.otpForMilkCollection}</button>}
      </section>
      <section className="featured-products">
        <Link to = "/subscribe" className="product-card">
          <div >
            <img className="product-logo" src="https://res.cloudinary.com/dxx7ni6cl/image/upload/v1692544532/4393855_1232_m2a6ku.jpg" alt="Product 1" />
            <h3>{t('organicMilk')}</h3>
            <p>{t('organicMilkPara')}</p>
          </div>
        </Link>
        <Link className="product-card" to = "/meat">
          <div>
            <img className="product-logo" src="https://res.cloudinary.com/dxx7ni6cl/image/upload/v1692545982/healthy-food-ingredients-black-table_1_pwe5ye.jpg" alt="Product 2" />
            <h3>{t('nourshingTitle')}</h3>
            <p>{t('nourshingHomePara')}</p>
          </div>
        </Link>
        <Link className="product-card" to = "/products">
          <div >
            <img className="product-logo"  src="https://res.cloudinary.com/dxx7ni6cl/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1692547993/different-types-of-dairy-products-royalty-free-image-1568741374_mqhhdb.jpg" alt="Product 3" />
            <h3>{t('delightsTitle')}</h3>
            <p>{t('dairyDelightsPara')}</p>
          </div>
        </Link>
      </section>
      <footer className="footer">
        <p>{t('footer')}</p>
      </footer>
    </div>
  );
}

export default Home;