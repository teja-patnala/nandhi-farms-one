import {initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 
const firebaseConfig = {
  apiKey: "AIzaSyCZxsvSbDLPE8URMw12zz8ZD9BTXt6Ezg8",
  authDomain: "nandhi-farms-final-project.firebaseapp.com",
  projectId: "nandhi-farms-final-project",
  storageBucket: "nandhi-farms-final-project.appspot.com",
  messagingSenderId: "424930833911",
  appId: "1:424930833911:web:cace3c12910b699e586af2",
  measurementId: "G-M4D8T09SP6"
};


const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default app