import RestaurantsByUser from "../components/RestaurantsByUser";
import { Link } from "react-router-dom";

export default function RestaurantDashboard() {
  return (
    <>
      Home Page
      <Link to="/my-account/restaurants/new">
        <button>Create a Restaurant</button>
      </Link>
      <RestaurantsByUser />
    </>
  );
}
