import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../Firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import "./Receipt.css";
import { motion } from "framer-motion";

function Receipt() {
  const [userUid, setUserUid] = useState(null);
  const [orders, setOrders] = useState([]);

  // ✅ Track user login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Fetch orders in real-time from "orders" where userId == uid
  useEffect(() => {
    if (!userUid) return;

    const q = query(collection(db, "orders"), where("userId", "==", userUid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      orderList.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

      setOrders(orderList);
    });

    return () => unsubscribe();
  }, [userUid]);

  if (!userUid) return <p>Please log in to view your order history.</p>;

  return (
    <motion.div
      id="receipt"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <h2>Your Order History</h2>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <motion.div
          id="receipt-main"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {orders.map((order) => (
            <div id="receipt-cards" key={order.id}>
              <div id="receipt-details">
                <h4>Order ID: #{order.orderId}</h4>
                <p>
                  Date:{" "}
                  {new Date(order.timestamp.seconds * 1000).toLocaleString()}
                </p>
                <p>Payment: {order.paymentMode}</p>
                <p>Total: ₹{order.totalAmount}</p>
                <p>Classroom: {order.classroom || "N/A"}</p>

                {/* ✅ Show live order status */}
                <p>
                  Status:{" "}
                  <span
                    style={{
                      color:
                        order.status === "delivered"
                          ? "green"
                          : order.status === "cancel"
                          ? "red"
                          : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {order.status || "Pending"}
                  </span>
                </p>
              </div>

              <div id="receipt-img">
                {order.cart.map((item, index) => (
                  <div id="receipt-img-main" key={index}>
                    <img src={item.image} alt="meal" />
                    <h3>
                      {item.name} × {item.qty} = ₹{item.price * item.qty}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default Receipt;
