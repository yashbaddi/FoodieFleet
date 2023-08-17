import { useEffect, useState } from "react";
import RestaurantList from "./RestaurantList";

// import { getAllRestaurants } from "../../services/requests";
import CreateRestaurantForm from "./createRestaurantForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurants } from "../../store/actions/restaurants.action";

export default function Home() {
  // const [restaurants, setRestaurants] = useState([]);
  const restaurants = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();
  const [isRestaurantFormVisible, setRestaurantFormVisible] = useState(false);
  console.log("Restaurant Data:", restaurants);

  useEffect(() => {
    // getAllRestaurants().then((data) => setRestaurants(data));
    console.log("In use Effect");
    dispatch(getAllRestaurants());
  }, [dispatch]);

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
