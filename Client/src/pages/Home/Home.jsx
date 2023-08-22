import RestaurantList from "./RestaurantList";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      Home Page
      <Link to="/restaurant/new">
        <button>Create a Restaurant</button>
      </Link>
      <RestaurantList />
    </>
  );
}
