import React, { useState } from 'react';
import {setDoc,doc} from "firebase/firestore";
import { db } from "../../firestore";
//import { useAuth } from "../../context/AuthContext";
import "./index.css";


function MeatOrders() {
  const [muttonQuantity, setMuttonQuantity] = useState();
  const [chickenQuantity, setChickenQuantity] = useState();
  const [eggsQuantity,setEggsQuantity] = useState()

  async function handleAddQuantity(e) {
    e.preventDefault();
    try {
      await setDoc(doc(db,"meatQuantity","quantity"),{muttonQuantity,chickenQuantity,eggsQuantity})
      setEggsQuantity("")
      setMuttonQuantity("")
      setChickenQuantity("")
      alert("updated successfully")
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className="meat-container">
      <div className='anounce-container'>
        <h1>Anounce Quantity For Tommorow</h1>
        <form className='form' onSubmit={handleAddQuantity}>
            <div className='meat-input-container'>
                <label  htmlFor='mutton'>Mutton : </label>
                <input value={muttonQuantity} type="number" placeholder="Enter quantity" required id = "mutton" onChange={(e=>setMuttonQuantity(e.target.value))}/>
            </div>
            <div className='meat-input-container'>
                <label htmlFor='chicken'>Chicken : </label>
                <input value={chickenQuantity} type="number" placeholder="Enter quantity" required id = "chicken" onChange={(e=>setChickenQuantity(e.target.value))}/>
            </div>
            <div className='meat-input-container'>
                <label htmlFor='eggs'>Eggs : </label>
                <input value={eggsQuantity} type="number" placeholder="Enter quantity" required id = "eggs" onChange={(e=>setEggsQuantity(e.target.value))}/>
            </div>
            <div>
                <button className='submit-button' type="submit">Submit</button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default MeatOrders;
