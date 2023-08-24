import ordersModel from "../model/orders.js";

const ordersService = {
  getOrdersByOrderID: getOrdersByOrderID,
};

async function getOrdersByOrderID(orderID) {
  const readResponse = await ordersModel.readOrder({ id: orderID });
  return readResponse;
}

export default ordersService;
