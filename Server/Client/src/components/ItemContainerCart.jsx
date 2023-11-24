import { useEffect, useState } from "react";
import { updateCartAction } from "../store/actionCreators/cart.action.js";
import { useDispatch, useSelector } from "react-redux";

export default function ItemContainerCart(props) {
  const itemsInCart = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(props.quantity);

  console.log("OrderContainerProps", props);
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredItem = itemsInCart.filter(
      (data) => data.item.id == props.item.id
    )[0];
    const itemQuantity = filteredItem !== undefined ? filteredItem.quantity : 0;
    console.log(itemQuantity);
    setQuantity(Number(itemQuantity));
  }, []);

  async function addOrderItem() {
    setQuantity(Number(quantity) + 1);
    console.log(quantity);
    dispatch(updateCartAction(props.item.id, Number(quantity) + 1));
  }

  async function removeOrderedItem() {
    if (quantity > 0) {
      setQuantity(Number(quantity) - 1);
      dispatch(updateCartAction(props.item.id, Number(quantity) - 1));
    }
  }
  return (
    <div className="border mx-3 my-1 p-2">
      <h1>{props.item.name}</h1>
      <p>Price:{props.item.price}</p>
      <div className="border">
        <button onClick={addOrderItem}>+</button>
        <text>{quantity}</text>
        <button onClick={removeOrderedItem}>-</button>
      </div>
    </div>
  );
}
