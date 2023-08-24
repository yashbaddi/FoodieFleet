import ordersModel from "../model/orders.js";

const ordersService = {
  getOrdersByOrderID: getOrdersByOrderID,
  createNewOrder: createNewOrder,
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

export default ordersService;
