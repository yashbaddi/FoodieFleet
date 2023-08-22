import { getCartItems, updateCart } from "../../services/requests";

export function updateCartAction(itemID, quantity) {
  return async (dispatch) => {
    const responseJSONData = await updateCart(itemID, quantity);
    console.log("in update Quantity", responseJSONData);
    if (responseJSONData.quantity >= 0) {
      dispatch({ type: "UPDATE_CART_ITEM", payload: responseJSONData });
    } else {
      dispatch({ type: "DELETE_CART_ITEM", payload: responseJSONData });
    }
  };
}

export function getCartItemsAction() {
  return async (dispatch) => {
    const responseJSONData = await getCartItems();
    console.log(responseJSONData);
    dispatch({ type: "READ_CART", payload: responseJSONData });
  };
}

// export async function removeItemFromOrder(orderID, itemID) {
//   const path = "orders/" + orderID;
//   const response = await fetch(baseURL + path, {
//     method: "PUT",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify({
//       item: {
//         id: itemID,
//         action: "remove_item",
//       },
//     }),
//   });
//   return response.json();
// }
