import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../Firebase";
import './Users.css'
function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const snapshot = await getDocs(usersRef);

        const usersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(usersList);
      } catch (err) {
        console.error("Failed to fetch order history:", err);
      }
    };

    fetchUsers();
  }, []);

  console.log(users)

  return (
    <motion.div
      id="users"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div id="users-top">
        <h2>Welcome Admin</h2>
        <h3>all the users.</h3>
      </div>
      <div id="users-wrapper">
        {users.length === 0 ? (
          <p id="no-users">No past orders found.</p>
        ) : (
          <motion.div
            id="users-main"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {users.map((users) => (
              <div id="users-cards" key={users.id}>
                <div id="users-details">
                  <h4>Email: {users.email}</h4>
                  <p>Name: {users.name}</p>
                  <p>phone: {users.phone}</p>
                  <p>rollno: {users.rollno}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Users