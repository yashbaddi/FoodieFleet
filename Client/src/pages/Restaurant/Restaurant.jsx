import { useParams } from "react-router-dom";
import ItemsList from "./ItemList";
import { sampleRestaurant } from "../../hooks/data";

export default function Restaurant() {
  const { id } = useParams();
  const restaurant = sampleRestaurant.filter(
    (restaurant) => restaurant.id == id
  )[0];
  console.log("rest:", restaurant);
  return (
    <>
      <h1>{restaurant.name}</h1>
      <ItemsList id={id} />
    </>
  );
}
