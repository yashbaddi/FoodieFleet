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
    <div className="grid grid-cols-6">
      <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-3 justify-items-stretch m-7 col-start-2 col-end-6">
        {restaurants.map((restaurant, index) => {
          return <RestaurantContainer key={index} restaurant={restaurant} />;
        })}
      </div>
    </div>
  );
}
