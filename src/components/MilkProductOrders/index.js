 import React, { useState, useEffect } from 'react';
import { setDoc, doc } from "firebase/firestore";
import { collection, getDocs,getDoc } from "firebase/firestore";
import LoaderPopup from "../LoaderPopup";
import { db } from "../../firestore";
//import { useAuth } from "../../context/AuthContext";
import "./index.css";

function MilkProductOrders() {
  const [curdQuantity, setCurdQuantity] = useState();
  const [gheeQuantity, setGheeQuantity] = useState();
  const [honeyQuantity, setHoneyQuantity] = useState();
  const [curdCost, setCurdCost] = useState();
  const [gheeCost, setGheeCost] = useState();
  const [honeyCost, setHoneyCost] = useState();
  const [status, setStatus] = useState(false);
  const [todaysOrders, setTodaysOrders] = useState([]);
  const [milkProductsCosts,setMilkProductsCosts] = useState();
 

  async function handleAddQuantity(e) {
    e.preventDefault();
    try {
      setStatus(true);
      await setDoc(doc(db, "productsQuantity", "quantity"), {
        curdCost,
        curdQuantity,
        honeyCost,
        honeyQuantity,
        gheeCost,
        gheeQuantity,
      });
      setStatus(false);
      setCurdQuantity("");
      setGheeQuantity("");
      setHoneyQuantity("");
      setGheeCost("");
      setCurdCost("");
      setHoneyCost("");
      alert("updated successfully");
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

      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const ordersData = [];
        querySnapshot.forEach((doc1) => {
          const userData = doc1.data();
          if (userData.orders) {
            const matchingOrders = userData.orders.filter(
              (order) => order.date === tomorrowDate + "mp"
            );
            if (matchingOrders.length > 0) {
              ordersData.push({ ...userData, orders: [...matchingOrders] });
            }
          }
        });

        setTodaysOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    }
    getTheOrders();

    async function retrieveDataFromFirestore() {
      try {
        const docRef = doc(db, "productsQuantity", "quantity");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setMilkProductsCosts(data)
      
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
  },);
  
  

  async function updateDelivaryStatus() {
    // Get tomorrow's date (You need to define this function or use a library)
    const tomorrowDate = getTomorrowDate();
  
    try {
      const querySnapshotUp = await getDocs(collection(db, "users"));
      querySnapshotUp.forEach(async (docItem1) => {
        const userData1 = docItem1.data();
        if (userData1.orders) {
          const matchingOrders = userData1.orders.map((order) => {
            if (order.date === tomorrowDate + "mp") {
              return { ...order, delivaryStatus: true }; // Corrected typo "delivaryStatus" to "deliveryStatus"
            }
            return order;
          });
          try {
            // Update the entire user document with the modified orders field
            await setDoc(doc(db, "users", docItem1.id), {
              ...userData1,
              orders: matchingOrders,
            });
            
          } catch (error) {
            console.log(error);
          }
        }
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  return (
    <div className="meat-container">
      <LoaderPopup loadStatus={status} />
      <div className="anounce-container">
        <h1>Anounce Quantity For Tomorrow</h1>
        <form className="form" onSubmit={handleAddQuantity}>
          <div className='meat-input-container'>
            <label htmlFor='curd'>Curd : </label>
            <input
              value={curdQuantity}
              type="number"
              placeholder="Enter quantity"
              required
              id="curd"
              onChange={(e) => setCurdQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className='meat-input-container'>
            <label htmlFor='ghee'>Ghee : </label>
            <input
              value={gheeQuantity}
              type="number"
              placeholder="Enter quantity"
              required
              id="ghee"
              onChange={(e) => setGheeQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className='meat-input-container'>
            <label htmlFor='honey'>Honey : </label>
            <input
              value={honeyQuantity}
              type="number"
              placeholder="Enter quantity"
              required
              id="eggs"
              onChange={(e) => setHoneyQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className='meat-input-container'>
            <label htmlFor='curdCostt'>Curd cost : </label>
            <input
              value={curdCost}
              type="number"
              placeholder="Enter quantity"
              required
              id="curdCost"
              onChange={(e) => setCurdCost(parseInt(e.target.value))}
            />
          </div>
          <div className='meat-input-container'>
            <label htmlFor='gheecost'>Ghee Cost : </label>
            <input
              value={gheeCost}
              type="number"
              placeholder="Enter quantity"
              required
              id="gheecost"
              onChange={(e) => setGheeCost(parseInt(e.target.value))}
            />
          </div>
          <div className='meat-input-container'>
            <label htmlFor='honeycost'>Honey Cost : </label>
            <input
              value={honeyCost}
              type="number"
              placeholder="Enter quantity"
              required
              id="honeycost"
              onChange={(e) => setHoneyCost(parseInt(e.target.value))}
            />
          </div>
          <br/>
          <div>
            <button className='submit-button' type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <h1 className='today'>Orders for Today</h1>
      <button onClick={updateDelivaryStatus} className='delivary-button'>Update Delivary status</button>
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
              <th className="table-row4">Delivary Status</th>
            </tr>
          </thead>
          <tbody>
            {todaysOrders.map((order, index) => (
              <tr key={index} className="table-row4">
                <td id="td">{order.firstName.toLowerCase()} {order.lastName.toLowerCase()}</td>
                <td id="td">{order.email}</td>
                <td id="td">{order.phoneNumber}</td>
                <td id="td">{order.address}</td>
                <td>
                  <table className='table-container'>
                    <thead>
                      <tr>
                        <th className="table-row4" >Item <br/> Name</th>
                        <th className="table-row4" >Quantity</th>
                        <th className="table-row4" >Cost</th>
                      </tr>
                    </thead>
                    <tbody id="tbody">
                    {order.orders.map((eachItem, orderIndex) => (
                      Object.entries(eachItem.items).map(([item, quantity], itemIndex) => {
                        const itemCost = milkProductsCosts[`${item}Cost`]*quantity
                        const string = milkProductsCosts[`${item}Cost`]+"*"+quantity
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
                <td style={{color:"olive",fontWeight:"bold"}}>
                  {order.orders[0].delivaryStatus?"Delivered":"Not Delivered"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MilkProductOrders;
