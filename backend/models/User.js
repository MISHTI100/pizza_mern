// src/pages/User.js
import React, { useEffect, useState } from "react";
import "./User.css";

export default function User() {
  const [user, setUser] = useState(null);

  // For demo purposes, we'll load user info from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || {
      name: "John Doe",
      email: "johndoe@example.com",
      orders: [
        { id: 1, item: "Margherita", quantity: 2, price: 250 },
        { id: 2, item: "Pepperoni", quantity: 1, price: 350 },
      ],
    };
    setUser(savedUser);
  }, []);

  if (!user) return <div>Loading user info...</div>;

  return (
    <div
      className="user-page"
      style={{ backgroundColor: "#e0f7ff", minHeight: "100vh", padding: "2rem" }}
    >
      <h1 style={{ textAlign: "center", color: "#000" }}>User Profile</h1>

      <div className="user-info-box">
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
      </div>

      <h2 style={{ marginTop: "2rem", textAlign: "center", color: "#000" }}>Your Orders</h2>
      <div className="orders-container">
        {user.orders.length > 0 ? (
          user.orders.map((order) => (
            <div key={order.id} className="order-box">
              <p>Item: {order.item}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Price: ₹{order.price}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>You have no orders yet.</p>
        )}
      </div>
    </div>
  );
}
