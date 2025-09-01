import React, { useEffect, useState } from "react";
import "./Menu.css";
import { IoSearchCircleSharp } from "react-icons/io5";
import Meal from "../Meal/Meal";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-hot-toast";

function Menu() {
  const [user, setUser] = useState("");
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const { addToCart: addToGlobalCart } = useOutletContext() || {};

  const meals = [
    {
      id: 1,
      name: "Paneer Butter Masala",
      description: "Creamy tomato-based curry with soft paneer cubes.",
      price: 90,
      image: "/Meal-imgs/Meal 1.webp",
      category: "meal",
    },
    {
      id: 2,
      name: "Chole Bhature",
      description: "Spicy chickpeas served with fluffy fried bhature.",
      price: 60,
      image: "/Meal-imgs/Meal 2.webp",
      category: "meal",
    },
    {
      id: 3,
      name: "Veg Biryani",
      description: "Aromatic rice cooked with veggies and spices.",
      price: 70,
      image: "/Meal-imgs/Meal 3.webp",
      category: "meal",
    },
    {
      id: 4,
      name: "Rajma Chawal",
      description: "Red kidney beans curry served with steamed rice.",
      price: 65,
      image: "/Meal-imgs/Meal 4.webp",
      category: "meal",
    },
    {
      id: 5,
      name: "Masala Dosa",
      description: "Crispy dosa filled with spicy mashed potatoes.",
      price: 50,
      image: "/Meal-imgs/Meal 5.webp",
      category: "meal",
    },
    {
      id: 6,
      name: "Pav Bhaji",
      description: "Spicy mashed vegetables served with buttered pav.",
      price: 45,
      image: "/Meal-imgs/Meal 6.webp",
      category: "meal",
    },
    {
      id: 7,
      name: "Vegetable Pulao",
      description: "Fragrant rice cooked with fresh vegetables.",
      price: 50,
      image: "/Meal-imgs/Meal 7.webp",
      category: "meal",
    },
    {
      id: 8,
      name: "Aloo Paratha",
      description: "Stuffed flatbread with spicy mashed potatoes.",
      price: 40,
      image: "/Meal-imgs/Meal 8.webp",
      category: "meal",
    },
    {
      id: 9,
      name: "Mix Veg Curry",
      description: "Seasonal vegetables cooked in Indian gravy.",
      price: 55,
      image: "/Meal-imgs/Meal 9.webp",
      category: "meal",
    },
    {
      id: 10,
      name: "Dal Tadka",
      description: "Yellow lentils tempered with ghee and spices.",
      price: 40,
      image: "/Meal-imgs/Meal 10.webp",
      category: "meal",
    },
    {
      id: 11,
      name: "Samosa",
      description: "Crispy fried snack stuffed with spiced potatoes.",
      price: 15,
      image: "/Meal-imgs/Meal 11.webp",
      category: "snack",
    },
    {
      id: 12,
      name: "Vada Pav",
      description: "Mumbai-style potato fritter in a bun with chutney.",
      price: 20,
      image: "/Meal-imgs/Meal 12.webp",
      category: "snack",
    },
    {
      id: 13,
      name: "Poha",
      description: "Flattened rice cooked with onions and mustard seeds.",
      price: 25,
      image: "/Meal-imgs/Meal 13.webp",
      category: "snack",
    },
    {
      id: 14,
      name: "Idli Sambhar",
      description: "Soft rice cakes served with spicy lentil soup.",
      price: 35,
      image: "/Meal-imgs/Meal 14.webp",
      category: "snack",
    },
    {
      id: 15,
      name: "Dhokla",
      description: "Steamed savory cake made from fermented batter.",
      price: 30,
      image: "/Meal-imgs/Meal 15.webp",
      category: "snack",
    },
    {
      id: 16,
      name: "Veg Sandwich",
      description: "Fresh veggies layered between grilled bread slices.",
      price: 30,
      image: "/Meal-imgs/Meal 16.webp",
      category: "snack",
    },
    {
      id: 17,
      name: "Cheese Sandwich",
      description: "Grilled sandwich loaded with melted cheese.",
      price: 40,
      image: "/Meal-imgs/Meal 17.webp",
      category: "snack",
    },
    {
      id: 18,
      name: "Margherita Pizza",
      description: "Classic cheese pizza with tomato sauce and herbs.",
      price: 120,
      image: "/Meal-imgs/Meal 18.webp",
      category: "western",
    },
    {
      id: 19,
      name: "Veg Pasta",
      description: "Creamy pasta with sautéed vegetables.",
      price: 100,
      image: "/Meal-imgs/Meal 19.webp",
      category: "western",
    },
    {
      id: 20,
      name: "French Fries",
      description: "Crispy golden fries with salt and seasoning.",
      price: 40,
      image: "/Meal-imgs/Meal 20.webp",
      category: "western",
    },
    {
      id: 21,
      name: "Veg Burger",
      description: "Burger with vegetable patty, lettuce, and sauces.",
      price: 60,
      image: "/Meal-imgs/Meal 21.webp",
      category: "western",
    },
    {
      id: 22,
      name: "Garlic Bread",
      description: "Toasted bread with garlic butter and herbs.",
      price: 45,
      image: "/Meal-imgs/Meal 22.webp",
      category: "western",
    },
    {
      id: 23,
      name: "Masala Chai",
      description: "Indian-style spiced milk tea.",
      price: 10,
      image: "/Meal-imgs/Meal 23.webp",
      category: "drink",
    },
    {
      id: 24,
      name: "Cold Coffee",
      description: "Chilled coffee blended with milk and sugar.",
      price: 30,
      image: "/Meal-imgs/Meal 24.webp",
      category: "drink",
    },
    {
      id: 25,
      name: "Nimbu Pani",
      description: "Refreshing lemonade with a pinch of salt.",
      price: 15,
      image: "/Meal-imgs/Meal 25.webp",
      category: "drink",
    },
    {
      id: 26,
      name: "Amul Buttermilk",
      description: "Cool and salty yogurt-based drink.",
      price: 15,
      image: "/Meal-imgs/Meal 26.webp",
      category: "drink",
    },
    {
      id: 27,
      name: "Lassi",
      description: "Sweet creamy yogurt drink topped with malai.",
      price: 25,
      image: "/Meal-imgs/Meal 27.webp",
      category: "drink",
    },
    {
      id: 28,
      name: "Frooti",
      description: "Popular mango drink loved across India.",
      price: 20,
      image: "/Meal-imgs/Meal 28.webp",
      category: "drink",
    },
    {
      id: 29,
      name: "Smoodh",
      description: "Thick milk with flavour",
      price: 10,
      image: "/Meal-imgs/Meal 29.webp",
      category: "drink",
    },
    {
      id: 30,
      name: "pepsi",
      description: "Strong fizzy cola drink with bold flavor.",
      price: 25,
      image: "/Meal-imgs/Meal 30.webp",
      category: "drink",
    },
    {
      id: 31,
      name: "Sprite",
      description: "Lemon-lime refreshing carbonated soft drink.",
      price: 25,
      image: "/Meal-imgs/Meal 31.webp",
      category: "drink",
    },
    {
      id: 32,
      name: "Monster",
      description: "Crisp lemon-flavored aerated drink.",
      price: 20,
      image: "/Meal-imgs/Meal 32.webp",
      category: "drink",
    },
  ];

  const addToCart = (meal, qty) => {
    if (typeof addToGlobalCart === "function") {
      addToGlobalCart(meal, qty);
      return;
    }
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


  const isMatch = (meal) => {
    const matchCategory = category === "all" || meal.category === category;
    const matchSearch = meal.name.toLowerCase().includes(filter.toLowerCase());
    return matchCategory && matchSearch;
  };
  const filteredMeals = meals.filter(isMatch);
  const hasMatches = filteredMeals.length > 0;

  return (
    <motion.div
      id="menu-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div id="menu">
        <motion.div
          id="search-nav"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div id="search-left">
            <img src="./main-logo.png" alt="Logo" />
          </div>
          <div id="search-right">
            <input
              type="text"
              placeholder="Search Meals"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCategory("all");
              }}
            />
            <IoSearchCircleSharp id="search-icon" />
          </div>
        </motion.div>

        <div id="meals-wrapper">
          <motion.div
            id="filter-div"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div id="main-text">
              <h2> Special Menu</h2>
            </div>
            <div id="filter-buttons">
              {["all", "meal", "western", "snack", "drink"].map(
                (cat, index) => (
                  <motion.button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setFilter("");
                    }}
                    className={category === cat ? "active-filter" : ""}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 + index * 0.1 }}
                  >
                    {cat === "all"
                      ? "All"
                      : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </motion.button>
                )
              )}
            </div>
          </motion.div>

          <motion.div
            id="main-meals"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {!hasMatches ? (
              <motion.p
                style={{
                  fontSize: "1.5rem",
                  color: "#777",
                  textAlign: "center",
                  marginTop: "2vh",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Search not found
              </motion.p>
            ) : (
              <>
                {filteredMeals.map((meal, index) => (
                  <Meal key={meal.id} meal={meal} addToCart={addToCart} />
                ))}
              </>
            )}
          </motion.div>
        </div>
      </div>

    </motion.div>
  );
}

export default Menu;
