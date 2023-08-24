import React, { useState, useEffect } from 'react';
import Header from "../Header"
import './index.css';


const SubscriptionForm = () => {
  const [selectedDays, setSelectedDays] = useState();
  const [tomorrowsDate, setTomorrowsDate] = useState();
  const [endDate, setEndDate] = useState();
  const [liters,setLiters] = useState(0);
  const [amount,setAmount] = useState(0);
  const [showStats, setShowStats] = useState(false);
  
  function getFutureDate(daysToAdd) {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + daysToAdd);
    return futureDate.toDateString();
  }

  useEffect(()=>{
    if(selectedDays!==0){
      setTomorrowsDate(getFutureDate(1))
      setEndDate(getFutureDate(selectedDays))
    }
    if(liters!==0 && selectedDays!==0){
      setShowStats(true)
      setAmount(selectedDays*liters*60)
    }else{
      setShowStats(false)
    }
  },[selectedDays,endDate,tomorrowsDate,liters])

  return (
    <div className='main-payment-container'>
      <Header/>
      <div className="payment-container">
          <h2 className="heading">Select Number of Days</h2>
          <select className='select' value={selectedDays} onChange={(e)=>setSelectedDays(parseInt(e.target.value))}>
            <option value={0}>0 day</option>
            <option value={1}>1 day</option>
            <option value={7}>7 days</option>
            <option value={30}>30 days</option>
          </select>
          <h2 className='heading'>Select Number of liters per day</h2>
          <select className='select' value={liters} onChange={(e)=>setLiters(parseInt(e.target.value))}>
            <option selected value={0}>0 liters</option>
            <option value={1}>1 liters</option>
            <option value={2}>2 liters</option>
            <option value={3}>3 liters</option>
            <option value={4}>4 liters</option>
          </select>
          <div className="date-container">
            {showStats&&
            <div className='milk-details-card'>
              <p className='supply-heading'>Milk Supplied</p>
              {selectedDays===1 ? <p>only one day on : {tomorrowsDate}</p> :<><p>Days : {selectedDays}</p>
              <p>From : {tomorrowsDate}</p>
              <p>End : {endDate}</p>
               </>}
            </div>
            }
          </div>
          <div className="pay-button-container">
            <button value = {amount} className="pay-button">{selectedDays * 60 *liters} rupees - Pay Now</button>
          </div>
        </div>
    </div>
  );
};

export default SubscriptionForm;
