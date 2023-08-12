import { useState } from "react";
import { orderID } from "../../Data/sampleData";
import {
  addItemToOrder,
  deleteItem,
  removeItemFromOrder,
} from "../../services/requests";

export default function ItemContainer(props) {
  const [quantity, setQuantity] = useState(0);
  console.log("Item Conosle:", props);

  async function deleteItemFromRestaurant() {
    deleteItem(props.item.restaurant_id, props.item.id);
  }
  async function addOrderItem() {
    const res = await addItemToOrder(orderID, props.item.id);
    setQuantity(res.quantity);
  }

  async function removeOrderedItem() {
    const res = await removeItemFromOrder(orderID, props.item.id);
    setQuantity(res.quantity);
  }
  return (
    <div className="border mx-3 my-1 p-2">
      <h3>{props.item.name}</h3>
      <p>{props.item.description}</p>
      <p>vegitarian:{props.item.is_vegitarian}</p>
      <p>price:{props.item.price}</p>
      <div className="border">
        <button onClick={addOrderItem}>+</button>
        <text>{quantity}</text>
        <button onClick={removeOrderedItem}>-</button>
      </div>
      <button onClick={deleteItemFromRestaurant}>Delete</button>
    </div>
  );
}
