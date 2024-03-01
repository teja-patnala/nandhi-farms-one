import {initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 
const firebaseConfig = {
  apiKey: "AIzaSyCInNIs8Eyza0WwU4CeHR45Y01Q0LDU5UE",
  authDomain: "teja-86afe.firebaseapp.com",
  projectId: "teja-86afe",
  storageBucket: "teja-86afe.appspot.com",
  messagingSenderId: "396230478134",
  appId: "1:396230478134:web:769d71ac90fc7df2944b97"
};


const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default app