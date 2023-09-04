import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firestore";
// import { useAuth } from "../../context/AuthContext";
import "./index.css"; // Make sure to adjust the path to your CSS file

export default function MilkOrders() {
  const [orders, setMilkOrders] = useState([]);
  const [totalMilk,setTotalMilk] = useState();

  useEffect(() => {
    async function getTheOrders() {
      const q = query(collection(db, "users"), where("subscription", "==", true));
      const querySnapshot = await getDocs(q);

      const ordersData = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        ordersData.push(userData);
      });

      setMilkOrders(ordersData);
      setTotalMilk(ordersData.reduce((sum,order)=>sum+order.litersOfMilk,0));
    }
    getTheOrders();
  });

  return (
    <div className="table-container">
      <table className="orders-table3">
        <thead>
          <tr>
            <th className="table-row3">Name</th>
            <th className="table-row3">Email</th>
            <th className="table-row3" >Phone No</th>
            <th className="table-row3">No. Liters</th>
            <th className="table-row3">No. Days Left</th>
            <th className="table-row3">Subscriber</th>
            <th className="table-row3">Otp</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="table-row3">
              <td>{order.firstName.toLowerCase()} {order.lastName.toLowerCase()}</td>
              <td>{order.email}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.litersOfMilk}</td>
              <td>{order.noDaysSuppliesMilk}</td>
              <td>{order.subscription?"True":"False"}</td>
              <td>{order.otpForMilkCollection}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
            <tr>
                <td colSpan="3">Total Liters:</td>
                <td>{totalMilk}</td>
                <td colSpan="3"></td>
            </tr>
        </tfoot>
      </table>
    </div>
  );
}
