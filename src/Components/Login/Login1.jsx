import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, db } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";

function Login1() {
  //log in purpose
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  //Sign in
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleauth = async (e) => {
    e.preventdefault();
    try {
      if (isSignUp) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        await setDoc(doc(db, "user", user.id), {
          name,
          rollno,
          phone,
          email,
        });

        alert("sign up sucessfull");
        navigate("/home");
      } else {
        const res = signInWithEmailAndPassword(auth, email, password);
        const user = (await res).user;

        if (user.email === "admi@cateen.com") {
          alert("Admin Login sucessfull");
          navigate("/admin-dashboard");
        } else {
          alert("Login suceessfull");
          navigate("/home");
        }
      }
    } catch (error) {
      alert((isSignUp ? "signup" : "login") + "error" + error.message);
    }
  };

  return (
        <div id="login">
            <h1 style={{color: "black"}}>hello</h1>
        </div>
    )
}

export default Login1;
