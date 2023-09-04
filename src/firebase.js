import {initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 
const firebaseConfig = {
  apiKey: "AIzaSyDozRAP5idyjpkI1CKDaxRlMHqSQxGSUHY",
  authDomain: "nandhi-farms-2ef33.firebaseapp.com",
  projectId: "nandhi-farms-2ef33",
  storageBucket: "nandhi-farms-2ef33.appspot.com",
  messagingSenderId: "541059606653",
  appId: "1:541059606653:web:ba1f247b512fcdbc31e914"
};


const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default app