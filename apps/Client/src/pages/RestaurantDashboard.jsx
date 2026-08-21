import { Link } from "react-router-dom";

export default function RestaurantDashboard() {
  return (
    <div className="flex flex-col m-4">
      <div>
        <Link to="/my-account/restaurant-admin/new-restaurant">
          <button className="bg-gray-600 hover:bg-gray-800 text-white rounded p-2 m-2">
            Create a Restaurant
          </button>
        </Link>
      </div>
      <div>
        <Link to="/my-account/restaurant-admin/restaurants">
          <button className="bg-orange-600 text-orange-100 hover:bg-orange-800 rounded p-2 m-2 w-56">
            Your Restaurants
          </button>
        </Link>
      </div>
      <div>
        <Link to="/my-account/restaurant-admin/orders">
          <button className="bg-orange-600 text-orange-100 hover:bg-orange-800 rounded p-2 m-2 w-56">
            Restaurant Orders
          </button>
        </Link>
      </div>
    </div>
  );
}
