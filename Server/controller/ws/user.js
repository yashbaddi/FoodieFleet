import driversService from "../../services/drivers.js";

const userSockets = {};

const userWsController = {
  setUserSocket,
  getUserSocket,
  closeUserSocket,
  sendDriverLocation,
  sendNotification,
};

async function setUserSocket(ws) {
  console.log(ws.user);
  userSockets[ws.user] = ws;
}

async function getUserSocket(userID) {
  return userSockets[userID];
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
  userSockets[userID].send(JSON.stringify(payload));
}

async function sendNotification(userID, notification) {
  const payload = {
    type: "notification",
    data: notification,
  };
  userSockets[userID]?.send(JSON.stringify(payload));
}

export default userWsController;
