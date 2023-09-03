import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import PasswordChangeForm from "./components/PasswordChangeForm";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./components/NotFound";
import AuthProvider from "./context/AuthContext";
import AboutUs from "./components/AboutUs";
import SubscriptionForm from "./components/SubscriptionForm";
import ContactForm from "./components/ContactUs";
import AdminPage from "./components/AdminPage";
import AdminProtectedRoute from "./components/AdminProtectedRoute"
import MeatOrdersForm from "./components/MeatOrdersForm";
import CartForm from "./components/CartForm"
import DairyProductsForm from "./components/DairyProductsForm"

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/change-password" element={<ProtectedRoute><PasswordChangeForm /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><ContactForm /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><CartForm /></ProtectedRoute>} />
        <Route path="/subscribe" element={<ProtectedRoute><SubscriptionForm /></ProtectedRoute>} />
        <Route path="/meat" element={<ProtectedRoute><MeatOrdersForm /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><DairyProductsForm /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminProtectedRoute><AdminPage /></AdminProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>  
  </BrowserRouter>
);

export default App;
