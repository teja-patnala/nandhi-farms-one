import React, {useEffect,useState,useContext,useRef} from "react"
import app from "../firebase"
import {db} from "../firestore"
import {collection,query,where,getDocs,} from 'firebase/firestore';
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail} from "firebase/auth";


const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

const auth = getAuth(app)

// ... (imports and context creation)

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [currentUserDataOne,setMyValue] = useState({})
  
    function signup(email, password) {
      return createUserWithEmailAndPassword(auth, email, password);
    }
  
    function login(email, password) {
      return signInWithEmailAndPassword(auth, email, password);
    }
  
    function logout() {
      return auth.signOut();
    }
  
    function resetPassword(email) {
      return sendPasswordResetEmail(auth, email);
    }
  
    function updateEmail(email) {
      return currentUser.updateEmail(email);
    }
  
    function updatePassword(password) {
      return currentUser.updatePassword(password);
    }
  
    const isAdminOfNandhi = useRef();
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        setCurrentUser(user);
        setLoading(false);
  
        if (user) {
          const q = query(collection(db, "users"), where("email", "==", user.email));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            isAdminOfNandhi.current = userData.isAdmin;
            setMyValue(userData)
          });
        }
      });
      return unsubscribe;
    });
  
    const value = {
      currentUser,
      currentUserDataOne,
      login,
      signup,
      logout,
      resetPassword,
      updateEmail,
      updatePassword,
      isAdminOfNandhi,
      setMyValue
    };
  
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }

  export const useMyContext = () =>{
    return useContext(AuthContext)
  }
  
  export default AuthProvider;
  