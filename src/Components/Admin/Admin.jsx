import React from 'react'
import './Admin.css'
import Adminnav from './Admin-nav'
import { Outlet } from "react-router-dom";
import { useLenis } from "../../hooks/useLenis";
function Admin() {
  return (
    <div id="admin">
      <div id="admin-nav">
        <Adminnav />
      </div>
      <div id="admin-center">
        <div data-lenis-content>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Admin