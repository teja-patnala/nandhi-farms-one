const Razorpay = require('razorpay');

var instance = new Razorpay({
    key_id: process.env.REACT_APP_KEY_ID,
    key_secret: process.env.REACT_APP_KEY_SECRET,
});