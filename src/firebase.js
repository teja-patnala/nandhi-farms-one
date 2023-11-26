import {initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 
const firebaseConfig = {
  apiKey: "AIzaSyDCysCb-cLn67LCRngwqLtCqMX5IJZyXLs",
  authDomain: "nandhi-fa.firebaseapp.com",
  projectId: "nandhi-fa",
  storageBucket: "nandhi-fa.appspot.com",
  messagingSenderId: "196836687293",
  appId: "1:196836687293:web:6552e707ec42abf2dde6d4"
};


const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default app