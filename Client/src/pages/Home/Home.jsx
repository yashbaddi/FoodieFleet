import { useEffect, useState } from "react";
import RestaurantList from "./RestaurantList";
import { getAllRestaurants } from "../../services/requests";
import CreateRestaurantForm from "./createRestaurantForm";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [isRestaurantFormVisible, setRestaurantFormVisible] = useState(false);
  console.log("Restaurant Data:", restaurants);

  useEffect(() => {
    getAllRestaurants().then((data) => setRestaurants(data));
  }, []);

  function toggleFormComponentVisiblity() {
    setRestaurantFormVisible(!isRestaurantFormVisible);
  }
  console.log(isRestaurantFormVisible);
  return (
    <>
      Home Page
      <button onClick={toggleFormComponentVisiblity}>
        Create a Restaurant
      </button>
      {isRestaurantFormVisible && <CreateRestaurantForm />}
      <RestaurantList restaurants={restaurants} />
    </>
  );
}
