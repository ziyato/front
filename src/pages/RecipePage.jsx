import React from "react";
import { useLocation } from "react-router-dom";
import "./RecipePage.css";

const RecipePage = () => {
  const location = useLocation();
  const { selectedItems } = location.state || { selectedItems: [] };

  return (
    <div className="RecipePage">
      <h1>선택된 음식들</h1>
      <ul>
        {selectedItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipePage;
