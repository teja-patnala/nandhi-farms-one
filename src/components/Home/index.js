import React from "react"; 
import { useNavigate,Link } from "react-router-dom";
import {useAuth} from "../../context/AuthContext"
import "./index.css"; // You can create a CSS file for styling
import Header from "../Header"
import ReactPopUp from '../AdminPopUpModel';

function Home() {
  const navigate = useNavigate()
  const {isAdminOfNandhi,currentUserData} = useAuth()
  console.log(currentUserData.current)
  return (
    <div className="homepage">
      <ReactPopUp adminStatus={isAdminOfNandhi.current}/>
      <Header/>
      <section className="hero">
        <h1>Welcome to Nandhi Farms</h1>
        <p>Get fresh and pure milk delivered to your doorstep daily.</p>
        <button onClick={()=>navigate("/subscribe")}>Subscribe to Our Organic Milk</button><br/>
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