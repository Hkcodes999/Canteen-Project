import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Meal.css";

function Meal({ meal, addToCart }) {
  const [qty, setQty] = useState(0);

  const handleIncrease = () => {
    if (qty < 10) setQty(qty + 1);
  };

  const handleDecrease = () => {
    if (qty > 0) setQty(qty - 1);
  };

  return (
    <motion.div
      id="meal-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <motion.div 
        id="meal-img"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <img
          src={meal.image}
          alt="Meal"
          loading="lazy"
        />
      </motion.div>

      <motion.div 
        id="meal-details"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2>{meal.name}</h2>
        <p>{meal.description}</p>
        <h4>₹{meal.price}</h4>
        <div id="add-div">
          <button onClick={handleDecrease} id="add-buttons">
            −
          </button>
          <span>{qty}</span>
          <button onClick={handleIncrease} id="add-buttons">
            +
          </button>
          <button id="add-buttons" onClick={() => addToCart(meal, qty)}>
            Add to cart
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Meal;
