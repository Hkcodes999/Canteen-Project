import React, { useEffect, useState } from "react";
import "./Receipts.css";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";
import { motion } from "framer-motion";

function Receipts() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "orders");
        const snapshot = await getDocs(ordersRef);

        const orderList = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        // Sort newest → oldest
        orderList.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

        setOrder(orderList);
      } catch (err) {
        console.error("Failed to fetch order history:", err);
      }
    };

    fetchOrders();
  }, []);

  // Update status in Firestore
  const updateStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });

      setOrder((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <motion.div
      id="receipts"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div id="receipts-top">
        <h2>Welcome Admin</h2>
        <h3>Today's Orders</h3>
      </div>
      <div id="receipts-wrapper">
        {order.length === 0 ? (
          <p id="past">No past orders found.</p>
        ) : (
          <motion.div
            id="receipts-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {order.map((order) => (
              <div id="receipts-cards" key={order.id}>
                <div id="receipt-details">
                  <h4>Order ID: #{order.orderId}</h4>
                  <p>
                    Date:{" "}
                    {new Date(order.timestamp.seconds * 1000).toLocaleString()}
                  </p>
                  <p>Payment: {order.paymentMode}</p>
                  <p>Total: ₹{order.totalAmount}</p>
                  <p>Classroom: {order.classroom}</p>

                  <div className="status-buttons">
                    <button
                      className={
                        order.status === "preparing" ? "active preparing" : ""
                      }
                      onClick={() => updateStatus(order.id, "preparing")}
                      disabled={order.status === "preparing"}
                    >
                      Preparing
                    </button>
                    <button
                      className={
                        order.status === "delivered" ? "active delivered" : ""
                      }
                      onClick={() => updateStatus(order.id, "delivered")}
                      disabled={order.status === "delivered"}
                    >
                      Delivered
                    </button>
                    <button
                      className={
                        order.status === "cancel" ? "active cancel" : ""
                      }
                      onClick={() => updateStatus(order.id, "cancel")}
                      disabled={order.status === "cancel"}
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <div id="receipts-img">
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
      </div>
    </motion.div>
  );
}

export default Receipts;
