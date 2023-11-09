import { Link } from "react-router-dom";
import { deleteRestaurant } from "../services/requests";

function RestaurantContainerEditable({ restaurant, onUpdate }) {
  async function deleteRestaurantHandler() {
    deleteRestaurant(restaurant.id);
    onUpdate(restaurant.id);
  }
  return (
    <>
      <Link to={`/my-account/restaurants/${restaurant.id}`}>
        <div className="border mx-3 my-1 p-2">
          <h3>{restaurant.name}</h3>
          <p>{restaurant.description}</p>
        </div>
      </Link>

      <Link to={`/my-account/restaurants/${restaurant.id}/update`}>
        <button>Update Restaurant</button>
      </Link>

      <button onClick={deleteRestaurantHandler}>Delete Restaurant</button>
    </>
  );
}

export default RestaurantContainerEditable;
