import React, { useState } from "react";
import "./Login.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [phone, setPhone] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const navigate = useNavigate();


  const handleauth = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        await setDoc(doc(db, "users", user.uid), {
          name,
          rollno,
          phone,
          email,
        });
        
        navigate("/home");
      } else {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;

        if (user.email === "admin@canteen.com") {
          navigate("/admin-dashboard");
        } else {
          navigate("/home");
        }
      }
    } catch (err) {
      alert((isSignUp ? "Signup" : "Login") + " failed: " + err.message);
    }
  };

  return (
    <div id="login">
      <div id="main-login">
        <motion.div
          id="login-left"
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 20 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <div id="login-left-top">
            <img src="/main-logo.png" alt="" />
          </div>
          <div id="login-left-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="637"
              height="637"
              viewBox="0 0 637 637"
              fill="none"
              lang="en"
            >
              <path
                d="M637 487.175H0V487.494H637V487.175Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M573.174 507.681H530.976V508H573.174V507.681Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M421.974 511.139H410.899V511.457H421.974V511.139Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M529.701 495.851H505.251V496.169H529.701V495.851Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M121.861 497.991H66.8328V498.31H121.861V497.991Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M141.273 497.991H133.204V498.31H141.273V497.991Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M286.837 503.371H167.494V503.69H286.837V503.371Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M301.956 430.357H55.9477C51.9384 430.357 48.6757 427.094 48.6757 423.085V77.2808C48.6757 73.2715 51.9384 70.0088 55.9477 70.0088H301.956C305.964 70.0088 309.227 73.2715 309.227 77.2808V423.085C309.227 427.094 305.964 430.357 301.956 430.357ZM55.9477 70.3286C52.113 70.3286 48.9942 73.4473 48.9942 77.2821V423.086C48.9942 426.921 52.113 430.04 55.9477 430.04H301.956C305.789 430.04 308.908 426.921 308.908 423.086V77.2808C308.908 73.4473 305.789 70.3273 301.956 70.3273L55.9477 70.3286Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M577.517 430.357H331.51C327.501 430.357 324.239 427.094 324.239 423.085V77.2808C324.239 73.2715 327.502 70.0088 331.51 70.0088H577.517C581.527 70.0088 584.789 73.2715 584.789 77.2808V423.085C584.79 427.094 581.527 430.357 577.517 430.357ZM331.51 70.3286C327.677 70.3286 324.558 73.4473 324.558 77.2821V423.086C324.558 426.921 327.677 430.04 331.51 430.04H577.517C581.352 430.04 584.47 426.921 584.47 423.086V77.2808C584.47 73.4473 581.352 70.3273 577.517 70.3273L331.51 70.3286Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M429.862 122.291H87.5722V404.923H429.862V122.291Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M424.369 128.283H87.5722V399.168H424.369V128.283Z"
                fill="#FAFAFA"
              ></path>
              <path
                d="M421.883 322.105V226.399H411.94V213.758L389.566 203.292V190.353H385.837V226.399H382.108V322.105H377.137V272.387H365.95V246.286H362.222V322.105H353.521V293.518H347.306V286.06H333.634V259.958H326.176V242.557H317.476V216.455H313.747V242.557H305.047V259.958H297.589V286.06H283.916V293.518H277.701V322.105H270.243V286.06H256.572V206.511H252.843V197.811H223.012V206.511H216.798V263.687H191.938V269.902H183.238V273.631H191.938V296.004H165.837V221.426H160.865V206.511H148.435V149.336H144.707V206.511H136.006V221.426H87.5722V399.168H424.369V322.105H421.883Z"
                fill="#F0F0F0"
              ></path>
              <path
                d="M116.974 225.323H113.452V228.845H116.974V225.323Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M116.974 231.228H113.452V234.75H116.974V231.228Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M116.974 254.843H113.452V258.364H116.974V254.843Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M116.974 260.748H113.452V264.269H116.974V260.748Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M116.974 266.652H113.452V270.173H116.974V266.652Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M116.974 284.364H113.452V287.886H116.974V284.364Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M116.974 290.268H113.452V293.789H116.974V290.268Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M122.566 248.939H119.045V252.461H122.566V248.939Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M122.566 254.843H119.045V258.364H122.566V254.843Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M122.566 260.748H119.045V264.269H122.566V260.748Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M122.566 266.652H119.045V270.173H122.566V266.652Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M122.566 272.556H119.045V276.077H122.566V272.556Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M122.566 284.364H119.045V287.886H122.566V284.364Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M122.566 290.268H119.045V293.789H122.566V290.268Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M128.161 225.323H124.639V228.845H128.161V225.323Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M128.161 231.228H124.639V234.75H128.161V231.228Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M128.161 237.132H124.639V240.653H128.161V237.132Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M128.161 243.036H124.639V246.557H128.161V243.036Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M128.161 248.939H124.639V252.461H128.161V248.939Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M128.161 254.843H124.639V258.364H128.161V254.843Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M128.161 260.748H124.639V264.269H128.161V260.748Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M128.161 266.652H124.639V270.173H128.161V266.652Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M128.161 272.556H124.639V276.077H128.161V272.556Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M128.161 278.459H124.639V281.981H128.161V278.459Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M128.161 290.268H124.639V293.789H128.161V290.268Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M133.753 225.323H130.232V228.845H133.753V225.323Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M133.753 231.228H130.232V234.75H133.753V231.228Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M133.753 237.132H130.232V240.653H133.753V237.132Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M133.753 243.036H130.232V246.557H133.753V243.036Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M133.753 248.939H130.232V252.461H133.753V248.939Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M133.753 254.843H130.232V258.364H133.753V254.843Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M133.753 260.748H130.232V264.269H133.753V260.748Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M133.753 313.883H130.232V317.404H133.753V313.883Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M139.348 225.323H135.826V228.845H139.348V225.323Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M139.348 231.228H135.826V234.75H139.348V231.228Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M139.348 237.132H135.826V240.653H139.348V237.132Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M139.348 243.036H135.826V246.557H139.348V243.036Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M139.348 248.939H135.826V252.461H139.348V248.939Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M139.348 254.843H135.826V258.364H139.348V254.843Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M139.348 260.748H135.826V264.269H139.348V260.748Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M139.348 266.652H135.826V270.173H139.348V266.652Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M139.348 302.075H135.826V305.597H139.348V302.075Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M139.348 307.979H135.826V311.5H139.348V307.979Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M139.348 313.883H135.826V317.404H139.348V313.883Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M139.348 319.788H135.826V323.309H139.348V319.788Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M139.348 343.404H135.826V346.925H139.348V343.404Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M144.94 225.323H141.419V228.845H144.94V225.323Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M144.94 231.228H141.419V234.75H144.94V231.228Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M144.94 237.132H141.419V240.653H144.94V237.132Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M144.94 243.036H141.419V246.557H144.94V243.036Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M144.94 248.939H141.419V252.461H144.94V248.939Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M144.94 254.843H141.419V258.364H144.94V254.843Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M144.94 260.748H141.419V264.269H144.94V260.748Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M144.94 266.652H141.419V270.173H144.94V266.652Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M144.94 272.556H141.419V276.077H144.94V272.556Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M144.94 278.459H141.419V281.981H144.94V278.459Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M144.94 296.172H141.419V299.693H144.94V296.172Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M144.94 302.075H141.419V305.597H144.94V302.075Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M144.94 307.979H141.419V311.5H144.94V307.979Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M144.94 313.883H141.419V317.404H144.94V313.883Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M144.94 319.788H141.419V323.309H144.94V319.788Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M144.94 343.404H141.419V346.925H144.94V343.404Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M150.533 225.323H147.012V228.845H150.533V225.323Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M150.533 231.228H147.012V234.75H150.533V231.228Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M150.533 237.132H147.012V240.653H150.533V237.132Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M150.533 243.036H147.012V246.557H150.533V243.036Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M150.533 248.939H147.012V252.461H150.533V248.939Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M150.533 254.843H147.012V258.364H150.533V254.843Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M150.533 260.748H147.012V264.269H150.533V260.748Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M150.533 266.652H147.012V270.173H150.533V266.652Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M150.533 272.556H147.012V276.077H150.533V272.556Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M150.533 278.459H147.012V281.981H150.533V278.459Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M150.533 284.364H147.012V287.886H150.533V284.364Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M150.533 290.268H147.012V293.789H150.533V290.268Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M150.533 296.172H147.012V299.693H150.533V296.172Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M150.533 302.075H147.012V305.597H150.533V302.075Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M150.533 307.979H147.012V311.5H150.533V307.979Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M150.533 313.883H147.012V317.404H150.533V313.883Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M150.533 319.788H147.012V323.309H150.533V319.788Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M150.533 325.692H147.012V329.213H150.533V325.692Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M156.126 225.323H152.605V228.845H156.126V225.323Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M156.126 231.228H152.605V234.75H156.126V231.228Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M156.126 237.132H152.605V240.653H156.126V237.132Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M156.126 243.036H152.605V246.557H156.126V243.036Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M156.126 248.939H152.605V252.461H156.126V248.939Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M156.126 254.843H152.605V258.364H156.126V254.843Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M156.126 260.748H152.605V264.269H156.126V260.748Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M156.126 266.652H152.605V270.173H156.126V266.652Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M156.126 272.556H152.605V276.077H156.126V272.556Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M156.126 278.459H152.605V281.981H156.126V278.459Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M156.126 296.172H152.605V299.693H156.126V296.172Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M156.126 302.075H152.605V305.597H156.126V302.075Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M156.126 307.979H152.605V311.5H156.126V307.979Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M156.126 313.883H152.605V317.404H156.126V313.883Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M161.72 225.323H158.199V228.845H161.72V225.323Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M161.72 231.228H158.199V234.75H161.72V231.228Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M161.72 237.132H158.199V240.653H161.72V237.132Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M161.72 243.036H158.199V246.557H161.72V243.036Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M161.72 248.939H158.199V252.461H161.72V248.939Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M161.72 254.843H158.199V258.364H161.72V254.843Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M161.72 260.748H158.199V264.269H161.72V260.748Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M161.72 266.652H158.199V270.173H161.72V266.652Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M161.72 272.556H158.199V276.077H161.72V272.556Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M161.72 278.459H158.199V281.981H161.72V278.459Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M161.72 296.172H158.199V299.693H161.72V296.172Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M161.72 302.075H158.199V305.597H161.72V302.075Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M161.72 307.979H158.199V311.5H161.72V307.979Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M224.695 209.995H221.174V213.516H224.695V209.995Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M224.695 215.898H221.174V219.42H224.695V215.898Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M224.695 221.802H221.174V225.323H224.695V221.802Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M224.695 227.706H221.174V231.227H224.695V227.706Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M224.695 233.609H221.174V237.131H224.695V233.609Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M224.695 239.514H221.174V243.036H224.695V239.514Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M224.695 245.418H221.174V248.939H224.695V245.418Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M224.695 251.322H221.174V254.843H224.695V251.322Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M224.695 269.034H221.174V272.556H224.695V269.034Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M224.695 274.938H221.174V278.459H224.695V274.938Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M230.288 209.995H226.767V213.516H230.288V209.995Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M230.288 215.898H226.767V219.42H230.288V215.898Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M230.288 221.802H226.767V225.323H230.288V221.802Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M230.288 227.706H226.767V231.227H230.288V227.706Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M230.288 233.609H226.767V237.131H230.288V233.609Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M230.288 239.514H226.767V243.036H230.288V239.514Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M230.288 245.418H226.767V248.939H230.288V245.418Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M230.288 251.322H226.767V254.843H230.288V251.322Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M230.288 274.938H226.767V278.459H230.288V274.938Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M235.882 209.995H232.361V213.516H235.882V209.995Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M235.882 215.898H232.361V219.42H235.882V215.898Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M235.882 221.802H232.361V225.323H235.882V221.802Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M235.882 227.706H232.361V231.227H235.882V227.706Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M235.882 233.609H232.361V237.131H235.882V233.609Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M235.882 239.514H232.361V243.036H235.882V239.514Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M235.882 245.418H232.361V248.939H235.882V245.418Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M235.882 251.322H232.361V254.843H235.882V251.322Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M241.475 209.995H237.954V213.516H241.475V209.995Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M241.475 215.898H237.954V219.42H241.475V215.898Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M241.475 221.802H237.954V225.323H241.475V221.802Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M241.475 227.706H237.954V231.227H241.475V227.706Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M241.475 233.609H237.954V237.131H241.475V233.609Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M241.475 239.514H237.954V243.036H241.475V239.514Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M241.475 251.322H237.954V254.843H241.475V251.322Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M241.475 257.226H237.954V260.747H241.475V257.226Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M241.475 274.938H237.954V278.459H241.475V274.938Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M241.475 280.842H237.954V284.363H241.475V280.842Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M241.475 286.747H237.954V290.268H241.475V286.747Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M241.475 292.65H237.954V296.172H241.475V292.65Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M241.475 298.554H237.954V302.075H241.475V298.554Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M241.475 304.458H237.954V307.979H241.475V304.458Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M241.475 310.362H237.954V313.883H241.475V310.362Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M247.068 209.995H243.547V213.516H247.068V209.995Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M247.068 215.898H243.547V219.42H247.068V215.898Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M247.068 221.802H243.547V225.323H247.068V221.802Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M247.068 227.706H243.547V231.227H247.068V227.706Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M247.068 233.609H243.547V237.131H247.068V233.609Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M247.068 239.514H243.547V243.036H247.068V239.514Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M247.068 257.226H243.547V260.747H247.068V257.226Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M247.068 263.13H243.547V266.652H247.068V263.13Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M247.068 269.034H243.547V272.556H247.068V269.034Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M247.068 274.938H243.547V278.459H247.068V274.938Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M247.068 280.842H243.547V284.363H247.068V280.842Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M247.068 286.747H243.547V290.268H247.068V286.747Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M247.068 292.65H243.547V296.172H247.068V292.65Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M247.068 298.554H243.547V302.075H247.068V298.554Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M247.068 304.458H243.547V307.979H247.068V304.458Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M247.068 310.362H243.547V313.883H247.068V310.362Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M247.068 316.266H243.547V319.788H247.068V316.266Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M247.068 328.074H243.547V331.595H247.068V328.074Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M252.662 209.995H249.141V213.516H252.662V209.995Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M252.662 215.898H249.141V219.42H252.662V215.898Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M252.662 221.802H249.141V225.323H252.662V221.802Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M252.662 227.706H249.141V231.227H252.662V227.706Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M252.662 233.609H249.141V237.131H252.662V233.609Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M252.662 239.514H249.141V243.036H252.662V239.514Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M252.662 257.226H249.141V260.747H252.662V257.226Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M252.662 263.13H249.141V266.652H252.662V263.13Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M252.662 269.034H249.141V272.556H252.662V269.034Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M252.662 274.938H249.141V278.459H252.662V274.938Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M252.662 292.65H249.141V296.172H252.662V292.65Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M252.662 298.554H249.141V302.075H252.662V298.554Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M252.662 304.458H249.141V307.979H252.662V304.458Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M252.662 310.362H249.141V313.883H252.662V310.362Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M252.662 316.266H249.141V319.788H252.662V316.266Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M252.662 328.074H249.141V331.595H252.662V328.074Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M252.662 333.978H249.141V337.499H252.662V333.978Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M303.416 264.891H299.895V268.413H303.416V264.891Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M303.416 270.795H299.895V274.316H303.416V270.795Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M303.416 276.699H299.895V280.22H303.416V276.699Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M303.416 282.602H299.895V286.124H303.416V282.602Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M303.416 288.507H299.895V292.029H303.416V288.507Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M303.416 294.411H299.895V297.932H303.416V294.411Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M303.416 300.315H299.895V303.836H303.416V300.315Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M303.416 318.027H299.895V321.548H303.416V318.027Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M303.416 323.931H299.895V327.452H303.416V323.931Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M303.416 329.835H299.895V333.356H303.416V329.835Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M309.009 264.891H305.487V268.413H309.009V264.891Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M309.009 270.795H305.487V274.316H309.009V270.795Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M309.009 276.699H305.487V280.22H309.009V276.699Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M309.009 282.602H305.487V286.124H309.009V282.602Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M309.009 288.507H305.487V292.029H309.009V288.507Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M309.009 294.411H305.487V297.932H309.009V294.411Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M309.009 300.315H305.487V303.836H309.009V300.315Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M314.602 264.891H311.08V268.413H314.602V264.891Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M314.602 270.795H311.08V274.316H314.602V270.795Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M314.602 276.699H311.08V280.22H314.602V276.699Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M314.602 282.602H311.08V286.124H314.602V282.602Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M314.602 288.507H311.08V292.029H314.602V288.507Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M314.602 294.411H311.08V297.932H314.602V294.411Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M314.602 300.315H311.08V303.836H314.602V300.315Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M320.196 264.891H316.674V268.413H320.196V264.891Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M320.196 270.795H316.674V274.316H320.196V270.795Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M320.196 276.699H316.674V280.22H320.196V276.699Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M320.196 282.602H316.674V286.124H320.196V282.602Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M320.196 288.507H316.674V292.029H320.196V288.507Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M320.196 294.411H316.674V297.932H320.196V294.411Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M320.196 300.315H316.674V303.836H320.196V300.315Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M320.196 306.219H316.674V309.74H320.196V306.219Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M320.196 312.123H316.674V315.645H320.196V312.123Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M320.196 318.027H316.674V321.548H320.196V318.027Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M320.196 323.931H316.674V327.452H320.196V323.931Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M325.789 264.891H322.267V268.413H325.789V264.891Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M325.789 270.795H322.267V274.316H325.789V270.795Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M325.789 276.699H322.267V280.22H325.789V276.699Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M325.789 282.602H322.267V286.124H325.789V282.602Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M325.789 288.507H322.267V292.029H325.789V288.507Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M325.789 294.411H322.267V297.932H325.789V294.411Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M325.789 300.315H322.267V303.836H325.789V300.315Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M325.789 306.219H322.267V309.74H325.789V306.219Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M325.789 312.123H322.267V315.645H325.789V312.123Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M325.789 318.027H322.267V321.548H325.789V318.027Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M325.789 323.931H322.267V327.452H325.789V323.931Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M325.789 329.835H322.267V333.356H325.789V329.835Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M325.789 347.547H322.267V351.068H325.789V347.547Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M325.789 353.451H322.267V356.972H325.789V353.451Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M331.381 264.891H327.86V268.413H331.381V264.891Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M331.381 270.795H327.86V274.316H331.381V270.795Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M331.381 276.699H327.86V280.22H331.381V276.699Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M331.381 294.411H327.86V297.932H331.381V294.411Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M331.381 300.315H327.86V303.836H331.381V300.315Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M331.381 306.219H327.86V309.74H331.381V306.219Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M331.381 312.123H327.86V315.645H331.381V312.123Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M331.381 318.027H327.86V321.548H331.381V318.027Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M331.381 323.931H327.86V327.452H331.381V323.931Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M331.381 329.835H327.86V333.356H331.381V329.835Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M331.381 347.547H327.86V351.068H331.381V347.547Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M331.381 353.451H327.86V356.972H331.381V353.451Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M331.381 359.354H327.86V362.876H331.381V359.354Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 229.466H386.486V232.988H390.007V229.466Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 235.371H386.486V238.893H390.007V235.371Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 241.275H386.486V244.796H390.007V241.275Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 247.179H386.486V250.7H390.007V247.179Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 253.083H386.486V256.604H390.007V253.083Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 258.987H386.486V262.509H390.007V258.987Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 264.891H386.486V268.413H390.007V264.891Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 270.795H386.486V274.316H390.007V270.795Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 276.699H386.486V280.22H390.007V276.699Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 282.602H386.486V286.124H390.007V282.602Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 288.507H386.486V292.029H390.007V288.507Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 294.411H386.486V297.932H390.007V294.411Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 300.315H386.486V303.836H390.007V300.315Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 306.219H386.486V309.74H390.007V306.219Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 312.123H386.486V315.645H390.007V312.123Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 318.027H386.486V321.548H390.007V318.027Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 323.931H386.486V327.452H390.007V323.931Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 329.835H386.486V333.356H390.007V329.835Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 335.738H386.486V339.26H390.007V335.738Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 341.642H386.486V345.163H390.007V341.642Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 347.547H386.486V351.068H390.007V347.547Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 353.451H386.486V356.972H390.007V353.451Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M390.007 359.354H386.486V362.876H390.007V359.354Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M395.601 229.466H392.079V232.988H395.601V229.466Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M395.601 235.371H392.079V238.893H395.601V235.371Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M395.601 241.275H392.079V244.796H395.601V241.275Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M395.601 247.179H392.079V250.7H395.601V247.179Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M395.601 253.083H392.079V256.604H395.601V253.083Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M395.601 258.987H392.079V262.509H395.601V258.987Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M395.601 264.891H392.079V268.413H395.601V264.891Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M395.601 270.795H392.079V274.316H395.601V270.795Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M395.601 276.699H392.079V280.22H395.601V276.699Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M395.601 282.602H392.079V286.124H395.601V282.602Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M395.601 288.507H392.079V292.029H395.601V288.507Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M395.601 294.411H392.079V297.932H395.601V294.411Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M395.601 300.315H392.079V303.836H395.601V300.315Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M395.601 306.219H392.079V309.74H395.601V306.219Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M395.601 312.123H392.079V315.645H395.601V312.123Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M395.601 318.027H392.079V321.548H395.601V318.027Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M395.601 323.931H392.079V327.452H395.601V323.931Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M395.601 329.835H392.079V333.356H395.601V329.835Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M395.601 335.738H392.079V339.26H395.601V335.738Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M401.194 229.466H397.673V232.988H401.194V229.466Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M401.194 235.371H397.673V238.893H401.194V235.371Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M401.194 241.275H397.673V244.796H401.194V241.275Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M401.194 247.179H397.673V250.7H401.194V247.179Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M401.194 253.083H397.673V256.604H401.194V253.083Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M401.194 258.987H397.673V262.509H401.194V258.987Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M401.194 264.891H397.673V268.413H401.194V264.891Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M401.194 270.795H397.673V274.316H401.194V270.795Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M401.194 276.699H397.673V280.22H401.194V276.699Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M401.194 282.602H397.673V286.124H401.194V282.602Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M401.194 288.507H397.673V292.029H401.194V288.507Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M401.194 294.411H397.673V297.932H401.194V294.411Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M401.194 300.315H397.673V303.836H401.194V300.315Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M401.194 306.219H397.673V309.74H401.194V306.219Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M401.194 312.123H397.673V315.645H401.194V312.123Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M401.194 318.027H397.673V321.548H401.194V318.027Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M401.194 323.931H397.673V327.452H401.194V323.931Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M401.194 329.835H397.673V333.356H401.194V329.835Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M401.194 335.738H397.673V339.26H401.194V335.738Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M406.787 229.466H403.266V232.988H406.787V229.466Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M406.787 235.371H403.266V238.893H406.787V235.371Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M406.787 241.275H403.266V244.796H406.787V241.275Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M406.787 247.179H403.266V250.7H406.787V247.179Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M406.787 253.083H403.266V256.604H406.787V253.083Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M406.787 258.987H403.266V262.509H406.787V258.987Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M406.787 264.891H403.266V268.413H406.787V264.891Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M406.787 270.795H403.266V274.316H406.787V270.795Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M406.787 276.699H403.266V280.22H406.787V276.699Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M406.787 282.602H403.266V286.124H406.787V282.602Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M406.787 288.507H403.266V292.029H406.787V288.507Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M406.787 294.411H403.266V297.932H406.787V294.411Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M406.787 300.315H403.266V303.836H406.787V300.315Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M406.787 306.219H403.266V309.74H406.787V306.219Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M406.787 312.123H403.266V315.645H406.787V312.123Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M412.38 229.466H408.858V232.988H412.38V229.466Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M412.38 235.371H408.858V238.893H412.38V235.371Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M412.38 241.275H408.858V244.796H412.38V241.275Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M412.38 247.179H408.858V250.7H412.38V247.179Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M412.38 253.083H408.858V256.604H412.38V253.083Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M412.38 258.987H408.858V262.509H412.38V258.987Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M412.38 264.891H408.858V268.413H412.38V264.891Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M412.38 270.795H408.858V274.316H412.38V270.795Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M412.38 276.699H408.858V280.22H412.38V276.699Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M412.38 282.602H408.858V286.124H412.38V282.602Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M412.38 288.507H408.858V292.029H412.38V288.507Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M412.38 294.411H408.858V297.932H412.38V294.411Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M412.38 300.315H408.858V303.836H412.38V300.315Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M417.974 229.466H414.453V232.988H417.974V229.466Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M417.974 235.371H414.453V238.893H417.974V235.371Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M417.974 241.275H414.453V244.796H417.974V241.275Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M417.974 247.179H414.453V250.7H417.974V247.179Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M417.974 253.083H414.453V256.604H417.974V253.083Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M417.974 258.987H414.453V262.509H417.974V258.987Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M417.974 264.891H414.453V268.413H417.974V264.891Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M417.974 270.795H414.453V274.316H417.974V270.795Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M417.974 276.699H414.453V280.22H417.974V276.699Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M417.974 282.602H414.453V286.124H417.974V282.602Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M417.974 288.507H414.453V292.029H417.974V288.507Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M417.974 294.411H414.453V297.932H417.974V294.411Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 227.706H87.9723V231.227H91.4936V227.706Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 233.609H87.9723V237.131H91.4936V233.609Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 239.514H87.9723V243.036H91.4936V239.514Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 245.418H87.9723V248.939H91.4936V245.418Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 251.322H87.9723V254.843H91.4936V251.322Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 257.226H87.9723V260.747H91.4936V257.226Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 263.13H87.9723V266.652H91.4936V263.13Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 269.034H87.9723V272.556H91.4936V269.034Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 274.938H87.9723V278.459H91.4936V274.938Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 280.842H87.9723V284.363H91.4936V280.842Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 286.747H87.9723V290.268H91.4936V286.747Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 292.65H87.9723V296.172H91.4936V292.65Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 298.554H87.9723V302.075H91.4936V298.554Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 304.458H87.9723V307.979H91.4936V304.458Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 310.362H87.9723V313.883H91.4936V310.362Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 316.266H87.9723V319.788H91.4936V316.266Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 322.17H87.9723V325.692H91.4936V322.17Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 333.978H87.9723V337.499H91.4936V333.978Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 339.881H87.9723V343.403H91.4936V339.881Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 345.786H87.9723V349.308H91.4936V345.786Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 351.69H87.9723V355.211H91.4936V351.69Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M91.4936 357.594H87.9723V361.115H91.4936V357.594Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M97.0865 227.706H93.5651V231.227H97.0865V227.706Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M97.0865 233.609H93.5651V237.131H97.0865V233.609Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M97.0865 239.514H93.5651V243.036H97.0865V239.514Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M97.0865 245.418H93.5651V248.939H97.0865V245.418Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M97.0865 251.322H93.5651V254.843H97.0865V251.322Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M97.0865 257.226H93.5651V260.747H97.0865V257.226Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M97.0865 263.13H93.5651V266.652H97.0865V263.13Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M97.0865 269.034H93.5651V272.556H97.0865V269.034Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M97.0865 274.938H93.5651V278.459H97.0865V274.938Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M97.0865 280.842H93.5651V284.363H97.0865V280.842Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M97.0865 286.747H93.5651V290.268H97.0865V286.747Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M97.0865 292.65H93.5651V296.172H97.0865V292.65Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M97.0865 298.554H93.5651V302.075H97.0865V298.554Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M97.0865 304.458H93.5651V307.979H97.0865V304.458Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M97.0865 310.362H93.5651V313.883H97.0865V310.362Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M97.0865 316.266H93.5651V319.788H97.0865V316.266Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M97.0865 351.69H93.5651V355.211H97.0865V351.69Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M97.0865 357.594H93.5651V361.115H97.0865V357.594Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 227.706H99.1592V231.227H102.681V227.706Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 233.609H99.1592V237.131H102.681V233.609Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 239.514H99.1592V243.036H102.681V239.514Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 245.418H99.1592V248.939H102.681V245.418Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 251.322H99.1592V254.843H102.681V251.322Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 257.226H99.1592V260.747H102.681V257.226Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 263.13H99.1592V266.652H102.681V263.13Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 269.034H99.1592V272.556H102.681V269.034Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 274.938H99.1592V278.459H102.681V274.938Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 280.842H99.1592V284.363H102.681V280.842Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 286.747H99.1592V290.268H102.681V286.747Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 292.65H99.1592V296.172H102.681V292.65Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 298.554H99.1592V302.075H102.681V298.554Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 304.458H99.1592V307.979H102.681V304.458Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 310.362H99.1592V313.883H102.681V310.362Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 316.266H99.1592V319.788H102.681V316.266Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 328.074H99.1592V331.595H102.681V328.074Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 333.978H99.1592V337.499H102.681V333.978Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 339.881H99.1592V343.403H102.681V339.881Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 345.786H99.1592V349.308H102.681V345.786Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M102.681 357.594H99.1592V361.115H102.681V357.594Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 269.034H196.73V272.556H200.251V269.034Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 274.938H196.73V278.459H200.251V274.938Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 280.842H196.73V284.363H200.251V280.842Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 286.747H196.73V290.268H200.251V286.747Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 292.65H196.73V296.172H200.251V292.65Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 298.554H196.73V302.075H200.251V298.554Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 304.458H196.73V307.979H200.251V304.458Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 310.362H196.73V313.883H200.251V310.362Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 316.266H196.73V319.788H200.251V316.266Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 322.17H196.73V325.692H200.251V322.17Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 328.074H196.73V331.595H200.251V328.074Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 333.978H196.73V337.499H200.251V333.978Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 339.881H196.73V343.403H200.251V339.881Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 351.69H196.73V355.211H200.251V351.69Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 357.594H196.73V361.115H200.251V357.594Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 363.498H196.73V367.019H200.251V363.498Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 369.401H196.73V372.923H200.251V369.401Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 381.21H196.73V384.731H200.251V381.21Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 387.114H196.73V390.635H200.251V387.114Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M200.251 393.017H196.73V396.539H200.251V393.017Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M205.844 269.034H202.323V272.556H205.844V269.034Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M205.844 274.938H202.323V278.459H205.844V274.938Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M205.844 280.842H202.323V284.363H205.844V280.842Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M205.844 286.747H202.323V290.268H205.844V286.747Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M205.844 292.65H202.323V296.172H205.844V292.65Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M205.844 298.554H202.323V302.075H205.844V298.554Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M205.844 304.458H202.323V307.979H205.844V304.458Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M205.844 310.362H202.323V313.883H205.844V310.362Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M205.844 316.266H202.323V319.788H205.844V316.266Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M205.844 322.17H202.323V325.692H205.844V322.17Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M205.844 328.074H202.323V331.595H205.844V328.074Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M205.844 333.978H202.323V337.499H205.844V333.978Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M205.844 339.881H202.323V343.403H205.844V339.881Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M205.844 357.594H202.323V361.115H205.844V357.594Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M205.844 363.498H202.323V367.019H205.844V363.498Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M205.844 375.306H202.323V378.827H205.844V375.306Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M205.844 381.21H202.323V384.731H205.844V381.21Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M205.844 387.114H202.323V390.635H205.844V387.114Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M205.844 393.017H202.323V396.539H205.844V393.017Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 269.034H207.917V272.556H211.438V269.034Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 274.938H207.917V278.459H211.438V274.938Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 280.842H207.917V284.363H211.438V280.842Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 286.747H207.917V290.268H211.438V286.747Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 292.65H207.917V296.172H211.438V292.65Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 298.554H207.917V302.075H211.438V298.554Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 304.458H207.917V307.979H211.438V304.458Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 310.362H207.917V313.883H211.438V310.362Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 316.266H207.917V319.788H211.438V316.266Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 322.17H207.917V325.692H211.438V322.17Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 328.074H207.917V331.595H211.438V328.074Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 333.978H207.917V337.499H211.438V333.978Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 339.881H207.917V343.403H211.438V339.881Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 345.786H207.917V349.308H211.438V345.786Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 357.594H207.917V361.115H211.438V357.594Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 369.401H207.917V372.923H211.438V369.401Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 375.306H207.917V378.827H211.438V375.306Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 381.21H207.917V384.731H211.438V381.21Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 387.114H207.917V390.635H211.438V387.114Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M211.438 393.017H207.917V396.539H211.438V393.017Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M177.464 302.697H173.943V306.218H177.464V302.697Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M177.464 308.601H173.943V312.122H177.464V308.601Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M177.464 314.505H173.943V318.026H177.464V314.505Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M177.464 320.41H173.943V323.931H177.464V320.41Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M177.464 326.313H173.943V329.835H177.464V326.313Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M177.464 332.217H173.943V335.738H177.464V332.217Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M177.464 349.929H173.943V353.451H177.464V349.929Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M177.464 355.833H173.943V359.354H177.464V355.833Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M177.464 361.737H173.943V365.258H177.464V361.737Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M177.464 367.641H173.943V371.162H177.464V367.641Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M177.464 373.546H173.943V377.067H177.464V373.546Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M177.464 379.449H173.943V382.971H177.464V379.449Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M177.464 385.353H173.943V388.874H177.464V385.353Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M183.057 302.697H179.536V306.218H183.057V302.697Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M183.057 308.601H179.536V312.122H183.057V308.601Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M183.057 314.505H179.536V318.026H183.057V314.505Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M183.057 320.41H179.536V323.931H183.057V320.41Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M183.057 326.313H179.536V329.835H183.057V326.313Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M183.057 332.217H179.536V335.738H183.057V332.217Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M183.057 349.929H179.536V353.451H183.057V349.929Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M183.057 355.833H179.536V359.354H183.057V355.833Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M183.057 361.737H179.536V365.258H183.057V361.737Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M183.057 367.641H179.536V371.162H183.057V367.641Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M183.057 373.546H179.536V377.067H183.057V373.546Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M183.057 379.449H179.536V382.971H183.057V379.449Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M183.057 391.257H179.536V394.778H183.057V391.257Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M368.878 276.699H365.356V280.22H368.878V276.699Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M368.878 282.602H365.356V286.124H368.878V282.602Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M368.878 288.507H365.356V292.029H368.878V288.507Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M368.878 294.411H365.356V297.932H368.878V294.411Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M368.878 300.315H365.356V303.836H368.878V300.315Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M368.878 306.219H365.356V309.74H368.878V306.219Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M368.878 312.123H365.356V315.645H368.878V312.123Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M368.878 318.027H365.356V321.548H368.878V318.027Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M368.878 323.931H365.356V327.452H368.878V323.931Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M368.878 329.835H365.356V333.356H368.878V329.835Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M368.878 335.738H365.356V339.26H368.878V335.738Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M368.878 347.547H365.356V351.068H368.878V347.547Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M368.878 353.451H365.356V356.972H368.878V353.451Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M368.878 359.354H365.356V362.876H368.878V359.354Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M368.878 365.258H365.356V368.78H368.878V365.258Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M368.878 371.163H365.356V374.685H368.878V371.163Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M368.878 377.067H365.356V380.588H368.878V377.067Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M368.878 382.971H365.356V386.492H368.878V382.971Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M368.878 388.874H365.356V392.396H368.878V388.874Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 276.699H370.949V280.22H374.471V276.699Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 282.602H370.949V286.124H374.471V282.602Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 288.507H370.949V292.029H374.471V288.507Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 294.411H370.949V297.932H374.471V294.411Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 300.315H370.949V303.836H374.471V300.315Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 306.219H370.949V309.74H374.471V306.219Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 312.123H370.949V315.645H374.471V312.123Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 318.027H370.949V321.548H374.471V318.027Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 323.931H370.949V327.452H374.471V323.931Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 329.835H370.949V333.356H374.471V329.835Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 335.738H370.949V339.26H374.471V335.738Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 341.642H370.949V345.163H374.471V341.642Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 347.547H370.949V351.068H374.471V347.547Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 353.451H370.949V356.972H374.471V353.451Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 359.354H370.949V362.876H374.471V359.354Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 365.258H370.949V368.78H374.471V365.258Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 371.163H370.949V374.685H374.471V371.163Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 377.067H370.949V380.588H374.471V377.067Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 382.971H370.949V386.492H374.471V382.971Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M374.471 388.874H370.949V392.396H374.471V388.874Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M341.325 299.693H337.804V303.214H341.325V299.693Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M341.325 305.597H337.804V309.118H341.325V305.597Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M341.325 311.502H337.804V315.023H341.325V311.502Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M341.325 317.406H337.804V320.927H341.325V317.406Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M341.325 323.309H337.804V326.831H341.325V323.309Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M341.325 329.213H337.804V332.734H341.325V329.213Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M341.325 335.117H337.804V338.638H341.325V335.117Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M341.325 341.022H337.804V344.543H341.325V341.022Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M341.325 346.925H337.804V350.447H341.325V346.925Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M341.325 352.829H337.804V356.35H341.325V352.829Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M346.919 299.693H343.398V303.214H346.919V299.693Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M346.919 305.597H343.398V309.118H346.919V305.597Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M346.919 311.502H343.398V315.023H346.919V311.502Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M346.919 317.406H343.398V320.927H346.919V317.406Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M346.919 323.309H343.398V326.831H346.919V323.309Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M346.919 329.213H343.398V332.734H346.919V329.213Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M346.919 335.117H343.398V338.638H346.919V335.117Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M346.919 341.022H343.398V344.543H346.919V341.022Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M346.919 346.925H343.398V350.447H346.919V346.925Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M316.027 122.946H310.116V404.923H316.027V122.946Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M204.838 122.946H198.926V404.923H204.838V122.946Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M93.6479 122.946H87.7365V404.923H93.6479V122.946Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M536.362 163.063C536.362 163.063 537.46 155.819 532.177 151.175C526.893 146.53 527.358 143.768 528.867 143.408C530.376 143.047 531.77 147.692 534.091 148.969C534.091 148.969 534.164 142.35 531.806 139.912C529.446 137.473 528.209 131.193 530.454 131.082C532.699 130.971 532.931 134.812 533.396 137.537C533.861 140.261 536.362 144.093 536.362 144.093C536.362 144.093 536.85 138.172 538.375 135.733C539.899 133.295 535.835 127.721 537.402 125.283C538.969 122.844 541.757 127.489 541.525 132.714C541.293 137.938 537.809 143.512 538.622 148.97C538.622 148.97 540.158 145.138 541.538 144.79C542.918 144.442 544.311 141.907 545.24 140.968C546.169 140.029 547.331 143.28 545.24 146.3C543.149 149.319 537.809 157.395 538.622 163.923L536.362 163.063Z"
                fill="#E6E6E6"
              ></path>
              <path
                d="M533.203 159.767L531.473 170.624C530.939 173.977 533.529 177.013 536.925 177.013H538.771C542.166 177.013 544.756 173.977 544.222 170.624L542.492 159.767H533.203Z"
                fill="#E6E6E6"
              ></path>
              <path
                d="M559.37 173.007H449.818V179.29H559.37V173.007Z"
                fill="#E0E0E0"
              ></path>
              <path
                d="M460.834 149.845H455.446V173.007H460.834V149.845Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M486.886 149.845H481.498V173.007H486.886V149.845Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M516.484 149.247L511.174 150.162L515.109 172.988L520.419 172.072L516.484 149.247Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M467.51 152.898H462.122V173.007H467.51V152.898Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M479.894 152.898H474.506V173.007H479.894V152.898Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M511.15 152.898H505.763V173.007H511.15V152.898Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M493.965 152.213L488.706 153.381L493.067 173.011L498.327 171.843L493.965 152.213Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M472.169 148.696H469.475V173.008H472.169V148.696Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M504.215 148.696H501.52V173.008H504.215V148.696Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M449.818 226.197H559.37V219.913H449.818V226.197Z"
                fill="#E0E0E0"
              ></path>
              <path
                d="M548.354 219.914H553.741V196.752H548.354V219.914Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M522.302 219.914H527.69V196.752H522.302V219.914Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M488.788 218.969L494.097 219.884L498.032 197.059L492.723 196.144L488.788 218.969Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M541.678 219.913H547.066V199.804H541.678V219.913Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M529.294 219.913H534.682V199.804H529.294V219.913Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M498.037 219.913H503.424V199.804H498.037V219.913Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M510.865 218.737L516.125 219.905L520.486 200.275L515.227 199.107L510.865 218.737Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M537.02 219.914H539.713V195.602H537.02V219.914Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M504.973 219.914H507.668V195.602H504.973V219.914Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M461.552 219.706H487.804V201.582H461.552V219.706Z"
                fill="#EBEBEB"
              ></path>
              <path
                d="M318.5 544.713C454.922 544.713 565.515 538.254 565.515 530.287C565.515 522.32 454.922 515.862 318.5 515.862C182.078 515.862 71.4854 522.32 71.4854 530.287C71.4854 538.254 182.078 544.713 318.5 544.713Z"
                fill="#F5F5F5"
              ></path>
              <path
                d="M509.511 435.565C509.778 437.438 504.7 438.671 500.557 439.362C500.895 442.762 503.157 446.199 506.282 449.409C510.213 447.194 515.825 444.267 516.859 444.981C517.988 445.762 512.242 449.477 508.648 451.662C511.176 453.906 514.022 455.996 516.788 457.828C518.55 456.182 520.612 454.738 521.842 455.519C523.117 456.33 522.772 458.877 522.143 461.15C526.419 463.643 529.621 465.159 529.621 465.159C529.621 465.159 531.416 459.718 532.477 453.018C532.262 452.592 532.048 452.162 531.85 451.707C531.161 450.113 531.833 449.435 532.97 449.211C533.265 446.278 533.349 443.263 533.04 440.464C528.2 439.448 522.316 437.571 524.52 434.667C525.85 432.917 528.283 432.718 530.816 433.157C530.462 432.574 530.071 432.024 529.621 431.529C520.812 421.824 514.668 431.529 514.668 431.529C509.549 427.264 502.359 428.418 500.804 435.084C503.678 434.349 509.181 433.253 509.511 435.565Z"
                fill="#FF8201"
              ></path>
              <path
                opacity="0.3"
                d="M509.511 435.565C509.778 437.438 504.7 438.671 500.557 439.362C500.895 442.762 503.157 446.199 506.282 449.409C510.213 447.194 515.825 444.267 516.859 444.981C517.988 445.762 512.242 449.477 508.648 451.662C511.176 453.906 514.022 455.996 516.788 457.828C518.55 456.182 520.612 454.738 521.842 455.519C523.117 456.33 522.772 458.877 522.143 461.15C526.419 463.643 529.621 465.159 529.621 465.159C529.621 465.159 531.416 459.718 532.477 453.018C532.262 452.592 532.048 452.162 531.85 451.707C531.161 450.113 531.833 449.435 532.97 449.211C533.265 446.278 533.349 443.263 533.04 440.464C528.2 439.448 522.316 437.571 524.52 434.667C525.85 432.917 528.283 432.718 530.816 433.157C530.462 432.574 530.071 432.024 529.621 431.529C520.812 421.824 514.668 431.529 514.668 431.529C509.549 427.264 502.359 428.418 500.804 435.084C503.678 434.349 509.181 433.253 509.511 435.565Z"
                fill="white"
              ></path>
              <path
                d="M520.502 506.893L519.231 506.788C519.286 506.132 524.447 441.145 509.862 435.019C508.297 434.36 506.849 434.397 505.442 435.13C500.172 437.87 497.646 449.248 497.622 449.364L496.376 449.093C496.483 448.601 499.054 437.016 504.852 434C506.593 433.094 508.444 433.041 510.355 433.844C525.785 440.325 520.725 504.178 520.502 506.893Z"
                fill="#FF8201"
              ></path>
              <path
                d="M522.34 505.484C522.081 502.56 516.129 433.798 527.26 426.499C529.929 424.75 532.308 424.376 534.33 425.4C539.59 428.052 540.28 439.299 540.307 439.776L539.036 439.848C539.029 439.739 538.362 428.859 533.755 426.536C532.17 425.74 530.22 426.083 527.958 427.566C517.458 434.452 523.546 504.664 523.609 505.373L522.34 505.484Z"
                fill="#FF8201"
              ></path>
              <path
                d="M524.013 511.043C523.929 508.805 522.097 456.171 532.233 451.563C534.237 450.652 536.265 450.637 538.261 451.514C545.217 454.575 549.513 467.538 549.693 468.088L548.481 468.484C548.439 468.354 544.183 455.511 537.748 452.681C536.075 451.948 534.442 451.959 532.76 452.723C524.987 456.256 524.729 495.986 525.285 510.996L524.013 511.043Z"
                fill="#FF8201"
              ></path>
              <path
                d="M521.433 508.636L520.168 508.492C521.954 492.826 525.368 451.084 519.789 446.104C518.957 445.36 518.212 445.13 517.506 445.398C513.767 446.832 511.491 460.409 510.929 465.521L509.662 465.382C509.878 463.422 511.915 446.179 517.049 444.209C518.224 443.76 519.43 444.076 520.637 445.153C527.849 451.588 521.699 506.309 521.433 508.636Z"
                fill="#FF8201"
              ></path>
              <path
                d="M500.174 478.939H545.945L542.123 530.208H503.996L500.174 478.939Z"
                fill="#263238"
              ></path>
              <path
                d="M506.409 460.124C505.932 461.371 502.376 460.39 499.585 459.395C498.628 461.608 498.845 464.503 499.672 467.554C502.855 467.536 507.32 467.655 507.712 468.45C508.14 469.319 503.323 469.64 500.358 469.756C501.148 472.006 502.187 474.271 503.264 476.349C504.916 475.937 506.684 475.754 507.173 476.657C507.681 477.595 506.595 479.047 505.428 480.233C507.21 483.237 508.665 485.269 508.665 485.269C508.665 485.269 511.637 482.529 514.589 478.762C514.602 478.425 514.617 478.086 514.651 477.739C514.772 476.519 515.42 476.331 516.198 476.583C517.385 474.876 518.471 473.045 519.24 471.213C516.604 468.928 513.618 465.751 515.973 464.717C517.393 464.093 518.961 464.805 520.373 465.944C520.355 465.462 520.302 464.988 520.195 464.53C518.09 455.524 510.972 459.403 510.972 459.403C509.278 455.017 504.448 453.264 501.203 456.842C503.229 457.374 506.997 458.584 506.409 460.124Z"
                fill="#FF8201"
              ></path>
              <path
                opacity="0.3"
                d="M506.409 460.124C505.932 461.371 502.376 460.39 499.585 459.395C498.628 461.608 498.845 464.503 499.672 467.554C502.855 467.536 507.32 467.655 507.712 468.45C508.14 469.319 503.323 469.64 500.358 469.756C501.148 472.006 502.187 474.271 503.264 476.349C504.916 475.937 506.684 475.754 507.173 476.657C507.681 477.595 506.595 479.047 505.428 480.233C507.21 483.237 508.665 485.269 508.665 485.269C508.665 485.269 511.637 482.529 514.589 478.762C514.602 478.425 514.617 478.086 514.651 477.739C514.772 476.519 515.42 476.331 516.198 476.583C517.385 474.876 518.471 473.045 519.24 471.213C516.604 468.928 513.618 465.751 515.973 464.717C517.393 464.093 518.961 464.805 520.373 465.944C520.355 465.462 520.302 464.988 520.195 464.53C518.09 455.524 510.972 459.403 510.972 459.403C509.278 455.017 504.448 453.264 501.203 456.842C503.229 457.374 506.997 458.584 506.409 460.124Z"
                fill="white"
              ></path>
              <path
                d="M540.393 466.211C538.949 466.318 537.564 466.65 536.21 467.092C535.857 466.125 535.627 465.117 535.593 464.063C535.303 454.832 541.911 458.724 545.403 456.012C547.145 454.659 549.277 453.79 551.246 454.18C550.95 454.688 550.681 455.214 550.456 455.76C550.09 456.644 550.667 457.565 551.573 457.734C552.426 457.893 553.382 457.82 554.166 457.427C554.41 457.305 554.616 457.126 554.832 456.966C555.32 457.789 555.752 458.799 556.1 460.053C556.455 461.336 556.639 462.666 556.697 464.001C556.177 464.117 555.661 464.256 555.153 464.437C554.358 464.718 553.935 465.987 554.575 466.631C555.137 467.195 555.78 467.643 556.479 467.967C556.251 469.487 555.827 470.929 555.317 472.293C555.161 472.318 555.003 472.335 554.847 472.366C554.511 472.431 554.18 472.519 553.851 472.612C553.663 472.665 553.475 472.729 553.298 472.815C552.841 473.031 552.507 473.422 552.436 473.934C552.364 474.438 552.575 474.959 552.98 475.267C553.195 475.431 553.432 475.56 553.666 475.69C552.614 477.355 551.369 478.675 550.01 479.379C550.01 479.379 548.326 478.644 546.122 477.324C546.397 476.955 546.673 476.586 546.929 476.203C547.233 475.754 547.366 475.291 547.321 474.754C547.277 474.233 546.961 473.778 546.573 473.452C546.198 473.137 545.599 472.998 545.123 473.059C544.657 473.119 544.09 473.406 543.821 473.807C543.515 474.262 543.178 474.694 542.844 475.129C541.157 473.858 539.479 472.323 538.155 470.577C538.206 470.562 538.261 470.547 538.296 470.537C539.148 470.314 540.019 470.17 540.897 470.105C541.994 470.023 542.677 468.919 542.591 467.907C542.498 466.808 541.416 466.135 540.393 466.211Z"
                fill="#FF8201"
              ></path>
              <path
                opacity="0.5"
                d="M540.393 466.211C538.949 466.318 537.564 466.65 536.21 467.092C535.857 466.125 535.627 465.117 535.593 464.063C535.303 454.832 541.911 458.724 545.403 456.012C547.145 454.659 549.277 453.79 551.246 454.18C550.95 454.688 550.681 455.214 550.456 455.76C550.09 456.644 550.667 457.565 551.573 457.734C552.426 457.893 553.382 457.82 554.166 457.427C554.41 457.305 554.616 457.126 554.832 456.966C555.32 457.789 555.752 458.799 556.1 460.053C556.455 461.336 556.639 462.666 556.697 464.001C556.177 464.117 555.661 464.256 555.153 464.437C554.358 464.718 553.935 465.987 554.575 466.631C555.137 467.195 555.78 467.643 556.479 467.967C556.251 469.487 555.827 470.929 555.317 472.293C555.161 472.318 555.003 472.335 554.847 472.366C554.511 472.431 554.18 472.519 553.851 472.612C553.663 472.665 553.475 472.729 553.298 472.815C552.841 473.031 552.507 473.422 552.436 473.934C552.364 474.438 552.575 474.959 552.98 475.267C553.195 475.431 553.432 475.56 553.666 475.69C552.614 477.355 551.369 478.675 550.01 479.379C550.01 479.379 548.326 478.644 546.122 477.324C546.397 476.955 546.673 476.586 546.929 476.203C547.233 475.754 547.366 475.291 547.321 474.754C547.277 474.233 546.961 473.778 546.573 473.452C546.198 473.137 545.599 472.998 545.123 473.059C544.657 473.119 544.09 473.406 543.821 473.807C543.515 474.262 543.178 474.694 542.844 475.129C541.157 473.858 539.479 472.323 538.155 470.577C538.206 470.562 538.261 470.547 538.296 470.537C539.148 470.314 540.019 470.17 540.897 470.105C541.994 470.023 542.677 468.919 542.591 467.907C542.498 466.808 541.416 466.135 540.393 466.211Z"
                fill="white"
              ></path>
              <path
                d="M543.035 434.384C543.84 433.807 544.713 433.373 545.619 433.011C545.379 432.348 545.058 431.718 544.613 431.15C540.715 426.173 538.952 431.118 535.927 431.225C534.419 431.278 532.917 431.757 532.054 432.826C532.433 432.964 532.805 433.122 533.163 433.31C533.742 433.615 533.844 434.351 533.442 434.838C533.065 435.295 532.529 435.677 531.945 435.814C531.763 435.857 531.577 435.853 531.392 435.863C531.498 436.511 531.713 437.23 532.081 438.042C532.457 438.871 532.945 439.651 533.5 440.377C533.824 440.21 534.156 440.057 534.503 439.929C535.044 439.729 535.824 440.209 535.769 440.828C535.722 441.371 535.581 441.889 535.355 442.366C536.143 443.064 536.997 443.636 537.865 444.129C537.958 444.073 538.048 444.013 538.144 443.961C538.349 443.848 538.562 443.748 538.776 443.653C538.898 443.598 539.024 443.549 539.156 443.516C539.491 443.43 539.837 443.488 540.1 443.725C540.358 443.958 540.477 444.324 540.399 444.664C540.358 444.845 540.291 445.016 540.223 445.188C541.507 445.601 542.739 445.748 543.764 445.522C543.764 445.522 544.325 444.397 544.905 442.735C544.598 442.663 544.291 442.589 543.989 442.501C543.632 442.398 543.36 442.214 543.147 441.911C542.941 441.618 542.907 441.241 542.969 440.898C543.027 440.568 543.281 440.233 543.558 440.056C543.83 439.883 544.253 439.785 544.571 439.878C544.932 439.982 545.299 440.061 545.664 440.143C545.992 438.735 546.201 437.192 546.129 435.694C546.096 435.709 546.061 435.724 546.038 435.733C545.492 435.991 544.971 436.297 544.481 436.648C543.869 437.086 543.026 436.806 542.626 436.237C542.19 435.623 542.464 434.793 543.035 434.384Z"
                fill="#FF8201"
              ></path>
              <path
                opacity="0.3"
                d="M543.035 434.384C543.84 433.807 544.713 433.373 545.619 433.011C545.379 432.348 545.058 431.718 544.613 431.15C540.715 426.173 538.952 431.118 535.927 431.225C534.419 431.278 532.917 431.757 532.054 432.826C532.433 432.964 532.805 433.122 533.163 433.31C533.742 433.615 533.844 434.351 533.442 434.838C533.065 435.295 532.529 435.677 531.945 435.814C531.763 435.857 531.577 435.853 531.392 435.863C531.498 436.511 531.713 437.23 532.081 438.042C532.457 438.871 532.945 439.651 533.5 440.377C533.824 440.21 534.156 440.057 534.503 439.929C535.044 439.729 535.824 440.209 535.769 440.828C535.722 441.371 535.581 441.889 535.355 442.366C536.143 443.064 536.997 443.636 537.865 444.129C537.958 444.073 538.048 444.013 538.144 443.961C538.349 443.848 538.562 443.748 538.776 443.653C538.898 443.598 539.024 443.549 539.156 443.516C539.491 443.43 539.837 443.488 540.1 443.725C540.358 443.958 540.477 444.324 540.399 444.664C540.358 444.845 540.291 445.016 540.223 445.188C541.507 445.601 542.739 445.748 543.764 445.522C543.764 445.522 544.325 444.397 544.905 442.735C544.598 442.663 544.291 442.589 543.989 442.501C543.632 442.398 543.36 442.214 543.147 441.911C542.941 441.618 542.907 441.241 542.969 440.898C543.027 440.568 543.281 440.233 543.558 440.056C543.83 439.883 544.253 439.785 544.571 439.878C544.932 439.982 545.299 440.061 545.664 440.143C545.992 438.735 546.201 437.192 546.129 435.694C546.096 435.709 546.061 435.724 546.038 435.733C545.492 435.991 544.971 436.297 544.481 436.648C543.869 437.086 543.026 436.806 542.626 436.237C542.19 435.623 542.464 434.793 543.035 434.384Z"
                fill="white"
              ></path>
              <path
                d="M505.741 443.623C505.474 445.496 510.552 446.729 514.695 447.42C514.357 450.82 512.094 454.257 508.969 457.467C505.038 455.252 499.427 452.325 498.393 453.039C497.264 453.82 503.01 457.535 506.602 459.72C504.075 461.964 501.229 464.054 498.463 465.886C496.701 464.24 494.638 462.796 493.409 463.577C492.133 464.388 492.479 466.935 493.108 469.208C488.831 471.701 485.63 473.217 485.63 473.217C485.63 473.217 483.835 467.776 482.773 461.076C482.989 460.65 483.204 460.22 483.4 459.765C484.089 458.171 483.418 457.493 482.28 457.269C481.986 454.336 481.902 451.321 482.21 448.522C487.05 447.506 492.935 445.627 490.731 442.725C489.402 440.975 486.967 440.777 484.435 441.215C484.789 440.632 485.181 440.082 485.63 439.587C494.438 429.882 500.583 439.587 500.583 439.587C505.702 435.321 512.892 436.476 514.446 443.142C511.573 442.405 506.072 441.31 505.741 443.623Z"
                fill="#51b08b"
              ></path>
              <path
                opacity="0.5"
                d="M505.741 443.623C505.474 445.496 510.552 446.729 514.695 447.42C514.357 450.82 512.094 454.257 508.969 457.467C505.038 455.252 499.427 452.325 498.393 453.039C497.264 453.82 503.01 457.535 506.602 459.72C504.075 461.964 501.229 464.054 498.463 465.886C496.701 464.24 494.638 462.796 493.409 463.577C492.133 464.388 492.479 466.935 493.108 469.208C488.831 471.701 485.63 473.217 485.63 473.217C485.63 473.217 483.835 467.776 482.773 461.076C482.989 460.65 483.204 460.22 483.4 459.765C484.089 458.171 483.418 457.493 482.28 457.269C481.986 454.336 481.902 451.321 482.21 448.522C487.05 447.506 492.935 445.627 490.731 442.725C489.402 440.975 486.967 440.777 484.435 441.215C484.789 440.632 485.181 440.082 485.63 439.587C494.438 429.882 500.583 439.587 500.583 439.587C505.702 435.321 512.892 436.476 514.446 443.142C511.573 442.405 506.072 441.31 505.741 443.623Z"
                fill="white"
              ></path>
              <path
                d="M549.373 143.415H295.818V383.492H549.373V143.415Z"
                fill="#51b08b"
              ></path>
              <path
                opacity="0.6"
                d="M549.373 143.415H295.818V383.492H549.373V143.415Z"
              ></path>
              <path
                d="M549.373 143.415H295.818V155.637H549.373V143.415Z"
                fill="#00311e"
              ></path>
              <path
                opacity="0.2"
                d="M549.373 155.637H540.988V383.704H549.373V155.637Z"
                fill="black"
              ></path>
              <path
                opacity="0.6"
                d="M545.65 192.808H544.886C543.702 192.808 542.744 191.849 542.744 190.667V163.18C542.744 161.998 543.704 161.039 544.886 161.039H545.65C546.834 161.039 547.792 161.998 547.792 163.18V190.667C547.792 191.849 546.833 192.808 545.65 192.808Z"
                fill="white"
              ></path>
              <path
                d="M336.727 190.28C343.235 183.772 343.235 173.22 336.727 166.712C330.219 160.204 319.667 160.204 313.159 166.712C306.651 173.22 306.651 183.772 313.159 190.28C319.667 196.788 330.219 196.788 336.727 190.28Z"
                fill="white"
              ></path>
              <path
                d="M338.694 181.763C340.486 174.174 335.787 166.57 328.198 164.778C320.61 162.986 313.006 167.685 311.214 175.274C309.422 182.862 314.121 190.466 321.709 192.258C329.298 194.05 336.902 189.351 338.694 181.763Z"
                fill="#00311e"
              ></path>
              <path
                d="M326.671 172.263V182.959H324.196V174.249H322.057V172.263H326.671Z"
                fill="white"
              ></path>
              <path
                d="M473.269 191.002H351.26C349.103 191.002 347.354 189.253 347.354 187.096V169.893C347.354 167.736 349.103 165.987 351.26 165.987H473.269C475.426 165.987 477.175 167.736 477.175 169.893V187.096C477.175 189.254 475.428 191.002 473.269 191.002Z"
                fill="white"
              ></path>
              <path
                d="M349.902 186.957V170.033C349.902 169.206 350.573 168.535 351.4 168.535H473.13C473.957 168.535 474.629 169.206 474.629 170.033V186.957C474.629 187.784 473.959 188.455 473.13 188.455H351.4C350.573 188.455 349.902 187.784 349.902 186.957Z"
                fill="#00311e"
              ></path>
              <path
                d="M371.077 177.778C371.077 175.142 373.09 173.219 375.801 173.219C377.177 173.219 378.373 173.691 379.188 174.607L378.36 175.409C377.672 174.683 376.831 174.352 375.852 174.352C373.84 174.352 372.349 175.803 372.349 177.776C372.349 179.75 373.839 181.201 375.852 181.201C376.833 181.201 377.672 180.857 378.36 180.132L379.188 180.933C378.373 181.851 377.177 182.335 375.788 182.335C373.088 182.336 371.077 180.414 371.077 177.778Z"
                fill="white"
              ></path>
              <path
                d="M380.097 177.778C380.097 175.167 382.11 173.219 384.846 173.219C387.558 173.219 389.57 175.155 389.57 177.778C389.57 180.401 387.558 182.336 384.846 182.336C382.108 182.336 380.097 180.388 380.097 177.778ZM388.296 177.778C388.296 175.804 386.82 174.353 384.846 174.353C382.847 174.353 381.369 175.804 381.369 177.778C381.369 179.751 382.847 181.202 384.846 181.202C386.82 181.202 388.296 179.751 388.296 177.778Z"
                fill="white"
              ></path>
              <path
                d="M399.788 182.234L399.775 175.741L396.553 181.153H395.967L392.745 175.779V182.234H391.523V173.321H392.568L396.285 179.586L399.952 173.321H400.995L401.008 182.234H399.788Z"
                fill="white"
              ></path>
              <path
                d="M410.884 176.427C410.884 178.363 409.484 179.535 407.167 179.535H404.964V182.234H403.69V173.321H407.167C409.484 173.321 410.884 174.492 410.884 176.427ZM409.611 176.427C409.611 175.155 408.759 174.428 407.128 174.428H404.964V178.426H407.128C408.758 178.427 409.611 177.701 409.611 176.427Z"
                fill="white"
              ></path>
              <path
                d="M412.761 173.321H414.035V181.126H418.861V182.234H412.761V173.321Z"
                fill="white"
              ></path>
              <path
                d="M426.796 181.126V182.234H420.328V173.321H426.619V174.43H421.602V177.166H426.071V178.249H421.602V181.127L426.796 181.126Z"
                fill="white"
              ></path>
              <path
                d="M430.634 174.43H427.579V173.321H434.951V174.43H431.896V182.234H430.635V174.43H430.634Z"
                fill="white"
              ></path>
              <path
                d="M442.811 181.126V182.234H436.342V173.321H442.633V174.43H437.616V177.166H442.086V178.249H437.616V181.127L442.811 181.126Z"
                fill="white"
              ></path>
              <path
                d="M444.878 173.321H448.635C451.499 173.321 453.448 175.129 453.448 177.778C453.448 180.426 451.5 182.234 448.635 182.234H444.878V173.321ZM448.558 181.126C450.76 181.126 452.173 179.777 452.173 177.778C452.173 175.779 450.76 174.43 448.558 174.43H446.151V181.127L448.558 181.126Z"
                fill="white"
              ></path>
              <path
                opacity="0.2"
                d="M507.479 186.957V170.033C507.479 169.206 508.149 168.535 508.977 168.535H524.966C525.793 168.535 526.464 169.206 526.464 170.033V186.957C526.464 187.784 525.794 188.455 524.966 188.455H508.977C508.149 188.455 507.479 187.784 507.479 186.957Z"
                fill="black"
              ></path>
              <g opacity="0.6">
                <path
                  d="M523.636 174.078H510.195V175.352H511.385L512.219 185.264H521.611L522.446 175.352H523.636V174.078ZM520.44 183.99H513.39L512.663 175.352H521.168L520.44 183.99Z"
                  fill="white"
                ></path>
                <path
                  d="M519.498 171.726H514.332L513.883 173H519.946L519.498 171.726Z"
                  fill="white"
                ></path>
              </g>
              <path
                opacity="0.2"
                d="M484.05 186.957V170.033C484.05 169.206 484.721 168.535 485.548 168.535H501.537C502.364 168.535 503.035 169.206 503.035 170.033V186.957C503.035 187.784 502.365 188.455 501.537 188.455H485.548C484.72 188.455 484.05 187.784 484.05 186.957Z"
                fill="black"
              ></path>
              <path
                opacity="0.6"
                d="M501.02 171.726L498.967 174.258V171.726H488.117V185.264H498.967V177.292L502.504 172.929L501.02 171.726ZM497.693 183.99H489.391V173H497.693V175.83L494.216 180.119L494.157 181.711L495.701 181.322L497.693 178.864V183.99Z"
                fill="white"
              ></path>
              <path
                d="M336.727 232.959C343.235 226.451 343.235 215.899 336.727 209.391C330.219 202.883 319.667 202.883 313.159 209.391C306.651 215.899 306.651 226.451 313.159 232.959C319.667 239.467 330.219 239.467 336.727 232.959Z"
                fill="white"
              ></path>
              <path
                d="M338.692 224.444C340.484 216.855 335.785 209.251 328.196 207.459C320.608 205.667 313.003 210.366 311.212 217.955C309.42 225.543 314.119 233.147 321.707 234.939C329.296 236.731 336.9 232.032 338.692 224.444Z"
                fill="#00311e"
              ></path>
              <path
                d="M329.023 223.62V225.637H320.941V224.033L325.066 220.137C326.014 219.235 326.182 218.685 326.182 218.166C326.182 217.325 325.601 216.837 324.471 216.837C323.554 216.837 322.776 217.189 322.256 217.906L320.453 216.746C321.279 215.538 322.776 214.759 324.701 214.759C327.084 214.759 328.673 215.981 328.673 217.921C328.673 218.96 328.382 219.908 326.885 221.298L324.425 223.62H329.023Z"
                fill="white"
              ></path>
              <path
                d="M473.269 233.681H351.26C349.103 233.681 347.354 231.932 347.354 229.775V212.572C347.354 210.415 349.103 208.666 351.26 208.666H473.269C475.426 208.666 477.175 210.415 477.175 212.572V229.775C477.175 231.933 475.428 233.681 473.269 233.681Z"
                fill="white"
              ></path>
              <path
                d="M349.902 229.636V212.712C349.902 211.885 350.573 211.214 351.4 211.214H473.13C473.957 211.214 474.629 211.885 474.629 212.712V229.636C474.629 230.463 473.959 231.134 473.13 231.134H351.4C350.573 231.134 349.902 230.463 349.902 229.636Z"
                fill="#00311e"
              ></path>
              <path
                d="M371.077 220.457C371.077 217.821 373.09 215.898 375.801 215.898C377.177 215.898 378.373 216.37 379.188 217.286L378.36 218.088C377.672 217.362 376.831 217.031 375.852 217.031C373.84 217.031 372.349 218.482 372.349 220.456C372.349 222.429 373.839 223.88 375.852 223.88C376.833 223.88 377.672 223.536 378.36 222.811L379.188 223.613C378.373 224.53 377.177 225.014 375.788 225.014C373.088 225.015 371.077 223.093 371.077 220.457Z"
                fill="white"
              ></path>
              <path
                d="M380.097 220.457C380.097 217.846 382.11 215.898 384.846 215.898C387.558 215.898 389.57 217.834 389.57 220.457C389.57 223.08 387.558 225.015 384.846 225.015C382.108 225.015 380.097 223.067 380.097 220.457ZM388.296 220.457C388.296 218.483 386.82 217.032 384.846 217.032C382.847 217.032 381.369 218.483 381.369 220.457C381.369 222.43 382.847 223.881 384.846 223.881C386.82 223.881 388.296 222.43 388.296 220.457Z"
                fill="white"
              ></path>
              <path
                d="M399.788 224.913L399.775 218.42L396.553 223.832H395.967L392.745 218.458V224.913H391.523V216H392.568L396.285 222.265L399.952 216H400.995L401.008 224.913H399.788Z"
                fill="white"
              ></path>
              <path
                d="M410.884 219.106C410.884 221.042 409.484 222.214 407.167 222.214H404.964V224.913H403.69V216H407.167C409.484 216 410.884 217.171 410.884 219.106ZM409.611 219.106C409.611 217.834 408.759 217.107 407.128 217.107H404.964V221.105H407.128C408.758 221.107 409.611 220.38 409.611 219.106Z"
                fill="white"
              ></path>
              <path
                d="M412.761 216H414.035V223.805H418.861V224.913H412.761V216Z"
                fill="white"
              ></path>
              <path
                d="M426.796 223.805V224.913H420.328V216H426.619V217.109H421.602V219.845H426.071V220.928H421.602V223.806L426.796 223.805Z"
                fill="white"
              ></path>
              <path
                d="M430.634 217.109H427.579V216H434.951V217.109H431.896V224.913H430.635V217.109H430.634Z"
                fill="white"
              ></path>
              <path
                d="M442.811 223.805V224.913H436.342V216H442.633V217.109H437.616V219.845H442.086V220.928H437.616V223.806L442.811 223.805Z"
                fill="white"
              ></path>
              <path
                d="M444.878 216H448.635C451.499 216 453.448 217.808 453.448 220.457C453.448 223.105 451.5 224.913 448.635 224.913H444.878V216ZM448.558 223.805C450.76 223.805 452.173 222.456 452.173 220.457C452.173 218.458 450.76 217.109 448.558 217.109H446.151V223.806L448.558 223.805Z"
                fill="white"
              ></path>
              <path
                opacity="0.2"
                d="M507.479 229.636V212.712C507.479 211.885 508.149 211.214 508.977 211.214H524.966C525.793 211.214 526.464 211.885 526.464 212.712V229.636C526.464 230.463 525.794 231.134 524.966 231.134H508.977C508.149 231.134 507.479 230.463 507.479 229.636Z"
                fill="black"
              ></path>
              <g opacity="0.6">
                <path
                  d="M523.636 216.757H510.195V218.031H511.385L512.219 227.943H521.611L522.446 218.031H523.636V216.757ZM520.44 226.669H513.39L512.663 218.031H521.168L520.44 226.669Z"
                  fill="white"
                ></path>
                <path
                  d="M519.498 214.405H514.332L513.883 215.679H519.946L519.498 214.405Z"
                  fill="white"
                ></path>
              </g>
              <path
                opacity="0.2"
                d="M484.05 229.636V212.712C484.05 211.885 484.721 211.214 485.548 211.214H501.537C502.364 211.214 503.035 211.885 503.035 212.712V229.636C503.035 230.463 502.365 231.134 501.537 231.134H485.548C484.72 231.134 484.05 230.463 484.05 229.636Z"
                fill="black"
              ></path>
              <path
                opacity="0.6"
                d="M501.02 214.405L498.967 216.937V214.405H488.117V227.943H498.967V219.971L502.504 215.608L501.02 214.405ZM497.693 226.669H489.391V215.679H497.693V218.509L494.216 222.798L494.157 224.39L495.701 224.001L497.693 221.543V226.669Z"
                fill="white"
              ></path>
              <path
                d="M336.727 275.638C343.235 269.13 343.235 258.578 336.727 252.07C330.219 245.562 319.667 245.562 313.159 252.07C306.651 258.578 306.651 269.13 313.159 275.638C319.667 282.146 330.219 282.146 336.727 275.638Z"
                fill="white"
              ></path>
              <path
                opacity="0.2"
                d="M338.69 267.125C340.482 259.536 335.783 251.932 328.194 250.14C320.606 248.348 313.001 253.047 311.21 260.636C309.418 268.224 314.117 275.829 321.705 277.62C329.294 279.412 336.898 274.713 338.69 267.125Z"
                fill="black"
              ></path>
              <path
                opacity="0.2"
                d="M328.918 265.047C328.918 266.849 327.528 268.499 324.487 268.499C322.99 268.499 321.446 268.087 320.406 267.354L321.369 265.46C322.179 266.071 323.309 266.421 324.424 266.421C325.662 266.421 326.426 265.917 326.426 265.047C326.426 264.236 325.829 263.732 324.424 263.732H323.294V262.097L325.494 259.607H320.941V257.621H328.428V259.225L326.014 261.975C327.939 262.281 328.918 263.473 328.918 265.047Z"
                fill="black"
              ></path>
              <path
                d="M473.269 276.36H351.26C349.103 276.36 347.354 274.611 347.354 272.454V255.251C347.354 253.094 349.103 251.345 351.26 251.345H473.269C475.426 251.345 477.175 253.094 477.175 255.251V272.454C477.175 274.612 475.428 276.36 473.269 276.36Z"
                fill="white"
              ></path>
              <path
                opacity="0.2"
                d="M349.902 272.315V255.391C349.902 254.564 350.572 253.893 351.4 253.893H473.13C473.957 253.893 474.629 254.564 474.629 255.391V272.315C474.629 273.142 473.959 273.813 473.13 273.813H351.4C350.573 273.813 349.902 273.142 349.902 272.315Z"
                fill="black"
              ></path>
              <g opacity="0.2">
                <path
                  d="M400.121 258.679V267.592H398.861V259.788H396.85V258.679H400.121Z"
                  fill="black"
                ></path>
                <path
                  d="M402.073 263.136C402.073 260.232 403.627 258.577 405.715 258.577C407.791 258.577 409.344 260.232 409.344 263.136C409.344 266.039 407.791 267.694 405.715 267.694C403.626 267.694 402.073 266.039 402.073 263.136ZM408.07 263.136C408.07 260.857 407.103 259.711 405.714 259.711C404.313 259.711 403.346 260.857 403.346 263.136C403.346 265.415 404.314 266.56 405.714 266.56C407.103 266.56 408.07 265.415 408.07 263.136Z"
                  fill="black"
                ></path>
                <path
                  d="M413.549 256.871H414.656L410.455 268.866H409.346L413.549 256.871Z"
                  fill="black"
                ></path>
                <path
                  d="M417.945 258.679V267.592H416.685V259.788H414.673V258.679H417.945Z"
                  fill="black"
                ></path>
                <path
                  d="M419.896 263.136C419.896 260.232 421.449 258.577 423.537 258.577C425.613 258.577 427.166 260.232 427.166 263.136C427.166 266.039 425.613 267.694 423.537 267.694C421.449 267.694 419.896 266.039 419.896 263.136ZM425.893 263.136C425.893 260.857 424.926 259.711 423.537 259.711C422.136 259.711 421.169 260.857 421.169 263.136C421.169 265.415 422.137 266.56 423.537 266.56C424.926 266.56 425.893 265.415 425.893 263.136Z"
                  fill="black"
                ></path>
              </g>
              <path
                opacity="0.2"
                d="M507.479 272.315V255.391C507.479 254.564 508.149 253.893 508.977 253.893H524.966C525.793 253.893 526.464 254.564 526.464 255.391V272.315C526.464 273.142 525.794 273.813 524.966 273.813H508.977C508.149 273.813 507.479 273.142 507.479 272.315Z"
                fill="black"
              ></path>
              <g opacity="0.6">
                <path
                  d="M523.636 259.436H510.195V260.71H511.385L512.219 270.622H521.611L522.446 260.71H523.636V259.436ZM520.44 269.348H513.39L512.663 260.71H521.168L520.44 269.348Z"
                  fill="white"
                ></path>
                <path
                  d="M519.498 257.084H514.332L513.883 258.358H519.946L519.498 257.084Z"
                  fill="white"
                ></path>
              </g>
              <path
                opacity="0.2"
                d="M484.05 272.315V255.391C484.05 254.564 484.721 253.893 485.548 253.893H501.537C502.364 253.893 503.035 254.564 503.035 255.391V272.315C503.035 273.142 502.365 273.813 501.537 273.813H485.548C484.72 273.813 484.05 273.142 484.05 272.315Z"
                fill="black"
              ></path>
              <path
                opacity="0.6"
                d="M501.02 257.084L498.967 259.616V257.084H488.117V270.622H498.967V262.65L502.504 258.287L501.02 257.084ZM497.693 269.348H489.391V258.358H497.693V261.188L494.216 265.477L494.157 267.069L495.701 266.68L497.693 264.222V269.348Z"
                fill="white"
              ></path>
              <path
                opacity="0.2"
                d="M301.084 242.559H535.444"
                stroke="black"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                opacity="0.2"
                d="M301.084 199.243H535.444"
                stroke="black"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                opacity="0.2"
                d="M535.444 285.875H301.084V377.184H535.444V285.875Z"
                fill="black"
              ></path>
              <path
                opacity="0.6"
                d="M501.116 300.725H310.829V311.499H501.116V300.725Z"
                fill="white"
              ></path>
              <path
                opacity="0.2"
                d="M350.77 292.363H312.384C311.525 292.363 310.829 293.058 310.829 293.917C310.829 294.776 311.525 295.471 312.384 295.471H350.77C351.629 295.471 352.325 294.776 352.325 293.917C352.323 293.058 351.628 292.363 350.77 292.363Z"
                fill="black"
              ></path>
              <path
                opacity="0.6"
                d="M399.196 328.753H310.829V339.527H399.196V328.753Z"
                fill="white"
              ></path>
              <path
                opacity="0.2"
                d="M350.77 320.391H312.384C311.525 320.391 310.829 321.086 310.829 321.945C310.829 322.804 311.525 323.499 312.384 323.499H350.77C351.629 323.499 352.325 322.804 352.325 321.945C352.323 321.086 351.628 320.391 350.77 320.391Z"
                fill="black"
              ></path>
              <path
                opacity="0.6"
                d="M458.836 354.233H310.829V365.007H458.836V354.233Z"
                fill="white"
              ></path>
              <path
                opacity="0.2"
                d="M350.77 345.869H312.384C311.525 345.869 310.829 346.565 310.829 347.424C310.829 348.282 311.525 348.978 312.384 348.978H350.77C351.629 348.978 352.325 348.282 352.325 347.424C352.323 346.566 351.628 345.869 350.77 345.869Z"
                fill="black"
              ></path>
              <path
                opacity="0.6"
                d="M501.116 328.753H412.749V339.527H501.116V328.753Z"
                fill="white"
              ></path>
              <path
                opacity="0.2"
                d="M452.69 320.391H414.304C413.445 320.391 412.749 321.086 412.749 321.945C412.749 322.804 413.445 323.499 414.304 323.499H452.69C453.549 323.499 454.245 322.804 454.245 321.945C454.243 321.086 453.548 320.391 452.69 320.391Z"
                fill="black"
              ></path>
              <path
                opacity="0.2"
                d="M515.474 300.725H504.7V311.499H515.474V300.725Z"
                fill="black"
              ></path>
              <path
                opacity="0.2"
                d="M515.581 328.753H504.807V339.527H515.581V328.753Z"
                fill="black"
              ></path>
              <path
                opacity="0.2"
                d="M473.077 354.233H462.303V365.007H473.077V354.233Z"
                fill="black"
              ></path>
              <path
                opacity="0.6"
                d="M543.383 152.592C545.076 152.592 546.449 151.219 546.449 149.525C546.449 147.832 545.076 146.459 543.383 146.459C541.689 146.459 540.316 147.832 540.316 149.525C540.316 151.219 541.689 152.592 543.383 152.592Z"
                fill="white"
              ></path>
              <path
                opacity="0.6"
                d="M532.554 152.592C534.247 152.592 535.62 151.219 535.62 149.525C535.62 147.832 534.247 146.459 532.554 146.459C530.86 146.459 529.487 147.832 529.487 149.525C529.487 151.219 530.86 152.592 532.554 152.592Z"
                fill="white"
              ></path>
              <path
                opacity="0.6"
                d="M521.725 152.592C523.418 152.592 524.791 151.219 524.791 149.525C524.791 147.832 523.418 146.459 521.725 146.459C520.031 146.459 518.658 147.832 518.658 149.525C518.658 151.219 520.031 152.592 521.725 152.592Z"
                fill="white"
              ></path>
              <path
                d="M138.337 506.517L172.175 503.568V453.157H184.071V503.556L218.031 506.518C221.022 506.812 223.303 509.329 223.303 512.334V516.841H179.286H177.081H133.064V512.334C133.065 509.327 135.346 506.811 138.337 506.517Z"
                fill="#263238"
              ></path>
              <path
                opacity="0.1"
                d="M138.337 506.517L172.175 503.568V453.157H184.071V503.556L218.031 506.518C221.022 506.812 223.303 509.329 223.303 512.334V516.841H179.286H177.081H133.064V512.334C133.065 509.327 135.346 506.811 138.337 506.517Z"
                fill="white"
              ></path>
              <path
                d="M212.349 522.432C212.349 526.728 215.831 530.209 220.127 530.209C224.423 530.209 227.905 526.728 227.905 522.432C227.905 518.136 224.423 514.654 220.127 514.654C215.831 514.654 212.349 518.136 212.349 522.432Z"
                fill="#263238"
              ></path>
              <path
                d="M144.019 522.432C144.019 526.728 140.538 530.209 136.242 530.209C131.946 530.209 128.464 526.728 128.464 522.432C128.464 518.136 131.946 514.654 136.242 514.654C140.538 514.654 144.019 518.136 144.019 522.432Z"
                fill="#263238"
              ></path>
              <path
                d="M175.393 462.223H180.855C183.763 462.223 186.12 459.866 186.12 456.957V416.037H170.127V456.957C170.127 459.866 172.484 462.223 175.393 462.223Z"
                fill="#263238"
              ></path>
              <path
                opacity="0.2"
                d="M175.393 462.223H180.855C183.763 462.223 186.12 459.866 186.12 456.957V416.037H170.127V456.957C170.127 459.866 172.484 462.223 175.393 462.223Z"
                fill="white"
              ></path>
              <path
                d="M143.032 328.128C143.032 328.128 146.696 401.609 162.522 414.26H145.597C145.597 414.26 130.503 389.226 129.379 328.128H143.032Z"
                fill="#263238"
              ></path>
              <path
                opacity="0.1"
                d="M143.032 328.128C143.032 328.128 146.696 401.609 162.522 414.26H145.597C145.597 414.26 130.503 389.226 129.379 328.128H143.032Z"
                fill="white"
              ></path>
              <path
                d="M216.693 408.171H141.656C138.139 408.171 135.286 411.023 135.286 414.541V420.349H223.063V414.541C223.063 411.023 220.211 408.171 216.693 408.171Z"
                fill="#00311e"
              ></path>
              <path
                d="M223.841 414.259H134.508C133.092 414.259 131.946 415.405 131.946 416.821V417.785C131.946 419.201 133.092 420.347 134.508 420.347H223.841C225.256 420.347 226.403 419.199 226.403 417.785V416.821C226.403 415.407 225.256 414.259 223.841 414.259Z"
                fill="#263238"
              ></path>
              <path
                opacity="0.6"
                d="M223.841 414.259H134.508C133.092 414.259 131.946 415.405 131.946 416.821V417.785C131.946 419.201 133.092 420.347 134.508 420.347H223.841C225.256 420.347 226.403 419.199 226.403 417.785V416.821C226.403 415.407 225.256 414.259 223.841 414.259Z"
                fill="white"
              ></path>
              <path
                d="M126.409 344.214H153.522C161.466 344.214 167.201 337.077 166.335 328.274L165.178 316.521C164.312 307.718 157.17 300.581 149.226 300.581H122.114C114.171 300.581 108.435 307.718 109.302 316.521L110.458 328.273C111.325 337.077 118.467 344.214 126.409 344.214Z"
                fill="#00311e"
              ></path>
              <path
                d="M215.239 521.01L225.387 519.616L226.794 495.492L216.659 496.896L215.239 521.01Z"
                fill="#EBB376"
              ></path>
              <path
                opacity="0.2"
                d="M216.659 496.896L226.795 495.505L225.988 509.294L215.867 510.184L216.659 496.896Z"
                fill="black"
              ></path>
              <path
                d="M238.651 512L248.867 512.752L255.268 489.449L245.063 488.712L238.651 512Z"
                fill="#EBB376"
              ></path>
              <path
                opacity="0.2"
                d="M245.063 488.712L255.266 489.462L251.605 502.782L241.52 501.542L245.063 488.712Z"
                fill="black"
              ></path>
              <path
                d="M258.728 501.138L240.739 495.851C240.739 495.851 251.479 435.234 262.371 414.213C261.556 413.946 260.473 413.602 259.135 413.207C256.728 412.48 253.53 411.576 249.772 410.531C223.629 403.282 170.643 389.689 170.643 389.689L194.849 367.101C194.849 367.101 291.266 381.803 293.266 407.206C294.221 419.422 258.728 501.138 258.728 501.138Z"
                fill="#FF8201"
              ></path>
              <path
                opacity="0.4"
                d="M258.728 501.138L240.739 495.851C240.739 495.851 251.479 435.234 262.371 414.213C261.556 413.946 260.473 413.602 259.135 413.207C256.728 412.48 253.53 411.576 249.772 410.531C223.629 403.282 170.643 389.689 170.643 389.689L194.849 367.101C194.849 367.101 291.266 381.803 293.266 407.206C294.221 419.422 258.728 501.138 258.728 501.138Z"
                fill="#00311e"
              ></path>
              <path
                d="M215.646 379.19L210.622 356.033L156.273 356.452C156.273 356.452 150.222 392.554 154.871 401.153C163.17 416.506 207.893 408.758 220.979 410.268C213.157 442.258 213.921 504.773 213.921 504.773L232.611 506.2C232.611 506.2 246.992 438.836 249.899 406.828C251.861 385.23 233.965 385.766 215.646 379.19Z"
                fill="#FF8201"
              ></path>
              <path
                d="M250.286 513.208C250.299 513.233 250.294 513.267 250.314 513.287C250.34 513.301 250.372 513.302 250.401 513.298C251.193 513.744 252.03 514.105 252.901 514.371C253.535 514.63 254.245 514.641 254.888 514.403C255.316 514.16 255.567 513.691 255.529 513.199C255.558 512.889 255.429 512.588 255.184 512.398C254.604 511.966 253.39 512.093 252.32 512.32C253.099 511.684 253.785 510.885 253.828 510.247C253.852 509.828 253.611 509.445 253.21 509.32C252.864 509.176 252.517 509.192 252.185 509.364C250.944 510.046 250.462 512.905 250.425 513.058L250.606 513.06V513.063L250.423 513.073C250.421 513.083 250.251 513.091 250.251 513.102C250.252 513.14 250.263 513.176 250.286 513.208ZM251.048 512.638C250.963 512.664 250.89 512.687 250.819 512.709C251.058 511.768 251.573 510.224 252.316 509.827C252.48 509.727 252.679 509.701 252.864 509.754L252.974 509.794C253.292 509.924 253.334 510.108 253.316 510.247C253.229 510.938 252.056 512.086 251.048 512.638ZM251.086 513.166C252.434 512.758 254.304 512.39 254.879 512.822C255.001 512.915 255.065 513.064 255.047 513.216C255.061 513.524 254.912 513.817 254.655 513.988C254.062 514.311 252.754 514.004 251.086 513.166Z"
                fill="#FF8201"
              ></path>
              <path
                d="M238.418 496.249L260.078 502.373L263.964 493.365L240.066 487.104L238.418 496.249Z"
                fill="#FF8201"
              ></path>
              <path
                opacity="0.2"
                d="M238.418 496.249L260.078 502.373L263.964 493.365L240.066 487.104L238.418 496.249Z"
                fill="#00411e"
              ></path>
              <path
                d="M249.87 511.716L238.805 508.628C238.424 508.503 238.014 508.711 237.889 509.092C237.888 509.096 237.886 509.099 237.885 509.103L234.9 517.715C234.634 518.67 235.184 519.661 236.136 519.939C240.014 520.953 241.917 521.244 246.797 522.564C249.788 523.39 255.62 525.306 259.886 525.791C264.152 526.277 264.517 522.047 262.755 521.466C258.577 520.067 253.58 515.714 251.409 512.757C251.025 512.249 250.484 511.883 249.87 511.716Z"
                fill="#263238"
              ></path>
              <path
                opacity="0.4"
                d="M215.646 379.19L210.622 356.033L156.273 356.452C156.273 356.452 150.222 392.554 154.871 401.153C163.17 416.506 207.893 408.758 220.979 410.268C213.157 442.258 213.921 504.773 213.921 504.773L232.611 506.2C232.611 506.2 246.992 438.836 249.899 406.828C251.861 385.23 233.965 385.766 215.646 379.19Z"
                fill="#00311e"
              ></path>
              <path
                d="M211.73 505.652L234.191 507.13L236.114 497.511L211.437 496.364L211.73 505.652Z"
                fill="#FF8201"
              ></path>
              <path
                opacity="0.2"
                d="M211.73 505.652L234.191 507.13L236.114 497.511L211.437 496.364L211.73 505.652Z"
                fill="#00411e"
              ></path>
              <path
                d="M226.399 519.644C226.399 519.654 226.61 519.659 226.613 519.671C226.624 519.709 226.841 519.742 226.87 519.768C226.888 519.791 226.889 519.823 226.913 519.839C226.943 519.848 226.972 519.842 227 519.831C227.868 520.103 228.761 520.281 229.667 520.36C230.342 520.481 231.035 520.345 231.614 519.977C231.983 519.649 232.125 519.138 231.987 518.666C231.951 518.357 231.752 518.089 231.473 517.955C230.816 517.654 229.636 518.031 228.637 518.477C229.268 517.694 229.735 516.771 229.645 516.138C229.581 515.723 229.194 515.403 228.776 515.364C228.408 515.296 227.929 515.393 227.638 515.631C226.572 516.552 226.4 519.445 226.4 519.624C226.4 519.626 226.4 519.629 226.4 519.631V519.634L226.399 519.644ZM227.497 519.052C227.419 519.095 227.353 519.132 227.287 519.169C227.326 518.199 227.508 516.581 228.15 516.039C228.291 515.908 228.48 515.84 228.672 515.854L228.787 515.869C229.125 515.93 229.204 516.102 229.216 516.243C229.275 516.934 228.366 518.3 227.497 519.052ZM227.645 519.559C228.878 518.879 230.63 518.129 231.282 518.433C231.421 518.498 231.514 518.63 231.529 518.783C231.607 519.081 231.523 519.4 231.306 519.62C230.794 520.06 229.449 520.033 227.645 519.559Z"
                fill="#FF8201"
              ></path>
              <path
                d="M226.153 518.395L214.687 517.68C214.288 517.637 213.93 517.926 213.887 518.324C213.887 518.328 213.886 518.332 213.886 518.336L212.761 527.381C212.698 528.37 213.443 529.225 214.432 529.297C218.436 529.482 220.357 529.37 225.406 529.645C228.503 529.83 234.607 530.489 238.88 530.075C243.154 529.661 242.63 525.447 240.785 525.246C236.409 524.748 230.612 521.532 227.873 519.091C227.394 518.675 226.787 518.429 226.153 518.395Z"
                fill="#263238"
              ></path>
              <path
                opacity="0.2"
                d="M259.135 413.205C256.728 412.479 253.53 411.575 249.772 410.53C250.523 404.364 250.536 397.293 247.568 393.688C241.669 386.502 226.496 382.285 217.858 380.757C210.634 379.483 186.365 376.947 186.365 376.947C186.365 376.947 217.858 373.928 250.052 383.317C265.964 387.967 262.868 403.523 259.135 413.205Z"
                fill="black"
              ></path>
              <path
                d="M175.602 356.307L156.273 356.453L155.547 361.203L175.602 361.508V356.307Z"
                fill="#263238"
              ></path>
              <path
                d="M178.122 356.288V361.546L211.93 362.059V356.033L178.122 356.288Z"
                fill="#263238"
              ></path>
              <path
                d="M195.427 358.086V361.557C195.427 362.406 196.114 363.093 196.962 363.093H202.795C203.644 363.093 204.33 362.405 204.33 361.557V358.086C204.33 357.237 203.643 356.551 202.795 356.551H196.962C196.113 356.551 195.427 357.237 195.427 358.086Z"
                fill="white"
              ></path>
              <path
                d="M205.303 307.307C205.303 307.307 205.613 308.149 206.179 309.535C206.755 310.976 207.609 313.005 208.662 315.288C211.211 320.843 214.915 327.882 218.784 331.685C219.926 332.805 221.079 333.647 222.22 334.08C226.344 335.665 236.688 335.954 245.922 335.865C255.012 335.787 263.049 335.31 263.049 335.31V328.315L232.685 320.222C232.685 320.222 216.677 291.332 207.209 287.053L205.303 307.307Z"
                fill="#263238"
              ></path>
              <path
                opacity="0.2"
                d="M206.178 309.535C206.754 310.976 207.607 313.005 208.661 315.288C211.21 320.843 214.914 327.882 218.783 331.685C222.718 317.184 208.163 303.383 208.163 303.383L206.178 309.535Z"
                fill="black"
              ></path>
              <path
                d="M154.853 358.095H212.818C219.98 305.439 207.21 287.268 207.21 287.268C202.487 285.914 197.665 284.933 192.788 284.331C185.666 283.766 178.517 283.612 171.377 283.869C166.499 283.994 161.635 284.475 156.827 285.31C154.22 286.412 151.635 297.772 154.218 333.132C155.075 344.871 155.019 354.585 154.853 358.095Z"
                fill="#263238"
              ></path>
              <path
                opacity="0.1"
                d="M154.853 358.095H212.818C219.98 305.439 207.21 287.268 207.21 287.268C202.487 285.914 197.665 284.933 192.788 284.331C185.666 283.766 178.517 283.612 171.377 283.869C166.499 283.994 161.635 284.475 156.827 285.31C154.22 286.412 151.635 297.772 154.218 333.132C155.075 344.871 155.019 354.585 154.853 358.095Z"
                fill="white"
              ></path>
              <path
                d="M199.84 305.297H209.969L210.744 317.397L205.303 320.922L199.84 318.224V305.297Z"
                fill="#263238"
              ></path>
              <path
                d="M171.856 283.349L188.857 289.144L189.546 284.273C187.884 281.368 187.467 279.535 188.867 276.16L177.52 263.123C177.825 269.805 176.612 278.931 171.856 283.349Z"
                fill="#EBB376"
              ></path>
              <path
                opacity="0.2"
                d="M182.144 268.439L188.857 276.159C188.348 277.342 187.942 278.566 187.641 279.82C184.801 278.97 181.294 275.184 181.438 272.101C181.444 270.847 181.684 269.606 182.144 268.439Z"
                fill="black"
              ></path>
              <path
                d="M196.414 247.485C192.294 249.574 193.465 254.155 201.174 262.072C205.232 257.996 206.929 249.298 204.441 246.739C201.952 244.18 200.003 245.679 196.414 247.485Z"
                fill="#263238"
              ></path>
              <path
                d="M179.205 252.47C178.434 261.79 177.517 267.199 181.486 272.618C187.468 280.763 199.483 278.189 203.026 269.284C206.196 261.285 206.932 247.383 198.426 242.404C192.364 238.815 184.541 240.819 180.953 246.881C179.944 248.583 179.346 250.496 179.205 252.47Z"
                fill="#EBB376"
              ></path>
              <path
                d="M192.631 257C192.523 257.752 192.837 258.419 193.327 258.488C193.817 258.557 194.297 258.012 194.405 257.26C194.513 256.508 194.21 255.845 193.723 255.766C193.237 255.688 192.791 256.268 192.631 257Z"
                fill="#263238"
              ></path>
              <path
                d="M201.176 258.25C201.068 259.002 201.381 259.669 201.872 259.738C202.362 259.807 202.851 259.265 202.963 258.504C203.076 257.742 202.758 257.084 202.268 257.015C201.777 256.948 201.284 257.498 201.176 258.25Z"
                fill="#263238"
              ></path>
              <path
                d="M198.336 258.2C198.901 260.629 199.796 262.968 200.999 265.151C199.461 266.196 197.304 265.299 197.304 265.299L198.336 258.2Z"
                fill="#D58745"
              ></path>
              <path
                d="M190.687 253.967C190.588 253.964 190.492 253.929 190.416 253.865C190.241 253.69 190.24 253.409 190.411 253.232C191.408 252.193 192.849 251.707 194.272 251.93C194.507 251.972 194.662 252.195 194.62 252.428C194.619 252.438 194.616 252.448 194.614 252.458C194.554 252.694 194.323 252.843 194.085 252.8C192.961 252.643 191.831 253.037 191.049 253.858C190.948 253.946 190.817 253.985 190.687 253.967Z"
                fill="#263238"
              ></path>
              <path
                d="M205.485 255.933C205.314 255.906 205.174 255.786 205.118 255.623C204.806 254.531 203.989 253.655 202.922 253.265C202.685 253.196 202.547 252.95 202.611 252.713C202.677 252.48 202.916 252.341 203.152 252.399C204.511 252.871 205.559 253.972 205.964 255.353C206.039 255.585 205.913 255.833 205.681 255.91C205.678 255.91 205.677 255.911 205.675 255.912C205.615 255.931 205.55 255.938 205.485 255.933Z"
                fill="#263238"
              ></path>
              <path
                d="M184.071 244.817C188.175 246.923 186.971 251.502 179.215 259.362C175.179 255.261 173.532 246.542 176.048 244.014C178.564 241.487 180.485 242.984 184.071 244.817Z"
                fill="#263238"
              ></path>
              <path
                d="M173.734 259.221C174.054 261.553 175.285 263.663 177.156 265.09C179.652 266.951 182.015 264.987 182.264 262.049C182.484 259.399 181.444 255.234 178.491 254.534C175.539 253.833 173.357 256.359 173.734 259.221Z"
                fill="#EBB376"
              ></path>
              <path
                d="M190.159 265.949C190.159 265.949 191.379 269.192 195.883 269.619"
                stroke="#263238"
                stroke-width="0.5263"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M193.663 244.544C193.663 244.544 191.096 253.648 182.086 253.098C173.077 252.546 171.856 246.778 171.856 246.778C171.856 246.778 173.205 247.159 174.032 247.241C174.032 247.241 171.995 242.403 175.162 238.379C178.329 234.356 187.817 230.957 194.131 234.137C194.131 234.137 200.751 232.555 206.487 236.945C212.224 241.335 210.125 249.03 210.125 249.03C210.125 249.03 211.006 244.306 208.29 242.607C208.29 242.607 210.614 252.865 204.919 254.792C204.919 254.792 205.617 245.081 193.663 244.544Z"
                fill="#263238"
              ></path>
              <path
                opacity="0.5"
                d="M183.582 269.994C183.582 269.994 187.194 262.721 189.546 262.619C191.898 262.517 194.626 266.306 194.626 266.306L193.518 267.053C193.518 267.053 191.272 264.449 190.283 264.197C189.295 263.945 185.74 268.397 186.384 269.993C187.027 271.589 189.105 272.344 189.105 272.344L191.178 270.161L193.021 271.253L191.88 274.129C191.88 274.129 194.24 275.073 195.884 274.129C197.527 273.185 198.036 268.852 197.908 268.582C197.78 268.312 195.26 267.783 195.26 267.783L195.884 266.801C195.884 266.801 199.298 266.381 199.841 267.473C200.384 268.564 198.719 275.244 197.051 275.994C195.385 276.745 192.704 277.844 188.858 276.187C185.01 274.529 182.574 271.855 183.582 269.994Z"
                fill="black"
              ></path>
              <path
                d="M203 327.815C203 327.815 235.166 327.083 236.967 326.903C238.767 326.724 246.394 322.423 248.007 322.243C249.62 322.063 253.972 328.874 254.51 330.488C255.047 332.101 242.347 336.403 241.092 336.224C239.837 336.044 236.954 334.684 236.954 334.684L204.134 338.902L203 327.815Z"
                fill="#EBB376"
              ></path>
              <path
                opacity="0.2"
                d="M153.255 314.934C153.255 314.934 153.266 314.934 153.255 314.946C158.032 322.695 164.718 330.965 171.38 330.578C178.352 330.167 171.324 315.933 163.83 303.539C163.542 304.138 163.287 304.714 163.087 305.28C161.392 310.024 156.214 304.183 153.576 296.544C153.187 301.009 153.032 307.019 153.255 314.934Z"
                fill="black"
              ></path>
              <path
                d="M156.827 285.311C140.387 291.236 169.245 335.759 178.206 340.347C187.167 344.934 210.744 339.642 210.744 339.642L209.283 325.888C209.283 325.888 190.62 327.145 186.906 326.208C183.192 325.269 174.374 306.293 169.299 297.33C164.225 288.367 156.827 285.311 156.827 285.311Z"
                fill="#263238"
              ></path>
              <path
                d="M172.914 280.265C172.914 280.265 179.514 284.861 188.226 288.222C188.226 288.222 189.258 284.358 188.226 280.999L195.735 284.747C195.735 284.747 196.357 290.575 194.632 293.598L189.123 289.566L182.932 294.606C182.932 294.606 171.207 290.082 169.372 283.944L172.914 280.265Z"
                fill="#263238"
              ></path>
              <path
                d="M270.916 530.208H263.629L262.439 347.931H272.106L270.916 530.208Z"
                fill="#263238"
              ></path>
              <path
                opacity="0.4"
                d="M272.111 348.225L271.921 377.633L270.921 530.208H263.63L262.631 377.633L262.44 348.225H272.111Z"
                fill="white"
              ></path>
              <path
                opacity="0.2"
                d="M272.111 348.225L271.921 377.96H262.631L262.44 348.225H272.111Z"
                fill="black"
              ></path>
              <path
                d="M348.278 530.208H340.991L327.9 347.931H337.567L348.278 530.208Z"
                fill="#263238"
              ></path>
              <path
                opacity="0.5"
                d="M348.282 530.208H340.991L328.538 356.985L327.896 348.225H337.567L338.089 356.985L348.282 530.208Z"
                fill="white"
              ></path>
              <path
                opacity="0.2"
                d="M338.089 356.551H328.538L327.896 348.225H337.567L338.089 356.551Z"
                fill="black"
              ></path>
              <path
                d="M193.554 530.208H186.266L196.978 347.931H206.645L193.554 530.208Z"
                fill="#263238"
              ></path>
              <path
                opacity="0.5"
                d="M206.644 348.225L206.002 356.985L193.549 530.208H186.269L196.451 356.985L196.974 348.225H206.644Z"
                fill="white"
              ></path>
              <path
                opacity="0.2"
                d="M196.974 348.225H206.644L206.002 356.551H196.451L196.974 348.225Z"
                fill="black"
              ></path>
              <path
                d="M342.474 352.495H192.071C190.55 352.495 189.316 351.262 189.316 349.741V343.366H345.23V349.741C345.23 351.262 343.997 352.495 342.474 352.495Z"
                fill="#263238"
              ></path>
              <path
                opacity="0.6"
                d="M342.474 352.495H192.071C190.55 352.495 189.316 351.262 189.316 349.741V343.366H345.23V349.741C345.23 351.262 343.997 352.495 342.474 352.495Z"
                fill="white"
              ></path>
              <path
                opacity="0.2"
                d="M345.23 343.366H189.316V347.931H345.23V343.366Z"
                fill="black"
              ></path>
              <path
                d="M349.746 344.556H184.799C183.378 344.556 182.227 343.404 182.227 341.984C182.227 340.563 183.378 339.411 184.799 339.411H349.745C351.165 339.411 352.317 340.563 352.317 341.984C352.317 343.404 351.167 344.556 349.746 344.556Z"
                fill="#263238"
              ></path>
              <path
                opacity="0.6"
                d="M349.746 344.556H184.799C183.378 344.556 182.227 343.404 182.227 341.984C182.227 340.563 183.378 339.411 184.799 339.411H349.745C351.165 339.411 352.317 340.563 352.317 341.984C352.317 343.404 351.167 344.556 349.746 344.556Z"
                fill="white"
              ></path>
              <path
                d="M298.322 334.141V337.126C298.322 338.02 296.783 338.653 295.899 338.653H226.185C225.29 338.653 223.863 338.02 223.863 337.126V334.141H298.322Z"
                fill="#263238"
              ></path>
              <path
                opacity="0.6"
                d="M298.322 334.141V337.126C298.322 338.02 296.783 338.653 295.899 338.653H226.185C225.29 338.653 223.863 338.02 223.863 337.126V334.141H298.322Z"
                fill="white"
              ></path>
              <path
                opacity="0.2"
                d="M298.322 334.141V337.126C298.322 338.02 296.783 338.653 295.899 338.653H249.918C249.024 338.653 247.554 338.02 247.554 337.126V334.141H298.322Z"
                fill="black"
              ></path>
              <path
                d="M309.501 297.489L301.202 335.26C300.932 336.499 299.725 337.525 298.507 337.525H253.173C251.965 337.525 251.19 336.237 251.47 334.997L259.758 297.632C260.039 296.403 261.235 295.782 262.453 295.782H307.787C309.005 295.783 309.771 296.261 309.501 297.489Z"
                fill="#263238"
              ></path>
              <path
                opacity="0.6"
                d="M309.501 297.489L301.202 335.26C300.932 336.499 299.725 337.525 298.507 337.525H253.173C251.965 337.525 251.19 336.237 251.47 334.997L259.758 297.632C260.039 296.403 261.235 295.782 262.453 295.782H307.787C309.005 295.783 309.771 296.261 309.501 297.489Z"
                fill="white"
              ></path>
              <path
                opacity="0.4"
                d="M309.5 297.489L301.202 335.26C300.932 336.499 299.725 337.525 298.507 337.525H254.715C253.497 337.525 252.731 336.237 253.001 334.997L261.301 297.632C261.571 296.403 262.778 295.782 263.996 295.782H307.788C309.005 295.783 309.771 296.261 309.5 297.489Z"
                fill="white"
              ></path>
              <path
                opacity="0.2"
                d="M282.832 321.697C284.942 321.697 287.107 319.429 287.66 316.643C288.202 313.845 286.938 311.577 284.817 311.577C284.422 311.577 284.027 311.656 283.643 311.803C283.147 313.98 281.669 315.808 280.044 316.417C280.021 316.496 280 316.564 279.988 316.643C279.437 319.429 280.712 321.697 282.832 321.697Z"
                fill="black"
              ></path>
            </svg>
          </div>
        </motion.div>
        <div id="login-right">
          <motion.div
            id="login-menu"
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 20 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleauth}>
              <h2>{isSignUp ? "Sign up" : "Log in"}</h2>

              {isSignUp && (
                <>
                  <input
                    type="text"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    value={rollno}
                    placeholder="Roll No"
                    onChange={(e) => setRollno(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    value={phone}
                    placeholder="Phone Number"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </>
              )}

              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">{isSignUp ? "Sign up" : "Log in"}</button>

              <p>
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <span
                  onClick={() => setIsSignUp(!isSignUp)}
                  style={{ cursor: "pointer", color: "purple" }}
                >
                  {isSignUp ? "Log in here" : "Sign up here"}
                </span>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Login;
