import driversService from "../../services/drivers.js";
import orderService from "../../services/orders.js";

const driverSockets = {};

const driverWsController = {
  addDriverSocket,
};

async function addDriverSocket(ws) {
  driverSockets[ws.user] = ws;
}

export default driverWsController;
