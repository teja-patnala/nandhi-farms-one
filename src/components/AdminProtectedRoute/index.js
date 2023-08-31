import React, { useEffect, useState } from "react";
import "./index.css"
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firestore";
import {BallTriangle} from "react-loader-spinner"
import { collection, query, getDocs, where } from "firebase/firestore";

export default function AdminProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status
  const [loadResult, setLoadResult] = useState(false)


  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (currentUser) {
        const q = query(collection(db, "users"), where("email", "==", currentUser.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          console.log(userData)
          if (userData && userData.isAdmin !== undefined) {
            setIsAdmin(userData.isAdmin);
          } else {
            setIsAdmin(false);
          }
          setLoadResult(true)
        });
      }
    };
    fetchAdminStatus();
  }, [currentUser]);
  
  const getTheResult = () =>{
    return isAdmin ? <>{children}</> : <Navigate to = "/"/>
  }

  return !loadResult ? (<div className="loader-container-one">
      <BallTriangle type="Puff" color="#00BFFF" height={100} width={100} />
     </div>) : getTheResult()
}
