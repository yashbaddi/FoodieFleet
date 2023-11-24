import { Link } from "react-router-dom";

export default function RestaurantContainer({ restaurant }) {
  console.log("Restaurant props", restaurant);

  return (
    <>
      <Link to={`/restaurant/${restaurant.id}`}>
        <div className="border mx-3 my-1 p-2">
          <h3>{restaurant.name}</h3>
          <p>{restaurant.description}</p>
        </div>
      </Link>
    </>
  );
}
