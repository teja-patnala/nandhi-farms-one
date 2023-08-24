import React from "react";
import Header from "../Header"
import Footer from "../Footer";
import "./index.css"; // Import your CSS file for styling


const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="about-content">
        <Header/>
        <h2>About Our Organic Farm</h2>
        <div className="div-one">
          <p>
            Welcome to our organic dairy farm, where we take pride in providing
            the finest quality organic milk, products, and meats. Our commitment
            to sustainable and ethical farming practices sets us apart.
          </p>
          <p>
            We specialize in offering a variety of organic products, including
            fresh milk, cheese, yogurt, and more. In addition, we offer a
            selection of organic meats, including goat, chicken, eggs, and quail
            bird meat.
          </p>
        </div>
        <Footer/>
      </div>
    </section>
  );
};

export default AboutUs;