import { useEffect, useState } from "react";
import ItemContainer from "./ItemContainer";
import { getRestaurantMenu } from "../../services/requests";

export default function ItemsList({ id }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getRestaurantMenu(id).then((data) => setItems(data));
  }, [id]);

  function updateList(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  console.log("Items", items);
  return (
    <>
      List of Items
      {items.map((item) => {
        return (
          <ItemContainer key={item.id} itemData={item} onUpdate={updateList} />
        );
      })}
    </>
  );
}
