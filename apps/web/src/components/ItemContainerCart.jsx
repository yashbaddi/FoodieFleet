import { useEffect, useState } from "react";
import { updateCartAction } from "../store/actionCreators/cart.action.js";
import { useDispatch, useSelector } from "react-redux";

export default function ItemContainerCart(props) {
  const itemsInCart = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(props.quantity);

  const dispatch = useDispatch();

  useEffect(() => {
    const filteredItem = itemsInCart.filter(
      (data) => data.item.id == props.item.id
    )[0];
    const itemQuantity = filteredItem !== undefined ? filteredItem.quantity : 0;
    setQuantity(Number(itemQuantity));
  }, []);

  async function addOrderItem() {
    setQuantity(Number(quantity) + 1);
    dispatch(updateCartAction(props.item.id, Number(quantity) + 1));
  }

  async function removeOrderedItem() {
    if (quantity > 0) {
      setQuantity(Number(quantity) - 1);
      dispatch(updateCartAction(props.item.id, Number(quantity) - 1));
    }
  }
  return (
    <div className="border rounded-xl shadow flex justify-between p-4 w-fit hover:bg-gray-100">
      <div className="m-4 p-2">
        <h1 className="text-xl">{props.item.name}</h1>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-gray-600">₹{props.item.price * quantity}</p>
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
