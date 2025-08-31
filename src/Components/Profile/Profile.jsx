import React, { useEffect, useState } from "react";
import { auth, db } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Profile.css";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";

function Profile() {
  const [userData, setUserdata] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserdata(userSnap.data());
        }
      }
    });
  }, []);

  console.log(userData);

  const handlelogout = async () => {
    await signOut(auth);
    Navigate("/");
    window.location.reload();
  };

  return (
    <div id="profile">
      <motion.div
        id="profile-main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          id="profile-main-top"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2>Your profile</h2>
          <button id="logout" onClick={handlelogout}>Log out</button>
        </motion.div>
        <motion.div
          id="profile-main-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2>Name: {userData?.name}</h2>
          <h2>Email Id: {userData?.email}</h2>
          <h2>Roll no: {userData?.rollno}</h2>
          <h2>Phone number: {userData?.phone}</h2>
        </motion.div>
        <div id="profile-main-center-double">
          <h2>Updating profile is not available cause of tampering issues</h2>
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;
