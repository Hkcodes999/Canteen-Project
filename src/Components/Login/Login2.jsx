import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";

function Login2() {
  //for login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //for sign up
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [phone, setPhone] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const navigate = useNavigate();

  const authhandle = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        await setDoc(doc(db, "user", user.uid), {
          name,
          rollno,
          phone,
          email,
        });

        navigate("/home");
        alert("The sign up is sucessfull");
      } else {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;
        if ((user.email === "admin@canteen.com")) {
          navigate("/admin-dashboard");
          alert("Welcome admin");
        } else {
          navigate("/home");
          alert("Welcome student");
        }
      }
    } catch (error) {
      alert((isSignUp ? "sign up" : "login") + "error" + error.message);
    }
  };

  return (
    <div id="login2">
      <form onSubmit={authhandle}>
        <h1>{isSignUp ? "sign up" : "login"}</h1>
        {isSignUp && (
          <>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />

            <input
              type="text"
              value={rollno}
              placeholder="Roll no"
              onChange={(e) => {
                setRollno(e.target.value);
              }}
              required
            />

            <input
              type="text"
              value={phone}
              placeholder="phone"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              required
            />
          </>
        )}

        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />

        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />

        <button type="submit">
          {isSignUp ? "signup" : "login"}
        </button>
        <p>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ cursor: "pointer", color: "purple" }}
          >
            {isSignUp ? "Log in here" : "Sign up here"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login2;
