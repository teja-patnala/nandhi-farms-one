import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import PasswordChangeForm from "./components/PasswordChangeForm";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./components/NotFound";
import AuthProvider from "./context/AuthContext"
import AboutUs from "./components/AboutUs";
import  SubscriptionForm from "./components/SubscriptionForm"
import ContactForm from "./components/ContactUs";



const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route exact path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/signup" element={<SignUpForm />} />
        <Route exact path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route exact path="/change-password" element={<ProtectedRoute><PasswordChangeForm /></ProtectedRoute>} />
        <Route exact path="/about" element={<ProtectedRoute><AboutUs/>s</ProtectedRoute>}/>
        <Route exact path="/contact" element={<ProtectedRoute><ContactForm/></ProtectedRoute>}/>
        <Route exact path="/subscribe" element={<ProtectedRoute><SubscriptionForm/></ProtectedRoute>}/>
        <Route element={<NotFoundPage/>}/>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;