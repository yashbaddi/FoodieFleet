import driversService from "../../services/drivers.js";
import orderService from "../../services/orders.js";

const driverSockets = {};

const driverWsController = {
  addDriverSocket,
  updateLocation,
  updateStatus,
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

export default driverWsController;
