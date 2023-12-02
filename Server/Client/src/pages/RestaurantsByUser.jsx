import React, { useEffect, useState } from "react";
import { getAllOwnedRestaurants } from "../services/requests";
import RestaurantContainerEditable from "../components/RestaurantContainerEditable";

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
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-gray-800 p-2 m-2">
        Restaurants Owened By You
      </h1>
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
