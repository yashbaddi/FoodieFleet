import ordersModel from "../model/orders.js";

const ordersService = {
  getOrdersByOrderID: getOrdersByOrderID,
  createNewOrder: createNewOrder,
  patchCurrentOrder: patchCurrentOrder,
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

export default ordersService;
