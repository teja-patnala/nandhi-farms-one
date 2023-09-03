import React, { useState,useEffect } from 'react';
import {setDoc,doc,getDocs,getDoc,collection,} from "firebase/firestore";
import LoaderPopup from "../LoaderPopup"
import { db } from "../../firestore";
import "./index.css";


function MeatOrders() {
  const [muttonQuantity, setMuttonQuantity] = useState();
  const [chickenQuantity, setChickenQuantity] = useState();
  const [eggsQuantity,setEggsQuantity] = useState()
  const [muttonCost,setMuttonCost] = useState()
  const [chickenCost,setChickenCost] = useState()
  const [eggsCost,setEggsCost] = useState()
  const [status,setStatus] = useState(false)
  const [todaysMeatOrders, setTodaysMeatOrders] = useState([]);
  const [meatProductsCosts,setMeatProductsCosts] = useState({})

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
    async function getTheMeatOrders() {
      const tomorrowDate = getTomorrowDate();
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const ordersData = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.orders) {
            const matchingOrders = userData.orders.filter(
              (order) => order.date === tomorrowDate + "m"
            );
            if (matchingOrders.length > 0) {
              ordersData.push({ ...userData, orders: [...matchingOrders] });
            }
          }
        });

        setTodaysMeatOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    getTheMeatOrders();

    async function retrieveDataFromFirestore() {
      try {
        const docRef = doc(db, "meatQuantity", "quantity");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setMeatProductsCosts(data)
      
        } else {
          console.log("No such document exists!");
        } 
        } 
        catch (error) {
          console.error("Error retrieving data from Firestore:", error);
          throw error; // Handle the error or rethrow it if needed
        }
    }

    retrieveDataFromFirestore();


  }, []);

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
      <div className='table-container4'>
        <table className="orders-table4">
          <thead>
            <tr>
              <th className="table-row4">Name</th>
              <th className="table-row4">Email</th>
              <th className="table-row4">Phone No</th>
              <th className="table-row4">Address</th>
              <th className="table-row4">Items</th>
              <th className="table-row4">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {todaysMeatOrders.map((order, index) => (
              <tr key={index} className="table-row4">
                <td id="td">{order.firstName.toLowerCase()} {order.lastName.toLowerCase()}</td>
                <td id="td">{order.email}</td>
                <td id="td">{order.phoneNumber}</td>
                <td id="td">{order.address}</td>
                <td>
                  <table className='tableOne'>
                    <thead>
                      <tr>
                        <th className="table-row4" >Item Name</th>
                        <th className="table-row4" >Quantity</th>
                        <th className="table-row4" >Cost</th>
                      </tr>
                    </thead>
                    <tbody id="tbody">
                    {order.orders.map((eachItem, orderIndex) => (
                      Object.entries(eachItem.items).map(([item, quantity], itemIndex) => {
                        const itemCost = meatProductsCosts[`${item}Cost`]*quantity
                        const string = meatProductsCosts[`${item}Cost`]+"*"+quantity
                        return(
                        <tr key={itemIndex}>
                          <td id="td">{item}</td>
                          <td id="td">{quantity}</td>
                          <td id="td">{`${string} = ${itemCost}`}</td>
                        </tr>
                        )})
                      ))}
                    </tbody>
                  </table>
                </td>
                <td style={{color:"olive",fontWeight:"bold"}}>
                  {order.orders.reduce((acc, cur) => acc + cur.payment, 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MeatOrders;
