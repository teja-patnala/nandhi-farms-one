import React, { useState,useEffect } from 'react';
import {setDoc,doc} from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import LoaderPopup from "../LoaderPopup"
import { db } from "../../firestore";
//import { useAuth } from "../../context/AuthContext";
import "./index.css";


function MeatOrders() {
  const [curdQuantity, setCurdQuantity] = useState();
  const [gheeQuantity, setGheeQuantity] = useState();
  const [honeyQuantity,setHoneyQuantity] = useState()
  const [curdCost,setCurdCost] = useState()
  const [gheeCost,setGheeCost] = useState()
  const [honeyCost,setHoneyCost] = useState()
  const [status,setStatus] = useState(false)
  const [todaysOrders,setTodaysOrders] = useState([])

  async function handleAddQuantity(e) {
    e.preventDefault();
    try {
      setStatus(true)
      await setDoc(doc(db,"productsQuantity","quantity"),{curdCost,curdQuantity,honeyCost,honeyQuantity,gheeCost,gheeQuantity})
      setStatus(false)
      setCurdQuantity("")
      setGheeQuantity("")
      setHoneyQuantity("")
      setGheeCost("")
      setCurdCost("")
      setHoneyCost("")
      alert("updated successfully")
    } catch (e) {
      alert(e);
    }
  }

  function getTomorrowDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const day = tomorrow.toLocaleDateString("en-US", { weekday: "long" });
    const date = tomorrow.getDate();
    const month = tomorrow.toLocaleDateString("en-US", { month: "long" });
    const year = tomorrow.getFullYear();
    return `${day}, ${date} ${month} ${year}`;
  }

  useEffect(() => {
    async function getTheOrders() {
      const tomorrowDate = getTomorrowDate();
  
      // Query documents where "orders" array contains objects with "date" matching tomorrow's date
      const q = query(collection(db, "users"),
        where("orders", "array-contains", { date: tomorrowDate })
      );
  
      try {
        const querySnapshot = await getDocs(q);
        const ordersData = [];
  
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          ordersData.push(userData);
        });
        setTodaysOrders(ordersData)
        console.log(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
  
    getTheOrders();
  },[]);
  

  console.log(todaysOrders)
  return (
    <div className="meat-container">
      <LoaderPopup loadStatus={status}/>
      <div className='anounce-container'>
        <h1>Anounce Quantity For Tommorow</h1>
        <form className='form' onSubmit={handleAddQuantity}>
            <div className='meat-input-container'>
                <label  htmlFor='curd'>Curd : </label>
                <input value={curdQuantity} type="number" placeholder="Enter quantity" required id = "curd" onChange={(e=>setCurdQuantity(parseInt(e.target.value)))}/>
            </div>
            <div className='meat-input-container'>
                <label htmlFor='ghee'>Ghee : </label>
                <input value={gheeQuantity} type="number" placeholder="Enter quantity" required id = "ghee" onChange={(e=>setGheeQuantity(parseInt(e.target.value)))}/>
            </div>
            <div className='meat-input-container'>
                <label htmlFor='honey'>Honey : </label>
                <input value={honeyQuantity} type="number" placeholder="Enter quantity" required id = "eggs" onChange={(e=>setHoneyQuantity(parseInt(e.target.value)))}/>
            </div>
            <div className='meat-input-container'>
                <label htmlFor='curdCostt'>Curd cost : </label>
                <input value={curdCost} type="number" placeholder="Enter quantity" required id = "curdCost" onChange={(e=>setCurdCost(parseInt(e.target.value)))}/>
            </div>
            <div className='meat-input-container'>
                <label htmlFor='gheecost'>Ghee Cost : </label>
                <input value={gheeCost} type="number" placeholder="Enter quantity" required id = "gheecost" onChange={(e=>setGheeCost(parseInt(e.target.value)))}/>
            </div>
            <div className='meat-input-container'>
                <label htmlFor='honeycost'>Honey Cost : </label>
                <input value={honeyCost} type="number" placeholder="Enter quantity" required id = "honeycost" onChange={(e=>setHoneyCost(e.target.value))}/>
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
