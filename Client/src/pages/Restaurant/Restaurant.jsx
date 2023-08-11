import { useParams } from "react-router-dom";
import ItemsList from "./ItemList";
import { useEffect, useState } from "react";
import { getRestaurant } from "../../services/requests";

export default function Restaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {
    getRestaurant(id).then((data) => setRestaurant(data));
  }, []);

  console.log("rest:", restaurant);
  return (
    <>
      <h1>{restaurant.name}</h1>
      <ItemsList id={id} />
    </>
  );
}
