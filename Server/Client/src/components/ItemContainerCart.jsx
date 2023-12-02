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
    <div className="border-2 flex justify-between py-4 px-2 w-56">
      <div>
        <h1 className="text-xl">{props.item.name}</h1>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-gray-600">₹{props.item.price}</p>
        <div className="flex items-baseline">
          <button
            onClick={addOrderItem}
            className="bg-green-600 hover:bg-green-800 text-gray-100 px-2 py-0.5 rounded"
          >
            +
          </button>
          <text className="text-xl text-gray-700 p-0.5">{quantity}</text>
          <button
            onClick={removeOrderedItem}
            className="bg-gray-400 hover:bg-gray-800 text-gray-100 px-2 py-0.5 rounded"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}
