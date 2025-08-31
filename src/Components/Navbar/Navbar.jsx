import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";
import { MdOutlineFoodBank } from "react-icons/md";
import { MdRestaurantMenu } from "react-icons/md";
import { IoReceipt } from "react-icons/io5";
import { GoPersonFill } from "react-icons/go";

function Navbar() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (key) => {
    if (key === "food-icon") return location.pathname === "/home";
    if (key === "receipt-icon") return location.pathname.startsWith("/home/receipts");
    if (key === "profile-icon") return location.pathname.startsWith("/home/profile");
    return false;
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const ref = doc(db, "user", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setName(snap.data().name);
        }
      } else {
        navigate("/", { replace: true });
      }
    });

    return () => unsubcribe();
  }, []);

  return (
    <div id="navbar">
      <div id="food-icon-div">
        <MdOutlineFoodBank id="main-icon" onClick={()=>{navigate("/")}}/>
      </div>

      <div id="rest-icons">
        <div id="order-icons">
          <MdRestaurantMenu
            id="food-icons"
            onClick={() => navigate("/home")}
            className={isActive("food-icon") ? "active" : ""}
          />
          <IoReceipt
            id="food-icons"
            onClick={() => navigate("/home/receipts")}
            className={isActive("receipt-icon") ? "active" : ""}
          />
        </div>

        <div id="profile-div">
          <GoPersonFill
            id="food-icons"
            onClick={() => navigate("/home/profile")}
            className={isActive("profile-icon") ? "active" : ""}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
