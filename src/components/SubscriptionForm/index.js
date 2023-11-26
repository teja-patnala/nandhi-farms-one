import React, { useState, useEffect } from 'react';
import { collection, doc, query, where, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../firestore';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import SubscriptionPopup from "../SubscriptionPopup"
import Header from '../Header';
import './index.css';

const SubscriptionForm = () => {
  const [selectedDays, setSelectedDays] = useState(0);
  const [tomorrowsDate, setTomorrowsDate] = useState();
  const {currentUser,currentUserDataOne,setMyValue} = useAuth();
  const [endDate, setEndDate] = useState();
  const [liters, setLiters] = useState(0);
  const [amount, setAmount] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const {t,i18n} = useTranslation();

  function getFutureDate(daysToAdd) {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + daysToAdd);
    return futureDate.toDateString();
  }
  
  let userData;
  let userId;

  async function updateFirestore(id) {
    const q = query(collection(db, 'users'), where('email', '==', currentUser.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userData = doc.data();
      userId = doc.id;
    });
    const docRef = doc(db, 'users', userId);
    const payload = {
      ...userData,
      subscription: true,
      litersOfMilk: liters,
      noDaysSuppliesMilk: selectedDays,
      milkSupliesStartsFrom:tomorrowsDate,
      milkSupliesEnd:getFutureDate(selectedDays-1),
      transactions: { [new Date().toISOString()]: id, ...userData.transactions },
    };
    setMyValue(payload)

    try {
      await setDoc(docRef, payload);

    } catch (error) {
      alert('Error updating Firestore:', error);
    }
  }
  console.log(currentUserDataOne.multiLanguage)
  useEffect(() => {
    if (selectedDays !== 0) {
      setTomorrowsDate(getFutureDate(1));
      setEndDate(getFutureDate(selectedDays));
    }
    if (liters !== 0 && selectedDays !== 0) {
      setShowStats(true);
      setAmount(selectedDays * liters * 60);
    } else {
      setShowStats(false);
    }
  }, [selectedDays, endDate, tomorrowsDate, liters]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount === 0) {
      alert('Please enter amount');
    } else {
    
      var options = {
        key: 'rzp_test_P8LzMHrBgBQ7Y0',
        key_secret: '14BZ4AkfZioI41FGsGzM9VrT',
        amount: amount * 100,
        currency: 'INR',
        locale:currentUserDataOne.multiLanguage,
        name: 'NANDHI FARMS',
        description: 'for testing purpose',
        handler: function (response) {
          updateFirestore(response.razorpay_payment_id);
        },
        prefill: {
          name: 'patnala venkata teja',
          email: 'patnalatejaa@gmail.com',
          contact: '9848931589',
        },
        notes: {
          address: 'Razorpay Corporate office',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        try {
          const pay = new window.Razorpay(options);
          pay.open();
        } catch (error) {
          console.error('Error loading or initializing Razorpay:', error);
        }
      };
      script.onerror = (error) => {
        console.error('Error loading Razorpay script:', error);
        alert(error);
      };
      document.body.appendChild(script);
    }
  };
  return (
    <div className='main-payment-container'>
      <Header/>
      <div className="payment-container">
        <SubscriptionPopup userData={currentUserDataOne}/>
          <h2 className="heading">{t('subFormDays')}</h2>
          <select className='select' value={selectedDays} onChange={(e)=>setSelectedDays(parseInt(e.target.value))}>
            <option value={0}>0 {t('days')}</option>
            <option value={1}>1 {t('days')}</option>
            <option value={7}>7 {t('days')}</option>
            <option value={30}>30 {t('days')}</option>
          </select>
          <h2 className='heading'>{t('subFormPerDays')}</h2>
          <select className='select' value={liters} onChange={(e)=>setLiters(parseInt(e.target.value))}>
            <option selected value={0}>0 {t('liters')}</option>
            <option value={1}>1 {t('liters')}</option>
            <option value={2}>2 {t('liters')}</option>
            <option value={3}>3 {t('liters')}</option>
            <option value={4}>4 {t('liters')}</option>
          </select>
          <div className="date-container">
            {showStats&&
            <div className='milk-details-card'>
              <p className='supply-heading'>{t('milkSupplied')}</p>
              {selectedDays===1 ? <p>{t('oneDay')} {tomorrowsDate}</p> :<><p>{t('days')} : {selectedDays}</p>
              <p>{t('from')} : {tomorrowsDate}</p>
              <p>{t('end')}: {endDate}</p>
               </>}
            </div>
            }
          </div>
          <div className="pay-button-container">
            <button disabled={currentUserDataOne.subscription} value = {amount} onClick={handleSubmit} className="pay-button">{selectedDays * 60 *liters} {t('cost')}</button>
          </div>
        </div>
    </div>
  );
};

export default SubscriptionForm;
