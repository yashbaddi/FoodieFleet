import { useParams } from "react-router-dom";
import ItemsList from "./ItemList";
import { useEffect, useState } from "react";
import { getRestaurant } from "../../services/requests";
import CreateItemForm from "./createItemForm";

export default function Restaurant() {
  const [isItemFormVisible, setItemFormVisible] = useState(false);
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {
    getRestaurant(id).then((data) => setRestaurant(data));
  }, []);

  function toggleFormComponentVisiblity() {
    setItemFormVisible(!isItemFormVisible);
  }

  console.log("rest:", restaurant);
  return (
    <>
      <button onClick={toggleFormComponentVisiblity}>Create a Item</button>
      {isItemFormVisible && <CreateItemForm restaurantID={id} />}
      <h1>{restaurant.name}</h1>
      <ItemsList id={id} />
    </>
  );
}
