import orderModel from "../model/orders.js";

const orderService = {
  getOrdersByOrderID: getOrdersByOrderID,
  createNewOrder: createNewOrder,
  patchCurrentOrder: patchCurrentOrder,
  updateItemsInOrder: updateItemsInOrder,
};

async function getOrdersByOrderID(orderID) {
  const readResponse = await orderModel.readOrder({ id: orderID });
  return readResponse;
}

async function createNewOrder(userID, restaurantID) {
  const response = await orderModel.createOrder(userID, {
    restaurantID: restaurantID,
  });
  return response;
}

async function patchCurrentOrder(orderID, order) {
  const response = await orderModel.patchOrder(orderID, order);
  return response;
}

async function updateItemsInOrder(orderID, item) {
  if (item.quantity > 0) {
    const updateResponse = await orderModel.updateQuantity(
      orderID,
      item.id,
      item.quantity
    );

    return updateResponse;
  }

  if (item.quantity <= 0) {
    const deleteResponse = await orderModel.deleteItemFromOrder(
      orderID,
      item.id
    );

    return deleteResponse;
  }
}

export default orderService;
