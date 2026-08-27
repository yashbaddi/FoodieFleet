import orderService from "../../services/orders.js";
import driversService from "../../services/drivers.js";

const restaurantSockets = {};

export const restaurantWsController = {
  sendOrderDetails,
  setRestaurantSocket,
  closeRestaurantSocket,
  sendDriverDetails,
  updateOrderStatus,
  sendNotification,
};

async function sendOrderDetails(restaurantOwner, order) {
  const payload = {
    type: "order",
    data: order,
  };
  restaurantSockets[restaurantOwner]?.send(JSON.stringify(payload));
}

async function sendDriverDetails(ws, wsRequest) {
  driversService.sendDriversLocationInInterval(ws, wsRequest.data.driverID);
}

async function updateOrderStatus(ws, wsRequest) {
  const { status, orderID } = wsRequest.data;
  if (status === "PREPARING" || status === "REJECTED")
    orderService.updateOrderStatus(orderID, status);
}

async function sendNotification(userID, notification) {
  const payload = {
    type: "notification",
    data: notification,
  };
  restaurantSockets[userID]?.send(JSON.stringify(payload));
}

async function setRestaurantSocket(ws) {
  restaurantSockets[ws.restaurantOwner] = ws;
}

async function closeRestaurantSocket(ws) {
  restaurantSockets[ws.restaurantOwner] = undefined;
}
