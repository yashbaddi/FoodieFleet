import { restaurantWsController } from "../controller/ws/restaurant.js";
import userWsController from "../controller/ws/user.js";
import orderModel from "../model/orders.js";
import restaurantModel from "../model/restaurants.js";
import userModel from "../model/users.js";
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
  setOrderToPreparing,
  setOrderToPartnerAssigned,
  setOrderToDelivering,
  setOrderToRejected,
  setOrderToDelivered,
};

async function getOrdersByOrderID(orderID) {
  const readResponse = await orderModel.readOrders({ id: orderID });
  return readResponse.length !== 0 ? readResponse[0] : {};
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
  const response = await orderModel.createOrder(
    userID,
    {
      restaurantID: restaurantID,
    },
    {
      latitude: location[0],
      longitude: location[1],
    }
  );
  const restaurantOwnerID = await restaurantModel.readRestaurantOwner(
    restaurantID
  );

  restaurantWsController.sendOrderDetails(restaurantOwnerID, response[0]);

  return response;
}

async function setOrderToPreparing(orderID) {
  const status = await orderModel.updateOrderStatus(orderID, "PREPARING");

  const order = await orderModel.readOrders({ id: orderID });

  userWsController.sendStatusNotification(
    order.customer_id,
    order.id,
    "PREPARING"
  );
  await driversService.searchNearbyDriver(order.id);
}

async function setOrderToPartnerAssigned(orderID, driverID) {
  const response = await orderModel.assignDriverToOrder(orderID, driverID);
  const order = await orderModel.readOrders({ id: orderID });
  userWsController.sendNotification(order.customer_id, {
    orderID: order.id,
    status: "PARTNER_ASSIGNED",
    partner: order.driver,
  });
  restaurantWsController.sendNotification(order.restaurant.owner_id, {
    orderID: order.id,
    status: "PARTNER_ASSIGNED",
    partner: order.driver,
  });
}

async function setOrderToDelivering(orderID) {
  const status = await orderModel.updateOrderStatus(orderID, "DELIVERING");
}

async function setOrderToRejected(orderID) {
  const status = await orderModel.updateOrderStatus(orderID, "REJECTED");
}

async function setOrderToDelivered(orderID) {
  const status = await orderModel.updateOrderStatus(orderID, "DELIVERED");
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
