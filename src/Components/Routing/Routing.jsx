import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Login/Login'
import Home from '../Home/Home';
import Admin from '../Admin/Admin';
import Menu from '../Menu/Menu';
import Receipt from '../Receipt/Receipt';
import Profile from '../Profile/Profile';
import Landing from '../Landing/Landing';
import Receipts from '../Receipt/Receipts';
import Users from "../Profile/Users";
function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route path="/home" element={<Home />}>
        <Route index element={<Menu />} />
        <Route path="receipts" element={<Receipt />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/admin-dashboard" element={<Admin />}>
        <Route path="/admin-dashboard" element={<Receipts />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default Routing;