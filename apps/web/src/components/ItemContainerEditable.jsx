import { useEffect, useState } from "react";
import { deleteItem } from "../services/requests.js";
import { updateCartAction } from "../store/actionCreators/cart.action.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ItemContainer({ itemData, onUpdate }) {
  const itemsInCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(0);
  let [item, setItem] = useState(itemData);
  useEffect(() => {
    const filteredItem = itemsInCart.filter(
      (data) => data.item.id == itemData.id
    )[0];
    const itemQuantity = filteredItem !== undefined ? filteredItem.quantity : 0;
    setQuantity(Number(itemQuantity));
  }, []);

  async function deleteItemFromRestaurant() {
    await deleteItem(item.restaurant_id, item.id);
    onUpdate(item.id);
  }

  async function addOrderItem() {
    setQuantity(Number(quantity) + 1);
    dispatch(updateCartAction(item.id, Number(quantity) + 1));
  }

  async function removeOrderedItem() {
    if (quantity > 0) {
      setQuantity(Number(quantity) - 1);
      dispatch(updateCartAction(item.id, Number(quantity) - 1));
    }
  }

  return (
    <div className="border mx-3 my-1 p-2">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>vegitarian:{item.is_vegitarian}</p>
      <p>price:{item.price}</p>
      <div className="border">
        <button onClick={addOrderItem}>+</button>
        <text>{quantity}</text>
        <button onClick={removeOrderedItem}>-</button>
      </div>

      <button onClick={deleteItemFromRestaurant}>Delete</button>

      <Link to={`/restaurant/${item.restaurant_id}/item/${item.id}/update`}>
        <button>Update Item</button>
      </Link>
    </div>
  );
}
