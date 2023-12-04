import driverWsController from "../controller/ws/driver.js";
import { restaurantWsController } from "../controller/ws/restaurant.js";
import userWsController from "../controller/ws/user.js";
import orderModel from "../model/orders.js";
import restaurantModel from "../model/restaurants.js";
import cartService from "./cart.js";
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
  return readResponse ? readResponse : {};
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
  const totalCost = await cartService.calculateTotalCost(userID);
  const response = await orderModel.createOrder(
    userID,
    {
      restaurantID: restaurantID,
    },
    {
      latitude: location[0],
      longitude: location[1],
    },
    totalCost
  );
  if (response.order) {
    await cartService.clearCartForUser(userID);
    const restaurantOwnerID = await restaurantModel.readRestaurantOwner(
      restaurantID
    );
    const order = await orderModel.readOrders({ id: response.order.id });
    restaurantWsController.sendOrderDetails(restaurantOwnerID, order);
  }

  return response;
}

async function updateOrderStatus(orderID, status) {
  if (status === "PREPARING") orderService.setOrderToPreparing(orderID);
  if (status === "DELIVERING") orderService.setOrderToDelivering(orderID);
  if (status === "DELIVERED") orderService.setOrderToDelivered(orderID);
  if (status === "REJECTED") orderService.setOrderToRejected(orderID);
}

async function setOrderToPreparing(orderID) {
  const status = await orderModel.updateOrderStatus(orderID, "PREPARING");

  const order = await orderModel.readOrders({ id: orderID });
  console.log(orderID, "set to preparing");
  console.log("order in setOrderToPreparing:", order);
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
  driverWsController.sendOrderDetailsToPartner(order.driver.id, order);

  console.log("driver ", order.driver, "assigned to ", order.id);
}

async function setOrderToDelivering(orderID) {
  const status = await orderModel.updateOrderStatus(orderID, "DELIVERING");
  const order = await orderModel.readOrders({ id: orderID });
  userWsController.sendNotification(order.customer_id, {
    orderID: order.id,
    status: "DELIVERING",
    partner: order.driver,
  });
  restaurantWsController.sendNotification(order.restaurant.owner_id, {
    orderID: order.id,
    status: "DELIVERING",
    partner: order.driver,
  });
}

async function setOrderToRejected(orderID) {
  const status = await orderModel.updateOrderStatus(orderID, "REJECTED");
  const order = await orderModel.readOrders({ id: orderID });
  userWsController.sendNotification(order.customer_id, {
    orderID: order.id,
    status: "REJECTED",
  });
}

async function setOrderToDelivered(orderID) {
  const status = await orderModel.updateOrderStatus(orderID, "DELIVERED");
  const order = await orderModel.readOrders({ id: orderID });
  userWsController.sendNotification(order.customer_id, {
    orderID: order.id,
    status: "DELIVERED",
    partner: order.driver,
  });
  restaurantWsController.sendNotification(order.restaurant.owner_id, {
    orderID: order.id,
    status: "DELIVERED",
    partner: order.driver,
  });
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
