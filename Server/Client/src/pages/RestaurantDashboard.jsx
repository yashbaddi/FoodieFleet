import { Link } from "react-router-dom";

export default function RestaurantDashboard() {
  return (
    <>
      Home Page
      <Link to="/my-account/restaurant-admin/new">
        <button>Create a Restaurant</button>
      </Link>
      <Link to="/my-account/restaurant-admin/restaurants">
        <button>Edit Restaurants</button>
      </Link>
      <Link to="/my-account/restaurant-admin/orders">
        <button>Restaurant Orders</button>
      </Link>
    </>
  );
}
