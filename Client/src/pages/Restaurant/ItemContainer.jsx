import { useState } from "react";
import { orderID } from "../../Data/sampleData";
import { addItemToOrder, removeItemFromOrder } from "../../services/requests";

export default function ItemContainer(props) {
  const [quantity, setQuantity] = useState(0);
  console.log("Item Conosle:", props);
  async function addItem() {
    const res = await addItemToOrder(orderID, props.item.id);
    setQuantity(res.quantity);
  }

  async function removeItem() {
    const res = await removeItemFromOrder(orderID, props.item.id);
    setQuantity(res.quantity);
  }
  return (
    <>
      <div className="border mx-3 my-1 p-2">
        <h3>{props.item.name}</h3>
        <p>{props.item.description}</p>
        <p>vegitarian:{props.item.is_vegitarian}</p>
        <p>price:{props.item.price}</p>
        <div className="border">
          <button onClick={addItem}>+</button>
          <text>{quantity}</text>
          <button onClick={removeItem}>-</button>
        </div>
      </div>
    </>
  );
}
