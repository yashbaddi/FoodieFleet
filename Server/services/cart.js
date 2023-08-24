import cartModel from "../model/cart.js";

const cartService = {
  updateCart: updateCart,
  readCart: readCart,
};

async function updateCart(userID, itemID, quantity) {
  if (quantity > 0) {
    const updateResponse = await cartModel.updateQuantityInCart(
      userID,
      itemID,
      quantity
    );
    return updateResponse;
  }

  if (quantity <= 0) {
    const deleteResponse = await cartModel.removeItemFromCart(userID, itemID);
    return deleteResponse;
  }
}

export default cartService;
