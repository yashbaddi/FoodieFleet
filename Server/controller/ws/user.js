const userSockets = [];

const userWsController = {
  setUserSocket,
};

async function setUserSocket(ws) {
  console.log(ws.user);
  userSockets[ws.user] = ws;
}

export default userWsController;
