import React, { useState,useEffect } from 'react';
import {db} from "../../firestore";
import {doc,getDoc} from "firebase/firestore";
import Header from "../Header";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import './index.css';

function App() {
  const [cart, setCart] = useState({});
  const [meatData,setMeatData] = useState({})
  const [chicken, setChicken] = useState("");
  const [mutton, setMutton] = useState("");
  const [eggs, setEggs] = useState("");


  function addChickenQuantity(e) {
    e.preventDefault();
    setCart({ ...cart, chicken });
    setChicken("");
  }

  function addMuttonQuantity(e) {
    e.preventDefault();
    setCart({ ...cart, mutton });
    setMutton("");
  }

  function addEggsQuantity(e) {
    e.preventDefault();
    setCart({ ...cart, eggs });
    setEggs("");
  }

  function updateFirestoreForMeat(id){
    console.log(id)
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
        updateFirestoreForMeat(response.razorpay_payment_id);
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

  console.log(cart)
  useEffect(() => {
    async function getTheMeatQuantity(){
      try {
        const docRef = doc(db, "meatQuantity", "quantity");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          // Use data() method to access the document data
          const meatData = docSnap.data();
          setMeatData(meatData)
          console.log(meatData);
        } else {
          console.log("Document does not exist");
        }
      } catch (e) {
        console.error(e);
        // Handle the error appropriately (e.g., show an error message)
      }
    }
    getTheMeatQuantity();


  },[]);

  return (
    <div className="homepage1">
      <Header />
      <section className="hero1">
        <div className='popup-container'>
          <Popup
          modal
          trigger={
            <button className='trigger-button' type="button">Cart</button>
          }
          >
            {close=>(
              <>
                <div className='cart-popup-container'>
                  <div className="table-responsive">
                    <table className='table' >
                     <thead>
                        <tr>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th>Cost/Kg</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(cart).map(([item, quantity]) => (
                          <tr className='table-row' key={item}>
                            <td>{item}</td>
                            <td>{quantity}</td>
                            {item ==="mutton" && <td>{800*quantity}</td>}
                            {item ==="chicken" && <td>{200*quantity}</td>}
                            {item ==="eggs" && <td>{10*quantity}</td>}
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className='table-row'>
                          <td colSpan="2">
                            total Cost : 
                          </td>
                          <td>
                            {10*cart.eggs+800*cart.mutton+200*cart.chicken} Rupees
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <button onClick={paymentGateway(10*cart.eggs+800*cart.mutton+200*cart.chicken)}>Pay</button>
                  </div>
                </div>
                <button 
                  type="button"
                  className='trigger-button'
                  onClick={()=>close()}
                >
                  close
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
                  <input value={chicken} onChange={(e) => setChicken(e.target.value)} placeholder='Enter in Kgs' className='meat-cart-input' id="chicken" type="number" /><br />
                  <button className='meat-button' type="submit">Add to Cart</button>
                </div>
              </form>
            </div>
          </div>
          <h3>Natu Kodi Meat</h3>
          <h4>cost : 200/kg</h4>
          <p>Available Quantity: {meatData.chickenQuantity} Kgs</p>
        </div>
        <div className="product-card1">
          <div className='meat-cart-container'>
            <div>
              <img className="product-logo1" src="https://res.cloudinary.com/dxx7ni6cl/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1693589948/Mutton-Curry-Cut-1_gajqh1.jpg" alt="Product 1" />
            </div>
            <div className='sub-meat-container'>
              <form onSubmit={addMuttonQuantity}>
                <div>
                  <label htmlFor='mutton'>Enter Quantity</label>
                  <input value={mutton} onChange={(e) => setMutton(e.target.value)} placeholder='Enter in Kgs' className='meat-cart-input' id="mutton" type="number" /><br />
                  <button className='meat-button' type="submit">Add to Cart</button>
                </div>
              </form>
            </div>
          </div>
          <h3>Goat Meat</h3>
          <h4>cost : 800/kg</h4>
          <p>Available Quantity: {meatData.muttonQuantity} kgs</p>
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
                  <input value={eggs} onChange={(e) => setEggs(e.target.value)} placeholder='Enter in Kgs' className='meat-cart-input' id="eggs" type="number" /><br />
                  <button className='meat-button' type="submit">Add to Cart</button>
                </div>
              </form>
            </div>
          </div>
          <h3>Natu Kodi Eggs</h3>
          <h4>cost : 10/Egg</h4>
          <p>Available Quantity: {meatData.eggsQuantity} kgs</p>
        </div>
      </section>
      <footer className="footer1">
        <p>&copy; 2023 Milk Daily. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
