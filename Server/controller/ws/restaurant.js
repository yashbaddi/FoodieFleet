import orderService from "../../services/orders.js";
import driversService from "../../services/drivers.js";

const restaurantSockets = {};

export const restaurantWsController = {
  sendOrderDetails,
  setRestaurantSocket,
  closeRestaurantSocket,
  sendDriverDetails,
};

async function sendOrderDetails(restaurantOwner, order) {
  const payload = {
    type: "order",
    data: order,
  };
  restaurantSockets[restaurantOwner].send(JSON.stringify(payload));
}

async function sendDriverDetails(ws, wsRequest) {
  console.log("Request to send driver Location Details in Restaurant");
  driversService.sendDriversLocationInInterval(ws, wsRequest.data.driverID);
}

async function setRestaurantSocket(ws) {
  restaurantSockets[ws.restaurantOwner] = ws.user;
}

async function closeRestaurantSocket(ws) {
  restaurantSockets[ws.restaurantOwner] = undefined;
}
