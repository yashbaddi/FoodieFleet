import driversService from "../../services/drivers.js";
import orderService from "../../services/orders.js";

const driverSockets = {};

const driverWsController = {
  addDriverSocket,
  updateLocation,
  updateStatus,
  updateOrderStatus,
  closeDriverSocket,
  sendOrderDetailsToPartner,
  getAllActiveDrivers,
};

async function addDriverSocket(ws) {
  driverSockets[ws.user] = ws;
}

async function updateLocation(ws, wsRequest) {
  if (wsRequest.data) {
    await driversService.updateDriverLocation(
      ws.user,
      wsRequest.data[0],
      wsRequest.data[1]
    );
  }
}

async function updateStatus(ws, wsRequest) {
  await driversService.updateDriverStatus(ws.user, wsRequest.data.status);
}

async function getAllActiveDrivers() {
  return Object.keys(driverSockets);
}

async function updateOrderStatus(ws, wsRequest) {
  const { orderID, status } = wsRequest.data;
  if (status === "DELIVERING" || status === "DELIVERED")
    await orderService.updateOrderStatus(orderID, status);
}

async function closeDriverSocket(ws) {
  driverSockets[ws.user] = undefined;
}

async function sendOrderDetailsToPartner(driverID, order) {
  const payload = {
    type: "order",
    data: order,
  };
  driverSockets[driverID].send(JSON.stringify(payload));
}

export default driverWsController;
