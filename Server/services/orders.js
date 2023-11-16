import userWsController from "../controller/ws/user.js";
import orderModel from "../model/orders.js";
import driversService from "./drivers.js";
import restaurantService from "./restaurants.js";

const orderService = {
  getOrdersByOrderID,
  getOrdersByUserID,
  getOrdersByRestaurantOwener,
  createNewOrder,
  patchCurrentOrder,
  updateItemsInOrder,
  updateOrderStatus,
};

async function getOrdersByOrderID(orderID) {
  const readResponse = await orderModel.readOrders({ id: orderID });
  return readResponse;
}

async function getOrdersByUserID(userID) {
  const readResponse = await orderModel.readOrders({
    userID,
  });
  console.log(readResponse);
  return readResponse;
}

async function getOrdersByRestaurantOwener(ownerID) {
  const readResponse = await orderModel.readOrders({
    ownerID,
  });
  console.log(readResponse);
  return readResponse;
}

async function createNewOrder(userID, restaurantID, location) {
  const restaurantLocation = await restaurantService.getRestaurantLocation(
    restaurantID
  );
  console.log(restaurantLocation);
  const nearbyDriver = await driversService.getNearestDriver(
    restaurantLocation
  );
  console.log("nearby Driver:", nearbyDriver);
  const response = await orderModel.createOrder(
    userID,
    {
      restaurantID: restaurantID,
    },
    nearbyDriver[0],
    {
      latitude: location[0],
      longitude: location[1],
    }
  );

  setInterval(async () => {
    const location = await driversService.readDriverLocation(nearbyDriver[0]);
    userWsController.sendDriverLocation(userID, location);
  }, 5000);

  console.log(nearbyDriver);

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

async function updateOrderStatus(orderID, status) {
  return orderModel.updateOrderStatus(orderID, status);
}

export default orderService;
