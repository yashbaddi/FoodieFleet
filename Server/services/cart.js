import cartModel from "../model/cart.js";

const cartService = {
  updateCart,
  readCart,
  clearCartForUser,
  calculateTotalCost,
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

async function clearCartForUser(userID) {
  const readResponse = await cartModel.clearItemsInCart(userID);
  return readResponse;
}

async function readCart(userID) {
  const readResponse = await cartModel.readItemsInCart(userID);
  return readResponse;
}
async function calculateTotalCost(userID) {
  const items = await cartModel.readItemsInCart(userID);
  const totalPrice = items.reduce((sum, itemData) => {
    const itemPrice = itemData.quantity * itemData.item.price;
    return sum + itemPrice;
  }, 0);
  return totalPrice;
}

export default cartService;
