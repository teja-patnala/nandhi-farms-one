import {initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 
const firebaseConfig = {
  apiKey: "AIzaSyAZQziNG9ELcogE6jgpW0Xt3g--QhMZb0k",
  authDomain: "nandhi-farms-3951e.firebaseapp.com",
  projectId: "nandhi-farms-3951e",
  storageBucket: "nandhi-farms-3951e.appspot.com",
  messagingSenderId: "318045950157",
  appId: "1:318045950157:web:168742b3b4c28822b2d984",
  measurementId: "G-CLSH6W3EST"
};


const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default app