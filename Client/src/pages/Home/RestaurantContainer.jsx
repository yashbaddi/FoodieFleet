import { Link } from "react-router-dom";

export default function RestaurantContainer(props) {
  console.log("Restaurant props", props);
  return (
    <>
      <Link to={`/restaurant/${props.restaurant.id}`}>
        <div className="border mx-3 my-1 p-2">
          <h3>{props.restaurant.name}</h3>
          <p>{props.restaurant.description}</p>
        </div>
      </Link>
    </>
  );
}
