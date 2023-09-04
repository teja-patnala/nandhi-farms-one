import "./index.css"
import React,{useState,useEffect} from "react"
import { useAuth } from "../../context/AuthContext"
import LoaderPopup from "../LoaderPopup"
import Header from "../Header"

export default function OrdersForm(){
    const [allOrders,setAllOrders] = useState()
    const [ordersStatus,setOrdersStatus] = useState(true)
    const {currentUserDataOne} = useAuth()

    useEffect(()=>{
        async function getTheAllOrdersOfUser(){
            setAllOrders(currentUserDataOne.orders)
            setOrdersStatus(false)
        }
        getTheAllOrdersOfUser();
    },[currentUserDataOne.orders])

    function sortObjectAlphabetically(obj) {
        // Step 1: Get the object's keys and sort them alphabetically
        const sortedKeys = Object.keys(obj).sort();
      
        // Step 2: Create a new object using the sorted keys
        const sortedObject = {};
        for (const key of sortedKeys) {
          sortedObject[key] = obj[key];
        }
      
        return sortedObject;
      }


    return(
        <div className="orders-container">
            <LoaderPopup loadStatus={ordersStatus}/>
            <Header/>
            <div className="sub-orders-container">
                <h1 >Your Orders details</h1>
                <div className="sub-orders-table-container">
                    <table className="user-table-order">
                        <thead>
                            <tr>
                                <th className="th-order">Date Of Order</th>
                                <th className="th-order">Order Status</th>
                                <th className="th-order">Items</th>
                                <th className="th-order">Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allOrders ? (
                                allOrders.map((eachItem, index) => {
                                    const { date, delivaryStatus, items, payment } = eachItem
                                    const sortedOrders = sortObjectAlphabetically(items)
                                    const deliveryStatusText = delivaryStatus ? "Delivered" : "Not Delivered";
                                    return (
                                        <tr key={index}>
                                            <td className="th-order">{date}</td>
                                            <td className="th-order">{deliveryStatusText}</td>
                                            <td className="th-order">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th className="th-order">Items</th>
                                                            <th className="th-order">Quantity</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Object.entries(sortedOrders).map(([item, quantity]) => (
                                                            <tr key={item + quantity}>
                                                                <td className="th-order">{item}</td>
                                                                <td className="th-order">{quantity}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td className="td-order">{payment}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                            <tr>
                               <td colSpan="4">Loading...</td>
                            </tr>
                              )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}