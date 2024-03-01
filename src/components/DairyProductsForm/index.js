import React, { useState,useEffect } from 'react';
import {db} from "../../firestore";
import {AiOutlineShoppingCart} from "react-icons/ai"
import {doc,getDoc,collection, query, where, getDocs, setDoc} from "firebase/firestore";
import { useAuth } from '../../context/AuthContext';
import Header from "../Header";
import Popup from "reactjs-popup";
import { useTranslation } from 'react-i18next';
import "reactjs-popup/dist/index.css";
import './index.css';

function DairyProductsForm() {
  const [cart, setCart] = useState({});
  const [productsData,setProductsData] = useState({})
  const [curd, setCurd] = useState(0);
  const [ghee, setGhee] = useState(0);
  const [honey, setHoney] = useState(0);
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

  function addCurdQuantity(e) {
    e.preventDefault();
    setCart({ ...cart, curd });
    setCurd(0);
  }

  function addGheeQuantity(e) {
    e.preventDefault();
    setCart({ ...cart, ghee });
    setGhee(0);
  }

  function addHoneyQuantity(e) {
    e.preventDefault();
    setCart({ ...cart, honey});
    setHoney(0);
  }

  let userData;
  let userId;


  async function updateFirestoreProductsQuantity(data){
    const {curd,honey,ghee} = data;

    let cu = curd !== undefined?curd:0
    let h = honey !== undefined?honey:0
    let g = ghee !== undefined?ghee:0
    try {
      const docRef = doc(db, "productsQuantity", "quantity");
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Access the data from the document
        const data = docSnap.data();
        const newQuantity = {
          ...data,
          curdQuantity: data.curdQuantity-cu,
          gheeQuantity: data.gheeQuantity-g,
          honeyQuantity : data.honeyQuantity-h
        }

        try{
          await setDoc(doc(db, "productsQuantity", "quantity"), newQuantity);
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

  async function  updateFirestoreForProducts(id,amount){
    const q = query(collection(db, 'users'), where('email', '==', currentUserDataOne.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userData = doc.data();
      userId = doc.id;
    });
    const docRef = doc(db, 'users', userId);
    const payload = {
      ...userData,
      orders:[{date:getTomorrowDate()+"mp",delivaryStatus:false,items :{...cart},payment:amount},...userData.orders,],
      transactions: { [new Date().toISOString()+" Products"]: id, ...userData.transactions },
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
        updateFirestoreForProducts(response.razorpay_payment_id,amount);
        updateFirestoreProductsQuantity(cart)
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
        const docRef = doc(db, "productsQuantity", "quantity");
        const docSnap = await getDoc(docRef);
        i18n.changeLanguage(currentUserDataOne.multiLanguage)
        if (docSnap.exists()) {
          // Use data() method to access the document data
          const productsData = docSnap.data();
          setProductsData(productsData)
          setProductsCost(productsData)
        } else {
          console.log("Document does not exist");
        }
      } catch (e) {
        console.error(e);
        // Handle the error appropriately (e.g., show an error message)
      }
    }
    getTheMeatQuantity();
  },[cart,productsData,setProductsCost,currentUserDataOne.multiLanguage,i18n]);

  function getTheCostOfItem(){
    let cost = 0
    const keys = Object.keys(cart)
    if(keys.length===0){
      cost = 0
    }else{
      for (let a of keys){
        if(a==="curd"){
          cost+=productsData.curdCost*cart[a]
        }
        else if(a === "honey"){
          cost+=productsData.honeyCost*cart[a]
        }else{
          cost += productsData.gheeCost*cart[a]
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
                          <th>{t('cos')}/{t('liter')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(cart).map(([item, quantity]) => (
                          <tr className='table-row' key={item}>
                            <td>{item}</td>
                            <td>{quantity}</td>
                            {item ==="curd" && <td>{productsData.curdCost*quantity}</td>}
                            {item ==="honey" && <td>{productsData.honeyCost*quantity}</td>}
                            {item ==="ghee" && <td>{productsData.gheeCost*quantity}</td>}
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
              <img className="product-logo1" src="https://res.cloudinary.com/dxx7ni6cl/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1693682005/homemade-dahi5_oidvvb.jpg" alt="Product 1" />
            </div>
            <div className='sub-meat-container'>
              <form onSubmit={addCurdQuantity}>
                <div>
                  <label htmlFor='curd'>{t('enterQuantity')}</label>
                  <input min="0" value={curd} onChange={(e) => setCurd(parseInt(e.target.value))} placeholder='Enter in Kgs' className='meat-cart-input' id="curd" type="number" /><br />
                  <button disabled={productsData.curdQuantity===0 || productsData.curdQuantity < curd} id='meat-button' type="submit">{t('addToCart')}</button>
                </div>
              </form>
            </div>
          </div>
          <h3>{t('curb')}</h3>
          <h4>{t('productCost')} : {productsData.curdCost}/{t('liter')}</h4>
          <p>{t('avaliableQuantity')}: {productsData.curdQuantity} {t('liters')}</p>
          <p style={{paddingTop:"4px"}}>{(productsData.curdQuantity===0 || productsData.curdQuantity < curd)&& t('outOFStock')}</p>
        </div>
        <div className="product-card1">
          <div className='meat-cart-container'>
            <div>
              <img className="product-logo1" src="https://res.cloudinary.com/dxx7ni6cl/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1693682006/ghee-recipe-homemade-indian-ghee-3_co1ysh.jpg" alt="Product 1" />
            </div>
            <div className='sub-meat-container'>
              <form onSubmit={addGheeQuantity}>
                <div>
                  <label htmlFor='ghee'>{t('enterQuantity')}</label>
                  <input min="0" value={ghee} onChange={(e) => setGhee(parseInt(e.target.value))} placeholder='Enter in Kgs' className='meat-cart-input' id="ghee" type="number" />
                  <button  disabled={productsData.gheeQuantity===0 || productsData.gheeQuantity < ghee} id='meat-button' type="submit">{t('addToCart')}</button>
                </div>
              </form>
            </div>
          </div>
          <h3>{t('ghee')}</h3>
          <h4>{t('productCost')} : {productsData.gheeCost}/liter</h4>
          <p>{t('avaliableQuantity')}: {productsData.gheeQuantity} {t('liters')}</p>
          <p style={{paddingTop:"4px"}}>{(productsData.gheeQuantity===0 || productsData.gheeQuantity < ghee)&& t('outOFStock')}</p>
        </div>
        <div className="product-card1">
          <div className='meat-cart-container'>
            <div>
              <img className="product-logo1" src="https://res.cloudinary.com/dxx7ni6cl/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1693682002/download_xq7kyd.jpg" alt="Product 1" />
            </div>
            <div className='sub-meat-container'>
              <form onSubmit={addHoneyQuantity}>
                <div>
                  <label htmlFor='honey'>{t('enterQuantity')}</label>
                  <input min="0" value={honey} onChange={(e) => setHoney(parseInt(e.target.value))} placeholder='Enter in Kgs' className='meat-cart-input' id="honey" type="number" /><br />
                  <button disabled={productsData.honeyQuantity===0 || productsData.honeyQuantity < honey} id='meat-button' type="submit">{t('addToCart')}</button>
                </div>
              </form>
            </div>
          </div>
          <h3>{t('Honey')}</h3>
          <h4>{t('productCost')} : {productsData.honeyCost}/liter</h4>
          <p>{t('avaliableQuantity')}: {productsData.honeyQuantity} {t('liters')}</p>
          <p style={{paddingTop:"4px"}}>{(productsData.honeyQuantity===0 || productsData.honeyQuantity < honey)&& t('outOFStock')}</p>
        </div>
      </section>
      <footer className="footer1">
        <p>{t('footer')}</p>
      </footer>
    </div>
  );
}

export default DairyProductsForm;
