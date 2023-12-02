import driversService from "../../services/drivers.js";

const userSockets = {};

const userWsController = {
  setUserSocket,
  getUserSocket,
  closeUserSocket,
  getDriverDetails,
  sendDriverLocation,
  sendNotification,
  sendStatusNotification,
};

async function setUserSocket(ws) {
  console.log(ws.user);
  userSockets[ws.user] = ws;
}

async function getUserSocket(userID) {
  return userSockets[userID];
}

async function getDriverDetails(ws, wsRequest) {
  console.log("Request to send driver Location Details in Restaurant");

  driversService.sendDriversLocationInInterval(
    ws.user,
    wsRequest.data.driverID
  );
}

async function closeUserSocket(ws) {
  userSockets[ws.user] = undefined;
}

async function sendDriverLocation(userID, location) {
  console.log({ userID, location, userSockets });
  const payload = {
    type: "partner_location",
    data: location,
  };
  userSockets[userID]?.send(JSON.stringify(payload));
}

async function sendNotification(userID, notification) {
  const payload = {
    type: "notification",
    data: notification,
  };
  console.log("user Sockets", userSockets[userID]);
  userSockets[userID]?.send(JSON.stringify(payload));
}

async function sendStatusNotification(userID, orderID, status) {
  sendNotification(userID, {
    orderID,
    status,
  });
}

export default userWsController;
