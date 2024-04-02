import {initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCU16E0jVMZCUM-WYJuR_hb_lLKEdb-yEY",
  authDomain: "peoject-nandhi-farms.firebaseapp.com",
  projectId: "peoject-nandhi-farms",
  storageBucket: "peoject-nandhi-farms.appspot.com",
  messagingSenderId: "321513259436",
  appId: "1:321513259436:web:7217b1a6b092a8af7fba09"
};


const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default app