import React, { useState,useEffect } from 'react';
import {db} from "../../firestore";
import {AiOutlineShoppingCart} from "react-icons/ai"
import {doc,getDoc,collection, query, where, getDocs, setDoc} from "firebase/firestore";
import { useAuth } from '../../context/AuthContext';
import Header from "../Header";
import { useTranslation } from 'react-i18next';
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import './index.css';

function MeatOrdersForm() {
  const [cart, setCart] = useState({});
  const [meatData,setMeatData] = useState({})
  const [chicken, setChicken] = useState(0);
  const [mutton, setMutton] = useState(0);
  const [eggs, setEggs] = useState(0);
  const {currentUserDataOne,setMyValue,setProductsCost} = useAuth()
  const {t,i18n} = useTranslation();
  

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

  function addChickenQuantity(e) {
    e.preventDefault();
    setCart({ ...cart, chicken });
    setChicken(0);
  }

  function addMuttonQuantity(e) {
    e.preventDefault();
    setCart({ ...cart, mutton });
    setMutton(0);
  }

  function addEggsQuantity(e) {
    e.preventDefault();
    setCart({ ...cart, eggs });
    setEggs(0);
  }

  let userData;
  let userId;


  async function updateFirestoreMeatQuantity(data){
    const {chicken,mutton,eggs} = data;

    let c = chicken !== undefined?chicken:0
    let m = mutton !== undefined?mutton:0
    let e = eggs !== undefined?eggs:0
    try {
      const docRef = doc(db, "meatQuantity", "quantity");
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Access the data from the document
        const data = docSnap.data();
        const newQuantity = {
          ...data,
          chickenQuantity: data.chickenQuantity-c,
          muttonQuantity: data.muttonQuantity-m,
          eggsQuantity : data.eggsQuantity-e
        }

        try{
          await setDoc(doc(db, "meatQuantity", "quantity"), newQuantity);
          setCart({})
        }catch(error){
          alert(error.message)
        }

      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error("Error retrieving meat quantity:", error);
    }
  }

  async function updateFirestoreForMeat(id,amount){
    const q = query(collection(db, 'users'), where('email', '==', currentUserDataOne.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userData = doc.data();
      userId = doc.id;
    });
    const docRef = doc(db, 'users', userId);
    const payload = {
      ...userData,
      orders:[...userData.orders,{date:getTomorrowDate()+"m",delivaryStatus:false,items :{...cart},payment:amount}],
      transactions: { [new Date().toISOString()+" Meat"]: id, ...userData.transactions },
    };
    setMyValue(payload)

    try {
      await setDoc(docRef, payload);
    } catch (error) {
      alert('Error updating Firestore:', error);
    }
  }

  function paymentGateway(amount){
    var options = {
      key: 'rzp_test_P8LzMHrBgBQ7Y0',
      key_secret: '14BZ4AkfZioI41FGsGzM9VrT',
      amount: amount * 100,
      currency: 'INR',
      name: 'NANDHI FARMS',
      description: 'for testing purpose',
      handler: function (response) {
        updateFirestoreForMeat(response.razorpay_payment_id,amount);
        updateFirestoreMeatQuantity(cart)
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


  useEffect(() => {
    async function getTheMeatQuantity(){
      try {
        const docRef = doc(db, "meatQuantity", "quantity");
        const docSnap = await getDoc(docRef);
        i18n.changeLanguage(currentUserDataOne.multiLanguage)
        if (docSnap.exists()) {
          // Use data() method to access the document data
          const meatData = docSnap.data();
          setMeatData(meatData)
          setProductsCost(meatData)
        } else {
          console.log("Document does not exist");
        }
      } catch (e) {
        console.error(e);
        // Handle the error appropriately (e.g., show an error message)
      }
    }
    getTheMeatQuantity();
  },[cart,meatData,setProductsCost,currentUserDataOne.multiLanguage,i18n]);

  function getTheCostOfItem(){
    let cost = 0
    const keys = Object.keys(cart)
    if(keys.length===0){
      cost = 0
    }else{
      for (let a of keys){
        if(a==="chicken"){
          cost+=meatData.chickenCost*cart[a]
        }
        else if(a === "mutton"){
          cost+=meatData.muttonCost*cart[a]
        }else{
          cost += meatData.eggsCost*cart[a]
        }
      }
    }
    return cost
  }

  return (
    <div className="homepage1">
      <Header />
      <section className="hero1">
        <div className='popup-container'>
          <Popup
          modal
          trigger={
            <button id="trigger" type="button"><AiOutlineShoppingCart className='icon'/><span className='span'>{Object.keys(cart).length}</span></button>
          }
          >
            {close=>(
              <>
                <div className='cart-popup-container'>
                  <div className="table-responsive">
                    <table className='table' >
                     <thead>
                        <tr>
                          <th>{t('items')}</th>
                          <th>{t('quantity')}</th>
                          <th>{t('cos')}/Kg</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(cart).map(([item, quantity]) => (
                          <tr className='table-row' key={item}>
                            <td>{item}</td>
                            <td>{quantity}</td>
                            {item ==="mutton" && <td>{meatData.muttonCost*quantity}</td>}
                            {item ==="chicken" && <td>{meatData.chickenCost*quantity}</td>}
                            {item ==="eggs" && <td>{meatData.eggsCost*quantity}</td>}
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className='table-row'>
                          <td colSpan="2">
                            {t('totalCost')} : 
                          </td>
                          <td>
                            {getTheCostOfItem()} {t('rupees')}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <p className='para'>{Object.keys(cart).length===0?t('addMessage'): `${t('dairyDDate')} ${getTomorrowDate()}`}</p>
                    <button className='trigger-button' onClick={()=>paymentGateway(getTheCostOfItem())}>{t('pay')}</button>
                  </div>
                </div>
                <button 
                  type="button"
                  className='trigger-button'
                  onClick={()=>close()}
                >
                  {t('close')}
                </button>
              </>
            )
            }
          </Popup>
        </div>
      </section>
      <section className="featured-products1">
        <div className="product-card1">
          <div className='meat-cart-container'>
            <div>
              <img className="product-logo1" src="https://res.cloudinary.com/dxx7ni6cl/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1693589949/frozen-chicken-curry-cut_iidftr.jpg" alt="Product 1" />
            </div>
            <div className='sub-meat-container'>
              <form onSubmit={addChickenQuantity}>
                <div>
                  <label htmlFor='chicken'>Enter Quantity</label>
                  <input min="0" value={chicken} onChange={(e) => setChicken(parseInt(e.target.value))} placeholder='Enter in Liters' className='meat-cart-input' id="chicken" type="number" /><br />
                  <button disabled={meatData.chickenQuantity===0 || meatData.chickenQuantity < chicken} id='meat-button' type="submit">Add to Cart</button>
                </div>
              </form>
            </div>
          </div>
          <h3>{t('chicken')}</h3>
          <h4>{t('productCost')} : {meatData.chickenCost}/kg</h4>
          <p>{t('avaliableQuantity')}: {meatData.chickenQuantity} Kgs</p>
          <p style={{paddingTop:"4px"}}>{(meatData.chickenQuantity===0 || meatData.chickenQuantity < chicken)&& t('outOFStock')}</p>
        </div>
        <div className="product-card1">
          <div className='meat-cart-container'>
            <div>
              <img className="product-logo1" src="https://res.cloudinary.com/dxx7ni6cl/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1693589948/Mutton-Curry-Cut-1_gajqh1.jpg" alt="Product 1" />
            </div>
            <div className='sub-meat-container'>
              <form onSubmit={addMuttonQuantity}>
                <div>
                  <label htmlFor='mutton'>{t('enterQuantity')}</label>
                  <input min="0" value={mutton} onChange={(e) => setMutton(parseInt(e.target.value))} placeholder='Enter in Liters' className='meat-cart-input' id="mutton" type="number" />
                  <button disabled={meatData.muttonQuantity===0 || meatData.muttonQuantity < mutton} id='meat-button' type="submit">{t('addToCart')}</button>
                </div>
              </form>
            </div>
          </div>
          <h3>{t('mutton')}</h3>
          <h4>{t('productCost')} : {meatData.muttonCost}/kg</h4>
          <p>{t('avaliableQuantity')}: {meatData.muttonQuantity} kgs</p>
          <p style={{paddingTop:"4px"}}>{(meatData.muttonQuantity===0 || meatData.muttonQuantity < mutton) && t('outOFStock')}</p>
        </div>
        <div className="product-card1">
          <div className='meat-cart-container'>
            <div>
              <img className="product-logo1" src="https://res.cloudinary.com/dxx7ni6cl/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1693589948/health-benefits-of-eggs-1296x728-feature_ls8jis.jpg" alt="Product 1" />
            </div>
            <div className='sub-meat-container'>
              <form onSubmit={addEggsQuantity}>
                <div>
                  <label htmlFor='eggs'>Enter Quantity</label>
                  <input value={eggs} min="0" onChange={(e) => setEggs(parseInt(e.target.value))} placeholder='Enter in Liters' className='meat-cart-input' id="eggs" type="number" /><br />
                  <button disabled={meatData.eggsQuantity===0 || meatData.eggsQuantity<eggs}  id='meat-button' type="submit">Add to Cart</button>
                </div>
              </form>
            </div>
          </div>
          <h3>{t('eggs')}</h3>
          <h4>{t('productCost')} : {meatData.eggsCost}/{t('egg')}</h4>
          <p>{t('avaliableQuantity')}: {meatData.eggsQuantity} {t('eggs')}</p>
          <p style={{paddingTop:"4px"}}>{(meatData.eggsQuantity===0 || meatData.eggsQuantity < eggs)&& t('outOFStock')}</p>
        </div>
      </section>
      <footer className="footer1">
        <p>{t('footer')}</p>
      </footer>
    </div>
  );
}

export default MeatOrdersForm;
