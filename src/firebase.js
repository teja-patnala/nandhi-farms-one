import {initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 
const firebaseConfig = {
  apiKey: "AIzaSyDYsMhA6rCqTs1sEDmHLMbTMiwN6MLOCjE",
  authDomain: "nandhi-farms.firebaseapp.com",
  projectId: "nandhi-farms",
  storageBucket: "nandhi-farms.appspot.com",
  messagingSenderId: "157991832327",
  appId: "1:157991832327:web:59148b82690155839e13a2",
  measurementId: "G-H2WL8QEQNQ"
};


const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default app