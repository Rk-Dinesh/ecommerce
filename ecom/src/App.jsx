import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";

import SignInSide from "./pages/auth/login1";
import Dashboard from "./pages/dashboard";
import Admin from "./pages/Admin";

import AdminForm from "./pages/Admin/AdminForm";
import UpdateForm from "./pages/Admin/UpdateForm";
import Login from "./pages/auth/login";
import Layout from "./layout/Layout";
import UserProfile from "./components/partials/header/Tools/UserProfile";



import Subscribers from "./pages/Subscribers";




function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <div>
      <ToastContainer position="top-right" autoClose={1000} />
      <Routes>
        <Route path="" element={<Login setToken={setToken} />} />
        <Route path="/razorpay" element={<Razorpay />}/>
        {/* <Route path="" element={<SignInSide setToken={setToken} />} /> */}
        <Route path="/*" element={token ? <Layout token={token}/> : <Navigate to='/' />}>
          <Route path="dashboard" element={<Dashboard />} />
          
          <Route path="admin" element={<Admin />} />
          
        
          <Route path="subscribers" element={<Subscribers/>} />
          {/* <Route path="page" element={<SignInSide />} /> */}
          <Route path="form" element={<AdminForm />} />

          <Route path="updateform" element={<UpdateForm />} />
          <Route path="profile" element={<UserProfile token={token} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
