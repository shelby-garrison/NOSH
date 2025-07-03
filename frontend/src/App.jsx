import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import './App.css';

const socket = io("http://localhost:5000"); 

export default function App() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchDishes();

    socket.on("dishUpdated", (updatedDish) => {
      setDishes(prev =>
        prev.map(dish =>
          dish.dishId === updatedDish.dishId ? updatedDish : dish
        )
      );
    });

    return () => socket.off("dishUpdated");
  }, []);

  const fetchDishes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dishes");
      setDishes(res.data);
    } catch (err) {
      console.error("Error fetching dishes:", err);
    }
  };

  const togglePublish = async (dishId) => {
    try {
      await axios.patch(`http://localhost:5000/api/dishes/${dishId}/toggle`);
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  };

  return (
    <div>
      <h1 className="dashboard-header">Dish Dashboard</h1>
      <div className="dish-grid">
        {dishes.map(dish => (
          <div key={dish.dishId} className="dish-card">
            <img src={dish.imageUrl} alt={dish.dishName} />
            <h3>{dish.dishName}</h3>
            <p>Status: <strong>{dish.isPublished ? "Published" : "Unpublished"}</strong></p>
            <button onClick={() => togglePublish(dish.dishId)}>
              Toggle Status
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
