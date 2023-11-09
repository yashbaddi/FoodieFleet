import { Link, useParams } from "react-router-dom";
import ItemsList from "../components/ItemList";
import { useEffect, useState } from "react";
import { getRestaurant } from "../services/requests";

export default function RestaurantUpdate() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    getRestaurant(id).then((data) => setRestaurant(data));
  }, [id]);

  console.log("rest:", restaurant);
  return (
    <>
      <h1>{restaurant.name}</h1>
      <Link to={`/restaurant/${id}/item/new`}>
        <button>Create Item</button>
      </Link>
      <ItemsList id={id} />
    </>
  );
}