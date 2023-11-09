import React from "react";
import foodieFleet from "../assets/foodie-fleet.svg";

export default function Logo() {
  return (
    <div>
      <img src={foodieFleet} alt="Foodie Fleet" className="h-5 mr-3" />
    </div>
  );
}
