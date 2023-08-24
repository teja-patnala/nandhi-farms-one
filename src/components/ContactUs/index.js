import React, {useState} from 'react';
import Header from "../Header"

import './index.css'; // Make sure to link your CSS file correctly

const ContactForm = () => {
  const [name, setName] = useState()
  const [email,setEmail] = useState()
  const [textArea,setText] = useState()

  const SubmitTheMessage = (e) =>{
    e.preventDefault();
    console.log(name,email,textArea)
  }


  return (
    <div className="contact-container">
      <Header/>
      <div className="contact-container-one">
        
        <form className="contact-form" onSubmit={SubmitTheMessage}>
          <h2 style = {{textAlign:"center"}}>Contact Us</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input onChange={(e)=>setName(e.target.value)} type="text" id="name" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input onChange={(e)=>setEmail(e.target.value)} type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea onChange={(e)=>setText(e.target.value)} id="message" name="message" rows="4" cols="30"></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;