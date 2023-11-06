const userSockets = [];

const userWsController = {
  setUserSocket,
  closeUserSocket,
};

async function setUserSocket(ws) {
  console.log(ws.user);
  userSockets[ws.user] = ws;
}

async function closeUserSocket(ws) {
  userSockets[ws.user] = undefined;
}

export default userWsController;
