import React, { useState } from "react";
import "./Order.css";
import { getAuth } from "firebase/auth";
import { db } from "../../Firebase";
import {
  setDoc,
  doc,
  getDoc,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { toast } from "react-hot-toast";

function Order({ user, cart, clearcart, orderOpen, setOrderOpen }) {
  const [paymentMode, setPaymentmode] = useState("Cash");
  const [classroom, setClassroom] = useState("");
  const [active, setActive] = useState(false);
  const [clicked, setClicked] = useState(false);

  const auth = getAuth();
  const currentUser = auth.currentUser;
  console.log(currentUser);

  const generateUniqueOrderId = async () => {
    let orderId;
    let exists = true;

    while (exists) {
      orderId = Math.floor(100000 + Math.random() * 900000).toString();
      const docRef = doc(db, "orders", orderId);
      const docSnap = await getDoc(docRef);
      exists = docSnap.exists();
    }

    return orderId;
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("The cart is empty");
      return;
    }

    if (!currentUser) {
      alert("Log in to order");
    }

    const uid = currentUser.uid;
    console.log(uid);

    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    try {
      const orderId = await generateUniqueOrderId();

      const orderData = {
        orderId,
        name: user?.name || "N/A",
        rollno: user?.rollno || "N/A",
        phone: user?.phone || "N/A",
        userId: uid,
        cart,
        classroom,
        totalAmount,
        paymentMode,
        status: "pending",
        timestamp: Timestamp.now(),
      };

      // Save to global orders
      await setDoc(doc(db, "orders", orderId), orderData);

      // Save to user order history
      await addDoc(collection(db, "users", uid, "orderHistory"), orderData);

      toast.success(`Order placed successfully! Your Order ID is ${orderId}`)
      clearcart();
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order.");
    }
  };

  return (
    <div id="order" className={active ? "collapsed" : "expanded"}>
      <div id="order-top">
        <h2>Your order</h2>
        <FaRegArrowAltCircleDown
          id="arrow"
          onClick={() => setOrderOpen(!orderOpen)}
          className={orderOpen ? "arrow down" : "arrow up"}
        />
      </div>

      <div id="orders-main">
        {cart.length === 0 ? (
          <div id="text">
            <h2>
              Cart is empty <br />
              add some meals
            </h2>
          </div>
        ) : (
          <div id="list">
            <ul>
              {cart.map((item) => (
                <li key={item.id} id="list-items">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <div id="list-details">
                    <div id="list-details-top">
                      <strong>{item.name}</strong> × {item.qty}
                    </div>
                    <h3>₹{item.price * item.qty}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div id="amount">
        {cart.length === 0 ? (
          <div id="text">
            <h1>add meal for amount</h1>
          </div>
        ) : (
          <div id="amount-main">
            <p>
              <strong>Sub Total:</strong> ₹
              {cart.reduce((sum, item) => sum + item.price * item.qty, 0)}
            </p>
            <div id="amount-details">
              <strong>Payment Method:</strong>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentmode(e.target.value)}
                style={{ marginLeft: "0.5rem" }}
              >
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
              </select>
            </div>
            <div id="class-details">
              <strong>Room no: </strong>
              <input
                type="text"
                placeholder="Room no"
                required
                onChange={(e) => setClassroom(e.target.value)}
              />
            </div>
            <div id="order-button">
              <button id="place-order-button" onClick={placeOrder}>
                Place Order
              </button>
              <button id="place-order-button" onClick={clearcart}>
                Cancel Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
