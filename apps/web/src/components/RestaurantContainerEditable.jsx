import { Link } from "react-router-dom";
import { deleteRestaurant } from "../services/requests";

function RestaurantContainerEditable({ restaurant, onUpdate }) {
  async function deleteRestaurantHandler() {
    deleteRestaurant(restaurant.id);
    onUpdate(restaurant.id);
  }
  return (
    <div className="m-4 p-2 shadow-xl border-2 rounded-lg w-96">
      <Link to={`/my-account/restaurant-admin/restaurants/${restaurant.id}`}>
        <div className="flex flex-col items-center justify-center m-8">
          <h3 className="text-3xl text-gray-700">{restaurant.name}</h3>
          <p className="text-sm text-gray-400">{restaurant.description}</p>
        </div>
      </Link>

      <Link
        to={`/my-account/restaurant-admin/restaurants/${restaurant.id}/update`}
      >
        <button className="bg-orange-600 text-orange-100 hover:bg-orange-800 rounded p-2 m-2 w-56">
          Update Restaurant
        </button>
      </Link>

      <button
        onClick={deleteRestaurantHandler}
        className="bg-gray-600 text-orange-100 hover:bg-red-800 rounded p-2 m-2 w-56"
      >
        Delete Restaurant
      </button>
    </div>
  );
}

export default RestaurantContainerEditable;
