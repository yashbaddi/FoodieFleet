import { useEffect, useState } from "react";
import { updateCartAction } from "../store/actionCreators/cart.action.js";
import { useDispatch, useSelector } from "react-redux";
import vegIcon from "../assets/veg-icon.svg";
import nonVegIcon from "../assets/non-veg-icon.svg";

export default function ItemContainer({ itemData }) {
  const itemsInCart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  let [item, setItem] = useState(itemData);
  // const [isItemFormVisible, setItemFormVisible] = useState(false);

  useEffect(() => {
    const filteredItem = itemsInCart.filter(
      (data) => data.item.id == itemData.id
    )[0];
    const itemQuantity = filteredItem !== undefined ? filteredItem.quantity : 0;

    setQuantity(Number(itemQuantity));
  }, []);

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
    <div className="border flex justify-between rounded-xl mx-3 my-3 shadow-lg p-4 w-96">
      <div className="flex flex-col items-start">
        {item.is_vegetarian ? (
          <img
            className="h-3 my-2 aspect-square"
            src={vegIcon}
            alt="Vegetarian"
          />
        ) : (
          <img
            className="h-3 my-2 aspect-square"
            src={nonVegIcon}
            alt="Non Vegetarian"
          />
        )}
        <h3 className="text-lg my-2">{item.name}</h3>
        <p className="text-xs text-gray-500 my-1">{item.description}</p>
      </div>
      <div className="flex flex-col justify-evenly">
        <p className="text-green">₹{item.price}</p>
        {quantity ? (
          <div className="flex items-baseline">
            <button
              onClick={addOrderItem}
              className="bg-green-600 hover:bg-green-800 text-gray-100 px-2 py-0.5 rounded shadow-md"
            >
              +
            </button>
            <text className="text-xl text-gray-700 p-0.5">{quantity}</text>
            <button
              onClick={removeOrderedItem}
              className="bg-gray-400 hover:bg-gray-800 text-gray-100 px-2 py-0.5 rounded shadow-md"
            >
              -
            </button>
          </div>
        ) : (
          <button
            onClick={addOrderItem}
            className="bg-green-600 hover:bg-green-800 rounded text-base text-green-50 shadow-md"
          >
            ADD
          </button>
        )}
      </div>

      {/* <button onClick={toggleFormComponentVisiblity}>Update Item</button> */}

      {/* {isItemFormVisible && (
        <UpdateItemForm
          restaurantID={item.restaurant_id}
          itemID={item.id}
          onUpdate={updateItemComponent}
          currentItem={item}
        />
      )} */}
    </div>
  );
}
