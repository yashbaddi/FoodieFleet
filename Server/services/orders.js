import ordersModel from "../model/orders.js";

const ordersService = {
  getOrdersByOrderID: getOrdersByOrderID,
  createNewOrder: createNewOrder,
  patchCurrentOrder: patchCurrentOrder,
  updateItemsInOrder: updateItemsInOrder,
};

async function getOrdersByOrderID(orderID) {
  const readResponse = await ordersModel.readOrder({ id: orderID });
  return readResponse;
}

async function createNewOrder(userID, restaurantID) {
  const response = await ordersModel.createOrder(userID, {
    restaurantID: restaurantID,
  });
  return response;
}

async function patchCurrentOrder(orderID, order) {
  const response = await ordersModel.patchOrder(orderID, order);
  return response;
}

async function updateItemsInOrder(orderID, item) {
  if (item.quantity > 0) {
    const updateResponse = await ordersModel.updateQuantity(
      orderID,
      item.id,
      item.quantity
    );

    return updateResponse;
  }

  if (item.quantity <= 0) {
    const deleteResponse = await ordersModel.deleteItemFromOrder(
      orderID,
      item.id
    );

    return deleteResponse;
  }
}

export default ordersService;
