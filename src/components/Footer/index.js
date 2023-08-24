import React from 'react';
import {AiFillInstagram,AiFillTwitterCircle,AiFillFacebook,AiFillMail} from "react-icons/ai";
import './index.css'; // Import the CSS file for styling

function Footer() {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://example.com/facebook" target="_blank" rel="noopener noreferrer">
          <AiFillInstagram className='icon-react'/>
        </a>
        <a href="https://example.com/twitter" target="_blank" rel="noopener noreferrer">
          <AiFillFacebook className='icon-react'/>
        </a>
        <a href="https://example.com/instagram" target="_blank" rel="noopener noreferrer">
          <AiFillTwitterCircle className='icon-react'/>
        </a>
        <a href={`mailto:venkatpatnala4151@gmail.com`}>
          <AiFillMail className='icon-react'/>
        </a>
      </div>
    </footer>
  );
}

export default Footer;