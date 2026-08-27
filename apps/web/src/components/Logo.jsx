import React from "react";
import FoodieFleetLogo from "../assets/foodie-fleet.svg";

export default function Logo() {
  return (
    <div>
      <img src={FoodieFleetLogo} alt="Foodie Fleet" className="h-5 mr-3" />
    </div>
  );
}
