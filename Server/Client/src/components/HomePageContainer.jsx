import { useEffect, useState } from "react";
import RestaurantContainer from "./RestaurantContainer";
import { useDispatch } from "react-redux";
import { getCartItemsAction } from "../store/actionCreators/cart.action";
import { getAllOpenedRestaurants } from "../services/requests";

export default function HomePageContainer() {
  const [restaurants, setRestaurants] = useState([]);
  const dispatch = useDispatch();
  console.log("Restaurant Data:", restaurants);
  dispatch(getCartItemsAction());

  useEffect(() => {
    getAllOpenedRestaurants().then((data) => setRestaurants(data));
    console.log("In use Effect");
    // dispatch(getAllRestaurants());
  }, []);

  function updateList(id) {
    setRestaurants((restaurants) =>
      restaurants.filter((restaurant) => restaurant.id !== id)
    );
  }
  return (
    <>
      List of Restaurant
      {restaurants.map((restaurant, index) => {
        return <RestaurantContainer key={index} restaurant={restaurant} />;
      })}
    </>
  );
}
