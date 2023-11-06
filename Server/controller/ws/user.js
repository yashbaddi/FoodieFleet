const userSockets = [];

const userWsController = {
  setUserSocket,
  closeUserSocket,
  sendDriverLocation,
};

async function setUserSocket(ws) {
  console.log(ws.user);
  userSockets[ws.user] = ws;
}

async function closeUserSocket(ws) {
  userSockets[ws.user] = undefined;
}

async function sendDriverLocation(userID, location) {
  const payload = {
    type: "driver_location",
    data: location,
  };
  userSockets[userID].send(JSON.stringify(payload));
}

export default userWsController;
