import { Link } from "react-router-dom";
import { deleteRestaurant } from "../../services/requests";

export default function RestaurantContainer({ restaurant, onUpdate }) {
  console.log("Restaurant props", restaurant);

  async function deleteRestaurantHandler() {
    deleteRestaurant(restaurant.id);
    onUpdate(restaurant.id);
  }
  return (
    <>
      <Link to={`/restaurant/${restaurant.id}`}>
        <div className="border mx-3 my-1 p-2">
          <h3>{restaurant.name}</h3>
          <p>{restaurant.description}</p>
        </div>
      </Link>
      <button onClick={deleteRestaurantHandler}>Delete</button>
      <Link to={`/restaurant/${restaurant.id}/update`}>
        <button>Update Restaurant</button>
      </Link>
    </>
  );
}
