import { useEffect, useState } from "react";
import ItemContainer from "./ItemContainer";
import { getRestaurantMenu } from "../services/requests";

export default function ItemsList({ id }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getRestaurantMenu(id).then((data) => setItems(data));
  }, [id]);
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      {items.map((item) => {
        return <ItemContainer key={item.id} itemData={item} />;
      })}
    </div>
  );
}
