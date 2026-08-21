const initalState = [];

export function cartReducer(state = initalState, action) {
  const { type, payload } = action;
  switch (type) {
    case "READ_CART":
      return payload;
    case "UPDATE_CART_ITEM":
      return state.map((itemData) => {
        if (itemData.item.id === payload.itemID) {
          return {
            item: itemData.item,
            quantity: payload.quantity,
          };
        }
        return itemData;
      });
    case "DELETE_CART_ITEM":
      return state.filter((itemData) => itemData.item.id !== payload.itemID);

    default:
      return state;
  }
}
