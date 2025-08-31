import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { auth, db } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "./Home.css";
import { useLenis } from "../../hooks/useLenis";
import Order from "../Order/Order";
import { Toaster, toast } from "react-hot-toast";

function Home() {
  const [userData, setUserData] = useState({});
  const [cart, setCart] = useState([]);
  const [orderOpen, setOrderOpen] = useState(false);

  useLenis(".home-menu");

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      }
    });
  }, []);

  useEffect(() => {
    if (userData?.name) {
      toast.success(`Logged in ${userData.name}`);
    }
  }, [userData]);


  console.log(userData)

  const addToCart = (meal, qty) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === meal.id);
      if (existing) {
        return prev.map((item) =>
          item.id === meal.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      if (qty === 0) {
        toast.error("add at least 1 quantity");
      } else {
        return [...prev, { ...meal, qty }];
      }
      return [...prev];
    });
  };

  const clearCart = () => setCart([]);

  return (
    <div id="home-layout">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="home-navbar">
        <Navbar />
      </div>

      <div className="home-menu">
        <div data-lenis-content>
          <Outlet context={{ addToCart }} />
        </div>
      </div>

      <div className={`home-order ${orderOpen ? "expanded" : "collapsed"}`}>
        <Order
          user={userData}
          cart={cart}
          clearcart={clearCart}
          orderOpen={orderOpen}
          setOrderOpen={setOrderOpen}
        />
      </div>
    </div>
  );
}

export default Home;
