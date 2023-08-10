import { useEffect, useState } from "react";
import RestaurantList from "./RestaurantList";
import { getAllRestaurants } from "../../services/requests";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  console.log("Restaurant Data:", restaurants);
  useEffect(() => {
    getAllRestaurants().then((data) => setRestaurants(data));
  }, []);
  return (
    <>
      Home Page
      <RestaurantList restaurants={restaurants} />
    </>
  );
}
