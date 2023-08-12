import { Link } from "react-router-dom";
import { deleteRestaurant } from "../../services/requests";

export default function RestaurantContainer(props) {
  console.log("Restaurant props", props);
  async function deleteRestaurantHandler() {
    deleteRestaurant(props.restaurant.id);
  }
  return (
    <>
      <Link to={`/restaurant/${props.restaurant.id}`}>
        <div className="border mx-3 my-1 p-2">
          <h3>{props.restaurant.name}</h3>
          <p>{props.restaurant.description}</p>
        </div>
      </Link>
      <button onClick={deleteRestaurantHandler}>Delete</button>
    </>
  );
}
