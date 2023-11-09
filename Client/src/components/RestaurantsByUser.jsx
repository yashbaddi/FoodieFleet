import React, { useEffect, useState } from "react";
import { getAllOwnedRestaurants } from "../services/requests";
import RestaurantContainerEditable from "./RestaurantContainerEditable";

export default function RestaurantsByUser() {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    getAllOwnedRestaurants().then((data) => setRestaurants(data));
  }, []);

  function updateList(id) {
    setRestaurants((restaurants) =>
      restaurants.filter((restaurant) => restaurant.id !== id)
    );
  }

  return (
    <div>
      {restaurants.map((restaurant) => {
        return (
          <RestaurantContainerEditable
            key={restaurant.id}
            restaurant={restaurant}
            onUpdate={updateList}
          />
        );
      })}
    </div>
  );
}
