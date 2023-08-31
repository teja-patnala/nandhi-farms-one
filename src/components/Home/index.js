import React,{useState,useEffect} from "react"; 
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
  const {currentUser} = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    async function gettingUserData() {
      const q = query(collection(db, "users"), where("email", "==", currentUser.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        setCurrentUserData(userData);
        setLoading(false);

      });
    }
    gettingUserData()
    console.log(currentUserData)
  }, [currentUser.email,currentUserData]);

  return (
    <div className="homepage">
      <LoaderPopup loadStatus = {load}/>
      <ReactPopUp adminStatus={currentUserData.isAdmin}/>
      <Header/>
      <section className="hero">
        <h1>Welcome to Nandhi Farms</h1>
        <p>Get fresh and pure milk delivered to your doorstep daily.</p>
        <button onClick={()=>navigate("/subscribe")}>{currentUserData.subscription ? "You are a Subscriber":"Subscribe to Our Organic Milk"}</button><br/>
        <p>OTP for milk collection</p>
        <button className="button-one" type = "button">{currentUserData.otpForMilkCollection}</button>
      </section>

      <section className="featured-products">
        <Link to = "/subscribe" className="product-card">
          <div >
            <img className="product-logo" src="https://res.cloudinary.com/dxx7ni6cl/image/upload/v1692544532/4393855_1232_m2a6ku.jpg" alt="Product 1" />
            <h3>Organic Milk</h3>
            <p>Fresh and organic milk from local farms.</p>
          </div>
        </Link>
        <div className="product-card">
          <img className="product-logo" src="https://res.cloudinary.com/dxx7ni6cl/image/upload/v1692545982/healthy-food-ingredients-black-table_1_pwe5ye.jpg" alt="Product 2" />
          <h3>Nourishing Delights</h3>
          <p>Farm-fresh meats and eggs, sourced just for you</p>
        </div>

        <div className="product-card">
          <img className="product-logo"  src="https://res.cloudinary.com/dxx7ni6cl/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1692547993/different-types-of-dairy-products-royalty-free-image-1568741374_mqhhdb.jpg" alt="Product 3" />
          <h3>Dairy Delights</h3>
          <p>A variety of dairy products to complement your meals.</p>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2023 Milk Daily. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;