import driversService from "../../services/drivers.js";
import orderService from "../../services/orders.js";

const driverSockets = {};

const driverWsController = {
  addDriverSocket,
  updateLocation,
  updateStatus,
  updateOrderStatus,
  closeDriverSocket,
  assignDriver,
};

async function addDriverSocket(ws) {
  driverSockets[ws.user] = ws;
}

async function updateLocation(ws, wsRequest) {
  await driversService.updateDriverLocation(
    ws.user,
    wsRequest.data.latitude,
    wsRequest.data.longitude
  );
}
async function updateStatus(ws, wsRequest) {
  await driversService.updateDriverStatus(ws.user, wsRequest.data.status);
}
async function updateOrderStatus() {
  await orderService.updateOrderStatus(
    wsRequest.data.orderID,
    wsRequest.data.status
  );
}

async function closeDriverSocket(ws) {
  driverSockets[ws.user] = undefined;
}

async function assignDriver(driverID, order) {
  const payload = {
    type: "order",
    data: order,
  };
  driverSockets[driverID].send(JSON.stringify(payload));
}

export default driverWsController;
