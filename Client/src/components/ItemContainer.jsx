import { useEffect, useState } from "react";
import { updateCartAction } from "../store/actionCreators/cart.action.js";
import { useDispatch, useSelector } from "react-redux";

export default function ItemContainer({ itemData }) {
  const itemsInCart = useSelector((state) => state.cart);
  console.log("items in selector", itemsInCart);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  let [item, setItem] = useState(itemData);
  // const [isItemFormVisible, setItemFormVisible] = useState(false);

  console.log("Item Console:", item);

  useEffect(() => {
    const filteredItem = itemsInCart.filter(
      (data) => data.item.id == itemData.id
    )[0];
    const itemQuantity = filteredItem !== undefined ? filteredItem.quantity : 0;
    console.log(itemQuantity);
    setQuantity(Number(itemQuantity));
  }, []);

  async function addOrderItem() {
    setQuantity(Number(quantity) + 1);
    console.log(quantity);
    dispatch(updateCartAction(item.id, Number(quantity) + 1));
  }

  async function removeOrderedItem() {
    if (quantity > 0) {
      setQuantity(Number(quantity) - 1);
      dispatch(updateCartAction(item.id, Number(quantity) - 1));
    }
  }

  // function updateItemComponent(updatedItem) {
  //   setItem(updatedItem);
  //   console.log(item);
  //   toggleFormComponentVisiblity();
  // }

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
