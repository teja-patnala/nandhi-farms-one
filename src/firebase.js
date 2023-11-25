import {initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 
const firebaseConfig = {
  apiKey: "AIzaSyB2MmVI4X4a_DKn_bKhsz4DMhDml50OvY8",
  authDomain: "nandhi-farms-dbed8.firebaseapp.com",
  projectId: "nandhi-farms-dbed8",
  storageBucket: "nandhi-farms-dbed8.appspot.com",
  messagingSenderId: "869577985476",
  appId: "1:869577985476:web:3c226cc5b76fa6e480a891"
};


const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default app