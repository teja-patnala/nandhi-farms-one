import React, { useState } from 'react';
import {setDoc,doc} from "firebase/firestore";
import LoaderPopup from "../LoaderPopup"
import { db } from "../../firestore";
//import { useAuth } from "../../context/AuthContext";
import "./index.css";


function MeatOrders() {
  const [muttonQuantity, setMuttonQuantity] = useState();
  const [chickenQuantity, setChickenQuantity] = useState();
  const [eggsQuantity,setEggsQuantity] = useState()
  const [muttonCost,setMuttonCost] = useState()
  const [chickenCost,setChickenCost] = useState()
  const [eggsCost,setEggsCost] = useState()
  const [status,setStatus] = useState(false)

  async function handleAddQuantity(e) {
    e.preventDefault();
    try {
      setStatus(true)
      await setDoc(doc(db,"meatQuantity","quantity"),{muttonCost,chickenCost,eggsCost,muttonQuantity,chickenQuantity,eggsQuantity})
      setStatus(false)
      setEggsQuantity(0)
      setMuttonQuantity(0)
      setChickenQuantity(0)
      setChickenCost(0)
      setEggsCost(0)
      setMuttonCost(0)
      alert("updated successfully")
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className="meat-container">
      <LoaderPopup loadStatus={status}/>
      <div className='anounce-container'>
        <h1>Anounce Quantity For Tommorow</h1>
        <form className='form' onSubmit={handleAddQuantity}>
            <div className='meat-input-container'>
                <label  htmlFor='mutton'>Mutton : </label>
                <input value={muttonQuantity} type="number" placeholder="Enter quantity" required id = "mutton" onChange={(e=>setMuttonQuantity(parseInt(e.target.value)))}/>
            </div>
            <div className='meat-input-container'>
                <label htmlFor='chicken'>Chicken : </label>
                <input value={chickenQuantity} type="number" placeholder="Enter quantity" required id = "chicken" onChange={(e=>setChickenQuantity(parseInt(e.target.value)))}/>
            </div>
            <div className='meat-input-container'>
                <label htmlFor='eggs'>Eggs : </label>
                <input value={eggsQuantity} type="number" placeholder="Enter quantity" required id = "eggs" onChange={(e=>setEggsQuantity(parseInt(e.target.value)))}/>
            </div>
            <div className='meat-input-container'>
                <label htmlFor='eggcost'>Egg cost : </label>
                <input value={eggsCost} type="number" placeholder="Enter quantity" required id = "eggcost" onChange={(e=>setEggsCost(parseInt(e.target.value)))}/>
            </div>
            <div className='meat-input-container'>
                <label htmlFor='chickencost'>Chicken Cost : </label>
                <input value={chickenCost} type="number" placeholder="Enter quantity" required id = "chickencost" onChange={(e=>setChickenCost(e.target.value))}/>
            </div>
            <div className='meat-input-container'>
                <label htmlFor='muttoncost'>Mutton Cost : </label>
                <input value={muttonCost} type="number" placeholder="Enter quantity" required id = "muttoncost" onChange={(e=>setMuttonCost(e.target.value))}/>
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
