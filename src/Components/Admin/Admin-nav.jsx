import React from "react";
import "./Admin-nav.css";
import { useNavigate } from "react-router-dom";
import { MdOutlineFoodBank } from "react-icons/md";
import { GoPersonFill } from "react-icons/go";
import { IoReceipt } from "react-icons/io5";
import { motion } from "framer-motion";
function Adminnav() {
  const navigate = useNavigate();
  const isActive = (key) => {
    if (key === "receipt-icon")
      return location.pathname.startsWith("/admin-dashboard");
    if (key === "users-icon")
      return location.pathname.startsWith("/admin-dashboard/users");
    return false;
  };

  return (
    <div id="admin-nav">
      <div id="food-icon-div">
        <MdOutlineFoodBank
          id="main-icon"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>

      <motion.div
        id="profile-div"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <IoReceipt
          id="food-icons"
          onClick={() => navigate("/admin-dashboard")}
          className={isActive("receipt-icon") ? "active" : ""}
        />
        <GoPersonFill
          id="food-icons"
          onClick={() => navigate("/admin-dashboard/users")}
          className={isActive("users-icon") ? "active" : ""}
        />
      </motion.div>
    </div>
  );
}

export default Adminnav;
