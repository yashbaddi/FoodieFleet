import { useEffect, useState } from "react";
import ItemContainer from "./ItemContainer";
import { getRestaurantMenu } from "../../services/requests";

export default function ItemsList(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getRestaurantMenu(props.id).then((data) => setItems(data));
  }, []);

  console.log("Items", items);
  return (
    <>
      List of Items
      {items.map((item, index) => {
        return <ItemContainer key={index} item={item} />;
      })}
    </>
  );
}
